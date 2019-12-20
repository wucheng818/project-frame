/*
 * @Author: liuhuitao
 * @Date: 2019-03-15 8:59:55
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-13 10:54:43
 */
import Vue from 'vue';
import { mapActions, mapGetters, createNamespacedHelpers } from 'vuex';
import { Menu, MenuItem, Submenu } from 'element-ui';
import './sider.scss';
import { workbenchRouter } from '@/config/menuConfig';
const { mapGetters: mapGettersPermission } = createNamespacedHelpers(
  'permission'
);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Submenu.name, Submenu);
export default {
  name: 'sider',
  data () {
    return {
      defaultActive: ''
    };
  },
  computed: {
    ...mapGetters(['getMenuCollapse', 'getMenuStyle', 'getCurrentMenuStyle']),
    ...mapGettersPermission(['getMenuTreeData'])
  },
  created () {
    this.defaultActive = this.$route.path;
  },
  methods: {
    ...mapActions(['MENU_COLLAPSE']),
    handleMenuFold () {
      this.MENU_COLLAPSE(!this.getMenuCollapse);
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
    },
    renderMenu (menus) {
      return menus.map((menu) => {
        if (menu.children) {
          // 根节点
          const icon = menu.icon ? (
            <mti-svg-icon class-name={'root-menu'} icon-class={menu.icon} />
          ) : (
            ''
          );
          return (
            <el-submenu index={menu.path}>
              <template slot="title">
                {icon}
                <span>{menu.name}</span>
              </template>
              {this.renderMenu(menu.children)}
            </el-submenu>
          );
        } else {
          // 子节点
          const icon = menu.icon ? (
            <mti-svg-icon class-name={'sub-menu'} icon-class={menu.icon} />
          ) : (
            ''
          );
          return (
            <el-menu-item index={menu.path}>
              {icon}
              <span slot="title">{menu.name}</span>
            </el-menu-item>
          );
        }
      });
    }
  },

  render () {
    return (
      <div
        class="sider"
        style={{
          backgroundColor: '#F8F8F8',
          position: 'relative'
        }}
      >
        <el-menu
          default-active={this.defaultActive}
          class={[
            'el-menu-vertical-demo',
            this.getCurrentMenuStyle === 'light' ? 'menu-light' : 'menu-dark'
          ]}
          background-color="#F8F8F8"
          text-color={this.getMenuStyle.textColor}
          active-text-color={this.getMenuStyle.activeTextColor}
          router={true}
          collapse={this.getMenuCollapse}
          open={this.handleOpen}
          close={this.handleClose}
          unique-opened
        >
          {this.renderMenu(workbenchRouter)}
        </el-menu>
      </div>
    );
  }
};
