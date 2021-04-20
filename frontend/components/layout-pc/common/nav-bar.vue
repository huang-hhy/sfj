<template>
  <div class="menu_container">
    <div class="header">
<!--      <img src="@/assets/pc/nav-bar/danghui.png" style="vertical-align: top">-->
      <img :src="logo" class="logo" v-if="logo">
<!--      <h2 class="title">{{title}}</h2>-->
      <div style="display:inline-block; width: 383px">
        <h2 class="title">{{ title }}</h2>
        <div class="tip">
          <img src="@/assets/pc/nav-bar/xian-left.png">
          <span class="text">{{ siteUrl }}</span>
          <img src="@/assets/pc/nav-bar/xian-right.png">
        </div>
      </div>
    </div>
    <div id="pb_menu">
      <ul class="pb_wrap">
        <li @click="goto(item.path, {id:item.id, name:item.name})" v-for="(item,index) in list"
            :class="{pb_fir:true,pb_fir_active:$route.query.name===item.name}"
            :key="index">{{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapActions} from "vuex";
  import {encrypt} from "../../../libs/tools";

  export default {
    name: 'NavBar',
    props: {
      value: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        // default: '智慧党建云平台欢迎您'
        default: '广州司法局党建云平台'
      },
      logo: {
        type: String,
        default: ''
      }
    },
    data: () => {
      return {
        siteUrl: '',
        menuData: [
          {id: 1, name: '首页', path: '/pc/home'},
          {id: 2, name: '党建要闻', path: '/pc/news'},
          {id: 3, name: '文明创建', path: '/pc/news'},
          {id: 4, name: '党员先锋', path: '/pc/news'},
          {id: 5, name: '橙团青春', path: '/pc/news'},
          {id: 6, name: '学习专栏', path: '/pc/course/study'},
          {id: 7, name: '两学一做', path: '/pc/news'},
          {id: 8, name: '在线学习', path: '/pc/course'},
          {id: 9, name: '个人中心', path: '/pc/profile'},
          {id: 10, name: '后台管理', path: '/pc/manage'}
        ],
        list: []
      }
    },
    watch: {
      value: {
        handler(val) {
          this.menuData = Object.assign(this.menuData, val)
          this.list = JSON.parse(JSON.stringify(val))
        },
        deep: true
      }
    },
    mounted() {
      this.siteUrl = window.document.location.hostname
      this.setUserCenter()
    },
    methods: {
      ...mapActions({
        setUserCenter: 'user/setUserCenter'
      }),
      goto(path, query) {
        if (path === '/pc/home' || path === '/pc/profile' || path === '/pc/course' || path === '/pc/partyManagement' || path === '/pc/bbs') {
          delete query.id
        }
        let params = {
          id: query.id
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: path,
          query: {
            params: params,
            name: query.name
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .menu_container {
    /*background: url('~assets/pc/home/headbg.png') no-repeat center 0 scroll;*/
    background: url('~assets/pc/home/newHeaderBg.png') no-repeat center 0 scroll;
    /*background-size: 100% 250px;*/
    background-size: 100% 100%;
    margin: 0 auto;
    padding-top: 50px;
    .header{
      height: 220px;
      min-width: 1000px;
      max-width: 1000px;
      margin: 0 auto;
      padding-top: 30px;
      .logo{
        max-width: 200px;
        vertical-align: top;
      }
      .title {
        margin-top: 30px;
        font-size: 30px;
        color: #CB0000;
        /*color: #335C88;*/
        font-weight: bold;
        /*letter-spacing: 10px;*/
        text-align: center;
      }

      .tip {
        margin: 20px 0;

        .text {
          color: #0054a4;
          font-size: 14px;
          font-weight: bold;
        }
        img {
          width: 30%;
        }
      }

    }

    #pb_menu {
      color: rgb(51, 51, 51);
      font-size: 16px;
      line-height: 22.8571px;
      /*background: #E4393C;*/
      /*background: #335C88;*/
      background: #D24942;
      height: 40px;
      position: relative;

      .pb_wrap {
        width: 1000px;
        margin: 0 auto;
        position: absolute;
        top: 14px;
        left: 50%;
        transform: translate(-50%, -50%);

        .pb_fir {
          /*width: 10%;*/
          width: 11.11%;
          /*width: 12.5%;*/
          height: 50px;
          line-height: 50px;
          float: left;
          overflow: hidden;
          /*color: #E33A3C;*/
          color: #D24942;
          /*color: #4D78A3;*/
          background: #FFFFFF;
          display: inline-block;
          *display: inline;
          *zoom: 1;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.5s;
          text-align: center;
          /*border-bottom: 1px solid #E02024;*/
          border-bottom: 1px solid #D24942;
          /*border-bottom: 1px solid #335C88;*/
          /*border-right: 1px solid #E4393C;*/
        }

        .pb_fir_active {
          color: #fff;
          background: #E33A3C;
          /*background: #D24942;*/
          /*background: #426991;*/
        }

        .pb_fir:hover {
          background: #E33A3C;
          /*background: #D24942;*/
          /*background: #426991;*/
          color: #fff;
        }
      }
    }
  }
</style>
