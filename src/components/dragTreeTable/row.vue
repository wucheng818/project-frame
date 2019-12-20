<template>
  <div
    class="tree-block"
    :draggable="$isHasBtnId('anthManage.editItem')&&(model.itemId>=1000)"
    @dragstart="dragstart($event)"
    @dragend="dragend($event)"
  >
    <div
      class="tree-row"
      :tree-id="model[id]"
      :tree-p-id="model[parentId]"
      v-show="model._visible!==false"
    >
      <column
        v-for="(subItem, subIndex) in columns"
        v-bind:class="'align-' + subItem.align"
        :field="subItem.field"
        :width="subItem.width"
        :flex="subItem.flex"
        :key="subIndex"
      >
        <span
          v-if="subItem.type === 'selection'"
          class="selection-box"
          @click="toggle"
        >
          <space :depth="depth" />
          <span
            v-if="model.lists && model.lists.length"
            class="zip-icon"
            :class="[model.open ? 'arrow-bottom' : 'arrow-right']"
          ></span>

          <span
            v-else
            class="zip-icon arrow-transparent"
          ></span>
          <img
            class="item-icon"
            :src="getItemIcon(model)"
            :class="{hidden:model.itemType===2}"
          >
          <span
            v-if="subItem.formatter"
            v-html="subItem.formatter(model)"
          ></span>
          <span
            class="overflow-tips"
            v-else
            v-html="model[subItem.field]"
            :title="model[subItem.field]"
          ></span>
        </span>
        <span v-else-if="subItem.type === 'action'">
          <span
            v-for="(acItem, acIndex) in subItem.actions"
            :key="acIndex"
          >
            <a
              class="action-item"
              type="text"
              size="small"
              :style="acItem.style"
              v-if="(model.itemType === 2&&acItem.tipsContent==='添加')||(acItem.tipsContent!=='添加'&&isRoot(model))"
            >&nbsp;</a>
            <a
              class="action-item"
              :class="{disabled:!acItem.abled||(isRoot(model)&&model.appId<1000)||(!isRoot(model)&&model.itemId<1000)}"
              type="text"
              size="small"
              @click.stop.prevent="acItem.abled&&acItem.onclick(model)"
              :style="acItem.style"
              v-else
            >
              <el-tooltip
                effect="light"
                class="item"
                :content="acItem.abled?acItem.tipsContent:`没有 ${acItem.tipsContent} 权限`"
                placement="top"
              >
                <i
                  :class="acItem.icon"
                  v-html="acItem.formatter(model)"
                ></i>
              </el-tooltip>
            </a>
          </span>
        </span>
        <span v-else-if="subItem.type === 'switch'&&!isRoot(model)">
          <el-switch
            v-model="model.enabled"
            :active-value="subItem.activeValue"
            :inactive-value="subItem.inactiveValue"
            :disabled="!$isHasBtnId('anthManage.editItem')||model[id]<1000||model.itemType===2"
            @change="subItem.onswitch(model,subItem.activeValue,subItem.inactiveValue)"
          ></el-switch>
        </span>
        <span v-else-if="!isRoot(model)">
          <span
            v-if="subItem.formatter"
            v-html="subItem.formatter(model)"
          ></span>
          <span
            v-else
            :title="model[subItem.field]"
          >{{ model[subItem.field] }}</span>
        </span>
      </column>
      <div
        class="hover-model"
        style="display: none"
      >
        <div class="hover-block prev-block">
          <i class="el-icon-caret-top"></i>
        </div>
        <div class="hover-block center-block">
          <i class="el-icon-caret-right"></i>
        </div>
        <div class="hover-block next-block">
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
    </div>
    <row
      v-show="model.open"
      :depth="depth * 1 + 1"
      :columns="columns"
      :model="item"
      v-for="(item, index) in model.lists"
      :key="index"
      id="itemId"
      parent-id="parentItemId"
      :default-icon="defaultIcon"
      :root-icon="rootIcon"
      :is-search="isSearch"
    ></row>
  </div>
</template>
<script>
import column from './column.vue';
import space from './space.vue';
export default {
  name: 'row',
  props: {
    model: {
      type: Object
    },
    columns: {
      type: Array
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    depth: {
      type: Number
    },
    parentId: {
      type: String
    },
    id: {
      type: String
    },
    defaultIcon: {
      type: String
    },
    rootIcon: {
      type: String
    }
  },
  data () {
    return {
      open: false
    };
  },
  watch: {},
  mounted () { },
  components: {
    column,
    space
  },
  computed: {
    isFolder () {
      return this.model.lists && this.model.lists.length;
    }
  },
  methods: {
    toggle () {
      if (this.isFolder) {
        this.model.open = !this.model.open;
      }
    },
    dragstart (e) {
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        // Firefox drag have a bug
        e.dataTransfer.setData('Text', this[this.id]);
      }
      window.dragId = Number(e.target.children[0].getAttribute('tree-id'));
      window.dragParentNode = e.target;
      e.target.style.opacity = 0.2;
    },
    dragend (e) {
      e.target.style.opacity = 1;
    },
    isRoot (model) {
      return model[this.id] === -1 && !model[this.parentId];
    },
    getItemIcon (model) {
      if (this.isRoot(model)) { // 根节点logo
        return this.rootIcon;
      }
      if (model.itemType === 1) { // 菜单
        return model.itemIcon || this.defaultIcon;
      } else {
        return '';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$bd_color: #ebeef5;

.tree-block {
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  border-right: 1px solid $bd_color;
  box-sizing: border-box;
}

.tree-row {
  position: relative;
  display: flex;
  padding: 0 10px;
  border-bottom: 1px solid #ebeef5;
  line-height: 48px;

  &:hover {
    background: #ecf5ff;
  }

  .align-left {
    text-align: left;
  }

  .align-right {
    text-align: right;
  }

  .align-center {
    text-align: center;
  }
}

.hover-model {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
}

.hover-block {
  display: flex;
  opacity: 0.1;
  transition: opacity 0.5s;
  justify-content: center;
  align-items: center;

  i {
    color: #fff;
  }
}

.prev-block {
  height: 25%;
  background: #a0c8f7;
}

.center-block {
  height: 50%;
  background: #a0c8f7;
}

.next-block {
  height: 25%;
  background: #a0c8f7;
}
.selection-box {
  // display: block;
  display: flex;
  align-items: center;
  cursor: pointer;
  .overflow-tips {
    display: inline-block;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.action-item {
  color: #409eff;
  cursor: pointer;
  display: inline-block;
  height: 48px;
  width: 17px;
  i {
    font-style: normal;
  }
  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.zip-icon {
  display: inline-block;
  width: 8px;
  height: 8px;
  vertical-align: middle;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAf0lEQVQ4T7XT0Q2AMAhF0dvNdALdSEdzBB3BDXQD85LGRNMCauS7nAKBxMdIhfwemIAtYpeAEeiANoLUgAGYI4gFqAMX8QAXiQBCNFDNRBVdIgpUkSfADjT3KqLACmg/XrWw5J+Li+VVYCZrMBbgJluA+tXA3Hv45ZgiR3i+OQBeSyYRPEyeUAAAAABJRU5ErkJggg==')
    no-repeat center;
  background-size: cover;
}

.item-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin: 0 5px;
  margin-top: -3px;
  border: 0 none;
  vertical-align: sub;
}
.hidden {
  opacity: 0;
}

.arrow-transparent {
  visibility: hidden;
}

.arrow-bottom {
  transform: rotate(90deg);
}

[draggable='true'] {
  -khtml-user-drag: element;
}
</style>
