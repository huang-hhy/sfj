<template>
  <div class="all-in-one">
    <div class="projectIcon">
      <img src="@/assets/pc/all-in-one/danghui.png">
    </div>
    <div class="title">广州市司法局党建平台</div>
    <div class="channels">
      <!-- <div v-for="(item, index) in list" :key="index" class="projectItem" @click="gotoChannel(item)">
        <img v-if="item.smallIcon" :src="attachUrl + item.smallIcon">
      </div> -->
      <div class="top">
        <div class="box" @click="gotoChannel({title:'党建要闻',id:'718506592990920704'})">
          <p>党建要闻</p>
          <img src="@/assets/pc/all-in-one/dangjainyaowen.png"/>
        </div>
        <div class="box" @click="gotoChannel({title:'百年党建',id:'815886725090902016'})">
           <p>百年党建</p>
           <img src="@/assets/pc/all-in-one/bainiandangjian.png"/>
        </div>
        <div class="box" @click="gotoChannel({title:'先锋谱',id:'718506799229042688'})">
           <p>先锋谱</p>
          <img src="@/assets/pc/all-in-one/xianfengpu.png"/>
        </div>
      </div>
      <div class="bottom">
        <div class="box" @click="gotoChannel({title:'学习教育',id:'821428720232300544'})">
           <p>学习教育</p>
          <img src="@/assets/pc/all-in-one/xuexijiaoyu.png"/>
        </div>
        <div class="box" @click="gotoChannel({title:'党务管理',id:'821429212668755968'})">
           <p>党务管理</p>
          <img src="@/assets/pc/all-in-one/dangwuguanli.png"/>
        </div>
        <div class="box" @click="gotoChannel({title:'活力党建',id:'808343776090128384'})">
           <p>活力党建</p>
          <img src="@/assets/pc/all-in-one/huolidangjiann.png"/>
        </div>
        <div class="box" @click="gotoChannel({title:'统计分析',id:''})">
           <p>统计分析</p>
          <img src="@/assets/pc/all-in-one/tongjifenxi.png"/>
        </div>
      </div>
    </div>
    <div class="img" @click="change">
      <img src="@/assets/pc/all-in-one/pic-niao.png"/>
    </div>
  </div>
</template>

<script>
  import {getAllInOne} from '@/api/pc'
  import screenfull from 'screenfull'
  import config from '@/config'
  import {encrypt} from "../../../libs/tools";

  export default {
    name: "index",
    head() {
      return {
        title: '广州司法局一体机'
      }
    },
    data() {
      return {
        list: [],
        isFull: false,
        attachUrl: config.attachUrl
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        getAllInOne().then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data.channels
            console.log(this.list)
          }
        })
      },
      change() {
        if (!screenfull.isEnabled) {
          this.$message.warning('该浏览器不支持全屏显示')
          return false
        } else {
          screenfull.toggle()
          this.isFull = !screenfull.isFullscreen
        }
      },
      // gotoChannel(){
      //   this.$router.push('/pc/all-in-one/vitalityParty')
      // }
      gotoChannel(item) {
        // console.log(item)
        if (item.title === '统计分析') {
          this.$router.push({
            path: '/pc/all-in-one/vitalityParty'
          })
        } else {
          this.$router.push({
            path: '/pc/all-in-one/channel',
            query: {
              name: item.title,
              id: encrypt(item.id)
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .all-in-one {
    height: 2211px;
    width: 3685px;
    background-image: url("~assets/pc/all-in-one/bg.png");
    background-size: 100% 100%;
    padding-top: 75px;
     margin: 0 auto;
    .projectIcon {
      /*margin: 75px auto 105px;*/
      cursor: pointer;
      text-align: center;

      img {
        width: 392px;
        height: 267px;
      }
    }

    .title {
      font-size: 150px;
      line-height: 150px;
      font-weight: bold;
      background: linear-gradient(to bottom, #ee9437 0%, #ee8d35 25%, #eb6c2d 75%, #ea5929 100%);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      margin: 105px 0 143px;
      text-align: center;
    }

    .channels {
      // margin-left: 520px;
      width: 80%;
      margin: 0 auto;
      overflow: hidden;
      .top{
        display: flex;
        justify-content: space-around;
        margin-bottom: 100px;
        .box{
          position: relative;
          cursor: pointer;
          p{
            position: absolute;
             font-size: 100px;
             font-weight: 700;
             color: white;
             top: 50%;
             left: 50%;
             letter-spacing :3px;
             transform: translate(-50%,-50%);

          }
        }
      }
      .bottom{
        display: flex;
        justify-content: space-around;
        margin-bottom: 100px;
        .box{
          position: relative;
          p{
            position: absolute;
             font-size: 100px;
             font-weight: 700;
             color: white;
             top: 50%;
             left: 20%;
             letter-spacing :3px;
             transform: translateY(-50%);
          }
        }
      }
      .projectItem {
        width: 831px;
        height: 470px;
        float: left;
        margin: 0 86px 84px 0;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .img{
      cursor: pointer;
    }
  }
</style>
