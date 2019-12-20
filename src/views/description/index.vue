/*
 * @Author: liuhuitao
 * @Date: 2019-12-20 10:40:24
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-20 10:42:53
 */
<template>
  <div style="color:#333;">
    <mti-input
      :type="'password'"
      style="width:20%"
    ></mti-input>
    <el-button
      v-waves
      type="primary"
    >
      水波纹
    </el-button>
    <br />
    <img
      :src="logoMenu"
      alt=""
    />
    <mti-svg-icon
      class-name="win-class"
      icon-class="windows"
    ></mti-svg-icon>
    <Map></Map>
    <p style="margin-top:20px;">{{ aa }}</p>
    <p>
      <!-- {{
        lodash.truncate('123123123123123123', {
          length: 12,
          omission: ' ...'
          // 'separator': /,? +/
        })
      }} -->
    </p>
    <p>活动计划需要富文本编辑器</p>
    <rich-editor
      :content="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    ></rich-editor>
  </div>
</template>
<script>
import allImages from '@/assets/images';
import Map from '@/components/map';
// const moment = require('moment');
import richEditor from '@/components/richEditor';
export default {
  name: 'orgManage',
  props: {},
  components: { Map, richEditor },
  data () {
    return {
      lodash: _,
      logoMenu: allImages['logo-menu'],
      aa: _.truncate('123123123123123123', {
        length: 12,
        omission: ' ...'
        // 'separator': /,? +/
      }),

      content:
        '<h4>基于 Quill、适用于 Vue 的富文本编辑器，支持服务端渲染和单页应用。</h4>',
      editorOption: {
        // some quill options
      }
    };
  },
  watch: {},
  computed: {},
  created () { },
  mounted () {
    // eslint-disable-next-line no-undef
    // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
  },
  beforeDestroy () { },
  methods: {
    onEditorBlur (quill) {
      console.log('editor blur!', quill);
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill);
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill);
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text);
      this.content = html;
    },
    modifyContent () {
      this.content = 'Quill editor component for Vue, support SPA and SSR.';
    }
  }
};
</script>
<style lang="scss" scoped>
.preview {
  min-height: 200px;
  width: 100%;
}
</style>
