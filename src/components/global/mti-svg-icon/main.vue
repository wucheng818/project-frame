<template>
  <svg
    v-on="$listeners"
    class="mti-svg-icon"
    :class="svgClass"
    aria-hidden="true"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
export default {
  name: 'mti-svg-icon',
  props: {
    // icon name
    iconClass: {
      type: String
    },
    // className
    className: {
      type: String
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`;
    },
    svgClass () {
      if (this.className) {
        return `svg-icon ${this.className}`;
      }
      return 'svg-icon';
    }
  }
};
</script>
<style lang="scss" scoped>
.mti-svg-icon {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
