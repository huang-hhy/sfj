<template>
  <div class="news-container" :style="{backgroundColor:background}">
    <div class="title" v-if="newsList.title">
      {{newsList.title}}
    </div>
    <div class="news-list">
      <div class="news-item" v-for="(item,index) in newsList.list" :key="index" @click="lookDetail(item.id)">
        <img :src="attachUrl+item.articleShowImg" alt=""/>
        <div class="news">
          <div class="news-title">
            <span :class="{type:true,red:item.type=='置顶',yellow:item.type=='党建要闻'}" v-if="item.type">{{item.type}}</span>
            {{item.articleTitle}}
          </div>
          <div class="news-info">
            {{$op.moment(item.createTime * 1000).format('yyyy-MM-DD')}}
            <div class="look">
              <img src="@/assets/mobile/home/liulanliang.png" alt=""/>
              <span>{{item.browseNumber}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '@/config'
  export default {
    name: 'new-list',
    props: {

      newsList: {
        type: Object
      },
      background: {
        type: String,
        default: '#ffffff'
      }
    },
    data() {
      return {
        attachUrl: config.attachUrl,
      }
    },
    methods: {
      lookDetail(id) {
        this.$router.push({path: '/mobile/news/detail', query: {id: id}})
      }
    }
  }
</script>

<style scoped lang="less">
  .news-container {
    background-color: #ffffff;
    margin-bottom: 5.8vh;
  }

  .title {
    border-left: 4px solid #F44436;
    height: 4vw;
    line-height: 4vw;
    font-size: 3.8vw;
    color: #333333;
    padding-left: 2vw;
    .more {
      float: right;
      color: #999999;
      font-size: 3.5vw;
      cursor: pointer;
    }
  }

  .news-item {
    clear: both;
    padding: 4vw 0 2vw;
    border-bottom: 1px solid rgba(222, 222, 222, 0);
    display: flex;
    cursor: pointer;

    & > img {
      width: 24vw;
      min-width: 24vw;
      height: 16vw;
    }
  }

  .news {
    margin-left: 2vw;
    width: 64vw;
    & > .news-title {
      font-size: 3.5vw;
      color: #333333;
      line-height: 5vw;
      height: 10vw;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-align: justify;
      margin-bottom: 2vw;
      & > .type {
        /*margin-left: 10px;*/
        padding: 2px 4px;
        font-size: 2.6vw;
      }

      & > .red {
        color: #F6594D;
        border: 1px solid #F6594D;
      }

      & > .yellow {
        color: #fdd56f;
        border: 1px solid #fdd56f;
      }
    }

    & > .news-info {
      color: #999999;
      font-size: 3vw;
      padding-top: 1.2vw;
      line-height: 3vw;
      & > .look {
        float: right;
        align-items: center;
        justify-content: center;
        display: flex;

        img {
          width: 3.2vw;
          height: 3vw;
          margin-right: 3px;
        }
      }
    }
  }
</style>
