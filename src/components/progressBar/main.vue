<template>
  <div class="dia-progress-bar">
    <span>阶段条:</span>
    <mti-svg-icon icon-class="icon_jieduan" class-name="icon-jieduan" :class="process >= 0 && process <= 25? 'icon-active-first' :'icon-unactive' "></mti-svg-icon>
    <mti-svg-icon icon-class="icon_jieduan" class-name="icon-jieduan" :class="process >25 && process <=50? 'icon-active-second':'icon-unactive' "></mti-svg-icon>
    <mti-svg-icon icon-class="icon_jieduan" class-name="icon-jieduan" :class="process >50 && process <=75 ? 'icon-active-third':'icon-unactive' "></mti-svg-icon>
    <mti-svg-icon icon-class="icon_jieduan" class-name="icon-jieduan" :class="process >75 && process <=100 ? 'icon-active-fourth':'icon-unactive' "></mti-svg-icon>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  mixins: [],
  props: {
    process: {
      type: Number,
      required: true
    }
  },
  data () {
    return {};
  },
  watch: {},
  computed: {},
  mounted () {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.dia-progress-bar {
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
  line-height: 32px;
  margin-bottom: 10px;
  .icon-jieduan {
    width: 58px;
    height: 17px;
  }

  .icon-unactive {
    fill: #dddddd;
  }

  .icon-active-first {
    fill: #6ab946;
  }

  .icon-active-second {
    fill: #0990ec;
  }

  .icon-active-third {
    fill: #0990ec;
  }

  .icon-active-fourth {
    fill: #0990ec;
  }
}
</style>
