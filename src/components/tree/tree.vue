<!--
 * @Descripttion:
 * @version:
 * @Author: ZhengPan
 * @Date: 2019-08-12 09:06:43
 * @LastEditors: ZhengPan
 * @LastEditTime: 2019-09-23 15:38:23
 * @params {Function} onNodeClick 节点被点击的触发的方法
 * @params {Function} onNodeDrag 节点被拖拽完成触发的方法
 * @params {Function} onNodeCheckChange 点击节点选择触发的方法
 * @params {Function} onNodeChecked 点击节点被选中触发的方法
 * @params slot-scope="{ data-节点数据, node-当前节点 }"
 -->
<template>
  <div class="tree mti-tree">
    <el-input
      v-if="search"
      v-model="filterText"
      suffix-icon="el-icon-search"
      placeholder="输入关键字进行查询"
      style="width:100%"
      :maxlength="searchMaxLength"
    ></el-input>
    <el-tree
      v-loading="loading"
      :ref="refName"
      :data="treeList"
      :indent="0"
      :props="treeProps"
      :empty-text="emptyText"
      :highlight-current="true"
      :load="loadTreeData"
      :lazy="lazy"
      :default-expand-all="isDefaultExpandAll"
      :draggable="drag"
      :accordion='accordion'
      :show-checkbox="check"
      :filter-node-method="filterNode"
      :allow-drop="allowDrop"
      :expand-on-click-node="expandClickNode"
      @node-expand="nodeExpand"
      @node-drop="handleNodeDrop"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
      @check="handleChecked"
      :default-expanded-keys="expandedKeys"
      :node-key="nodeKey"
      :style="{height: !search ? '100%': 'calc(100% - 62px)'}"
    >
      <div
        :class="'custom-tree-node'"
        slot-scope="{ node, data }"
      >
        <i
          :class="`icon icon-admin`"
          v-if="icon && isAdmin"
        ></i>
        <i
          :class="`icon icon-${data.departType}`"
          v-else-if="icon"
        ></i>
        <span :class="setFontMark(data.enabled)">{{ node.label }}</span>
        <span>
          <slot
            :node="node"
            :data="data"
          ></slot>
        </span>
      </div>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'mti-tree',
  props: {
    refName: {
      type: String,
      default: 'mtiTree'
    },
    // 树的数据
    treeList: {
      type: Array,
      default: () => []
    },
    // 没有数据显示的内容
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 是否显示search
    search: {
      type: Boolean,
      default: false
    },
    // 是否显示禁用标记
    isShowDisableMark: {
      type: Boolean,
      default: false
    },
    // 是否每次只打开一个同级树节点展开【手风琴】
    accordion: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    // 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
    expandClickNode: {
      type: Boolean,
      default: true
    },
    // search输入框最大长度
    searchMaxLength: {
      type: [Number, String],
      default: 32
    },
    // 是否显示选择框
    check: {
      type: Boolean,
      default: false
    },
    // 是否显示icon
    icon: {
      type: Boolean,
      default: false
    },
    // 是否是行政的树-icon不一样--icon为true时生效
    isAdmin: {
      type: Boolean,
      default: false
    },
    // 是否可以拖拽
    drag: {
      type: Boolean,
      default: false
    },
    // 绑定node-key
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 默认的prop
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children', // 子节点数组key值
          label: 'label' // 展示内容的key值
        };
      }
    },
    // 当前选中的节点
    currentNodeKey: {
      type: [String, Number],
      default: ''
    },
    // 默认展开的节点的 key 的数组
    defaultExpandedKeys: {
      required: false,
      type: Array,
      default: () => []
    },
    isDefaultExpandAll: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: !this.lazy,
      filterText: '', // 搜索框
      id: 0,
      expandedKeys: [],
      currentKey: undefined,
      currentKeyData: {},
      treeProps: Object.assign({ children: 'children', label: 'label' }, this.defaultProps)
    };
  },
  computed: {},
  watch: {
    filterText (val) {
      this.$refs[this.refName].filter(val);
    },
    treeList (val) {
      if (val.length === 0) {
        this.loading = true;
        return;
      }
      if (this.currentNodeKey) { // 设置当前高亮项
        this.currentKey = this.currentNodeKey;
        this.getCurrentKeyData(val);
      } else {
        this.currentKey = val[0][this.nodeKey];
        this.currentKeyData = val[0];
      }
      this.$nextTick(() => {
        this.$refs[this.refName].setCurrentKey(this.currentKey);
        this.handleNodeClick(this.currentKeyData);
      });

      // 设置当前展开项
      if (this.defaultExpandedKeys && this.defaultExpandedKeys.length) {
        this.expandedKeys = this.defaultExpandedKeys;
      } else {
        this.getExpandedKeys(val);
      }
      this.loading = false;
    },
    // 通过 key 设置节点选中
    currentNodeKey (val) {
      this.$refs[this.refName].setCurrentKey(val);
    }
  },
  methods: {
    // 方法--获取当前高亮项的data
    getCurrentKeyData (data) {
      data.filter((item) => {
        if (item[this.nodeKey] === this.currentKey) {
          this.currentKeyData = item;
          return true;
        } else {
          const children = item[this.treeProps.children];
          if (children && children.length) {
            this.getCurrentKeyData(children);
          }
        }
      });
    },
    // 方法--获取当前展开项
    getExpandedKeys (data) {
      this.expandedKeys.push(data[0][this.nodeKey]);
      const children = data[0][this.treeProps.children];
      if (children && children.length) {
        this.getExpandedKeys(children);
      }
    },
    // 方法--节点被点击
    handleNodeClick (data, node, el) {
      // 触发节点被点击的方法
      this.$emit('onNodeClick', data, node, el);
    },
    // 方法--是否允许节点拖拽
    handleNodeDrop (draggingNode, dropNode, type, ev) {
      // 触发节点被拖拽的方法
      this.$emit('onNodeDrag', draggingNode.data, dropNode.data);
    },
    // 方法--是否允许节点放入成功
    allowDrop (draggingNode, dropNode, dropType) {
      return true;
    },
    // 点击选择
    handleCheckChange (data, flag, flagChildren) {
      if (!this.check) {
        return false;
      }
      // 触发节点被点击的方法
      this.$emit('onNodeCheckChange', data, flag, flagChildren);
    },
    // 节点被选中
    handleChecked (data, checkNodesObj) {
      if (!this.check) {
        return false;
      }
      // 触发节点被点击的方法
      this.$emit('onNodeChecked', data, checkNodesObj);
    },
    // 根据搜索过滤
    filterNode (value, data) {
      const labelName = this.treeProps.label;
      return data[labelName].includes(value);
    },
    setFontMark (enabled) {
      if (!this.isShowDisableMark) {
        return '';
      }
      if (this.isShowDisableMark && enabled === 0) {
        return 'disable-mark';
      }
    },
    loadTreeData (node, resolve) {
      this.$emit('load-tree-data', node, resolve);
    },
    nodeExpand (data, node, el) {
      this.$emit('node-expand', data, node, el);
    }
  }
};
</script>
<style lang="scss">
$imgUrl: '~@/assets/images/common';
$current_color: #eea236;
$current_bg-color: #f4f7fa;
$hover_bgc: #dadada;
$font_size: 17px;
$line_color: #333;
$border_solid: 1px solid $line_color;
$border_dashed: 1px dashed $line_color;

$icon_expand: 'expand';
$icon_merge: 'merge';
$icon_admin: 'admin';
$icon_city: 'city';
$icon_sub: 'sub';
$icon_station: 'station';
$icon_team: 'team';
/**设置icon背景图片**/
@mixin icon_bg($img_name) {
  background: url('#{$imgUrl}/tree-#{$img_name}.png') no-repeat;
  background-size: contain;
}

/**设置icon-current背景图片**/
@mixin icon_bg_current($img_name) {
  background: url('#{$imgUrl}/tree-#{$img_name}-current.png') no-repeat;
  background-size: contain;
}
.el-tree {
  color: #333;
}
.tree {
  width: 100%;
  height: 100%;
  @mixin input_size {
    width: 257px;
    height: 42px;
  }
  .el-input {
    @include input_size;
    margin-bottom: 20px;
  }
  .el-tree.el-tree--highlight-current {
    width: 100%;
    font-size: $font_size;
    line-height: $font_size;
    overflow: auto;
    // padding-top: 20px;
    // padding-bottom: 20px;
    background: #ffffff;
    .el-tree-node__content {
      min-width: 140px;
      &:hover {
        background-color: transparent;
      }
    }
    .el-tree-node {
      position: relative;
      .el-tree-node__content > .el-tree-node__expand-icon {
        padding: 0;
        position: relative;
        display: inline-block;
        min-width: 33px;
        height: 20px;
        transform: rotate(0);
        &::before {
          content: '';
          display: inline-block;
          width: 12px;
          height: 12px;
          position: absolute;
          left: 0;
          top: 4px;
          @include icon_bg($icon_merge);
          background-size: 100% 100% !important;
        }
        &.expanded::before {
          @include icon_bg($icon_expand);
        }
        &.is-leaf::before {
          @include icon_bg($icon_expand);
        }
        &::after {
          content: '---';
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          color: $line_color;
          text-align: center;
          position: absolute;
          right: 0;
          top: 0;
        }
      }

      div.custom-tree-node {
        i.icon {
          display: inline-block;
          width: 18px;
          height: 18px;
        }
        i.icon.icon-admin {
          @include icon_bg($icon_admin);
        }
        i.icon.icon-10 {
          @include icon_bg($icon_city);
        }
        i.icon.icon-11 {
          @include icon_bg($icon_sub);
        }
        i.icon.icon-12 {
          @include icon_bg($icon_station);
        }
        i.icon.icon-13 {
          @include icon_bg($icon_team);
        }
        span {
          margin-left: 3px;
          vertical-align: text-top;
        }
      }

      &.is-current > .el-tree-node__content {
        background: $current_bg-color;
        div.custom-tree-node {
          color: $current_color;
          i.icon.icon-admin {
            @include icon_bg_current($icon_admin);
          }
          i.icon.icon-10 {
            @include icon_bg_current($icon_city);
          }
          i.icon.icon-11 {
            @include icon_bg_current($icon_sub);
          }
          i.icon.icon-12 {
            @include icon_bg_current($icon_station);
          }
          i.icon.icon-13 {
            @include icon_bg_current($icon_team);
          }
        }
      }

      .el-tree-node__children {
        overflow: inherit;
        padding: 4px 0 4px 36px;
      }
    }
    .el-tree-node__children {
      > .el-tree-node {
        &::before {
          content: '';
          position: absolute;
          left: 6px;
          top: -8px;
          height: 10px;
          border-left: $border_dashed;
        }
        .el-tree-node__children {
          position: relative;
          &::before {
            content: '';
            position: absolute;
            left: 6px;
            top: 2px;
            height: 100%;
            border-left: $border_dashed;
          }
        }
      }
      > .el-tree-node:last-child {
        .el-tree-node__children {
          &::before {
            opacity: 0;
          }
        }
      }
    }
  }
}
.disable-mark {
  color: #f56c6c;
  text-decoration: line-through;
}
</style>
