<template>
  <div class="home_container">
    <!-- <p @click="goDemo(123)">demo</p> -->
    <div class="home_content">
      <div class="pb_search">
        <div class="notice fl">
          <svg-icon icon-class="broadcast"/>
          <transition name="slide" v-if="noticeShow.val">
            <p class="text" :key="noticeShow.id">{{noticeShow.val.noticeContent}}</p>
          </transition>
        </div>
        <div class="search fr">
          <input id="search_title" type="text" name="title" maxlength="20" autocomplete="off" placeholder="请输入关键字" v-model="keyword"
                 v-on:keyup.enter="search">
          <button class="pb_submit" type="submit" @click="search"> 搜索</button>
        </div>
      </div>
      <div class="pb_head_notice">
<!--        <div class="pb_head_notice_img">-->
<!--          <img src="~assets/pc/home/toutiao.png" />-->
<!--        </div>-->
<!--        <h2>客响党支部七月份主题党日————"颂党恩 筑沃梦"</h2>-->
        <h2>
          <span>学党史</span>
          <span style="margin-left: 15px">促整顿</span>
        </h2>
        <ul>
          <li v-for="(item,index) in notice.slice(0,3)" :key="index">{{item.noticeContent}}</li>
        </ul>
      </div>
      <div class="pb_item">
        <div class="pb_top_rated_l" :style="{ width:$store.state.app.token?'100%':'70%' }">
          <div class="pb_top_rated_title">
            <div class="org_map_tit">
              <h5 class="pb_title">
                {{channels[0] && channels[0].articleChannelName ? channels[0].articleChannelName : ''}}
              </h5>
              <span class="more"
                    @click="goto(channels[0] && channels[0].id ? channels[0].id : '',channels[0] && channels[0].articleChannelName ? channels[0].articleChannelName : '')"
              >更多 +</span>
            </div>
          </div>
          <div class="pb_top_content">
            <Carousel v-show="show" :carousel="channels0" @doSubmit="doSubmit"/>
            <ul class="notice_item" :style="{ width:$store.state.app.token?'63%':'45%' }">
              <li v-for="(item,index) in (channels[0] && channels[0].articleList ? channels[0].articleList :[])"
                  :key="index">
                <a @click="goToNews(item.id)">{{item.articleTitle}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="pb_top_rated_r" v-if="!$store.state.app.token">
          <Login/>
        </div>
      </div>
      <div class="pb_gathering">
        <div class="pb_top_rated_title">
          <div class="org_map_tit">
            <h5 class="pb_title">
              {{channels[1] && channels[1].articleChannelName ? channels[1].articleChannelName : ''}}
            </h5>
            <span class="more"
                  @click="goto(channels[1] && channels[1].id ? channels[1].id : '',channels[1] && channels[1].articleChannelName ? channels[1].articleChannelName : '')"
            >更多 +</span>
          </div>
        </div>
        <div class="gathering">
          <div class="gathering_list">
            <ul>
              <li v-for="(item,index) in channels1" :key="index" style="cursor:pointer" @click="goToNews(item.id)">
                <img :src="item.image"/>
                <div class="bottom">
                  <p>{{item.title}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="pb_card" v-if="channels2.length > 0">
        <ul class="pb_card_list">
          <!-- <p>{{channels2}}</p> -->
          <li class="pb_card_li" v-for="(item,index) in channels2" :key="index" v-if="index < 6">
            <div class="card_head">
              <div class="card_head_l fl">
                <img src="@/assets/pc/home/left1.png" alt="">
                <span class="name" v-for="(item3,index3) in item.articleChannelName" :key="index3">{{item3}}</span>
                <img src="@/assets/pc/home/right1.png" alt="">
              </div>
              <div class="card_head_r fr" @click="goto(item.id,item.articleChannelName)">更多 ></div>
            </div>
            <ul class="card_list">
              <li class="card_li" v-for="(item2,index2) in item.articleList" :key="index2" v-if="index2 < 5"
                  @click="goToNews(item2.id)">
                {{item2.articleTitle}}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="pb_img">
        <img src="@/assets/pc/home/illustration.png" alt="">
      </div>
    </div>
    <div class="home_map">
      <div class="party_organization">
        <div class="pb_top_rated_title">
          <div class="org_map_tit">
            <h5 class="pb_title">
              党建地图
            </h5>
            <span class="more" @click="gotoMap">更多 +</span>
          </div>
        </div>
        <div class="org_mr">
          <client-only>
            <BaiduMap :points="points" v-if="points.length"/>
          </client-only>
        </div>
    </div>

<!--      <ul class="map_list">-->
<!--        <li class="map_li" v-for="(item,index) in orgs" :key="index">{{item.orgName}}</li>-->
<!--      </ul>-->
    </div>
<!--    <Footer :link="link"/>-->
  </div>
</template>

<script>
  import Carousel from "@/components/pc/swiper/Carousel.vue";
  import BaiduMap from "@/components/pc/map/baidu-map.vue";
  import Login from "@/components/pc/login/login.vue";
  import Slide from "@/components/pc/swiper/Slide.vue";
  // import Footer from "@/components/layout-pc/footer.vue";
  import {getSensitiveWord} from '@/api/common';
  import config from '@/config'
  import {decrypt, encrypt} from "../../../libs/tools";

  export default {
    name: "home.vue",
    components: {
      Carousel,
      BaiduMap,
      Login,
      Slide
      // Footer
    },
    props: {
      channels: {
        type: Array,
        default: () => []
      },
      orgs: {
        type: Array,
        default: () => []
      },
      notice: {
        type: Array,
        default: () => []
      },
      slide: {
        type: Array,
        default: () => []
      }
    },
    data: () => {
      return {
        recommend: [],
        points: [],
        gathering: [],
        keyword: '',
        link: [],
        number: 3,
        dialogFormVisible:false,
        show: true,
        // channelsNew:this.channels
      };
    },
    computed: {
      noticeShow() {
        return {
          id: this.number,
          val: this.notice[this.number]
        }
      },
      channels0() {
        let articleList = this.channels[0] && this.channels[0].articleList ? this.channels[0].articleList : []
        let tmp = []
        for (let i in articleList) {
          if (articleList[i].articleShowImg) {
            tmp.push({
              id: articleList[i].id,
              image: config.attachUrl + articleList[i].articleShowImg,
              title: articleList[i].articleTitle
            })
          }
        }
        // console.log(tmp)
        this.show = tmp && tmp.length > 0
        return tmp
      },
      channels1() {
        let articleList = this.channels[1] && this.channels[1].articleList ? this.channels[1].articleList : []
        let tmp = []
        for (let i in articleList) {
          tmp.push({
            id: articleList[i].id,
            image: config.attachUrl + articleList[i].articleShowImg,
            path: '/pc/course/detail',
            title: articleList[i].articleTitle
          })
        }
        return tmp
      },
      channels2() {
        const channelsList = this.channels.length > 2 ? (this.channels.slice(2).length % 3 === 0 ? this.channels.slice(2) : this.channels.slice(this.channels.slice(2).length % 3 + 2)) : []
        // console.log(channelsList)
        return channelsList
        // return this.channels.length > 2 ? this.channels.slice(2) : []
      }
    },
    watch: {
      orgs: {
        handler(val) {
          let points = []
          for (let i in val) {
            points.push({
              id: val[i].id,
              lng: val[i].lng,
              lat: val[i].lat,
              address: val[i].address
            })
          }
          this.points = points
          // this.points.push({
          //   id: '722398219757457123',
          //   lng: 113.26958,
          //   lat: 23.133807,
          //   address: '越秀区连新路19号'
          // })
        },
        deep: true
      }
    },
    mounted() {
      // console.log(this.channelsNew)
      this.link = [
        {list: [{id: 1, name: '首页', path: 'home'}]},
        {list: [{id: 2, name: '党建要闻', path: ''}, {id: 3, name: '通知公告', path: ''}, {id: 4, name: '新闻资讯', path: ''}]},
        {list: [{id: 5, name: '文明创建', path: ''}, {id: 6, name: '专题活动', path: ''}]},
        {list: [{id: 7, name: '党员先锋', path: ''}, {id: 8, name: '模范先锋', path: ''}, {id: 9, name: '优秀代表', path: ''}]},
        {list: [{id: 10, name: '两学一做', path: ''}, {id: 11, name: '政策解读', path: ''}, {id: 12, name: '精准扶贫', path: ''}]},
        {list: [{id: 13, name: '橙团青春', path: ''}, {id: 14, name: '群众服务', path: ''}]},
        {list: [{id: 15, name: '学习专栏', path: ''}, {id: 16, name: '党员专栏', path: ''}, {id: 17, name: '学习天地', path: ''}]},
      ]
      // this.slide = [
      //   {id: 1, img: require("@/assets/pc/home/carousel1.png"), content: '图片111111111111'},
      //   {id: 2, img: require("@/assets/pc/home/carousel2.png"), content: '图片222222222222'},
      //   {id: 3, img: require("@/assets/pc/home/carousel3.png"), content: '图片333333333333'},
      //   {id: 4, img: require("@/assets/pc/home/carousel4.png"), content: '图片444444444444'},
      //   {id: 5, img: require("@/assets/pc/home/carousel1.png"), content: '图片555555555555'},
      //   {id: 6, img: require("@/assets/pc/home/carousel2.png"), content: '图片666666666666'},
      //   {id: 7, img: require("@/assets/pc/home/carousel3.png"), content: '图片777777777777'}
      // ]
      this.startMove()
      this.show = true
    },
    methods: {
      // goDemo(id){
      //   const ids = encrypt(id)
      //   this.$router.push({
      //     path:'/pc/demo',
      //     query:{
      //       params:ids
      //     }
      //   })
      // },
      
      
      // goToCourse(d){
      //   this.$router.push({path: '/pc/course/detail', query: {id: d.id}})
      // },
      doSubmit(d) {
        this.goToNews(d.id)
      },
      startMove() {
        let timer = setTimeout(() => {
          if (this.number === 9) {
            this.number = 3;
          } else {
            this.number += 1;
          }
          this.startMove();
        }, 5000); // 滚动不需要停顿则将2000改成动画持续时间
      },
      goToNews(id) {
        let params = {
          id
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: '/pc/news/detail',
          query: {
            params: params
          }
        })
      },
      goto(id, name) {
        let params = {
          id
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: '/pc/news',
          query: {
            params: params,
            name
          }
        })
      },
      search() {
        getSensitiveWord(this.keyword).then(res => {
          console.log(res,this.keyword)
          if (res.code === 0) {
            if (res.data.sensitiveWordList.length) {
              this.$message.error('存在敏感词：' + res.data.sensitiveWordList.join(','))
            } else {
              this.$router.push({path: '/pc/search', query: {keyword: this.keyword}})
            }
          } else {
            this.$message.error('检测敏感词失败')
          }
        })
      },
      // gotoNotice: function () {
      //   this.$router.push({path: '/pc/news/detail'})
      // }
      gotoMap() {
        this.$router.push({
          path: '/pc/vitalityParty',
          query: {
            name: '活力党建'
          }
        })
      }
    }
  }
</script>


<style scoped lang="less">
  .home_container {
    /*background: url('~assets/pc/home/bg1.png');*/
    /*background: #C81623;*/
    background: -webkit-linear-gradient(top, #f8eedd, #f9f5ea);

    .home_content {
      background-image: url('~assets/pc/home/shan.png');
      background-size: 100% 100%;
    }

    .title {
      height: 250px;
      min-width: 1000px;
      max-width: 1000px;
      margin: 0 auto;
      padding-left: 80px;
      padding-top: 100px;
      font-size: 50px;
      color: #CB0000;
      font-weight: bold;
      letter-spacing: 10px;
    }

    .pb_search {
      min-width: 1000px;
      max-width: 1000px;
      padding-top: 10px;
      margin: 0 auto;

      .notice {
        width: 70%;
        height: 32px;
        line-height: 32px;
        margin: auto 0;
        position: relative;

        p {
          width: 650px;
          margin-left: 8px;
          position: absolute;
          bottom: 0;
          font-size: 12px;
          color: #000;
          display: inline-block;
          /*text-align: center;*/
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .slide-enter-active, .slide-leave-active {
          transition: all 0.5s linear;
        }

        .slide-enter {
          transform: translateY(20px) scale(1);
          opacity: 1;
        }

        .slide-leave-to {
          transform: translateY(-20px) scale(0.8);
          opacity: 0;
        }
      }

      .search {
        width: 300px;
        height: 30px;

        input {
          float: left;
          width: 240px;
          height: 30px;
          line-height: 30px;
          /*float: left;*/
          text-indent: 15px;
          border: 1px solid #E4393C;
          /*border: 1px solid #335C88;*/
          border-right: 0;
        }

        button {
          float: left;
          width: 60px;
          height: 30px;
          line-height: 28px;
          background: #E4393C;
          /*background: #335C88;*/
          color: #fff;
          /*float: left;*/
          font-size: 14px;
          cursor: pointer;
        }
      }
    }

    .pb_head_notice {
      width: 1000px;
      min-height: 85px;
      /*margin: 10px auto;*/
      margin: 60px auto 20px;
      clear: both;
      /*background: url('~assets/pc/home/headlines.png') no-repeat 0 center;*/
      /*background-image: url('~assets/pc/home/toutiao.png');*/
      /*background-repeat: no-repeat;*/
      /*background-position: 0 center;*/
      background-color: #ffffff;
      box-shadow: 0 3px 7px 0 rgba(0, 84, 164, 0.23);
      position: relative;

      .pb_head_notice_img {
        position: absolute;
        top: -5px;
        left: -5px;
        img {
          height: 100%;
        }
      }

      h2 {
        text-align: center;
        font-size: 18px;
        color: #DC0909;
        font-weight: bold;
        padding-top: 20px;
      }

      ul {
        margin: 10px auto;
        text-align: center;

        li {
          display: inline-block;
          font-size: 16px;
          line-height: 30px;
          margin: 5px 10px;
          width: 300px;
          height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
      }
    }

    .pb_item {
      width: 1000px;
      margin: 10px auto;
      display: flex;

      .pb_top_rated_l {
        width: 70%;
        padding-left: 10px;
        background: #ffffff;

        .pb_top_content {
          display: flex;
          width: 100%;

          .notice_item {
            width: 45%;
            font-size: 14px;
            margin-top: -10px;
            margin-bottom: 10px;

            li {
              margin: 14px 0 0 8px;
              text-align: -webkit-match-parent;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              padding: 0 0 0 14px;
              line-height: 22px;
              background: url('~assets/image/point.png') no-repeat 0 center;
              color: #000;
              font-size: 14px;
              cursor: pointer;
            }

            li a:hover {
              /*color: red;*/
              color: #335C88;
            }
          }
        }
      }

      .pb_top_rated_r {
        width: 30%;
        background: rgba(255, 255, 255, 0.6);
        margin-left: 10px;
      }
    }

    .pb_gathering {
      background: #ffffff;
      width: 1000px;
      margin: 10px auto;
      position: relative;
      padding: 10px 0 10px 8px;

      .gathering_list {
        position: relative;
        width: 980px;
        height: 150px;
        margin-left: 10px;
        overflow: hidden;

        ul {
          width: 9999px;

          li {
            display: inline-block;
            width: 235px;
            height: 150px;
            margin-right: 10px;
            line-height: 150px;

            img {
              width: 100%;
              height: 100%;
              position: relative;
            }

            .bottom {
              position: absolute;
              bottom: 0;
              width: 235px;
              opacity: 0.8;
              background-color: #EEEEEE;
              color: #333;
              line-height: 22px;
              font-size: 12px;
              padding: 0 8px;
              text-align: center;

              p {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }

          }
        }
      }
    }

    .pb_card {
      width: 1000px;
      margin: 20px auto;
      /*background: #ffffff;*/

      .pb_card_list {
        width: 1000px;
        margin: 0 auto;
        overflow: hidden;

        .pb_card_li {
          width: calc(34% - 25px);
          display: block;
          float: left;
          margin: 0 20px 15px 6px;
          min-height: 216px;
          background: #ffffff;
          padding: 0 20px 10px;
          height: 228px;

          .card_head {
            margin: 15px 0;
            overflow: auto;

            .card_head_l {
              padding-left: 5px;

              img {
                width: 28px;
                height: 28px;
                margin-top: -4px;
              }

              .name {
                display: inline-block;
                width: 24px;
                height: 24px;
                line-height: 24px;
                font-size: 14px;
                color: #fff;
                text-align: center;
                background: #E21718;
                /*background: #335C88;*/
                margin-right: 1px;
              }
            }

            .card_head_r {
              text-align: center;
              line-height: 24px;
              color: #999;
              cursor: pointer;
            }
          }

          .card_list {
            .card_li {
              text-align: -webkit-match-parent;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              padding: 0 0 0 16px;
              line-height: 32px;
              background: url('~assets/image/point.png') no-repeat 0 center;
              color: #000;
              font-size: 14px;
              cursor: pointer;
            }

            .card_li:hover {
              /*color: #E21718;*/
              color: #335C88;
            }
          }
        }

        .pb_card_li:nth-child(3n) {
          margin: 0 0 10px 0;
        }
      }
    }

    .pb_img {

      width: 1000px;
      margin: 10px auto;

      img {
        width: 100%;
        height: 140px;
      }
    }

    .pb_top_rated_title {
      background: url('~assets/pc/home/bg-content.png') no-repeat center 0 scroll;
      font-size: 14px;

      .org_map_tit {
        position: relative;
        height: 40px;
        line-height: 40px;
        background: url('~assets/pc/home/focus-tit.png') repeat-y 0 bottom #ffffff;

        .pb_title {
          font-size: 16px;
          color: #fd0501;
          /*color: #335C88;*/
          text-indent: 58px;
          line-height: 36px;
        }

        .more {
          font-size: 14px;
          position: absolute;
          right: 10px;
          z-index: 2;
          top: -2px;
          cursor: pointer;
          color: #999;
        }
      }
    }

    .home_map {
      background: url('~assets/pc/home/bg2.png') no-repeat center 0 scroll;
      background-size: 100% 100%;
      padding-bottom: 30px;
    }
    .party_organization {
      padding: 10px;
      width: 1000px;
      margin: 10px auto 0;
      background: #ffffff;

      .org_mr {
        margin: 10px 0 0;
        width: 100%;
        height: 400px;
      }

      /*.map_list {*/
      /*  width: 100%;*/
      /*  padding: 0 0 10px 5px;*/

      /*  .map_li {*/
      /*    width: calc(20% - 10px);*/
      /*    margin-top: 10px;*/
      /*    margin-right: 10px;*/
      /*    height: 32px;*/
      /*    line-height: 32px;*/
      /*    display: inline-block;*/
      /*    background: #EEEEEE;*/
      /*    font-size: 12px;*/
      /*    text-align: center;*/
      /*    color: #335C88;*/
      /*    white-space: nowrap;*/
      /*    text-overflow: ellipsis;*/
      /*    -o-text-overflow: ellipsis;*/
      /*    overflow: hidden;*/
      /*  }*/
      /*}*/
    }
  }
</style>
