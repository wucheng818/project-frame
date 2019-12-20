/*
 * @Author: liuhuitao
 * @Date: 2019-09-12 16:03:18
 * @Last Modified by:   liuhuitao
 * @Last Modified time: 2019-09-12 16:03:18
 */
export default {
  data () {
    return {
      loading: false
    };
  },
  methods: {
    /**
     * @description 展示加载框
     */
    showLoading () {
      this.loading = true;
    },
    /**
     * @description 隐藏加载框
     */
    hiedLoading () {
      this.loading = false;
    }
  }
};
