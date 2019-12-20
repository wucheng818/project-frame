/*
 * @Author: 武澄
 * @Date: 2019-12-20 14:12:41
 * @Last Modified by: 武澄
 * @Last Modified time: 2019-12-20 16:09:44
 */
<template>
    <div class="title-content">
      <div class="left">
        <img class="clock" :src="require('@/assets/images/home/icon_top_time.png')" alt="">
        <div>
          系统时间：
          <div class="time">
            <span>{{nyr.substr(0, 10)}}</span>
            <span>{{nyr.substr(10)}}</span>
            <span>{{week}}</span>
          </div>
        </div>
      </div>
      <div class="middle">
        <img class="clock" :src="require('@/assets/images/home/jinghu3.png')" alt="">
        <span>昆明市公安局重大活动安全保障系统</span>
      </div>
      <div class="right">
        <div class="right-wrap">
          <div class="weather">
            <img :src="require('@/assets/images/home/icon_top_weather.png')" alt="">
            <span>晴</span>
            <span>15~20℃</span>
            <span>东南风3~4级</span>
          </div>
          <div class="line"></div>
          <div class="message">
            <img :src="require('@/assets/images/home/icon_top_news.png')" alt="">
          </div>
          <div class="line"></div>
          <div class="police">
             <img :src="require('@/assets/images/home/police_icon.png')" alt="">
             <span>王警官</span>
          </div>
        </div>
        <div class="handle">
          <span>退出</span>
        </div>
      </div>
    </div>
</template>

<script>
import moment from '@/utils/moment';
export default {
  components: {

  },
  props: {

  },
  data () {
    return {
      week: moment().format('dddd'),
      nyr: moment().format('YYYY-MM-DD HH:mm:ss')
    };
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  watch: {

  },
  methods: {

  }
};
</script>

<style scoped lang="scss">
.title-content{
  position: fixed;
  top:0;
  width: 100%;
  height: 186px;
  background-image: url('~@/assets/images/home/top_bg.png');
  background-repeat: no-repeat no-repeat;
  background-size: 100% 100%;
  padding:0 20px;
  box-sizing: border-box;
  @include flex(row);
  justify-content: space-between;
  font-size:18px;
  font-family:Microsoft YaHei;
  color: #ffffff;;
  text-shadow:0 0 6px #fff, 0 0 8px #228DFF, 0 0 10px #228DFF;
  letter-spacing: 2px;

  .middle{
    flex: 1;
    @include flex(row);
    justify-content: center;
    align-items: center;
    height: 94px;

    img{
      width: 46px;
      height: 48px;
      margin-right: 25px;
    }
    span{
      font-size:32px;
      font-family:FZZhengHeiS-B-GB;
      font-weight:400;
      color:rgba(255,255,255,1);
      text-shadow: none;
    }
  }

  .left, .right{
    height: 54px;
    @include flex(row);
    align-items: center;
  }

  .left{

    &>div{
      @include flex(row);
    }
    .clock{
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .time{
      width: 342px;
      @include flex(row);
      justify-content: space-between;
    }
  }
  .right{
    .right-wrap{
      @include flex(row);
      justify-content: space-between;
      align-items: center;
      margin-right: 15px;
      img{
        width: 35px;
        height: 35px;
      }
      .weather{
        @include flex(row);
        justify-content: space-between;
        align-items: center;
        span{
          margin-right: 10px;
        }
      }
      .line{
        width:1px;
        height:14px;
        border-left: 1px solid #fff;
      }
      .police{
        @include flex(row);
        align-items: center;
      }
    }
    .handle{
      color: #A7ACBA;
      text-shadow: none;
    }
  }
}
</style>
