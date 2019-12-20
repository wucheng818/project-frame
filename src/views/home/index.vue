/*
 * @Author: 武澄
 * @Date: 2019-12-20 14:03:27
 * @Last Modified by: 武澄
 * @Last Modified time: 2019-12-20 16:10:53
 */

<template>
  <div class="wrap">
    <mti-header></mti-header>
  </div>
</template>

<script>
import mtiHeader from '@/components/Header';
export default {
  components: {
    mtiHeader
  },
  props: {},
  data () {
    return {};
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss">
.wrap{
  width: 100%;
  height: 100vh;
  background-image: url('~@/assets/images/home/PC_bg.png');
  background-size: 100% 100%;
}
</style>
