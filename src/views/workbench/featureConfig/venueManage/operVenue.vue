/*
 * @Author: liuhuitao
 * @Date: 2019-12-03 19:16:52
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-19 18:46:42
 */
<template>
  <el-container id="oper-venue-container">
    <el-aside width="34%">
      <el-form
        :model="operForm.paramsData"
        :rules="operForm.formRelyData.rules"
        ref="operVenueForm"
        label-width="70px"
        class="oper-venue-form"
      >
        <el-form-item
          label="场馆名称"
          prop="buildingName"
        >
          <el-input
            v-model="operForm.paramsData.buildingName"
            maxlength="30"
            placeholder="请输入场馆名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="地址"
          prop="buildingAddress"
        >
          <el-form-item
            prop="province"
            style="display:none;"
          ></el-form-item>
          <el-form-item
            prop="city"
            style="display:none;"
          ></el-form-item>
          <el-form-item
            prop="county"
            style="display:none;"
          ></el-form-item>
          <select-province-city
            ref="selectProvCity"
            :province-code.sync="operForm.paramsData.province"
            :city-code.sync="operForm.paramsData.city"
            :county-code.sync="operForm.paramsData.county"
          ></select-province-city>
          <el-input
            v-model="operForm.paramsData.buildingAddress"
            maxlength="40"
            placeholder="请输入详细地址"
            style="margin-top:2px;"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="坐标"
          prop="longitude"
        >
          <el-input
            v-model="operForm.paramsData.longitude"
            placeholder=""
            maxlength="15"
            type="number"
            style="width:49%;margin-right:1%;"
          ></el-input>
          <el-form-item
            prop="latitude"
            style="display:none;"
          ></el-form-item>
          <el-input
            v-model="operForm.paramsData.latitude"
            placeholder=""
            maxlength="15"
            type="number"
            style="width:50%;"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="图片上传"
          prop="buildingPicUrl"
        >
          <upload-source
            accept="image/png, image/jpeg, image/svg+xml"
            :picture-url.sync="operForm.paramsData.buildingPicUrl"
          ></upload-source>
        </el-form-item>
        <el-form-item
          label="简要介绍"
          prop="remark"
        >
          <el-input
            type="textarea"
            rows="4"
            maxlength="200"
            show-word-limit
            resize="none"
            placeholder="请输入场馆简介"
            v-model="operForm.paramsData.remark"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="3D链接"
          prop="thridDurl"
        >
          <el-input
            v-model="operForm.paramsData.thridDurl"
            maxlength="200"
            placeholder="请输入3D链接"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="AR链接"
          prop="arUrl"
        >
          <el-input
            v-model="operForm.paramsData.arUrl"
            maxlength="200"
            placeholder="请输入AR链接"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="buildingItem"
          style="display:none;"
        ></el-form-item>
        <h2 style="height: 30px;line-height: 30px;font-size:14px;color:#333;">
          二级场馆
        </h2>
        <el-table
          :data="filterVenue(operForm.paramsData.buildingItem)"
          class="second-venue-tb"
          style="width: 100%"
          border
          stripe
          tooltip-effect="light"
          highlight-current-row
        >
          <el-table-column
            label="二级场馆编号"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.serialNumber"
                placeholder="请输入场馆编号"
              ></el-input>
              <span class="second-info sing-elli">{{ scope.row.serialNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="二级场馆名称"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.buildingItemName"
                placeholder="请输入场馆名称"
              ></el-input>
              <span class="second-info sing-elli">
                {{ scope.row.buildingItemName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="55"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click.native.stop="handleDelete(scope.$index, scope.row)"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="add-post-btn-panel">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd"
          >新增一行</el-button>
        </div>
      </el-form>
      <div class="btn-group">
        <el-button
          type="primary"
          @click="doSave('operVenueForm')"
        >保存</el-button>
        <el-button
          v-if="dialogType === '新增'"
          type="text"
          @click="resetForm('operVenueForm')"
        >重置</el-button>
      </div>
    </el-aside>
    <el-main class="map-panel">
      <Map :height="'100%'"></Map>
    </el-main>
  </el-container>
</template>

<script>
import Map from '@/components/map';
import selectProvinceCity from '@/components/selectProvinceCity';
import { _addVenue, _editVenue } from '~api/workbench/featureConfig';
import uploadSource from '@/components/uploadSource';

export default {
  name: 'operVenve',
  props: {
    dialogType: {
      type: String,
      default: '新增'
    },
    rowData: {
      type: Object,
      default: () => { }
    }
  },
  components: { Map, selectProvinceCity, uploadSource },
  data () {
    return {
      operForm: {
        paramsData: {
          buildingId: '',
          buildingName: '',
          longitude: '',
          latitude: '',
          buildingAddress: '',
          buildingPicUrl: '',
          remark: '',
          thridDurl: '',
          arUrl: '',
          buildingStatus: '',
          province: '',
          city: '',
          county: '',
          buildingItem: []
        },
        formRelyData: {
          rules: {}
        }
      }
    };
  },
  watch: {},
  computed: {},
  created () {
    if (this.dialogType === '编辑') {
      for (let key in this.operForm.paramsData) {
        if (key !== 'buildingItem') {
          this.operForm.paramsData[key] = this.rowData[key];
        }
      }
      for (let itemSecVenue of this.rowData.buildingItemList) {
        itemSecVenue.isRemove = 0;
        this.operForm.paramsData.buildingItem.push(itemSecVenue);
      }
    }
  },
  mounted () { },
  destroyed () { },
  methods: {
    doSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogType === '编辑') {
            this.editVenue();
          } else {
            this.addVenue();
          }
        } else {
          this.$message.error('场馆数据录入有误！');
          return false;
        }
      });
    },
    addVenue () {
      _addVenue({
        ...this.operForm.paramsData
      }).then((res) => {
        if (res.data === 1) {
          this.$message.success('新增成功');
          this.operSuccess();
        } else {
          this.$message.success(res.message);
        }
      });
    },
    editVenue () {
      _editVenue({
        ...this.operForm.paramsData
      }).then((res) => {
        if (res.data) {
          this.$message.success('编辑成功');
          this.operSuccess();
        } else {
          this.$message.success(res.message);
        }
      });
    },
    operSuccess () {
      let timer = setTimeout(() => {
        this.$emit('oper-success');
        if (timer) {
          clearTimeout(timer);
        }
      }, 1000);
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
      // this.$refs.selectProvCity.resetProviceCity();
    },
    handleAdd () {
      this.operForm.paramsData.buildingItem.push({
        buildingItemId: '',
        buildingItemName: '',
        serialNumber: '',
        isRemove: 0
      });
    },
    handleDelete (index, row) {
      if (row.buildingItemId !== '') {
        this.$set(this.operForm.paramsData.buildingItem[index], 'isRemove', 1);
        let arr = this.operForm.paramsData.buildingItem;
        // 为了刷新表格
        this.operForm.paramsData.buildingItem = [];
        this.operForm.paramsData.buildingItem = arr;
      } else {
        this.operForm.paramsData.buildingItem.splice(index, 1);
      }
    },
    filterVenue (secVenueList) {
      let arr = secVenueList.filter((item) => {
        return item.isRemove === 0;
      });
      return arr;
    }
  }
};
</script>
<style lang="scss" scoped>
#oper-venue-container {
  .oper-venue-form {
    height: 50vh;
    overflow-y: auto;
    padding-right: 10px;
  }

  .el-form-item__label:before {
    display: none;
  }
  .el-form-item__label {
    text-align-last: justify;
    text-align: justify;
    text-justify: distribute-all-lines; //兼容Ie
  }
  .btn-group {
    margin-top: 20px;
    @include flex(row);
    justify-content: space-around;
    button {
      width: 110px;
    }
  }

  .map-panel {
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
  }

  // 录入二级场馆表格
  .second-venue-tb {
    thead {
      .cell {
        text-align: center;
      }
    }
    tbody {
      td {
        padding: 0;
      }
      .cell {
        padding-left: 0;
        padding-right: 0;
        display: flex;
        align-items: center;
      }
      .el-input__inner {
        border-radius: 0;
      }
      tr td:last-child {
        display: flex;
        justify-content: center;
        height: 41px;
      }
    }
    margin: 10px 0 1px;
    .el-input {
      display: none;
    }
    .current-row .el-input {
      display: block;
    }
    .current-row .el-input + span {
      display: none;
    }
    .second-info {
      display: inline-block;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding: 0 8px;
      box-sizing: border-box;
    }
  }
  .add-post-btn-panel {
    border-bottom: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin-bottom: 2px;
  }
}
</style>
