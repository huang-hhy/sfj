<template>
  <div class="newsDetail">
    <div class="navList">
      <div class="navL">
        <img src="@/assets/pc/all-in-one/danghui.png" style="cursor: pointer" @click="gotoIndex">
        <div class="navLItem" v-for="(item, index) in allList" :key="index" @click="changeArticleChannelId(item.id)">
          <div :class="item.id === articleChannelId ? 'itemNav' : 'nav' ">{{ item.articleChannelName }}</div>
        </div>
      </div>
      <div class="navR">
        <img src="@/assets/pc/all-in-one/lanmu.png" @click="gotoChannel">
        <div v-for="(item, index) in channelsList" :key="index" @click="hotArticle(item)">
          <div :class="item.id === id ? 'navRItem' : 'nav'">
            <span v-for="(item2, index2) in item.articleTitle" :key="index2" v-if="index2 < 10">{{ item2 }}</span>
            <span v-if="item.articleTitle.length > 10">……</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="news">
        <div class="header">
          <h1 class="title">{{ list.articleTitle }}</h1>
          <el-tag type="success" v-if="list.articleName">
            <span style="padding: 20px">{{ list.articleName }}</span>
          </el-tag>
          <div class="tip">
            <span
              style="margin-right: 50px;">发布时间： {{ moment(list.publicTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
            <span>来源： {{ list.orgName }}</span>
          </div>
        </div>
        <div v-if="list.videoUrl" style="margin: 50px auto; text-align: center">
          <video
            :src="attachUrl + list.videoUrl"
            controls="controls"
            width="90%"
          />
        </div>
        <div class="article" v-html="list.articleInfo.content"/>
        <div v-if="list.enclosure && list.enclosure.length > 0" class="enclosure">
          <p>附件：</p>
          <div v-for="(item, index) in list.enclosure" :key="index">
            <a :href="downloadUrl + '?name=' + item.url">{{ item.name }}</a>
          </div>
        </div>
      </div>
      <div class="hotList">
        <div class="hoArticleTile">热门文章推荐</div>
        <div class="articleItem" v-for="(item, index) in hotList" :key="index" v-if="index < 9" @click="hotArticle(item)">
          <span class="articleIndex"
                :class="index === 0 ? 'index1' : (index === 1 ? 'index2' : (index === 2 ? 'index3' : '' ))">{{ index + 1 }}</span>
          <span class="articleName" v-for="(item2, index2) in item.articleTitle" :key="index2" v-if="index2 < 7">{{ item2 }}</span>
          <span class="articleName" v-if="item.articleTitle.length > 7">……</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getAllInOne, getArticle, getArticleList, getHotArticle} from '@/api/pc'
  import {decrypt, encrypt} from "../../../libs/tools";
  import moment from 'moment'
  import Video from "../../mobile/study/studyDetail";
  import config from '@/config'

  export default {
    name: "detail",
    components: {Video},
    head() {
      return {
        title: this.channelName + ' - 新闻详情'
      }
    },
    data() {
      return {
        id: '',
        list: {
          articleInfo: {}
        },
        articleChannelId: '',
        channelsList: [],
        hotList: [],
        moment: moment,
        attachUrl: config.attachUrl,
        downloadUrl: '/api/common/download/resource',
        channelName: '',
        allList: []
      }
    },
    mounted() {
      this.id = decrypt(this.$route.query.id)
      this.articleChannelId = decrypt(this.$route.query.articleChannelId)
      this.getChannels()
      this.getHotList()
      this.getList()
      this.getAllList()
    },
    methods: {
      getChannels() {
        const data = {
          articleChannelId: this.articleChannelId
        }
        getArticleList({}, data).then(res => {
          if (res.code * 1 === 0) {
            this.channelsList = res.data.list
          }
        })
      },
      getAllList() {
        getAllInOne().then(res => {
          if (res.code * 1 === 0) {
            const tmp = res.data.channels
            tmp.forEach(item => {
              if (item.articleChannelName !== '活力党建') {
                this.allList.push(item)
              }
            })
            this.allList.forEach(item => {
              if (item.id === this.articleChannelId) {
                this.channelName = item.articleChannelName
              }
            })
          }
        })
      },
      getHotList() {
        getHotArticle().then(res => {
          if (res.code * 1 === 0) {
            this.hotList = res.data
          }
        })
      },
      getList() {
        getArticle(this.id).then(res => {
          console.log(res)
          if (res.code * 1 === 0) {
            console.log(res)
            this.list = res.data
            this.list.enclosure = this.list.enclosure ? JSON.parse(this.list.enclosure) : []
          }
        })
      },
      hotArticle(item) {
        this.id = item.id
        this.articleChannelId = item.articleChannelId
        this.getChannels()
        this.getList()
        this.getHotList()
      },
      gotoChannel() {
        this.$router.push({
          path: '/pc/all-in-one/channel',
          query: {
            name: this.channelName,
            id: encrypt(this.articleChannelId)
          }
        })
      },
      changeArticleChannelId(id) {
        this.articleChannelId = id
        this.getChannels()
      },
      gotoIndex() {
        this.$router.push({
          path: '/pc/all-in-one'
        })
      }
    }
  }
</script>

<style scoped>
  .article >>> div, .article >>> p {
    font-size: 80px;
    line-height: 200px;
  }

  .article >>> table {
    width: 100%;
  }

  .article >>> img {
    width: 80%;
  }

  .article >>> table p {
    width: 78%;
    font-size: 40px;
    line-height: 100px;
    margin: auto;
  }
</style>

<style scoped lang="less">
  .newsDetail {
    width: 3685px;
    height: 2211px;
    overflow: auto;

    .navList {
      width: 30%;
      height: 100%;
      float: left;

      .navL {
        width: 50%;
        float: left;
        background: #335C88;
        font-size: 80px;
        line-height: 200px;
        height: 100%;
        color: #ffffff;
        text-align: center;
        padding: 50px 0;

        .itemNav, .nav:hover {
          color: #DC0909;
          cursor: pointer;
        }
      }

      .navR {
        width: 50%;
        height: 100%;
        float: left;
        background: #c6e2ff;
        padding: 100px 0;
        text-align: center;
        font-size: 40px;
        line-height: 120px;

        img {
          width: 60%;
          margin: 50px 0;
          cursor: pointer;
          /*transform: rotate(3deg);*/
        }

        .navRItem, .nav:hover {
          color: #DC0909;
          cursor: pointer;
        }
      }
    }

    .container {
      float: left;
      width: 70%;
      height: 100%;

      .news {
        width: 70%;
        height: 100%;
        float: left;
        padding: 50px;
        overflow: auto;

        .header {
          text-align: center;

          .title {
            font-size: 90px;
            line-height: 150px;
            color: #1a1a1a;
            font-weight: bold;
          }

          .el-tag {
            font-size: 60px;
            height: 100px;
            line-height: 100px;
            margin: 20px 0;
          }

          .tip {
            font-size: 40px;
            line-height: 80px;
          }
        }
        .article {
          margin: 80px 0 30px;
        }

        .enclosure {
          margin: 100px 0 50px;
          font-size: 60px;
          line-height: 100px;
        }
      }

      .hotList {
        float: left;
        width: 30%;
        height: 100%;
        padding: 100px 50px;

        .hoArticleTile {
          font-size: 100px;
          line-height: 180px;
          color: #DC0909;
          border-bottom: #9C9C9C 1px dotted;
        }

        .articleItem {
          font-size: 60px;
          line-height: 100px;
          margin: 50px 0;
          cursor: pointer;

          .articleIndex {
            display: inline-block;
            padding: 2px 25px;
            margin-right: 20px;
            background-color: #c2c0c0;
            color: #ffffff;
          }

          .index1, .index2, .index3 {
            font-style: italic;
            padding: 2px 30px 2px 20px;
          }

          .index1 {
            background-color: #f72f56;
          }

          .index2 {
            background-color: #fc7648;
          }

          .index3 {
            background-color: #ff9d1e;
          }

        }
      }

      .news::-webkit-scrollbar {
        width: 2px;
      }
    }
  }

  .newsDetail::-webkit-scrollbar {
    width: 2px;
  }

  /*.newDetail {*/
  /*  width: 3685px;*/
  /*  height: 2211px;*/
  /*  overflow: hidden;*/

  /*  .navList {*/
  /*    width: 500px;*/
  /*    height: 1050px;*/
  /*    float: left;*/
  /*    overflow: hidden;*/

  /*    .navL {*/
  /*      float: left;*/
  /*      height: 100%;*/
  /*      width: 240px;*/
  /*      padding: 50px 0;*/
  /*      text-align: center;*/
  /*      background-color: #335C88;*/
  /*      line-height: 60px;*/
  /*      color: #ffffff;*/
  /*      font-size: 20px;*/
  /*      cursor: pointer;*/

  /*      img {*/
  /*        margin-bottom: 30px;*/
  /*        cursor: pointer;*/
  /*      }*/

  /*      .itemNav {*/
  /*        background-color: #d34d4d;*/
  /*      }*/
  /*    }*/

  /*    .navR {*/
  /*      float: left;*/
  /*      width: 260px;*/
  /*      height: 100%;*/
  /*      background-color: #f0f1f5;*/

  /*      .navRItem {*/
  /*        font-size: 14px;*/
  /*        line-height: 30px;*/
  /*        cursor: pointer;*/
  /*      }*/
  /*    }*/
  /*  }*/

  /*  .detail {*/
  /*    width: 1000px;*/
  /*    margin: 30px;*/
  /*    float: left;*/

  /*    .header {*/
  /*      margin: 30px 0;*/
  /*      text-align: center;*/

  /*      .title {*/
  /*        font-size: 36px;*/
  /*        color: #1a1a1a;*/
  /*        font-weight: bold;*/
  /*        text-align: center;*/
  /*        line-height: 60px;*/
  /*      }*/

  /*      .el-tag {*/
  /*        margin: 5px 0;*/
  /*      }*/
  /*    }*/

  /*    .enclosure {*/
  /*      margin: 30px 0;*/
  /*      line-height: 30px;*/
  /*      font-size: 16px;*/

  /*      p {*/
  /*        font-size: 18px;*/
  /*      }*/
  /*    }*/
  /*  }*/
  /*  .hotArticle {*/
  /*    width: 300px;*/
  /*    margin-top: 30px;*/
  /*    float: left;*/

  /*    .hotArticleTitle {*/
  /*      padding: 10px 5px;*/
  /*      font-size: 28px;*/
  /*      color: #DC0909;*/
  /*      line-height: 40px;*/
  /*      border-bottom: #9C9C9C 1px dotted;*/
  /*      margin-bottom: 20px;*/
  /*    }*/

  /*    .hotArticleItem {*/
  /*      font-size: 16px;*/
  /*      margin: 5px 0;*/
  /*      cursor: pointer;*/
  /*      .hotArticleIndex {*/
  /*        display: inline-block;*/
  /*        padding: 2px 8px;*/
  /*        margin-right: 5px;*/
  /*        background-color: #c2c0c0;*/
  /*        color: #ffffff;*/
  /*      }*/

  /*      .index1, .index2, .index3 {*/
  /*        font-style: italic;*/
  /*        padding: 2px 10px 2px 8px;*/
  /*      }*/
  /*      .index1 {*/
  /*        background-color: #f72f56;*/
  /*      }*/

  /*      .index2 {*/
  /*        background-color: #fc7648;*/
  /*      }*/

  /*      .index3 {*/
  /*        background-color: #ff9d1e;*/
  /*      }*/

  /*      .hotArticleName {*/
  /*        line-height: 50px;*/
  /*      }*/
  /*    }*/

  /*    .hotArticleItem:hover {*/
  /*      color: #d34d4d;*/
  /*    }*/
  /*  }*/
  /*}*/
</style>
