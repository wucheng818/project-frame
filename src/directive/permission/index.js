import Vue from 'vue';
import store from '@/store';
import { isHasPerms } from '@/utils';
import { permisBtnIdSetting } from '@/assets/js/common/dictionary';
/**
 * @description 按钮权限指令
 */
Vue.directive('has', {
  bind (el, binding) {
    if (
      !isHasPerms(binding.value, store.getters['permission/getPermisBtnIds'])
    ) {
      el.style.display = 'none';
    }
  }
});
// 判断按钮权限（可以传入btnId或者btnModule.btnName）
const isHasBtnId = (btnMsg) => {
  let flag = isHasPerms(btnMsg, store.getters['permission/getPermisBtnIds']);
  return flag;
};
// vue实例扩展属性和方法
Object.assign(Vue.prototype, {
  $permisBtnIdSetting: permisBtnIdSetting, // 按钮id字典
  $isHasBtnId: isHasBtnId // :disabled="this.$isHasBtnId(121)"
});
