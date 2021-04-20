<template>
  <div>
    <navHeader :title=title></navHeader>
    <div class="mv-tabs">
      <div class="tabs" ref="tabsWrapper">
        <ul ref="tab">
          <li v-for="(item, index) in studyTypeList" :key="index" @click="selectItem(index,item.id)" class="tab-item">
            <span :class="{tab_link:true,active:index===activeIndex}">{{item.typeName}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="news_list">
      <div class="news-container">
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
  import BScroll from 'better-scroll'
  import navHeader from '@/components/mobile/layout/nav-header'
  import {studyType, studyList} from '@/api/mobile'
  import config from '@/config'

  export default {
    components: {
      navHeader
    },
    data() {
      return {
        attachUrl: config.attachUrl,
        title: '学习列表',
        studyTypeList: [],
        studyNewList: [],
        tabs: [
          {
            to: '/mv/recommend-mv',
            title: '推荐'
          },
          {
            to: '/mv/music-mv',
            title: '音乐'
          },
          {
            to: 'show-mv',
            title: 'Show'
          },
          {
            to: '/mv/acg-mv',
            title: '二次元'
          },
          {
            to: '/mv/dance-mv',
            title: '舞蹈'
          },
          {
            to: '/mv/game-mv',
            title: '游戏'
          },
          {
            to: '/mv/mvs',
            title: 'mv'
          }
        ],
        activeIndex: 0,
        mX: 0,
        tabWidth: 100
      }
    },
    mounted() {
      this.studyType()
    },
    methods: {
      lookDetail(id) {
        this.$router.push({path: '/mobile/study/studyDetail', query: {id}})
      },
      studyType() {
        this.selectItem(this.$route.query.index * 1, this.$route.query.id)
        studyType({}).then(res => {
          if (res.code === 0) {
            this.studyTypeList = res.data
            this.$nextTick(() => {
              this._initMenu()
            })
          }
        })
      },
      selectItem(index, id) {
        this.activeIndex = index
        let tabs = this.$refs.tab
        let moveX = +tabs.style.transform.replace(/[^0-9\-,]/g, '').split(',')[0]
        if (moveX === 1) {
          this.mX = 0
        }
        switch (index) {
          case 0:
            if (moveX <= 0 && moveX > -this.tabWidth) {
              this.mX = 0
            }
            break
          case 1:
            if (moveX <= 0 && moveX > -this.tabWidth * 2) {
              this.mX = 0
            }
            break
          case 2:
            if (moveX <= 0 && moveX >= -this.tabWidth * 2) {
              this.mX = 0
            }
            break
          case 3:
            if (moveX <= 0 && moveX >= -this.tabWidth * 2) {
              this.mX = -this.tabWidth
            }
            break
          case 4:
            if (moveX <= 0 && moveX >= -this.tabWidth * 2) {
              this.mX = -this.tabWidth * 2
            }
            break
          case 5:
            if (moveX <= 0 && moveX >= -this.tabWidth * 2) {
              this.mX = -this.tabWidth * 2
            }
            break
          default:
            break
        }
        tabs.style.transform = `translate(${this.mX}px, 0)`
        studyList({studyTypeId: id}).then(res => {
          this.studyNewList = res.data.list
        })
      },
      _initMenu() {
        let tabsWidth = this.tabWidth
        let width = this.studyTypeList.length * tabsWidth
        this.$refs.tab.style.width = `${width}px`
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.tabsWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .mv-tabs {
    position: relative;
    top: 7vh;
    bottom: 0;
    width: 100%;

    .tabs {
      height: 7vh;
      line-height: 7vh;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
    }

    .tab-item {
      float: left;
      width: 100px;
      /*padding: 0 6vw;*/
      height: 6vh;
      text-align: center;
    }

    .tab_link {
      font-size: 2vh;
      color: #333333;
      padding-bottom: 1.5vw;
    }

    .active {
      color: #d33a31;
      border-bottom: 2px solid #d33a31;
    }
  }

  .news_list {
    margin-top: 7vh;
    padding: 0 5vw;

    .news-container {
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

      margin-bottom: 5.8vh;
    }


  }

</style>
