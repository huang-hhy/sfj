<template>
  <div class="content">
    <main-header :navIndex="4" :nav-name="'客户案例'"/>
    <div class="banner" :style="bannerBg">
      <p class="title">客户案例</p>
      <p class="text">至今已有数十位客户选择联通智慧党建，1000多个党组织、3000多党活动</p>
    </div>
    <div class="main">
      <div class="item" v-for="(item, index) in list" :key="index">
        <img :src="item.img" />
        <p class="title">{{ item.title }}</p>
        <p class="time">{{ item.time }}</p>
      </div>
    </div>
    <main-footer />
  </div>
</template>

<script>
  import MainHeader from "../../../../components/pc/home/mainHeader";
  import MainFooter from "../../../../components/pc/home/mainFooter";

  export default {
    name: "case",
    components: {
      MainFooter,
      MainHeader
    },
    data() {
      return {
        bannerBg: {
          backgroundImage: "url(" + require('@/assets/image/main/home/case/pic.png') + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center 0"
        },
        list: [{
          img: require('@/assets/image/main/home/case/yiyuan.png'),
          title: '广州市第一人民医院',
          time: '2019年加入智慧党建'
        }, {
          img: require('@/assets/image/main/home/case/zhongxin.png'),
          title: '广州公共资源交易中心',
          time: '2019年加入智慧党建'
        }, {
          img: require('@/assets/image/main/home/case/fayuan.png'),
          title: '广州市互联网法院',
          time: '2019年加入智慧党建'
        }, {
          img: require('@/assets/image/main/home/case/yiyuan.png'),
          title: '广州市第一人民医院',
          time: '2019年加入智慧党建'
        }, {
          img: require('@/assets/image/main/home/case/zhongxin.png'),
          title: '广州公共资源交易中心',
          time: '2019年加入智慧党建'
        }, {
          img: require('@/assets/image/main/home/case/fayuan.png'),
          title: '广州市互联网法院',
          time: '2019年加入智慧党建'
        }, {
          img: require('@/assets/image/main/home/case/yiyuan.png'),
          title: '广州市第一人民医院',
          time: '2019年加入智慧党建'
        }, {
          img: require('@/assets/image/main/home/case/zhongxin.png'),
          title: '广州公共资源交易中心',
          time: '2019年加入智慧党建'
        }, {
          img: require('@/assets/image/main/home/case/fayuan.png'),
          title: '广州市互联网法院',
          time: '2019年加入智慧党建'
        }]
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    width: 1920px;
    margin: auto;

    .banner {
      width: 1920px;
      height: 350px;
      padding: 104px 361px;
      color: #fafafa;

      .title {
        font-size: 36px;
        font-weight: 500;
        line-height: 30px;
        margin-bottom: 20px;
      }

      .text {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        width: 410px;
      }
    }

    .main {
      margin: 60px 305px 130px;
      overflow: hidden;

      .item {
        width: 318px;
        float: left;
        margin: 0 59px 54px;
        height: 350px;
        line-height: 34px;
        font-weight: 400;
        text-align: center;

        img {
          width: 100%;
        }

        .title {
          color: #414141;
          font-size: 24px;
          margin: 37px 0 15px;
        }

        .time {
          font-size: 16px;
          color: #939393;
        }
      }
    }
  }
</style>
