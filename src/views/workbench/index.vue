/*
 * @Author: liuhuitao
 * @Date: 2019-11-21 10:46:43
 * @Last Modified by: niyining
 * @Last Modified time: 2019-12-16 10:52:04
 */
<template>
  <div class="main-content">
    <Header />
    <div class="breadcrumb-panel" v-if="showBreadcrumb" ref="breadcrumbPanel">
      <span class="breadcrumb-home">
        <!-- <mti-svg-icon
          class-name="list-add"
          icon-class="list_add"
          @click="addVenue"
        ></mti-svg-icon> -->
        首页 <i class="el-icon-arrow-right"></i>
      </span>
      <el-breadcrumb separator-class="el-icon-arrow-right" name="fade-move">
        <el-breadcrumb-item v-for="item in getBreadcrumbItems" :key="item.path">{{ item.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="return-btn" size="small" @click="$router.replace('/home')">
        返回首页
      </el-button>
    </div>
    <div class="main-content-panel">
      <Sider ref="sider" v-if="showSider" />
      <section class="right-content">
        <transition name="el-fade-in-linear">
          <router-view class="viewer-detail"></router-view>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Sider from '@/components/sider';
import Header from '@/components/Header';
import { workbenchRouter as MenuConfig } from '@/config/menuConfig.js';
import { mapActions, mapGetters, createNamespacedHelpers } from 'vuex';
import { Breadcrumb, BreadcrumbItem, Badge } from 'element-ui';
const { mapActions: mapActionsFromUser } = createNamespacedHelpers('user');
const { mapActions: mapActionsFromPermission } = createNamespacedHelpers(
  'permission'
);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);
Vue.component(Badge.name, Badge);

export default {
  name: 'mainContent',
  components: {
    Sider,
    Header
  },
  data () {
    return {
      drawerVisible: false,
      changePassVisible: false,
      showBreadcrumb: true,
      showSider: true
    };
  },
  mounted () {
    this.changeBreadcrumb(this.$route);
    this.handleHiddenSide();
    this.handleHiddenBreadcrumb();
  },
  computed: {
    ...mapGetters(['getCurrentMenuStyle', 'getBreadcrumbItems'])
  },
  watch: {
    $route () {
      this.changeBreadcrumb(this.$route);
    }
  },
  methods: {
    ...mapActions(['BREADCRUMB_ITEMS', 'CURRENT_MENU_STYLE']),
    ...mapActionsFromUser(['loginOut']),
    ...mapActionsFromPermission(['clearPermission']),
    changeBreadcrumb (route) {
      let oneLevelMenu = {};
      let twoLevelMenu = {};
      MenuConfig.forEach((menu) => {
        if (menu.children) {
          const item = menu.children.find((item) => item.path === route.path);
          if (item) {
            oneLevelMenu = menu;
            twoLevelMenu = item;
            return false;
          }
        } else {
          if (menu.path === route.path) {
            oneLevelMenu = menu;
          }
        }
      });
      this.BREADCRUMB_ITEMS([oneLevelMenu, twoLevelMenu]);
    },
    changeStyle (style) {
      this.CURRENT_MENU_STYLE(style);
    },
    // 侧边栏收缩事件
    handleHiddenSide () {
      this.$bus.$on('hiddenSidebar', (res) => {
        this.showSider = res;
      });
    },
    // 面包屑导航区域收缩事件
    handleHiddenBreadcrumb () {
      this.$bus.$on('hiddenBreadcrumb', (res) => {
        this.showBreadcrumb = res;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main-content {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  @include flex(column);

  .breadcrumb-panel {
    background-color: #ffffff;
    border-bottom: 2px solid #dddddd;
    .el-breadcrumb {
      flex: 1;
    }
    width: 100%;
    height: 58px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .return-btn {
      width: 98px;
      margin-right: 30px;
    }
  }

  .main-content-panel {
    @include flex(row);
    height: calc(100vh - 144px);
  }
  .right-content {
    // flex: 1;
    width: calc(100vw - 410px);
    overflow: auto;
    overflow-x: hidden;
    padding: 0 20px;
    position: relative;
    .viewer-detail {
      position: absolute;
      width: calc(100vw - 410px);
      height: calc(100vh - 60px);
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
</style>
