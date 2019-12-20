/*
 * @Author: liuhuitao
 * @Date: 2019-12-05 14:11:17
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-18 18:26:53
 */
<template>
  <div class="province-city">
    <el-select
      v-model="province"
      placeholder="请选择省份"
    >
      <el-option
        :key="''"
        :label="'全部'"
        :value="''"
      >
      </el-option>
      <el-option
        v-for="item in provinces"
        :key="item.cityCode"
        :label="item.cityName"
        :value="item.cityCode"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="city"
      :loading="loadingCity"
      placeholder="请选择市区"
    >
      <el-option
        :key="''"
        :label="'全部'"
        :value="''"
      >
      </el-option>
      <el-option
        v-for="item in cities"
        :key="item.cityCode"
        :label="item.cityName"
        :value="item.cityCode"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="county"
      :loading="loadingCounty"
      placeholder="请选区县"
    >
      <el-option
        :key="''"
        :label="'全部'"
        :value="''"
      >
      </el-option>
      <el-option
        v-for="item in countys"
        :key="item.cityCode"
        :label="item.cityName"
        :value="item.cityCode"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script type="text/javascript">
import { _getAreaCode } from '~api/app';
export default {
  name: 'provinceCity',
  props: {
    provinceCode: {
      type: String,
      default: ''
    },
    cityCode: {
      type: String,
      default: ''
    },
    countyCode: {
      type: String,
      default: ''
    }
  },
  created () { },
  computed: {
    province: {
      get () {
        this.getAreaCode('000000', this.getProvincesData);
        return this.provinceCode;
      },
      set (val) {
        this.city = '';
        this.county = '';
        this.getAreaCode(val, this.getCitysData);
        this.$emit('update:province-code', val);
      }
    },
    city: {
      get () {
        if (this.cityCode) {
          this.getAreaCode(this.provinceCode, this.getCitysData);
        }
        return this.cityCode;
      },
      set (val) {
        this.county = '';
        this.getAreaCode(val, this.getCountysData);
        this.$emit('update:city-code', val);
      }
    },
    county: {
      get () {
        if (this.countyCode) {
          this.getAreaCode(this.cityCode, this.getCountysData);
        }
        return this.countyCode;
      },
      set (val) {
        this.$emit('update:county-code', val);
      }
    }
  },
  mounted () {
  },
  data () {
    return {
      loadingCity: false,
      loadingCounty: false,
      provinces: [],
      cities: [],
      countys: []
    };
  },
  methods: {
    getAreaCode (cityCode, callback) {
      _getAreaCode({ cityCode }).then((res) => {
        if (res && res.data) {
          callback(res.data);
        }
      });
    },
    getProvincesData (proList) {
      this.provinces = proList;
    },
    getCitysData (cityList) {
      this.cities = cityList;
    },
    getCountysData (countyList) {
      this.countys = countyList;
    },
    resetProviceCity (province, city, county) {
      this.cities = [];
      this.countys = [];
      if (!province && !city && !county) {
        this.province = '';
        this.city = '';
        this.county = '';
        return;
      }
      if (province) {
        this.province = province;
      }
      if (city) {
        this.city = city;
      }
      if (county) {
        this.county = county;
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
.province-city {
  @include flex(row, nowrap);
}
</style>
