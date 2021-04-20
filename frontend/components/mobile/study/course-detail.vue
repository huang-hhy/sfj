<template>
  <div>
    <navHeader :title="title"></navHeader>
    <div class="course_detail">
      <div class="video">
<!--        <img src="@/assets/mobile/study/video.png" alt="" class="right">-->
                <video :src="attachUrl+item.videoUrl" class="right" controls="controls">您的浏览器不支持 video 标签。</video>
      </div>
      <section class="change_show_type" ref="chooseType">
        <div>
          <span :class='{activity_show: changeShowType =="detail"}' @click="changeType('detail')">详情</span>
        </div>
        <div>
          <span :class='{activity_show: changeShowType =="catalog"}' @click="changeType('catalog')">目录</span>
        </div>
        <div>
          <span :class='{activity_show: changeShowType =="comment"}' @click="changeType('comment')">评价</span>
        </div>
      </section>
      <section class="detail_content" v-show="changeShowType == 'detail'">
        <div class="detail">
          <h2 class="course_title">{{item.title}}</h2>
          <p class="class_hour">{{ item.orgName }}</p>
          <p class="course_item_name">积分说明</p>
          <p class="course_item_content">学习完成可获得{{item.score}}积分</p>
          <p class="course_item_name">课程介绍</p>
          <p class="course_item_content">至少观看时长{{item.times}}秒，支部学习人数{{item.orgStudyNum}}人，总学习人数{{item.userStudyNum}}人。</p>
        </div>
      </section>
      <section class="catalog_content" v-show="changeShowType == 'catalog'">
        <div class="catalog">
          <h2 class="catalog_title">
            课程目录
            <span class="class"></span>
          </h2>
          <ul class="catalog_list">
            <p>暂无目录</p>
            <!--            <li class="catalog_li" v-for="(item,index) in couseList" :key="index">-->
            <!--              <div class="catalog_li_l fl">-->
            <!--                <span class="number">{{item.id}}</span>-->
            <!--                <div class="content">-->
            <!--                  <p class="name">{{item.name}}</p>-->
            <!--                  <p class="time">-->
            <!--                    <span>{{item.time}}</span>-->
            <!--                    <span>{{item.study}}</span>-->
            <!--                  </p>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div class="catalog_li_r fr">-->
            <!--                <span class="look">观看</span>-->
            <!--              </div>-->
            <!--            </li>-->
          </ul>
        </div>
      </section>
      <section class="comment_content" v-show="changeShowType == 'comment'">
        <p>暂无评价</p>
<!--        <comment></comment>-->
      </section>
    </div>
  </div>
</template>

<script>
import navHeader from '@/components/mobile/layout/nav-header'
import comment from '@/components/mobile/reply/comment'
import {getCourseDetail} from '@/api/mobile'
import config from '@/config'

export default {
  name: "course-detail",
  data() {
    return {
      title: '在线视频',
      changeShowType: 'detail',
      attachUrl: config.attachUrl,
      item: {},
      couseList: [
        {id: '01', name: '教育基础：怎么样宝宝快速学会走路1？', time: '11分44秒', study: '12人学过'},
        {id: '02', name: '教育基础：怎么样宝宝快速学会走路2？', time: '11分44秒', study: '12人学过'},
        {id: '03', name: '教育基础：怎么样宝宝快速学会走路3？', time: '11分44秒', study: '12人学过'},
        {id: '04', name: '教育基础：怎么样宝宝快速学会走路4？', time: '11分44秒', study: '12人学过'},
        {id: '05', name: '教育基础：怎么样宝宝快速学会走路5？', time: '11分44秒', study: '12人学过'},
        {id: '06', name: '教育基础：怎么样宝宝快速学会走路6？', time: '11分44秒', study: '12人学过'},
        {id: '07', name: '教育基础：怎么样宝宝快速学会走路7？', time: '11分44秒', study: '12人学过'}
      ]
    }
  },
  methods: {
    changeType(name) {
      this.changeShowType = name
    },
    getCourseInfo(id) {
      getCourseDetail(id).then(res => {
        console.log(res)
        if (res.code * 1 === 0) {
          this.item = res.data
          console.log(this.item)
        }
      })
    },

  },
  mounted() {
    let {id} = this.$route.query
    this.getCourseInfo(id)
  },
  components: {
    navHeader,
    comment,
    config
  }
}
</script>

<style scoped lang="less">
.course_detail {
  margin-top: 7vh;
  .video {
    height: 30vh;

    .right {
      width: 100%;
      height: 30vh;
    }
  }

  .change_show_type {
    height: 5vh;

    div {
      width: 33.33%;
      float: left;
      text-align: center;
      line-height: 5vh;
      font-size: 2vh;
      background: #fff;

      span {
        &.activity_show {
          color: #4DCE9C;
          font-weight: bold;
          border-bottom: .6vw solid #4DCE9C;
          padding: 2vw 3vw;
        }
      }
    }
  }

  .detail_content {
    border-top: .2vw solid #eeeeee;
    padding: 2vw 5vw;

    .detail {
      .course_title {
        font-size: 2.4vh;
        color: #333333;
        font-weight: bolder;
        line-height: 3vh;
        padding: 1vw 0;
        text-align: justify;
      }

      .class_hour {
        color: #FD6123;
        font-size: 2vh;
        line-height: 3.8vh;
        margin-bottom: 5vw;
      }

      .course_item_name {
        border-top: .2vw solid #eeeeee;
        font-size: 2vh;
        color: #333333;
        text-align: justify;
        line-height: 3.8vh;
        padding-top: 2vw;
      }

      .course_item_content {
        font-size: 2vh;
        color: #999999;
        text-align: justify;
        line-height: 3.2vh;
        margin-bottom: 2vw;
      }
    }
  }

  .catalog_content {
    border-top: .2vw solid #eeeeee;
    padding: 2vw 5vw;

    .catalog {
      .catalog_title {
        font-size: 2.2vh;
        font-weight: bolder;
        padding: 1vw 0 2vw 0;
        color: #333333;

        .class {
          font-size: 1.8vh;
          color: #666666;
        }
      }

      .catalog_list {
        .catalog_li {
          overflow: auto;
          padding: 3vw 0;
          border-bottom: .2vw solid #eeeeee;

          .catalog_li_l {
            display: flex;

            .number {
              display: inline-block;
              color: #C2C2C2;
              font-size: 3vh;
              font-weight: bolder;
              margin: auto 2vw auto 0;
            }

            .content {
              color: #333333;

              .name {
                font-weight: bold;
              }

              .time {

              }
            }
          }

          .catalog_li_r {
            .look {
              display: inline-block;
              padding: .5vw 2vw;
              color: #93B5FD;
              border: .5vw solid #93B5FD;
              margin-top: 2vw;
              border-radius: 1vw;
            }
          }
        }

        .catalog_li:nth-last-child(1) {
          border: none;
        }
      }
    }
  }

  .comment_content {
    border-top: .2vw solid #eeeeee;
    padding: 2vw 5vw;
  }
}
</style>
