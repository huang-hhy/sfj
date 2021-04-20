<template>
  <div>
    <main-header :navIndex="5" :nav-name="'关于我们'" />
    <div class="content">
      <div class="banner" :style="bannerBg">
        <div class="banner_text">
          <p class="title">
            智慧党建
          </p>
          <p class="text">联通智慧党建是一个在互联网上为党和各基层党组织和党员提供党建工作管理、监督、学习和交流的平台</p>
        </div>
      </div>
      <div class="main">
        <div class="aboutUs">
          <div class="aboutUsL" :style="aboutUsL"></div>
          <div class="aboutUsR">
            <p class="title">关于我们</p>
            <p class="content">2017年，国家标准党委组把标准化工作与机关党建工作相结合，运用标准化“简化、统一、协同、优化”的原理，编制了《国家标准化管理委员会机关全面从严治党标准体系》着力提升机关党建科学化水平，切实落实全面从严治党要求。我们平台内的党建工作流程制度严格按照该书的要求制作，符合党的政策精神。</p>
            <p class="tip">大事记</p>
            <div v-for="(item, index) in tipList" :key="index" class="tipItem">
              <img src="@/assets/image/main/home/aboutUs/yuan.png" />
              <span class="time">{{ item.time }}</span>
              <span class="content">{{ item.content }}</span>
            </div>
          </div>
        </div>
        <div class="contactUs">
          <div class="contactUsL">
            <p class="title">联系我们</p>
            <el-row>
              <el-col :span="8">咨询热线</el-col>
              <el-col :span="16">202-4465 4465</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">邮箱</el-col>
              <el-col :span="16">dangjian@123.com</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">地址</el-col>
              <el-col :span="16">广州国际生物岛广州生命科学创新 中心A塔23楼</el-col>
            </el-row>
          </div>
          <div class="contactUsR">
            <client-only>
              <baidu-map :points="points" v-if="points.length" />
            </client-only>
          </div>
        </div>
      </div>
    </div>
    <main-footer />
  </div>
</template>

<script>
  import MainHeader from "../../../../components/pc/home/mainHeader";
  import BaiduMap from "@/components/pc/map/baidu-map.vue";
  import MainFooter from "../../../../components/pc/home/mainFooter";
  import {getHomeData} from "@/api/pc";

  export default {
    name: "aboutUs",
    components: {
      MainFooter,
      BaiduMap,
      MainHeader
    },
    data() {
      return {
        bannerBg: {
          backgroundImage: "url(" + require('@/assets/image/main/home/aboutUs/pic.png') + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center 0"
        },
        aboutUsL: {
          backgroundImage: "url(" + require('@/assets/image/main/home/aboutUs/jianzhu.png') + ')',
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center 0"
        },
        tipList: [{
          img: '@/assets/image/main/home/aboutUs/yuan.png',
          time: '2019',
          content: '4月 联通智慧党建正式上线'
        }, {
          img: '@/assets/image/main/home/aboutUs/yuan.png',
          time: '2019',
          content: '4月 联通智慧党建正式上线'
        }, {
          img: '@/assets/image/main/home/aboutUs/yuan.png',
          time: '2019',
          content: '4月 联通智慧党建正式上线'
        }, {
          img: '@/assets/image/main/home/aboutUs/yuan.png',
          time: '2019',
          content: '4月 联通智慧党建正式上线'
        }, {
          img: '@/assets/image/main/home/aboutUs/yuan.png',
          time: '2019',
          content: '4月 联通智慧党建正式上线'
        }, {
          img: '@/assets/image/main/home/aboutUs/yuan.png',
          time: '2019',
          content: '4月 联通智慧党建正式上线'
        }],
        points: []
      }
    },
    mounted() {
      getHomeData().then(res => {
        if (res.code * 1 === 0) {
          const temp = res.data.orgs
          temp.forEach(item => {
            this.points.push({
              id: item.id,
              lng: item.lng * 1,
              lat: item.lat * 1,
              address: item.address
            })
          })
        }
      })
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
      padding: 104px 0 0 361px;
      .banner_text {
        width: 433px;
        color: #fafafa;
        .title {
          font-size: 36px;
          margin-bottom: 30px;
          line-height: 30px;
        }

        .text {
          font-size: 16px;
          line-height: 24px;
        }
      }
    }

    .main {
      .aboutUs {
        overflow: hidden;
        margin: 60px 360px;
        .aboutUsL {
          float: left;
          width: 468px;
          height: 688px;
        }

        .aboutUsR {
          float: left;
          margin-left: 92px;

          .title {
            color: #d7000f;
            font-size: 36px;
            line-height: 36px;
            font-weight: 500;
          }
          .content {
            width: 632px;
            font-size: 24px;
            line-height: 34px;
            color: #414141;
            margin: 22px 0 27px;
          }

          .tip {
            font-size: 24px;
            font-weight: 500;
            color: #d7000f;
            line-height: 36px;
          }

          .tipItem {
            margin: 22px 0;

            img {
              width: 29px;
              height: 29px;
              line-height: 36px;
              margin-top: -20px;
            }

            .time {
              color: #4a4a4a;
              font-size: 36px;
              line-height: 36px;
              font-weight: 500;
              margin: 0 44px 0 21px;
            }

            .content {
              color: #9e9e9e;
              font-size: 24px;
              font-weight: 400;
              line-height: 34px;
            }
          }
        }
      }

      .contactUs {
        margin: 70px 360px 146px;
        overflow: hidden;
        .contactUsL {
          float: left;
          width: 488px;
          margin-right: 83px;

          .title {
            color: #d7000f;
            font-size: 36px;
            font-weight: 500;
            line-height: 36px;
            margin-bottom: 54px;
          }

          .el-row {
            margin: 30px 0;
            color: #414141;
            font-size: 24px;
            font-weight: 500;
            line-height: 30px;
          }
        }

        .contactUsR {
          float: left;
          width: 627px;
          height: 393px;
        }
      }
    }
  }
</style>
