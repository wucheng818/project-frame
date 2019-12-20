/*
 * @Author: liuhuitao
 * @Date: 2019-08-14 17:27:17
 * @Last Modified by:
 * @Last Modified time: 2019-08-14 17:28:14
 * @description: 静态资源上传至七牛云(根据项目需求)
 */
const qiniu = require('qiniu');
const glob = require('glob');
const mime = require('mime');
const path = require('path');

const isWindow = /^win/.test(process.platform);

let pre = path.resolve(__dirname, '../dist/') + (isWindow ? '\\' : '');

const files = glob.sync(
  `${path.join(
    __dirname,
    '../dist/**/*.?(js|css|map|png|jpg|svg|woff|woff2|ttf|eot)'
  )}`
);
pre = pre.replace(/\\/g, '/');

const options = {
  scope: 'source'
};
let config = {
  qiniu: {
    accessKey: 'gYG6WgC5hQEycZ2mIpE0hf6bAxsjRLyi1TfdkDbN', // accessKey
    secretKey: 'M6RcxqQ2jp9C_2FduubSF3X3WWytgYaSmxI4_CzQ', // secretKey
    bucket: options.scope,
    domain: 'pvjflgkln.bkt.clouddn.com' // cdn 域名
  }
};
let accessKey = config.qiniu.accessKey;
let secretKey = config.qiniu.secretKey;

let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let putPolicy = new qiniu.rs.PutPolicy(options);
let uploadToken = putPolicy.uploadToken(mac);
let cf = new qiniu.conf.Config({
  zone: qiniu.zone.Zone_z2
});
let formUploader = new qiniu.form_up.FormUploader(cf);
async function uploadFileCDN (files) {
  files.map(async (file) => {
    const key = getFileKey(pre, file);
    try {
      await uploadFIle(key, file);
      console.log(`上传成功 key: ${key}`);
    } catch (err) {
      console.log('error', err);
    }
  });
}
async function uploadFIle (key, localFile) {
  const extname = path.extname(localFile);
  const mimeName = mime.getType(extname);
  const putExtra = new qiniu.form_up.PutExtra({ mimeType: mimeName });
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (
      respErr,
      respBody,
      respInfo
    ) {
      if (respErr) {
        reject(respErr);
      }
      resolve({ respBody, respInfo });
    });
  });
}

function getFileKey (pre, file) {
  if (file.indexOf(pre) > -1) {
    const key = file.split(pre)[1];
    return key.startsWith('/') ? key.substring(1) : key;
  }
  return file;
}

(async () => {
  console.time('上传文件到cdn');
  await uploadFileCDN(files);
  console.timeEnd('上传文件到cdn');
})();
