<template>
  <div>
    <el-dialog
      id="mti-dialog"
      :width="width"
      :title="title"
      :modal="modal"
      :top="top"
      :append-to-body="appendToBody"
      :close-on-click-modal="false"
      :visible.sync="visible"
      @close="$emit('close-dialog')"
      :show="show"
      :destroy-on-close="destroyOnClose"
      :custom-class="customClass"
      :fullscreen="fullscreen"
    >
      <!-- @close="$emit('update:show', false)":只关闭弹框 -->
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'mtiDialog',
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    // 是否显示遮罩
    modal: {
      type: Boolean,
      default: false
    },
    // 宽度
    width: {
      type: String,
      default: '50%'
    },
    // 标题
    title: {
      type: String,
      default: '测试'
    },
    // 关闭时销毁 Dialog 中的元素
    destroyOnClose: {
      type: Boolean,
      default: true
    },
    // 自定义class
    customClass: {
      type: String,
      default: 'custom-dialog'
    },
    isCenter: {
      type: Boolean,
      default: false
    },
    // 是否全屏
    fullscreen: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: '15vh'
    }
  },
  components: {},
  data () {
    return {};
  },
  computed: {
    visible: {
      get () {
        return this.show;
      },
      set (val) {
        this.$emit('update:show', val);
      }
    }
  }
};
</script>
<style lang="scss">
#mti-dialog {
  .el-dialog__header {
    height: 48px;
    line-height: 48px;
    background: rgba(9, 144, 236, 1);
    padding: 0;
    text-align: center;
    span {
      color: #ffffff;
    }
  }
  .el-dialog__close {
    color: #ffffff;
  }
  .el-dialog__headerbtn {
    font-size: 18px;
    top: 14px;
  }
  .el-dialog {
    box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.24);
  }
}
</style>
