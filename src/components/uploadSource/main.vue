/*
 * @Author: liuhuitao
 * @Date: 2019-12-18 10:07:59
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-19 14:47:01
 */
<template>
  <div class="upload-img-container">
    <el-upload
      ref="uploadTool"
      class="click-upload-panel"
      action=""
      :limit="1"
      :accept="accept"
      :show-file-list="false"
      :http-request="uploadImg"
      :style="{
                backgroundImage: `url(${
                  picUrl ? sourcePath+'/'+picUrl : ''
                })`
              }"
    >
      <!-- :headers="{ 'Content-Type': 'multipart/form-data' }" -->
      <div
        class="do-click"
        v-show="!picUrl"
      >
        <mti-svg-icon
          class-name="upload-defalut-img"
          icon-class="upload_defalut_img"
          v-waves
        ></mti-svg-icon>
        <p v-waves>点击上传</p>
      </div>
      <div
        class="delete-tips"
        v-if="picUrl !== ''"
        @click.stop=""
      >
        <i
          class="el-icon-delete"
          v-waves
          @click.stop="picUrl = ''"
        ></i>
      </div>
    </el-upload>
    <!-- <span class="img-size-tips">( 800x450 )</span> -->
  </div>
</template>

<script>
import { _uploadFile } from '@/api';
import { $file, $source } from '@/config';
export default {
  name: 'uploadSource',
  props: {
    pictureUrl: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: ''
    }
  },
  components: {},
  data () {
    return {
      sourcePath: $source
    };
  },
  watch: {},
  computed: {
    picUrl: {
      get () {
        return this.pictureUrl;
      },
      set (val) {
        this.$emit('update:picture-url', val);
      }
    }
  },
  created () { },
  mounted () { },
  destroyed () { },
  methods: {
    uploadImg (f) {
      this.$refs.uploadTool.clearFiles();
      // 上传至文件服务器拿到可以展示的路径（绝对路径）
      _uploadFile($file + '/uploadFilesToFast', f.file).then((res) => {
        if (res && res.data) {
          this.picUrl = res.data.path;
          this.$message.success('上传成功');
        } else {
          this.$message.error(res);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.upload-img-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  .click-upload-panel {
    width: 100px;
    height: 100px;
    border: 1px dashed #dcdfe6;
    text-align: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;

    .do-click {
      width: 65px;
      height: 60px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      display: flex;
      align-items: center;
      flex-flow: column wrap;
      justify-content: space-evenly;
      .upload-defalut-img {
        width: 29px;
        height: 25px;
      }
      p {
        color: #bbbbbb;
        line-height: 14px;
      }
    }
    .delete-tips {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      display: none;
      background-color: #0e2843e3;
      cursor: default;
      align-items: center;
      justify-content: center;
      .el-icon-delete {
        font-size: 20px;
        cursor: pointer;
      }
    }
    &:hover .delete-tips {
      transition: 0.3s display linear;
      display: flex;
    }
  }
  .img-size-tips {
    font-size: 14px;
    margin-left: 10px;
    height: 14px;
    line-height: 14px;
    color: rgba(170, 184, 211, 1);
  }
}
</style>
