<template>
  <div>
    <main-header :nav-index="2" :nav-name="'产品特点'"/>
    <div class="content">
      <div class="banner" :style="bannerBg">
        <p class="title">智慧党建特色</p>
        <p class="text">运用标准化”简化、统一、协同、优化“的原理打造智慧党建，满足各区域、各阶段的党建工作，助力党建工作管理简单化</p>
      </div>
      <div class="main">
        <div class="itemR">
          <img src="@/assets/image/main/home/characteristics/pic1.png" />
          <div class="container">
            <div class="title">
              <img src="@/assets/image/main/1.png" />
              <span class="text">高效</span>
            </div>
            <p class="tip">数字化党务</p>
            <p class="content">实现整体数据存储在数据库内，面向全组织，使数据可实现并发的共享，即多个用户可同事存取数据，且整体式的结构化，库内数据间有联系</p>
          </div>
        </div>
        <div class="itemL">
          <div class="container">
            <div class="title">
              <img src="@/assets/image/main/2.png" />
              <span class="text">个性化</span>
            </div>
            <p class="tip">模块定制</p>
            <p class="content">每个功能都是相互独立的模块，每个模块皆既可以单独使用，也可以进行组合使用，还可以随时根据客户的需求定制开发专用模块</p>
          </div>
          <img src="@/assets/image/main/home/characteristics/pic2.png" />
        </div>
        <div class="itemR">
          <img src="@/assets/image/main/home/characteristics/pic3.png" />
          <div class="container">
            <div class="title">
              <img src="@/assets/image/main/3.png" />
              <span class="text">专业</span>
            </div>
            <p class="tip">标准化智慧党建</p>
            <p class="content">实现整体数据存储在数据库内，面向全组织，使数据可实现并发的共享，即多个用户可同时存取数据，且整体式的结构化，库内数据间有联系</p>
          </div>
        </div>
        <div class="itemL">
          <img src="@/assets/image/main/home/characteristics/pic4.png" />
          <div class="container">
            <div class="title">
              <img src="@/assets/image/main/4.png" />
              <span class="text">省心</span>
            </div>
            <p class="tip">系统维护</p>
            <p class="content">每个功能都是相互独立的模块，每个模块皆既可以单独使用，也可以进行组合使用，还可以随时根据客户的需求定制开发专用模块</p>
          </div>
        </div>
        <div class="itemR">
          <img src="@/assets/image/main/home/characteristics/pic5.png" />
          <div class="container">
            <div class="title">
              <img src="@/assets/image/main/5.png" style="margin-left: 180px" />
              <span class="text">随时随地</span>
            </div>
            <p class="tip">覆盖多个终端</p>
            <p class="content">手机版、微信版、网页版，智慧党建覆盖多个终端，让用户可以随时随地通过多种方式进行党建活动，让党建工作真正“无处不在”</p>
          </div>
        </div>
      </div>
    </div>
    <main-footer />
  </div>
</template>

<script>
  import MainHeader from "../../../../components/pc/home/mainHeader";
  import MainFooter from "../../../../components/pc/home/mainFooter";

  export default {
    name: "characteristics",
    components: {
      MainFooter,
      MainHeader
    },
    data() {
      return {
        bannerBg: {
          backgroundImage: "url(" + require('@/assets/image/main/home/characteristics/pic.png') + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center 0"
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    .banner {
      width: 1920px;
      height: 350px;
      color: #ffffff;
      padding: 104px 0 0 361px;

      .title {
        font-size: 36px;
        line-height: 30px;
        font-weight: 500;
      }

      .text {
        margin-top: 20px;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
        width: 432px;
      }
    }

    .main {
      margin: 98px 360px;

      .itemR {
        overflow: hidden;
        margin-bottom: 87px;
        text-align: right;

        img {
          float: left;
        }
        .container {
          float: right;
          padding-top: 63px;

          .title {
            img {
              width: 35px;
              height: 56px;
              margin-left: 255px;
            }

            .text {
              font-size: 46px;
              line-height: 56px;
              font-weight: bold;
              color: #d34d4d;
              margin-left: 20px;
            }
          }

          .tip {
            color: rgba(211, 77, 77, 0.72);
            font-size: 34px;
            font-weight: 500;
            line-height: 36px;
            margin: 16px 0 23px;
          }

          .content {
            width: 401px;
            font-size: 20px;
            color: #8f8f8f;
            line-height: 30px;
            font-weight: 400;
          }
        }
      }

      .itemL {
        overflow: hidden;
        margin-bottom: 87px;

        img {
          float: right;
        }
        .container {
          float: left;

          .title {
            img {
              float: left;
              width: 35px;
              height: 56px;
            }

            .text {
              font-size: 46px;
              line-height: 56px;
              font-weight: bold;
              color: #d34d4d;
              margin-left: 20px;
            }
          }

          .tip {
            color: rgba(211, 77, 77, 0.72);
            font-size: 34px;
            font-weight: 500;
            line-height: 36px;
            margin: 16px 0 23px 55px;
          }

          .content {
            width: 401px;
            font-size: 20px;
            color: #8f8f8f;
            line-height: 30px;
            font-weight: 400;
            margin-left: 55px;
          }
        }
      }
    }
  }
</style>
