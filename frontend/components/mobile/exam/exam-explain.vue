<template>
  <div class="exam_explain">
    <div class="explain_top">
      <h2 class="exam_title">{{ item.title }}</h2>
      <ul class="exam_explain_list">
        <li class="exam_explain_li">
          <img src="~assets/mobile/exam/score.png" alt=""/>
          <div class="des">
            <p class="name">试题总分</p>
            <p class="content">{{ item.totalScore }}分</p>
          </div>
        </li>
        <li class="exam_explain_li">
          <img src="~assets/mobile/exam/pass.png" alt=""/>
          <div class="des">
            <p class="name">及格分</p>
            <p class="content">60分</p>
          </div>
        </li>
        <li class="exam_explain_li">
          <img src="~assets/mobile/exam/question.png" alt=""/>
          <div class="des">
            <p class="name">总题数</p>
            <p class="content">{{a}}</p>
          </div>
        </li>
        <li class="exam_explain_li">
          <img src="~assets/mobile/exam/time.png" alt=""/>
          <div class="des">
            <p class="name">考试时长</p>
            <p class="content">{{ item.duration }}小时</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="explain_body">
      <p class="exam_number_explain">本场考试你已考了<span class="red">0</span>次，还可考<span class="red">{{item.repeatNum }}</span>次</p>
      <div class="explain_item">
        <p class="name">
          <span class="border"></span>
          <span>考试时间</span>
        </p>
        <p class="content">{{ item.startTime }} 至 {{ item.endTime }}</p>
      </div>
      <div class="explain_item">
        <p class="name">
          <span class="border"></span>
          <span>考试说明</span>
        </p>
        <p class="content">为学习贯彻十九大精神，认真落实“两学一做 ”，所有党员需要学习《十九大精神解读》，请积极参与。</p>
      </div>
    </div>

    <button @click="startExam(item.id)">开始答题</button>
  </div>
</template>

<script>
import {getExamDetail} from '@/api/mobile'

export default {
  name: "exam-explain",
  data() {
    return {
      item: {

      },
      a:{},

    }
  },
  methods: {
    startExam(id) {
      this.$router.push({path: '/mobile/exam/exam', query: {id: id}})
      console.log('课程id')
      console.log(id)
    },
    getExamInfo(id) {
      getExamDetail(id).then(res => {
        console.log(res)
        if (res.code * 1 === 0) {
          res.data.startTime = this.$op.moment(res.data.startTime * 1000).format('YYYY-MM-DD HH:MM:SS')
          res.data.endTime = this.$op.moment(res.data.endTime * 1000).format('YYYY-MM-DD HH:MM:SS')
          this.item = res.data
          this.a = this.item.paperQuestions.length
          console.log(this.item)
        }
      })
    },
  },
  mounted() {
    let {id} = this.$route.query
    this.getExamInfo(id)
  }
}
</script>

<style scoped lang="less">
.exam_explain {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: #EBEBEB;
  margin-top: 7vh;

  .explain_top {
    background: url(~assets/mobile/meeting/bg1.png) no-repeat center -16vh scroll;

    .exam_title {
      text-align: center;
      padding: 3.5vh;
      font-size: 2.4vh;
      color: #ffffff;
    }

    .exam_explain_list {
      margin: 0 5vw;
      border-radius: 1vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      text-align: justify;
      background: #ffffff;

      .exam_explain_li {
        width: calc(50% - 1px);
        padding: 6vw 5vw;
        display: flex;

        img {
          width: 10vw;
          height: 10vw;
          margin: 0 2vw 0 7vw;
        }

        .des {
          font-size: 2vh;

          .name {
            line-height: 6vw;
            color: #333333;
          }

          .content {
            line-height: 4vw;
            color: #999999;
          }
        }
      }

      .exam_explain_li:nth-child(1) {
        border-right: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
      }

      .exam_explain_li:nth-child(2) {
        border-bottom: 1px solid #dddddd;
      }

      .exam_explain_li:nth-child(3) {
        border-right: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
      }

      .exam_explain_li:nth-child(4) {
        border-bottom: 1px solid #dddddd;
      }
    }
  }

  .explain_body {
    margin: 0 5vw;
    background: #ffffff;
    border-radius: 1vw;
    padding: 4vw 0;

    .exam_number_explain {
      color: #FFBE00;
      margin: 0 6vw;
      text-align: center;
      font-size: 1.8vh;
      background: #FFF8F3;

      .red {
        padding: 2vw;
        display: inline-block;
        color: #F44436;
        background: #FFF8F3;
      }
    }

    .explain_item {
      padding: 2vw 5vw;
      font-size: 1.8vh;
      vertical-align: middle;

      .name {
        line-height: 5vh;
        vertical-align: middle;
        display: inline-block;
        color: #333333;

        .border {
          border-left: 3px solid #F44436;
          margin-right: 1vw;
        }
      }

      .content {
        color: #666666;
        text-align: justify;
        line-height: 2.4vh;
      }
    }
  }


  button {
    position: fixed;
    bottom: 7vh;
    color: #ffffff;
    background: #FFBE00;
    border-radius: 1vw;
    margin: 0 6vw;
    width: calc(100% - 12vw);
    height: 6vh;
    font-size: 2.2vh;
  }
}
</style>
