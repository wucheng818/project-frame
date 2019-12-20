<template>
  <div class="err-panel">
    <div class="header"></div>
    <div class="content">
      <img
        src="~@/assets/images/errorPage/404.png"
        alt="404"
      >
      <p class="return-btn">
        本页{{changeNumber}}秒内自动跳转...
        <br />
        <el-button
          type="primary"
          @click="returnPage"
          style="margin-top:8px;"
        >前往{{returnPageConfig.name}}</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState: mapStateFromUser } = createNamespacedHelpers('user');
const { mapState: mapStateFromPermission } = createNamespacedHelpers('permission');
export default {
  name: 'errorpage-404',
  data () {
    return {
      returnPageConfig: {
        name: '',
        path: ''
      },
      timer: null,
      changeNumber: 5
    };
  },
  computed: {
    ...mapStateFromUser(['userName', 'userId']),
    ...mapStateFromPermission(['defaultToPath'])
  },
  created () {
    if (this.userName && this.userId) {
      this.returnPageConfig = {
        name: '默认主页',
        path: this.defaultToPath
      };
    } else {
      this.returnPageConfig = {
        name: '登录页',
        path: '/login'
      };
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.changeNumber--;
      if (this.changeNumber === 0) {
        this.returnPage();
        clearInterval(this.timer);
      }
    }, 1000);
  },
  beforeDestroy () {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    returnPage () {
      this.$router.replace({ path: this.returnPageConfig.path });
    }
  }
};
</script>

<style lang="scss" scoped>
.err-panel {
  width: 100vw;
  height: 100vh;
  .header {
    height: 80px;
    width: 100%;
    background-color: #ff999999;
  }
  .content {
    width: 20%;
    height: 35%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    text-align: center;
    img {
      display: block;
    }
    .return-btn {
      margin-top: 4.6%;
      color: #999999;
    }
  }
}
</style>
