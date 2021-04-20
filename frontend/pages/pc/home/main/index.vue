<template>
  <div class="main">
    <mainHeader />

    <div class="main_body">
      <div class="main_banner" style="width: 100%">
        <el-carousel trigger="click" height="531px" style="width: 1920px; margin: auto" id="card1">
          <el-carousel-item v-for="(item,index) in swiperList" :key="index" style="height: 531px">
            <!--            <mainCarousel :carousel="item" class="banner" @goto="goto"></mainCarousel>-->
            <img :src="item.img" class="banner">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="card body_card3" id="card2">
        <div class="card3_content">
          <p class="title" :style="card3_title_bg">传统党建面临困难</p>
          <div class="card_title_red"></div>
          <ul class="card3_list">
            <li class="card3_li" v-for="(item,index) in card3" :key="index">
              <div class="card3_li_t">
                <img :src="item.img" alt="" class="card3_li_img">
              </div>
              <div class="card3_li_b">
                <p class="name" v-if="item.name">{{item.name}}</p>
                <p class="content">传统党建工作对互联网和信息化不敏感，无法适应党员和党组织急剧增加</p>
                <!--              <p class="name">开始讲的是老师肯定</p>-->
                <!--              <p class="content">紧紧围绕“事项简、流程优、材料减、时间压、次数少、平台建”的特点，构建整合跨部门、跨层级联办事项的政务平台。</p>-->
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="card body_card4" id="card3" ref="obatain">
        <p class="title" :style="card4_title_bg">致力解决党建难点</p>
        <div class="card_title_red"></div>
        <div class="card4_content_div" :style="card4_li_bg">
          <div class="body_card4_content">
            <div class="card4_wan">
              <img src="@/assets/image/main/wan.png">
            </div>
            <div class="more">
              <el-button size="mini" class="more_button" @click="learn_more_card4">了解更多</el-button>
            </div>
            <div class="demo">
              <transition name="fadeT">
                <div class="demo" v-show="show">
                  <ul class="card4_list_t">
                    <li class="card4_li_two">
                      <div class="card4_li_img">
                        <img src="@/assets/image/main/2.png">
                      </div>
                      <div class="card4_li_text">
                        <p class="name">个性化定制</p>
                        <p class="content">提高信息的利用率，实时发布更新中</p>
                      </div>
                    </li>
                    <li class="card4_li_three">
                      <div class="card4_li_img">
                        <img src="@/assets/image/main/3.png">
                      </div>
                      <div class="card4_li_text">
                        <p class="name">标准化智慧团建</p>
                        <p class="content">提高信息的利用率，实时发布更新中</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
            <div class="demo">
              <transition name="fadeB">
                <div class="demo" v-show="show">
                  <ul class="card4_list_b">
                    <li class="card4_li_one">
                      <div class="card4_li_img">
                        <img src="@/assets/image/main/1.png">
                      </div>
                      <div class="card4_li_text">
                        <p class="name">数字化党务</p>
                        <p class="content">提高信息的利用率，实时发布更新中</p>
                      </div>
                    </li>
                    <li class="card4_li_imges">
                      <img src="@/assets/image/main/danghui.png">
                    </li>
                    <li class="card4_li_four">
                      <div class="card4_li_img">
                        <img src="@/assets/image/main/4.png">
                      </div>
                      <div class="card4_li_text">
                        <p class="name">系统维护</p>
                        <p class="content">提高信息的利用率，实时发布更新中</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
        </div>


      </div>
      <div class="card body_card2" id="card4">
        <div class="card2_content">
          <p class="title" :style="card2_title_bg">智慧党建六大中心</p>
          <div class="card_title_red"></div>
          <ul class="card2_list">
            <li class="card2_li" v-for="(item,index) in card2" :key="index">
              <div class="card2_list_t">
                <img :src="item.img" alt="">
              </div>
              <div class="card2_list_b">
                <p v-if="item.name" class="card2_list_name">{{item.name}}</p>
                <p v-if="item.content" class="card2_list_content">{{item.content}}</p>
              </div>
            </li>
          </ul>
          <div class="more">
            <el-button size="mini" class="more_button" @click="learn_more_card2">了解更多</el-button>
          </div>
        </div>
      </div>
      <div class="card body_card5" id="card5" :style="card5_bg">
        <p class="title" :style="card5_title_bg">智慧党建覆盖多个终端</p>
        <div class="card_title_red"></div>
        <div class="card5_img">
          <img src="@/assets/image/main/zhongduan.png">
        </div>
      </div>
      <div class="card body_card6" id="card6">
        <p class="title" :style="card6_title_bg">他们正在使用</p>
        <div class="card_title_red"></div>
        <div class="body_card6_content">
          <div class="card6_list">
            <div class="card6_list_l">
              <img src="@/assets/image/main/zuo.png">
            </div>
            <ul class="card6_list_li" v-for="(item,index) in card6" :key="index">
              <li>
                <div class="card6_li_images">
                  <img :src="item.img">
                </div>
                <div class="card6_li_text">
                  <p v-if="item.content">{{item.content}}</p>
                  <p v-if="item.text">{{item.text}}</p>
                </div>
              </li>
            </ul>
            <div class="card6_list_r">
              <img src="@/assets/image/main/you.png">
            </div>
          </div>
          <div class="card6_joinUs" :style="card6_joinUs_bg">
            <p class="join_title">智慧新党建，领航新时代</p>
            <el-button class="join_button">加入我们</el-button>
          </div>
        </div>
      </div>
    </div>
    <main-footer />
    <ul class="pos_list">
      <li :class="{pos_li:true,active:posIndex==(index+1)}" v-for="(item,index) in [1,2,3,4,5,6]" :key="index"
          @click="position(item)"></li>
    </ul>
  </div>
</template>

<script>
  import mainCarousel from "@/components/pc/swiper/mainCarousel"
  import mainHeader from "../../../../components/pc/home/mainHeader";
  import MainFooter from "../../../../components/pc/home/mainFooter";
  export default {
    name: "index",
    components: {
      MainFooter,
      mainCarousel,
      mainHeader
    },
    data() {
      return {
        show: false,
        posIndex: 1,
        // navIndex: 1,
        test: [
          {name: '0000'},
          {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'}, {name: '1111'},
        ],
        // ],
        swiperList: [
          {
            // img: require('@/assets/image/home-Mbanner1.png'),
            img: require('@/assets/image/main/banner.png'),
            // name: '十九年 · 始终专注于协同办公',
            // content1: '泛微 e-nation · 专注于政务的协同平台',
            // content2: '180多个分支机构、5000多人服务团体 国家规划布局内重点软件企业、上交所主板上市公司（603039）',
            // color: '#000'
          },
          {
            // img: require('@/assets/image/home-Mbanner2.png'),
            // name: '4000多家党政机关单位服务经验',
            // content1: '泛微 e-nation · 专注于政务的协同平台',
            // content2: '从 省级单位到乡镇街道的四级覆盖，并具有部厅局委办业务条线服务实施经验，提供好用、易用的政务协同平台',
            // color: '#fff',
            img: require('@/assets/image/main/banner.png')
          },
          {
            // img: require('@/assets/image/home-Mbanner3.png'),
            // name: '一体化移动政务办公平台',
            // content1: '泛微 e-nation · 专注于政务的协同平台',
            // content2: '融合个人办公、公文管理、会议管理、流程审批、信息采编、督查督办、建议提案，集CA、大数据图表等应用于一体的智慧政务办公平台',
            // color: '#fff',
            img: require('@/assets/image/main/banner.png')
          },
        ],
        card1: [
          {img: require('@/assets/image/home-Mbanner1.png'), name: '莫高共享单车'},
          {img: require('@/assets/image/home-Mbanner1.png'), name: '莫高共享单车'},
          {img: require('@/assets/image/home-Mbanner1.png'), name: '莫高共享单车'},
          {img: require('@/assets/image/home-Mbanner1.png'), name: '莫高共享单车'},
          {img: require('@/assets/image/home-Mbanner1.png'), name: '莫高共享单车'},
          {img: require('@/assets/image/home-Mbanner1.png'), name: '莫高共享单车'},
          {img: require('@/assets/image/home-Mbanner1.png'), name: '莫高共享单车'},
          {img: require('@/assets/image/home-Mbanner1.png'), name: '莫高共享单车'},
        ],
        card2: [
          {img: require('@/assets/image/main/hudongjiaoliu.png') , name: '互动交流中心' , content: '提高信息的利用率，实时发布更新重要文章、支部信息，以实现高效管理。'},
          {img: require('@/assets/image/main/xinxiguanli.png') , name: '信息管理中心' , content: '提高信息的利用率，实时发布更新重要文章、支部信息，以实现高效管理。'},
          {img: require('@/assets/image/main/dangzuzhiguanli.png') , name: '党组织管理中心' , content: '组织信息管理模块通过建立党员信息库，实现快速对党员的数据集中化管理。'},
          {img: require('@/assets/image/main/juecefenxi.png') , name: '决策分析中心' , content: '组织信息管理模块通过建立党员信息库，实现快速对党员的数据集中化管理。'},
          {img: require('@/assets/image/main/dangwuguanli.png') , name: '党务管理中心' , content: '组织信息管理模块通过建立党员信息库，实现快速对党员的数据集中化管理。'},
          {img: require('@/assets/image/main/dangyaunjiaoyu.png') , name: '党员教育中心' , content: '定期开展考试，实时跟踪学习时长。课程分类管理，随时随地便捷学习。'},
        ],
        card3: [
          {img: require('@/assets/image/main/zuzhiguanli.png') , name: '组织管理难'},
          {img: require('@/assets/image/main/shangchuanxiada.png') , name: '上传下达难'},
          {img: require('@/assets/image/main/guochengjiangaun.png') , name: '过程监听难'},
          {img: require('@/assets/image/main/gooutongjiaoliu.png') , name: '沟通交流难'},
          {img: require('@/assets/image/main/zhihuijuece.png') , name: '指挥决策难'},
        ],
        card4: [
          // {img: require('@/assets/image/app_1.png') , name: '个性化定制'},
          // {img: require('@/assets/image/app_1.png') , name: '标准化智慧党建'},
          // {img: require('@/assets/image/app_1.png') , name: '数字化党务'},
          // {img: require('@/assets/image/app_1.png') , name: '系统维护'},
          // {name: '白云区'}, {name: '天河区'}, {name: '荔湾区'}, {name: '海珠区'},
          // {name: '从化区'}, {name: '增城区'}, {name: '番禺区'}, {name: '花都区'},
          // {name: '南沙区'}, {name: '白云区'}, {name: '白云区'}, {name: '白云区'},
          // {name: '白云区'}, {name: '白云区'}, {name: '白云区'}, {name: '白云区'},
          // {name: '白云区'}, {name: '白云区'}
        ],
        card6: [
          {img: require('@/assets/image/main/diyirenminyiyuan.png') , content: '广州第一人民医院'},
          {img: require('@/assets/image/main/gonggongziyuanjiaoyizhongxin.png')},
          {img: require('@/assets/image/main/hulianwangfayuan.png')},
          {img: require('@/assets/image/main/sifaju.png') , content: '广州市司法局' , text: '（律师协会）'},
          {img: require('@/assets/image/main/gonganju.png') , content: '广州市公安局' }
        ],
        card3_title_bg: {
          backgroundImage: "url(" + require('@/assets/image/main/DANGJIANKUNNAN.png') + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "411px 31px ",
          backgroundPosition: "center 0",
        },
        card4_title_bg: {
          backgroundImage: "url(" + require('@/assets/image/main/JIEJUENANDAIN.png') + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "337px 30px",
          backgroundPosition: "center 0",
        },
        card4_li_bg: {
          backgroundImage: "url(" +require('@/assets/image/main/jiejuebeijingtu.png') + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center"
        },
        card2_title_bg:{
          backgroundImage: "url(" +require('@/assets/image/main/LIUDAZHONGXIN.png') + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "358px 31px ",
          backgroundPosition: "center 0",
        },
        card5_bg: {
          backgroundImage: "url(" + require('@/assets/image/main/zhongduanditu.png') + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center"
        },
        card5_title_bg: {
          backgroundImage: "url(" +require('@/assets/image/main/DANGJIANKUNNAN.png') + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "425px 31px ",
          backgroundPosition: "center 0",
        },
        card6_title_bg: {
          backgroundImage: "url(" +require('@/assets/image/main/ZHENGZAISHIYONG.png') + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "414px 31px ",
          backgroundPosition: "center 0",
        },
        card6_joinUs_bg: {
          backgroundImage: "url(" +require('@/assets/image/main/dibutupain.png') + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center"
        },
      }
    },
    methods: {
      OffsetToTop(){
        const OffsetLeft = parseInt(document.getElementById('card2').offsetLeft)
        if(OffsetLeft > 468 )
          this.show = true
        else
          this.show = false
      },
      handleScroll() {
        // 页面滚动距顶部距离
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
          document.body.scrollTop
        var OffsetLeft = parseInt(document.getElementById('card2').offsetLeft)
        if (scrollTop > 0 && scrollTop < 531)
          this.posIndex = this.navIndex = 1
        else if (scrollTop > 531 && scrollTop < 700)
          this.posIndex = this.navIndex = 2
        else if (scrollTop > 700 && scrollTop < 987) {
          this.posIndex = this.navIndex = 2
          this.show = true
        }
        else if (scrollTop > 987 && scrollTop < 1727)
          this.posIndex = this.navIndex = 3
        else if (scrollTop > 1727 && scrollTop < 2812)
          this.posIndex = this.navIndex = 4
        else if (scrollTop > 2812 && scrollTop < 3433){
          this.posIndex = this.navIndex =5
          this.show = false
        }
        else if (scrollTop > 3433)
          this.posIndex = this.navIndex = 6
      },
      learn_more_card4: function () {

      },
      learn_more_card2: function () {

      },
    },
    mounted() {
      this.OffsetToTop()
      window.addEventListener('scroll', this.handleScroll, true);
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll, true)
    }
  }
</script>

<style scoped lang="less">
  .main {
    width: 100%;

    .main_body {
      .banner {
        width: 1920px;
        /*height: 100%;*/
        margin: 0 auto;
      }

      .card {
        width: 1920px;

        .title {
          text-align: center;
          height: 60px;
          line-height: 50px;
          font-size: 38px;
          color: #3b3b3b;
          margin: auto;
        }

        hr {
          margin: 10px auto;
          width: 85px;
          border-bottom: 8px solid #d34d4d;
        }

        .card_title_red{
          width: 85px;
          height: 8px;
          background-color: #d34d4d;
          margin: 0 auto 70px;
        }
      }

      .body_card1 {
        .card1_list {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          text-align: justify;
          margin: 20px 0;
        }

        .card1_li {
          width: 25%;
          display: inline-block;
          text-align: center;
          margin: 25px 0;

          img {
            margin: 0 20px;
            width: calc(100% - 40px);
            height: 200px;
          }

          p {
            margin: 0 20px;
            width: calc(100% - 40px);
            border: 1px solid #dddddd;
            font-size: 13px;
            height: 24px;
          }
        }

        .card1_li:hover {
          transform-origin: center center;
          transform: scale(0.95);
          -webkit-transition: all .3s ease;
        }

        .card1_list:after {
          content: ' ';
          flex: auto;
        }

        .card1_list {
          .card1_li {
            width: -webkit-calc(100% / 4);
            width: calc(100% / 4);
          }
        }
      }

      .body_card2 {
        width: 1920px;
        /*height: 962px;*/
        margin: auto;
        .card2_content{
          width: 1090px;
          margin: 70px auto 55px;

          .card2_list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            text-align: justify;
            width: 100%;
          }

          .card2_li {
            width: 318px;
            display: inline-block;
            text-align: center;
            margin-top: 40px;

            img {
              margin: 25px auto 0;
              width: 181px;
              height: 180px;
              cursor: pointer;
            }
            .card2_list_b{
              margin: 20px auto;
              .card2_list_name{
                font-size: 28px;
                line-height: 30px;
                color: #4e4e4d;
                margin-bottom: 22px;
              }
              .card2_list_content{
                font-size: 22px;
                line-height: 30px;
                color: #8d8d8c;
                width: 291px;
                margin: auto;
              }
            }
          }

          .card2_li:hover{
            background-color: #FFFFFF;
            box-shadow: 1px 3px 8px 2px rgba(105, 103, 103, 0.17);
            border-radius: 16px;
          }

          .card2_list:after {
            content: ' ';
            flex: auto;
          }

          .card2_list {
            .card2_li {
              width: calc(100% / 3);
            }
          }

          .more{
            text-align: center;
            margin-top: 55px;
            .more_button{
              width: 225px;
              height: 61px;
              border-radius: 10px;
              border: #d34d4d 2px solid;
              color: #d34d4d;
              background-color: transparent;
              font-size: 28px;
              line-height: 30px;
            }
            .more_button:hover{
              background-color: #da3606;
              color: #FFFFFF;
            }
          }
        }

      }

      .body_card3 {
        width: 1920px;
        margin: 77px auto 0;

        .card3_content {
          width: 1202px;
          margin: auto;

          .card3_list {
            margin: 65px auto 0;

            .card3_li {
              width: 20%;
              display: inline-block;
              margin: auto;

              .card3_li_t {
                vertical-align: top;
                width: 80px;
                margin: 0 auto;

                img {
                  width: 76px;
                  height: 75px;
                  cursor: pointer;
                }
              }

              .card3_li_b {
                width: 100%;
                text-align: center;

                .name {
                  color: #3b3b3b;
                  font-size: 26px;
                  line-height: 30px;
                  margin-top: 26px;
                  margin-bottom: 24px;
                }

                .content {
                  color: #696767;
                  width: 198px;
                  margin: auto;
                  font-size: 18px;
                  line-height: 30px;
                }
              }
            }
          }
        }
      }

      .body_card4 {
        width: 1920px;
        margin: auto;
        padding-top: 72px;
        height: 810px;
        position: relative;

        .card4_content_div{
          width: 1920px;
          height: 600px;
          position: relative;
          overflow: hidden;
          margin: auto;

          .body_card4_content {
            height: 600px;
            position: absolute;

            .card4_list_t{
              .card4_li_two{
                display: inline-block;
                margin-left: 519px;
                margin-right: 216px;

                .card4_li_img{
                  float: right;
                  img {
                    width: 58px;
                    height: 83px;
                  }
                }
                .card4_li_text{
                  float: right;
                  text-align: right;
                  margin-right: 15px;

                  .name{
                    color: #d34d4d;
                    font-size: 28px;
                    line-height: 30px;
                    margin-bottom: 8px;
                  }
                  .content{
                    width: 264px;
                    font-size: 22px;
                    line-height: 30px;
                    color: #8d8d8c;
                  }
                }
              }

              .card4_li_three{
                display: inline-block;

                .card4_li_img{
                  float: left;
                  img {
                    width: 58px;
                    height: 82px;
                  }
                }
                .card4_li_text{
                  margin-left: 15px;
                  float: left;

                  .name{
                    color: #d34d4d;
                    font-size: 28px;
                    line-height: 30px;
                    margin-bottom: 8px;
                  }
                  .content{
                    width: 264px;
                    font-size: 22px;
                    line-height: 30px;
                    color: #8d8d8c;
                  }
                }
              }
            }

            .card4_list_b{
              margin: 56px auto 52px;
              position: relative;
              .card4_li_one{
                display: inline-block;
                margin-top: 37px;
                margin-left: 360px;

                .card4_li_img{
                  float: right;
                  img {
                    width: 58px;
                    height: 82px;
                  }
                }
                .card4_li_text{
                  float: right;
                  text-align: right;
                  margin-right: 14px;
                  .name{
                    color: #d34d4d;
                    font-size: 28px;
                    line-height: 30px;
                    margin-bottom: 8px;
                  }
                  .content{
                    font-size: 22px;
                    line-height: 30px;
                    color: #8d8d8c;
                    width: 264px;
                  }
                }
              }

              .card4_li_imges{
                display: inline-block;
                position: absolute;
                top: 0;
                left: 903px;
                z-index: 1;

                img{
                  width: 115px;
                  height: 115px;
                }
              }

              .card4_li_four{
                display: inline-block;
                margin-top: 37px;
                margin-left: 550px;

                .card4_li_img{
                  float: left;
                  img {
                    width: 58px;
                    height: 82px;
                  }
                }
                .card4_li_text{
                  float: left;
                  text-align: left;
                  margin-left: 10px;
                  .name{
                    color: #d34d4d;
                    font-size: 28px;
                    margin-bottom: 8px;
                    line-height: 30px;
                  }
                  .content{
                    font-size: 22px;
                    width: 264px;
                    color: #8d8d8c;
                    line-height: 30px;
                  }
                }
              }
            }

            .card4_wan{
              position: absolute;
              top: 75px;
              left: 632px;
              img{
                width: 669px;
                height: 338px;
              }
            }

            .more{
              text-align: center;
              position: absolute;
              bottom: 50px;
              left: 847px;


              .more_button{
                width: 225px;
                height: 61px;
                border-radius: 10px;
                border: #d34d4d 2px solid;
                color: #d34d4d;
                font-size: 28px;
                line-height: 30px;
                background-color: transparent;
              }
              .more_button:hover{
                background-color: #da3606;
                color: #FFFFFF;
              }
            }
          }
          .fadeT-enter{
            opacity: 0;
            margin-top: 100%;
          }
          .fadeT-enter-active,.fadeT-leave-active{
            transition:all 2s;
          }
          .fadeT-leave{
            opacity: 1;
            margin-top: 0;
          }

          .fadeT-leave-active{
            opacity: 0;
            margin-top: 100%;
          }

          .fadeB-enter{
            opacity: 0;
            margin-top: 100%;
          }
          .fadeB-enter-active,.fadeB-leave-active{
            transition:all 5s;
          }
          .fadeB-leave{
            opacity: 1;
            margin-top: 0;
          }

          .fadeB-leave-active{
            opacity: 0;
            margin-top: 100%;
          }
        }


      }

      .body_card5{
        width: 1920px;
        margin: auto;
        padding-top: 60px;
        padding-bottom: 70px;

        .card5_img{
          margin: 60px auto 80px;
          text-align: center;

          img{
            width: 1001px;
            height: 365px;
          }
        }
      }

      .body_card6{
        width: 1920px;
        margin: auto;
        padding-top: 70px;

        .body_card6_content{
          .card6_list{
            margin: 76px auto 0;
            text-align: center;
            width: 1920px;

            .card6_list_l{
              font-size: 25px;
              color: #d4d1d1;
              font-weight: bold;
              float: left;
              margin-top: 82px;
              margin-left: 360px;
            }
            .card6_list_r{
              font-size: 25px;
              color: #d4d1d1;
              font-weight: bold;
              float: right;
              margin-top: 82px;
              margin-right: 360px;
            }
            .card6_list_li{
              width: 190px;
              height: 223px;
              margin: auto 15px;
              display: inline-block;
              background-color: #FFFFFF;
              box-shadow: 1px 3px 8px 2px rgba(105, 103, 103, 0.17);
              border-radius: 16px;
              vertical-align: top;
              cursor: pointer;

              .card6_li_images{
                img{
                  margin: 45px auto 0;
                  object-fit: contain;
                }
              }

              .card6_li_text{
                padding-bottom: 50px;
                color: #959595;
                font-size: 18px;
                line-height: 30px;
              }
            }
          }

          .card6_joinUs{
            margin: auto;
            padding-top: 90px;
            text-align: center;
            padding-bottom: 80px;
            width: 100%;
            .join_title{
              margin-bottom: 52px;
              font-size: 48px;
              color: #3e3e3e;
              line-height: 30px;
            }
            .join_button{
              width: 267px;
              height: 79px;
              border-radius: 40px;
              background-color: #de4647;
              box-shadow: 2px 8px 29px 6px rgba(222, 70, 71, 0.27);
              color: #fefefe;
              font-size: 30px;
              line-height: 30px;
            }
            .join_button:hover{
              background-color: transparent;
              color: #de4647;
              border: #fefefe 2px solid;
              box-shadow: 2px 8px 29px 6px rgba(222, 70, 71, 0.27);
            }
          }
        }
      }
    }

    .pos_list {
      position: fixed;
      z-index: 99;
      top: 40%;
      right: 0;

      .pos_li {
        width: 10px;
        height: 10px;
        /*background: #aaaaaa;*/
        background: transparent;
        border: 1px solid #000;
        opacity: .7;
        cursor: pointer;
        margin: 10px 20px;
        border-radius: 50%;
      }

      .active {
        background: #000;
      }
    }
  }
</style>
