/*
 * @Author: liuhuitao
 * @Date: 2019-08-21 16:50:36
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-19 19:35:37
 */
// https://github.com/staven630/vue-cli4-config/blob/master/vue.config.js
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const path = require('path');
const fs = require('fs');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const cdnDomian = '/';
const isMock = false; // 是否使用本地mock
// const cdnDomian = "pvjflgkln.bkt.clouddn.com";

module.exports = {
  publicPath: IS_PROD ? cdnDomian : '/', // 设置打包文件相对路径
  // productionSourceMap: !IS_PROD,
  css: {
    // modules: false, // 启用 CSS modules
    // extract: IS_PROD,
    // sourceMap: false,
    loaderOptions: {
      sass: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        data: `@import '~styles/var.scss';
        @import '~styles/index.scss';`
      }
    }
  },
  configureWebpack: () => ({
    devtool: 'source-map',
    resolve: {
      alias: {
        '~styles': path.resolve('./src/assets/styles'),
        '~images': path.resolve('./src/assets/images'),
        '~api': path.resolve('./src/api')
      }
    }
  }),
  chainWebpack: (config) => {
    // #region svg-config
    config.performance.set('hints', false);
    const rule = config.module.rule('svg');
    rule.exclude.add(path.resolve('./src/assets/icons/svg'));
    const svgRule = config.module.rule('auto-svg'); // 找到svg-loader
    svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule
      .test(/\.(svg)(\?.*)?$/)
      .exclude.add(/node_modules/) // 正则匹配排除node_modules目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });
    // #endregion svg-config

    // 如果是开发环境，且配置项isMock为真，则将mock数据加入到入口文件
    if (isMock && !IS_PROD) {
      const files = fs.readdirSync(path.resolve('./src/mock'));
      if (files && files.length) {
        let entry = config.entry('app');
        files.forEach((item) => {
          entry.prepend(path.resolve('./src/mock/' + item));
        });
        entry.end();
      }
    }

    if (IS_PROD) {
      // #region 图片压缩
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .exclude.add(path.resolve('src/assets/icons/svg'))
        .end()
        .use('img-loader')
        .loader('img-loader')
        .options({
          plugins: [
            require('imagemin-jpegtran')(),
            require('imagemin-pngquant')({
              quality: [0.75, 0.85]
            })
          ]
        });
      // #endregion
      // #region 启用GZip压缩
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap((args) => {});

      // #endregion

      // #region 忽略生成环境打包的文件

      let externals = {
        vue: 'Vue',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        lodash: '_',
        moment: 'moment'
      };
      config.externals(externals);
      const cdn = {
        css: [
          // element-ui css
          '//unpkg.com/element-ui/lib/theme-chalk/index.css'
        ],
        js: [
          // vue
          '//cdn.staticfile.org/vue/2.5.22/vue.min.js',
          // vue-router
          '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
          // vuex
          '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
          // axios
          '//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
          // element-ui js
          '//unpkg.com/element-ui/lib/index.js',
          // lodash
          '//cdn.staticfile.org/lodash.js/4.17.15/lodash.min.js',
          // moment
          '//momentjs.cn/downloads/moment.min.js'
        ]
      };
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn;
        return args;
      });

      config.plugin('copy').use(CopyWebpackPlugin, [
        [
          {
            from: './src/config',
            to: 'config',
            ignore: ['dragTreeTableList.js', 'menuConfig.js']
          },
          {
            from: './public/favicon.png',
            to: '',
            ignore: []
          }
        ]
      ]);
      // 删除 moment 除 zh-cn 中文包外的其它语言包，无需在代码中手动引入 zh-cn 语言包。
      config
        .plugin('ignore')
        .use(
          new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
        );

      // #endregion

      // #region 分析打包体积

      if (process.env.IS_ANALYZE) {
        config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
          {
            analyzerMode: 'static'
          }
        ]);
      }

      // #endregion 分析打包体积
    }
    // 修复HMR(热更新)失效
    config.resolve.symlinks(true);
  },
  lintOnSave: true, // lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  // https://cli.vuejs.org/zh/config/#devserver-proxy
  devServer: {
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    // open: IS_PROD,
    // host: '0.0.0.0',
    port: 8088,
    https: false,
    disableHostCheck: true, // webpack4.0 开启热更新
    // inline: false, // 设置页面引入
    proxy: {
      '/api/': {
        target: 'http://10.168.31.109:8080', // 基础服务服务器
        ws: false, // 是否启用websockets
        changOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/api/': '' // 这种接口配置出来     http://XX.XX.XX.XX:8088/login
          // '^/api/': '/api/' // 这种接口配置出来     http://XX.XX.XX.XX:8088/api/login
        }
      },
      '/monitor/': {
        target: 'http://10.168.31.109:8080/', // websocket 服务器(基础库)
        ws: true, // 是否启用websockets
        changOrigin: true,
        pathRewrite: {
          '^/monitor/': ''
        }
      },
      '/file/': {
        target: 'http://10.168.31.224:8940/', // 文件服务器
        ws: false, // 是否启用websockets
        changOrigin: true,
        pathRewrite: {
          '^/file/': '/file/'
        }
      },
      '/source/': {
        target: 'http://10.168.31.224:8888/', // source服务器
        ws: false, // 是否启用websockets
        changOrigin: true,
        pathRewrite: {
          '^/source/': ''
        }
      }
    }
  }
};
