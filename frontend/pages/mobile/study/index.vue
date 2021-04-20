<template>
  <div class="container">
    <navHeader :title=title />
    <div class="study_head">
    </div>
    <div class="study_menu">
      <div class="menu_item" v-for="(item,index) in studyTypeList" :key="index" @click="gotoStudyList(index,item.id)">
        <p class="menu_item_name">{{item.typeName}}</p>
        <p class="menu_item_value">{{'课程 '+item.num}}</p>
      </div>
    </div>
    <div class="news_list">
      <div class="news-container">
        <div class="title">最新党课</div>
        <div class="news-list">
          <div class="news-item" v-for="(item,index) in studyNewList" :key="index" @click="lookDetail(item.id)">
            <img :src="attachUrl+item.imgUrl" alt=""/>
            <div class="news">
              <div class="news-title">{{item.title}}</div>
              <div class="news-info">
                {{item.userStudyNum+'人学习'}}
                <div class="look">
                  <span>{{$op.moment(item.createTime * 1000).format('yyyy-MM-DD')}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import {studyType, studyNew} from '@/api/mobile'
  import config from '@/config';
  export default {
    layout: 'mobile',
    name: "index",
    data() {
      return {
        title: '在线学习',
        studyNewList: [],
        studyTypeList: [],
        attachUrl: config.attachUrl
      }
    },
    components: {
      navHeader
    },
    head() {
      return {
        title: this.$store.state.app.title + '- 在线学习',
        meta: [
          {
            hid: this.$store.state.app.title,
            name: this.$store.state.app.title,
            content: this.$store.state.app.title
          }
        ]
      }
    },
    methods: {
      lookDetail(id) {
        this.$router.push({path: '/mobile/study/studyDetail', query: {id}})
      },
      gotoStudyList(index,id) {
        this.$router.push({path: '/mobile/study/studyGroup', query: {index,id}})
      },
      studyNew() {
        studyNew({}).then(res => {
          if (res.code === 0) {
            this.studyNewList = res.data.list
          }
        })
      },
      studyType() {
        studyType({}).then(res => {
          if (res.code === 0) {
            this.studyTypeList = res.data
          }
        })
      }
    },
    async mounted() {
      this.studyNew()
      this.studyType()
    }
  }
</script>

<style scoped lang="less">
  .container {
    background-color: #f5f5f5;

    .study_head {
      background: url('~assets/mobile/study/bg.png') no-repeat center 0 scroll;
      background-size: 100% 24vh;
      height: 24vh;
    }

    .study_menu {
      padding: 2vw 5vw 0vw 5vw;
      width: 100%;
      background-color: #f5f5f5;

      .menu_item {
        width: calc(33.33% - 4vw);
        text-align: center;
        padding: 2vw 0;
        display: inline-block;
        margin: 2vw;
        border-radius: 2vw;
        background: #f5f5f5;

        .menu_item_name {
          line-height: 4vh;
          color: #ffffff;
          font-size: 2vh;
        }

        .menu_item_value {
          border-radius: 2vw;
          font-size: 1.6vh;
          background-color: rgba(0, 0, 0, 0.1);
          opacity: .8;
          height: 2.6vh;
          line-height: 2.6vh;
          font-weight: bold;
          color: #ffffff;
          margin: 0 4vw;
        }
      }

      .menu_item:nth-child(2n-1) {
        background: #3D86D1;
      }

      .menu_item:nth-child(2n) {
        background: #E57421;
      }

      .menu_item:nth-child(3n) {
        background: #E9A921;
      }
    }

    .news_list {
      padding: 5vw;
      background-color: #f5f5f5;

      .news-container {
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
        border-bottom: 1px solid #EEEEEE;
        display: flex;
        cursor: pointer;

        & > img {
          width: 22vw;
          min-width: 22vw;
          height: 18vw;
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
    }
  }
</style>
