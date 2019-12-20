<template>
  <div class="top-bar">
    <span>
      <mti-svg-icon class-name="list-icon" icon-class="list_icon"></mti-svg-icon>
      <i style="margin-left:15px;">{{title}}</i>
    </span>
    <mti-svg-icon v-if="showNewBtn" class-name="list-add" icon-class="list_add" @click="handleBtnClick"></mti-svg-icon>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    title: {
      requried: true,
      type: String
    },
    handleClick: {
      type: Function
    },
    showNewBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleBtnClick () {
      this.$emit('handleClick');
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~styles/workbench/base.scss';
</style>
