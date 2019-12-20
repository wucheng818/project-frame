<template>
  <div class="drag-tree-table">
    <div class="drag-tree-table-header">
      <column
        v-for="(item, index) in data.columns"
        :width="item.width"
        :flex="item.flex"
        :key="index"
      >{{ item.title }}</column>
    </div>
    <div
      class="drag-tree-table-body"
      @dragover="draging"
      @dragend="drop"
      :class="isDraing ? 'is-draging' : ''"
    >
      <row
        :depth="0"
        :columns="data.columns"
        :model="item"
        v-for="(item, index) in treeDataLists"
        :key="index"
        id="itemId"
        parent-id="parentItemId"
        v-bind="$attrs"
      ></row>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import row from './row.vue';
import column from './column.vue';
import { _deepClone } from '@/utils/mtiUtils';
// import space from './space.vue';
document.body.ondrop = function (event) {
  event.preventDefault();
  event.stopPropagation();
};
export default {
  name: 'drag-tree-table',
  components: {
    row,
    column
    // space
  },
  props: {
    data: {
      type: Object
    },
    onDrag: {
      type: Function
    },
    parentId: {
      type: String,
      default: 'parentId'
    },
    id: {
      type: String,
      default: 'id'
    },
    order: {
      type: String,
      default: 'order'
    },
    search: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      treeDataLists: [],
      dragX: 0,
      dragY: 0,
      dragId: '',
      targetId: '',
      whereInsert: '',
      isDraing: false
    };
  },
  created () { },
  watch: {
    'data.lists' (val) {
      this.treeDataLists = val;
    }
  },
  methods: {
    // 触发过滤
    filter (val) {
      this.handelFilter(val, this.data.lists);
      this.treeDataLists = _deepClone(this.data.lists, true);// 重新添加监视器
    },
    // 过滤处理函数
    handelFilter (val, lists) {
      var flag = false;

      lists.forEach((father) => {
        this.$emit('filter-node-method', val, father);

        const childrenList = father.lists ? father.lists : [];

        if (father._visible) {
          flag = true;
          if (childrenList.length) {
            this.handelFilter(val, childrenList);
          }
        } else {
          if (childrenList.length) {
            father._visible = this.handelFilter(val, childrenList);
            if (father._visible) { // 当父节点被子节点置为true时，更新flag
              flag = true;
            }
          }
        }
      });

      return flag;
    },
    filterWithVal (val, item) {
      if (item.itemId === -1) { // 根节点
        item._visible = true;
        return;
      };
      const lable = 'itemName';
      item._visible = item[lable].includes(val);
    },
    getElementLeft (element) {
      let actualLeft = element.offsetLeft;
      let current = element.offsetParent;
      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
      return actualLeft;
    },
    getElementTop (element) {
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return actualTop;
    },
    draging (e) {
      this.isDraing = true;
      if (e.pageX === this.dragX && e.pageY === this.dragY) return;
      this.dragX = e.pageX;
      this.dragY = e.pageY;
      this.insertFilter(e.pageX, e.pageY);
      if (e.clientY < 100) {
        window.scrollTo(0, scrollY - 6);
      } else if (e.clientY > document.body.clientHeight - 160) {
        window.scrollTo(0, scrollY + 6);
      }
    },
    drop (event) {
      this.clearHoverStatus();
      this.resetTreeData();
      this.isDraing = false;
    },
    insertFilter (x, y) {
      let rows = document.querySelectorAll('.tree-row');
      this.targetId = undefined;
      const dragOriginElementTop = this.getElementTop(dragParentNode);
      const dragOriginElementLeft = this.getElementLeft(dragParentNode);
      const dragW = dragOriginElementLeft + dragParentNode.clientWidth;
      const dragH = dragOriginElementTop + dragParentNode.clientHeight;
      if (
        x >= dragOriginElementLeft &&
        x <= dragW &&
        y >= dragOriginElementTop &&
        y <= dragH
      ) {
        // 当前正在拖拽原始块不允许插入
        return;
      }
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rx = this.getElementLeft(row);
        const ry = this.getElementTop(row);
        const rw = row.clientWidth;
        const rh = row.clientHeight;
        if (x > rx && x < rx + rw && y > ry && y < ry + rh) {
          const diffY = y - ry;
          const hoverBlock = row.children[row.children.length - 1];
          hoverBlock.style.display = 'block';
          const targetId = Number(row.getAttribute('tree-id'));
          this.targetId = targetId;
          let whereInsert = '';
          let rowHeight = row.offsetHeight;
          if (diffY / rowHeight > 3 / 4) {
            if (hoverBlock.children[2].style.opacity !== '0.5') {
              this.clearHoverStatus();
              hoverBlock.children[2].style.opacity = 0.5;
            }
            whereInsert = 'bottom';
          } else if (diffY / rowHeight > 1 / 4) {
            if (hoverBlock.children[1].style.opacity !== '0.5') {
              this.clearHoverStatus();
              hoverBlock.children[1].style.opacity = 0.5;
            }
            whereInsert = 'center';
          } else {
            if (hoverBlock.children[0].style.opacity !== '0.5') {
              this.clearHoverStatus();
              hoverBlock.children[0].style.opacity = 0.5;
            }
            whereInsert = 'top';
          }
          this.whereInsert = whereInsert;
        }
      }
    },
    clearHoverStatus () {
      let rows = document.querySelectorAll('.tree-row');
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const hoverBlock = row.children[row.children.length - 1];
        hoverBlock.style.display = 'none';
        hoverBlock.children[0].style.opacity = 0.1;
        hoverBlock.children[1].style.opacity = 0.1;
        hoverBlock.children[2].style.opacity = 0.1;
      }
    },
    resetTreeData () {
      if (this.targetId === undefined) return;
      // if (this.targetId === -1) return;// 禁止拖入进节点

      const newList = [];
      const curList = this.data.lists;
      const _this = this;
      let flagDropAllow = true;
      function pushData (curList, needPushList) {
        for (let i = 0; i < curList.length; i++) {
          const item = curList[i];
          let obj = _this.deepClone(item);
          obj.lists = [];
          if (_this.targetId === item[_this.id]) { // 目标行
            const curDragItem = _this.getCurDragItem( // 被操作行
              _this.data.lists,
              window.dragId
            );
            // 拖拽约束条件
            flagDropAllow = _this.dropAllow(_this.whereInsert, curDragItem, item);
            if (!flagDropAllow) return;

            if (_this.whereInsert === 'top') {
              curDragItem[_this.parentId] = item[_this.parentId];
              needPushList.push(curDragItem);
              needPushList.push(obj);
            } else if (_this.whereInsert === 'center') {
              curDragItem[_this.parentId] = item[_this.id];
              obj.lists.push(curDragItem);
              needPushList.push(obj);
            } else {
              curDragItem[_this.parentId] = item[_this.parentId];
              needPushList.push(obj);
              needPushList.push(curDragItem);
            }
          } else {
            if (window.dragId !== item[_this.id]) { // 不是当前被操作行不需处理
              needPushList.push(obj);
            }
          }
          if (item.lists && item.lists.length) {
            pushData(item.lists, obj.lists);
          }
        }
      }
      pushData(curList, newList);
      if (!flagDropAllow) return;
      this.resetOrder(newList);
      this.onDrag(newList);
    },
    dropAllow (whereInsert, curItem, dropItem) {
      if (whereInsert === 'center') { // 放入时
        if (dropItem.itemType === 2) { // 按钮不能更改父级
          return false;
        } else if (dropItem.lists && dropItem.lists.length) { // 儿子类型要匹配
          return curItem.itemType === dropItem.lists[0].itemType;
        } else {
          return true;
        }
      } else { // 不放入时，同级类型要匹配
        return curItem.itemType === dropItem.itemType;
      }
    },
    resetOrder (list) {
      for (let i = 0; i < list.length; i++) {
        list[i][this.order] = i + 1;
        if (list[i].lists && list[i].lists.length) {
          this.resetOrder(list[i].lists);
        }
      }
    },
    deepClone (aObject) {
      if (!aObject) {
        return aObject;
      }
      let bObject, v, k;
      bObject = Array.isArray(aObject) ? [] : {};
      for (k in aObject) {
        v = aObject[k];
        bObject[k] = typeof v === 'object' ? this.deepClone(v) : v;
      }
      return bObject;
    },
    getCurDragItem (lists, id) {
      let curItem = null;
      let _this = this;
      function getchild (curList) {
        for (let i = 0; i < curList.length; i++) {
          let item = curList[i];
          if (item[_this.id] === id) {
            curItem = JSON.parse(JSON.stringify(item));
            break;
          } else if (item.lists && item.lists.length) {
            getchild(item.lists);
          }
        }
      }
      getchild(lists);
      return curItem;
    }
  }
};
</script>

<style lang="scss" scoped>
.drag-tree-table {
  color: #606266;
  font-size: 12px;
  height: calc(100% - 100px);
}

$head_h: 48px;
.drag-tree-table-header {
  display: flex;
  padding: 0 10px;
  background: #fff;
  height: $head_h;
  line-height: $head_h;
  box-sizing: border-box;
  font-weight: 600;
  border: 1px solid #ebeef5;
  color: #333333;
  background-color: #f8f8f8;
}
.drag-tree-table-body {
  border-left: 1px solid #ebeef5;
  height: calc(100% - 48px);
  overflow-y: auto;
}
.tree-icon-hidden {
  visibility: hidden;
}
.is-draging .tree-row:hover {
  background: transparent !important;
}
</style>
