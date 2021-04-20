<template>
  <div class="content">
    <main-header :nav-index="3" :nav-name="'产品功能'"/>
    <div class="banner" :style="bannerBg">
      <p class="title">智慧党建功能</p>
      <p class="text">运用标准化“简化、统一、协同、优化”的原理打造智慧党建，满足各区域、各阶段的党建工作，助力党建工作管理简单化</p>
    </div>
    <div class="simple">
      <img src="@/assets/image/main/home/function/pic-1.png"/>
      <div class="simpleR">
        <p class="title">智慧新党建 助力党建简单化</p>
        <div class="tip">
          <div class="dot"></div>
          <div class="tip_text">数据清晰透明，方便用户进行管理，支持数据一键操作，省时省心</div>
        </div>
        <div class="tip">
          <div class="dot"/>
          <div class="tip_text">提供海量文章新闻、学习资料、党建知识、活动方案等，只需一键导入，让党建内容快速丰富起来</div>
        </div>
        <div class="tip">
          <div class="dot"/>
          <div class="tip_text">学习、考试、报名活动等操作自动发布信息、分享党建动态，让党员之间互动起来</div>
        </div>
      </div>
    </div>
    <div class="function">
      <div class="title">多个功能模块 覆盖党建全工作</div>
      <div class="iconList">
        <div class="iconItem" v-for="(item, index) in list" :key="index" @click="changeIconItem(index)">
          <div v-if="iconItem === index" :style="iconItemBg" class="icon">
            <img :src="item.iconItem"/>
          </div>
          <div v-else class="icon iconH">
            <img :src="item.icon"/>
          </div>
          <p class="title">{{ item.title }}</p>
        </div>
      </div>
      <div class="imgList">
        <div :style="imgBg" class="imgItem">
          <img :src="list[iconItem].img"/>
        </div>
        <p class="title">实时热点新闻发布，及时更新最新动态。根据文字的热度进行排行榜</p>
      </div>
    </div>
    <main-footer/>
  </div>
</template>

<script>
  import MainHeader from "../../../../components/pc/home/mainHeader";
  import MainFooter from "../../../../components/pc/home/mainFooter";

  export default {
    name: "function",
    components: {
      MainFooter,
      MainHeader
    },
    data() {
      return {
        bannerBg: {
          backgroundImage: "url(" + require('@/assets/image/main/home/function/pic.png') + ")",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 0"
        },
        iconItem: 0,
        iconItemBg: {
          backgroundImage: "url(" + require('assets/image/main/home/function/yuan.png') + ")",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 0"
        },
        imgBg: {
          backgroundImage: "url(" + require('assets/image/main/home/function/pic3.png') + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center 0"
        },
        list: [{
          icon: require('@/assets/image/main/home/function/wenzhangguanli-no.png'),
          iconItem: require('@/assets/image/main/home/function/wenzhangguanli.png'),
          title: '文章管理',
          img: require('@/assets/image/main/home/function/pic2.png')
        }, {
          icon: require('@/assets/image/main/home/function/zuzhishneghuo-no.png'),
          iconItem: require('@/assets/image/main/home/function/zuzhishenghuo.png'),
          title: '组织生活',
          img: require('@/assets/image/main/home/function/pic2.png')
        }, {
          icon: require('@/assets/image/main/home/function/dangfeijiaona-no.png'),
          iconItem: require('@/assets/image/main/home/function/dangfeijiaona.png'),
          title: '党费缴纳',
          img: require('@/assets/image/main/home/function/pic2.png')
        }, {
          icon: require('@/assets/image/main/home/function/tongzhigonggao-no.png'),
          iconItem: require('@/assets/image/main/home/function/tongzhigonggao.png'),
          title: '通知公告',
          img: require('@/assets/image/main/home/function/pic2.png')
        }, {
          icon: require('@/assets/image/main/home/function/yijianzhengji-no.png'),
          iconItem: require('@/assets/image/main/home/function/yijianzhengji.png'),
          title: '意见征集',
          img: require('@/assets/image/main/home/function/pic2.png')
        }, {
          icon: require('@/assets/image/main/home/function/dangfeijiaona-no.png'),
          iconItem: require('@/assets/image/main/home/function/dangfeijiaona.png'),
          title: '党费缴纳',
          img: require('@/assets/image/main/home/function/pic2.png')
        }, {
          icon: require('@/assets/image/main/home/function/kaosiguanli-no.png'),
          iconItem: require('@/assets/image/main/home/function/kaosiguanli.png'),
          title: '考试管理',
          img: require('@/assets/image/main/home/function/pic2.png')
        }, {
          icon: require('@/assets/image/main/home/function/dangyuangunli-no.png'),
          iconItem: require('@/assets/image/main/home/function/dangyuanguanli.png'),
          title: '党员管理',
          img: require('@/assets/image/main/home/function/pic2.png')
        }, {
          icon: require('@/assets/image/main/home/function/zaixainxuexi-no.png'),
          iconItem: require('@/assets/image/main/home/function/zaixinaxuexi.png'),
          title: '在线学习',
          img: require('@/assets/image/main/home/function/pic2.png')
        }]
      }
    },
    methods: {
      changeIconItem(index) {
        this.iconItem = index
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    width: 1920px;
    margin: auto;

    .banner {
      width: 100%;
      height: 350px;
      padding: 104px 361px 0;
      color: #fafafa;

      .title {
        font-size: 36px;
        font-weight: 500;
        line-height: 30px;
        margin-bottom: 20px;
      }

      .text {
        width: 432px;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
      }
    }

    .simple {
      overflow: hidden;
      margin: 120px 365px 152px;

      .simpleR {
        float: right;
        padding-top: 70px;

        .title {
          color: #d34d4d;
          font-size: 48px;
          font-weight: 500;
          line-height: 40px;
          margin-bottom: 50px;
        }

        .tip {
          color: #8f8f8f;
          font-weight: 400;
          font-size: 24px;
          line-height: 30px;
          margin-bottom: 30px;
          width: 594px;
          overflow: hidden;

          .dot {
            float: left;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #8f8f8f;
            margin-top: 12.5px;
          }

          .tip_text {
            float: left;
            width: 551px;
            margin-left: 35px;
          }
        }
      }
    }

    .function {
      margin: 152px 367px 124px;
      overflow: hidden;

      .title {
        color: #d34d4d;
        font-weight: 500;
        font-size: 48px;
        line-height: 40px;
        margin-bottom: 77px;
      }

      .iconList {
        width: 465px;
        float: left;
        overflow: hidden;

        .iconItem {
          width: 104px;
          height: 140px;
          float: left;
          margin: 0 50px 50px 0;
          text-align: center;
          cursor: pointer;

          .icon {
            width: 104px;
            height: 104px;

            img {
              width: 60px;
              height: 66px;
              margin-top: 19px;
            }
          }

          .iconH:hover {
            background-image: url("../../../../assets/image/main/home/function/yuan1.png");
            background-size: 100% 100%;
          }

          .title {
            font-size: 16px;
            color: #959595;
            font-weight: 400;
            line-height: 27px;
            margin-top: 10px;
          }
        }
      }

      .imgList {
        float: left;
        margin: 66px 0 0 100px;
        text-align: center;

        .imgItem {
          width: 600px;
          height: 350px;

          img {
            width: 428px;
            height: 272px;
            margin-top: 18px;
          }
        }

        .title {
          font-size: 18px;
          font-weight: 400;
          line-height: 30px;
          color: #959595;
          margin-top: 20px;
        }
      }
    }
  }
</style>
