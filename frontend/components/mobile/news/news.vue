<template>
  <div class="news-container">
    <navHeader :title="title"></navHeader>
    <div class="news">
      <div class="search">
        <img src="@/assets/mobile/news/news.png" alt="" @click="showBox=!showBox">
        <div class="input">
          <i class="el-icon-search"></i>
          <input type="text" placeholder="请输入关键字搜索">
        </div>
      </div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" v-if="newsMenu.children">
        <el-menu-item index="-1" @click="selectMenu('-1',newsMenu.id)"
                      :style="{width: (100 / (newsMenu.children.length+1))+'%'}">{{newsMenu.label}}
        </el-menu-item>
        <el-menu-item :index="''+index" v-for="(item,index) in newsMenu.children" :key="index"
                      :style="{width: (100 / (newsMenu.children.length+1))+'%'}"
                      @click="selectMenu(''+index,item.id)">{{item.label}}
        </el-menu-item>
      </el-menu>
      <carousel :carousel="newsList"></carousel>
      <newsList :newsList="newsLists"></newsList>
    </div>
    <div class="message" v-show="showBox">
      <ul class="msg_list">
        <li class="msg_li">
          <span class="name">回复我的</span>
          <span class="number">20</span>
        </li>
        <li class="msg_li">
          <span class="name">我评论的</span>
          <span class="number"></span>
        </li>
        <li class="msg_li">
          <span class="name">我收藏的</span>
          <span class="number"></span>
        </li>
        <li class="msg_li">
          <span class="name">我的点赞</span>
          <span class="number">10</span>
        </li>
      </ul>
      <div class="item">
        <p class="name">我的党组织</p>
        <span>中国联通</span>
      </div>
      <div class="item">
        <p class="name">常用党组织</p>
        <ul class="org_list">
          <li class="org_li fl">系统集成（云数据）党总支</li>
          <li class="org_li fl">综合与市场党支部</li>
          <li class="org_li fl">系统集成党支部</li>
        </ul>
      </div>
      <div class="item">
        <p class="name">全部党组织</p>
        <ul class="org_list">
          <li class="org_li">系统集成（云数据）党总支</li>
          <li class="org_li">综合与市场党支部</li>
          <li class="org_li">系统集成党支部</li>
          <li class="org_li">综合与市场党支部</li>
          <li class="org_li">系统集成党支部</li>
        </ul>
      </div>
    </div>
    <div class="mask" v-if="showBox" @click="showBox = false"></div>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import carousel from '@/components/mobile/swiper/carousel'
  import newsList from '@/components/mobile/home/news-list'
  import {getChannels, getArticleList} from '@/api/pc'
  import config from '@/config'

  export default {
    name: "news",
    data() {
      return {
        title: this.$route.query.name,
        activeIndex: '-1',
        newsMenu: [],
        newsList: [],
        newsLists: {},
        showBox: false
      }
    },
    components: {
      navHeader,
      carousel,
      newsList
    },
    methods: {
      selectMenu(index, id) {
        this.activeIndex = index
        this.getList(id)
      },
      getMenu(id) {
        getChannels(id).then(res => {
          if (res.code === 0) {
            this.newsMenu = res.data[0]
          }
        })
      },
      getList(id) {
        let where = {
          pageSize: 9999,
          pageNum: 1,
        }
        getArticleList(where, {articleChannelId: id}).then(res => {
          if (res.code === 0) {
            this.newsList = res.data.list
            this.newsList.forEach(item => {
              item.articleShowImg = config.attachUrl + item.articleShowImg
            })
            this.newsLists = {title: '', list: this.newsList}
          }
        })
      }
    },
    mounted() {
      let {id} = this.$route.query
      this.getList(id)
      this.getMenu(id)
    }
  }
</script>

<style scoped lang="less">
  .news-container {
    .news {
      padding: 0 5vw;

      .search {
        display: flex;
        margin: 2vw auto 4.2vw auto;
        height: 4.6vh;
        line-height: 4.6vh;

        img {
          width: 6vw;
          height: 6vw;
          margin: auto 2vw auto 0;
        }

        .input {
          width: 85vw;
          border: 1px solid #CCCCCC;
          border-radius: 1vw;
          height: 4.6vh;
          line-height: 4.6vh;

          i {
            padding: 0 1vw 0 2vw;
          }

          input {
            margin-top: -2vw;
            padding-top: .5vw;
            width: 70vw;
            /*height: 4.2vh;*/
            /*line-height: 4.2vh;*/
            font-size: 1.8vh;
          }
        }

        .input:hover {
          border: 1px solid #F4473A;
        }

      }

      .el-menu {
        width: 100%;
        margin-bottom: 1vh;

        .el-menu-item {
          line-height: 3vh;
          padding: 0 3vw;
          width: 25%;
          font-size: 2.2vh;
          text-align: center;
        }
      }

      .el-menu--horizontal {
        border-bottom: none;

        .el-menu-item {
          height: 4vh;
          color: #343434;
        }

        .is-active {
          border-bottom: 2px solid #F4473A;
          color: #F4473A;
        }
      }
    }

    .message {
      width: 100%;
      padding: 0 5vw 2vw 5vw;
      position: absolute;
      margin: 0 auto;
      background: #ffffff;
      top: 13vh;
      z-index: 10;

      .msg_list {
        margin: 2vw 0;
        width: 100%;
        border-bottom: 1px solid #CCCCCC;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        text-align: justify;

        .msg_li {
          width: 30%;
          border: 1px solid #CCCCCC;
          padding: 1.4vw 2.8vw;
          text-align: center;
          margin: 2vw 0;
          border-radius: 2vw;
          position: relative;

          .number {
            display: block;
            position: absolute;
            top: -1vw;
            right: -1vw;
            font-size: 1.2vh;
            border-radius: 50%;
            background: #F44436;
            color: #ffffff;
            text-align: center;
            padding: 0 1.2vw;
          }
        }
      }

      .item {
        margin: 1vw 0;

        .name {
          font-size: 1.8vh;
          color: #000;
          line-height: 3.6vh;
        }

        span {
          display: inline-block;
          width: 30%;
          border: 1px solid #CCCCCC;
          padding: 1.4vw 2.8vw;
          text-align: center;
          margin: 2vw 2.4% 2vw 0;
          border-radius: 2vw;
          background: #F44436;
          color: #ffffff;
        }

        .org_list {
          overflow: auto;

          .org_li {
            font-size: 1.5vh;
            color: #6C9DE4;
            line-height: 3.4vh;
            margin-right: 5vw;
          }
        }
      }
    }
    .mask {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
      position: absolute;
      top: 13.5vh;
      left: 0;
      z-index: 3;
    }
  }
</style>
