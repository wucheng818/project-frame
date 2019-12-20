/*
 * @Author: liuhuitao
 * @Date: 2019-08-15 13:31:53
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-05 13:26:01
 * @description: 用户登录
 */
<template>
  <div class="mti-login">
    <div class="mti-login-wrapper">
      <!-- 登录 -->
      <div class="dialog-container">
        <div class="title-panel">
          <h1 class="login-title">
            统一用户管理
          </h1>
        </div>
        <div
          class="mti-login-form"
          @keyup.enter="doLogin"
        >
          <!-- 账号登录表单 -->
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            v-show="showForm === 'account'"
          >
            <div class="form-title">
              用户登录
            </div>
            <el-form-item prop="name">
              <el-input
                autofocus
                v-model="form.name"
                placeholder="请输入用户名"
              >
                <i
                  class="login-input user-icon"
                  slot="prefix"
                ></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
              >
                <i
                  slot="prefix"
                  class="login-input password-icon"
                ></i>
              </el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;">
              <span
                class="toggle-login-type"
                @click="showForm = 'mobilePhone'"
              >短信验证登录</span>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="login-btn"
                size="small"
                @click="doLogin"
                :loading="loading"
              >{{ loading ? '正在登陆中...' : '登录' }}</el-button>
            </el-form-item>
          </el-form>
          <!-- 手机验证表单 -->
          <el-form
            ref="mobileForm"
            :model="mobileForm"
            :rules="mobileFormRules"
            v-show="showForm === 'mobilePhone'"
          >
            <div class="form-title">
              用户登录
            </div>
            <el-form-item prop="phoneNum">
              <el-input
                v-model="mobileForm.phoneNum"
                placeholder="请输入手机号"
              >
                <i
                  slot="prefix"
                  class="login-input phonenum-icon"
                ></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="verificationCode">
              <el-input
                autofocus
                v-model="mobileForm.verificationCode"
                placeholder="请输入验证码"
                style="width: 252px;"
              >
                <i
                  slot="prefix"
                  class="login-input verifi-icon"
                ></i>
              </el-input>
              <span
                v-show="getVarificodeVisible"
                class="get-varificode"
                @click="handelGetVarCode"
                style="cursor: pointer;"
              >获取验证码</span>
              <span
                v-show="!getVarificodeVisible"
                class="get-varificode"
              >发送中... ({{changingNum}})</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;">
              <span
                class="toggle-login-type"
                @click="showForm = 'account'"
              >账号登录</span>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="login-btn"
                size="small"
                @click="doLogin"
                :loading="loading"
              >{{ loading ? '正在登陆中...' : '登录' }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/utils/md5';
import { deleteToken } from '@/utils';
import { createNamespacedHelpers } from 'vuex';
import { _listToTree, checkPassword } from '@/utils/mtiUtils';
import { _getValidCode, _getUserInfo } from '@/api/user';
const { mapActions: mapActionsFromUser } = createNamespacedHelpers('user');
const { mapActions: mapActionsPermission } = createNamespacedHelpers('permission');
const { mapActions: mapActionsMonitor } = createNamespacedHelpers('monitor');
export default {
  name: 'mti-login',
  data () {
    let checkedPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!checkPassword(value)) {
        callback(new Error('密码由长度在6~20 之间的字母、数字或下划线组成'));
      } else {
        callback();
      }
    };
    return {
      showForm: 'account',
      // 账号登录表单
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { validator: checkedPass, trigger: 'change' }]
      },
      loading: false,
      // 手机登录
      mobileForm: {
        phoneNum: '',
        verificationCode: ''
      },
      mobileFormRules: {
        phoneNum: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
        verificationCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      },
      getVarificodeVisible: true, // 是否显示获取验证码
      changingNum: 0

    };
  },
  computed: {},
  created () {
  },
  methods: {
    ...mapActionsFromUser(['handleLogin']),
    ...mapActionsMonitor(['WEBSOCKET_INIT']),
    ...mapActionsPermission(['setHasMenuData', 'setDefaultToPath', 'setPerBtnData']),
    doLogin () {
      this.loading = true;
      deleteToken();
      let data = {};
      let formType = (this.showForm === 'account' ? 'form' : 'mobileForm');
      // 【再次确认删除已有的存储数据】
      if (this.showForm === 'account') {
        data = {
          username: this.form.name.trim(),
          password: this.form.password.MD5(32),
          loginType: 1
        };
      } else {
        data = {
          userPhone: this.mobileForm.phoneNum.trim(),
          userValidCode: this.mobileForm.verificationCode,
          loginType: 2
        };
      }
      this.$refs[formType].validate(async (validate) => {
        if (validate) {
          this.handleLogin(data).then((res) => {
            if (res && res.data) {
              this.loading = false;
              // 开启心跳检测
              this.WEBSOCKET_INIT(res.data.userName);
              // 获取登录用户信息
              _getUserInfo().then((res) => {
                if (res && res.data) {
                  let menusTreeData = _listToTree(
                    res.data.menus,
                    {
                      rootId: -1,
                      pidname: 'parentId',
                      cidname: 'itemId'
                    },
                    {}
                  );
                  menusTreeData = JSON.parse(
                    JSON.stringify(menusTreeData)
                      .replace(/itemName/g, 'name')
                      .replace(/itemRoute/g, 'path')
                      .replace(/itemIcon/g, 'icon')
                  );
                  if (res.data.buttons.length > 0) {
                    this.setPerBtnData(res.data.buttons);
                  }
                  if (menusTreeData && menusTreeData.length > 0) {
                    this.setHasMenuData(menusTreeData);
                    if (menusTreeData[0].children && menusTreeData[0].children.length > 0) {
                      this.setDefaultToPath(menusTreeData[0].children[0].path);
                      // this.$router.push(menusTreeData[0].children[0].path);
                      this.$router.push('/home');
                    } else {
                      this.setDefaultToPath(menusTreeData[0].path);
                      // this.$router.push(menusTreeData[0].path);
                      this.$router.push('/home');
                    }
                  } else {
                    this.$message({
                      type: 'error',
                      message: '您登录的账户暂无访问菜单权限,请联系管理员授权!'
                    });
                  }
                }
              });
            } else {
              this.$message({
                type: 'error',
                message: res.message || '服务连接异常'
              });
            }
          });
        }
        this.loading = false;
      });
    },
    // 获取验证码
    handelGetVarCode () {
      if (this.mobileForm.phoneNum === '') {
        return this.$message({
          type: 'error',
          message: '请输入手机号'
        });
      }
      this.getVarificodeVisible = false;
      this.changingNum = 59;
      // eslint-disable-next-line no-var
      var timer = setInterval(() => {
        this.changingNum--;
        if (this.changingNum <= 0) {
          this.getVarificodeVisible = true;
          clearInterval(timer);
        }
      }, 1000);
      _getValidCode({
        userPhone: this.mobileForm.phoneNum
      }).then((res) => {
        if (res && res.data) {
          let t = setTimeout(() => {
            this.mobileForm.verificationCode = res.data.userValidCode;
            if (t) {
              clearTimeout(t);
            }
          }, 3000);
        } else {
          Promise.resolve().then(() => {
            return new Promise((resolve, reject) => {
              let t = setTimeout(() => {
                this.$message({
                  type: 'error',
                  message: res.message
                });
                if (t) {
                  clearTimeout(t);
                }
                resolve();
              }, 3000);
            });
          }).then(() => {
            if (timer) {
              this.getVarificodeVisible = true;
              this.changingNum = 0;
              this.mobileForm.phoneNum = '';
              this.mobileForm.verificationCode = '';
              clearInterval(timer);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$imgUrl: '~@/assets/images/';
$loginUrl: '~@/assets/images/login';
$commonUrl: '~@/assets/images/common';
.login-input {
  background-size: 100% 100%;
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-bottom: -6px;
}
.user-icon {
  background: url('#{$commonUrl}/user-input.png') no-repeat;
}
.password-icon {
  background: url('#{$commonUrl}/password-input.png') no-repeat;
}
.phonenum-icon {
  background: url('#{$commonUrl}/phoneNum-input.png') no-repeat;
}
.verifi-icon {
  background: url('#{$commonUrl}/verificationCode-input.png') no-repeat;
}
.mti-login {
  &-wrapper {
    height: 100vh;
    // background: url('#{$loginUrl}/login-bg.png') no-repeat center center;
    background-color: #005f8c;
    background-size: 100% 100%;
    overflow: hidden;
  }
  .title-panel {
    display: flex;
    justify-content: center;
    .login-title {
      width: 486px;
      height: 96px;
      font-size: 0;
      // background: url('#{$loginUrl}/project_login_title.png') no-repeat center
      //   center;
    }
  }
  .dialog-container {
    position: absolute;
    right: 18.3854%;
    top: 50%;
    margin-top: -238px;
  }
  &-form {
    width: 527px;
    height: 402px;
    background: url('#{$loginUrl}/form-bg.png') no-repeat;
    background-size: 100% 100%;
    padding: 22px 74px 66px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .form-title {
    text-align: center;
    @include sc(24px, #119cfb);
    line-height: 84px;
    height: 84px;
    font-family: Microsoft YaHei;
  }
  // 切换登录方式
  .toggle-login-type {
    cursor: pointer;
    font-family: Microsoft YaHei;
    @include sc(14px, rgba(255, 255, 255, 1));
  }
  .get-varificode {
    display: inline-block;
    width: 126px;
    text-align: center;
    @include sc(16px, rgba(254, 254, 254, 1));
  }
  .login-btn {
    width: 100%;
    height: 44px;
    background-color: #0b76bf;
    @include sc(18px, rgba(255, 255, 255, 1));
  }
}
</style>
