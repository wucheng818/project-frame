/*
 * @Author: liuhuitao
 * @Date: 2019-11-21 09:51:24
 * @Last Modified by: niyining
 * @Last Modified time: 2019-12-17 17:54:38
 */
<template>
  <div :id="id" :style="{ height: height, width: width }"></div>
</template>

<script>
import * as mtiGis from '@/assets/gis/mti-gis-ol.esm';
import cover from '@/config/areaErase.json';

export default {
  name: '',
  props: {
    id: {
      type: String,
      default: 'mti-map'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  components: {},
  data () {
    return {
      mtiMap: null,
      baseLayer: null,
      draw: null
    };
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {
    this.initMap();
  },
  beforeDestroy () {
    this.mtiMap = null;
  },
  methods: {
    // 初始化地图
    initMap () {
      this.mtiMap = mtiGis.map(this.id, {
        center: [121.4824955836, 31.217032255],
        minZoom: 13, // 设置最大比例尺
        zoom: 14 // 设置初始显示的比例尺
      });
      this.baseLayer = mtiGis.bMap({ id: 'base-map' });
      mtiGis.addLayer(this.baseLayer, this.mtiMap);

      // const layer = mtiGis.webTile({
      //   className: 'base-map-panel',
      //   url: 'http://10.168.4.246:8080/shanghai/{z}/{x}/{y}.jpg',
      //   id: 'offline-layer2'
      // });
      // mtiGis.addLayer(layer, this.mtiMap);
      this.handleChangeTheme('light');
    },
    /**
     * 遮罩图层
     * @param fillColor 填充色
     * @param strokeColor 边框线颜色
     */
    addOutLineLayer (fillColor, strokeColor) {
      const layer = mtiGis.vectorLayer({
        id: 'coverLayer',
        updateWhileAnimating: true,
        updateWhileInteracting: true,
        style: {
          fill: { color: fillColor },
          stroke: {
            width: 2,
            color: strokeColor
          }
        }
      });
      mtiGis.addLayer(layer, this.mtiMap);
      mtiGis.addFeatures(mtiGis.geojson.read(cover), layer);
    },
    /**
     * 更改底图种类
     * @param theme 主题色 （待选项在文档中查看）
     */
    handleChangeTheme (theme) {
      !this.baseLayer || mtiGis.removeLayer(this.baseLayer, this.mtiMap);
      this.baseLayer = mtiGis.bMap({
        id: 'base-map',
        theme
      });
      mtiGis.addLayer(this.baseLayer, this.mtiMap);
    },
    /**
     * 底图范围选择
     * @param type  选择方式 Square,Circle,LineString,Polygon
     */
    handleRangeDraw (type) {
      this.draw = mtiGis.draw(this.mtiMap);
      this.draw.on('drawEnd', (res) => {
        this.draw.active(false);
        // const obj = res.result;
        // mtiGis.addFeature(obj.feature, this.baseLayer);
      });
      this.draw.active(true, type);
    }
  }
};
</script>
<style lang="scss">
.base-map-panel {
  /*该class定义为全局*/
  filter: invert(100%) sepia(120%) saturate(140%) hue-rotate(165deg)
    brightness(80%);
}
// // 测试用
// .ol-layer canvas {
//   filter: invert(100%) sepia(120%) saturate(140%) hue-rotate(165deg)
//     brightness(130%);
// }
</style>
