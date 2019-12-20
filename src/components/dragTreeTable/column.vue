<template>
  <div
    class="tree-column"
    v-bind:style="{ width: width + 'px', flex: flex }"
    v-if="flex"
  >
    <slot></slot>
  </div>
  <div
    class="tree-column"
    v-bind:style="{ width: width + 'px' }"
    v-else
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'column',
  props: {
    width: {
      type: Number
    },
    field: {
      type: String
    },
    label: {
      type: String
    },
    flex: {
      type: Number
    }
  },
  data () {
    return {
      open: false
    };
  }
};
</script>
<style lang="scss" scoped>
.tree-column {
  padding: 0px 4px;
  min-width: 60px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

$bd_color: #ebeef5;
.tree-column + .tree-column {
  border-left: 1px solid $bd_color;
}
</style>
