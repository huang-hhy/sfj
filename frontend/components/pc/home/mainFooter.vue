<template>
  <div class="main_foot" id="card7">
    <div class="main_foot_t">
      <div class="main_foot_t_content">
        <div class="foot_card1">
          <h2 class="title">快速通道</h2>
          <p class="detail">产品功能</p>
          <p class="detail">入驻客户</p>
          <!--            <h2 class="title">关于产品名</h2>-->
          <!--            <p class="detail">泛微一体化移动政务办公平台，隶属于上海泛微网络科技股份有限公司</p>-->
          <!--            <p class="detail">融合个人办公、公文管理、流程审批、党建管理、督查督办、会议管理。政务数据图表分析等应用于一体的移动政务办公平台。</p>-->
          <!--            <p class="detail">19年专注于协同办公、180多个分支机构、5000多人服务团体</p>-->
        </div>
        <div class="foot_card1">
          <h2 class="title">关于我们</h2>
          <!--            <p class="phone">-->
          <!--              <svg-icon icon-class="phone"/>-->
          <!--              <span>400 861 8118</span>-->
          <!--            </p>-->
          <!--            <p class="detail">邮箱：sales@weaver.com.cn</p>-->
          <!--            <p class="detail">扫一扫 | 关注移动政务办公</p>-->
          <!--            <img src="@/assets/image/qrcord.png" alt="" class="qrcode">-->
          <p class="contact">
            <span class="contact_l">咨询热线</span>
            <span class="contact_r_first"> 18602030737</span>
          </p>
          <p class="contact">
            <span class="contact_l">传真</span>
            <span class="contact_r"> 22181999</span>
          </p>
          <p class="contact">
            <span class="contact_l">地址</span>
            <span class="contact_r"> 广州国际生物岛广州生命科学创新中心A塔23楼</span>
          </p>
        </div>
        <div class="chat">
          <div class="images">
            <img class="qrcode" src="@/assets/pc/home/qr-code.jpg" alt="">
          </div>
          <p style="text-align: center;margin-top: 5px;">移动端</p>
        </div>
      </div>
    </div>
    <div class="main_foot_b">
      <!--        <p>版权所有：广州众拓计算机科技有限公司 粤ICP备*****号</p>-->
      <p>版权所有：联通（广东）产业互联网有限公司 粤ICP备17109783号-6 </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mainFooter"
  }
</script>

<style scoped lang="less">
  .main_foot {
    max-width: 1920px;
    margin: 0 auto;
    background-color: #333333;

    .main_foot_t {
      width: 100%;
      background-color: #333333;
      padding: 38px 360px 0;
      margin: auto;
      /*height: 327px;*/
      /*padding-left: 200px;*/
      /*padding-top: 38px;*/

      .main_foot_t_content {

        /*width: 65%;*/
        /*margin: 0 auto;*/
        display: flex;
        position: relative;
        border-bottom: #4d4d4d 2px solid;
        /*position: relative;*/

        .foot_card1 {
          /*width: 300px;*/
          /*height: 210px;*/
          color: #ffffff;
          padding-right: 100px;
          text-align: justify;

          .title {
            font-size: 28px;
            line-height: 30px;
            margin-bottom: 48px;
            color: #faf9f9;
          }

          .detail {
            font-size: 20px;
            line-height: 30px;
            color: #c8c8c8;
            margin-bottom: 47px;
          }

          .contact {
            font-size: 20px;
            line-height: 30px;
            color: #c8c8c8;
            width: 550px;
            padding-bottom: 34px;

            .contact_r {
              padding-left: 4em;
            }

            .contact_r_first {
              padding-left: 2em;
            }
          }

          /*.phone {*/
          /*  font-size: 18px;*/
          /*  padding: 10px 0;*/
          /*}*/

          /*img {*/
          /*  margin-top: 10px;*/
          /*  width: 60px;*/
          /*  height: 60px;*/
          /*}*/
        }

        .chat {
          position: absolute;
          right: 0;
          font-size: 22px;
          line-height: 30px;
          color: #c8c8c8;

          .images {


            width: 155px;
            height: 153px;
            background-color: #FFFFFF;
            margin: auto;

            .qrcode {
              display: block;
              width: 100%;
            }
          }
        }

        .foot_card1:nth-child(2) {
          width: 250px;
          /*border-right: 1px solid #dddddd;*/
        }

        .food_card2 {
          height: 220px;
          width: 650px;
          color: #ffffff;
          /*text-align: justify;*/
          /*padding-left: 10px;*/
          /*position: absolute;*/

          .food_card2_list {
            overflow: auto;

            .food_card2_li {
              vertical-align: top;
              padding: 0 20px;
              width: 180px;
              display: inline-block;

              .title {
                font-size: 18px;
                line-height: 32px;
                margin-bottom: 5px;
              }

              p {
                font-size: 12px;
                line-height: 24px;
              }
            }
          }
        }
      }
    }

    .main_foot_b {
      /*width: 100%;*/
      /*width: 1520px;*/
      /*height: 40px;*/
      width: 100%;
      line-height: 36px;
      font-size: 16px;
      background-color: #333333;
      text-align: center;
      color: #b5b5b5;
      margin: auto;
    }
  }
</style>
