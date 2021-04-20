<template>
  <div class="online_exam">
    <div class="exam_type">
      <div :class="{type_item:true, active:this.type==1}" @click="selectType(1)">待考</div>
      <div :class="{type_item:true, active:this.type==2}" @click="selectType(2)">已考</div>
      <div :class="{type_item:true, active:this.type==3}" @click="selectType(3)">题库学习</div>
    </div>
    <div v-if="total==0" class="prompt"><p>这里空空如也</p></div>
    <ul class="exam_state_list" v-else>
      <li class="exam_state_li" v-for="(item,index) in examList" :key="index" @click="examDetail(type,item.id)">
        <ul class="online_exam_list">
          <li class="online_exam_li">
            <div class="exam_name">
              <span class="name">{{ item.title }}</span>
              <span class="state fr" @click="">{{ changeButton(type) }}</span>
            </div>
            <div class="exam_time">
              <span>截止时间：{{ item.endTime }}</span>
              <span>考试时长：{{ item.duration }}</span>
              <span>试卷总分：{{ item.totalScore }}</span>
            </div>
          </li>
        </ul>
        <!--      答题列表-->
        <ul v-show="item.id==answerId" class="online_exam_list">
          <div class="history">
            <p class="exam_state">
              <span>答题历史</span>
            </p>
          </div>
          <li v-for="(item,index) in answerList" :key="index" @click=""
              class="online_exam_li">
              <div class="exam_name">
                <span>{{ item.title }}</span>
                <span class="state1 fr" @click="checkAnswer(item.id)">查看答案和解析</span>
              </div>
            <div class="exam_time">
              <span>上次答题时间：{{ item.updateTime }}</span>
              <span>{{ item.orgName }}</span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import {getExamListPast, getExamList, getAnswerList, getAnswer} from '@/api/mobile'
import {mapActions} from "vuex";

export default {
  name: "online-exam",
  data() {
    return {
      answerList: [],
      total: '',
      answerId: '',
      type: '1',
      examList: [
        {
          state: '进行中',
          list: [{id: 1, name: '学习《十九大精神解读》考试', state: '将结束', time: '2019-08-31 24:00', long: '30分钟'},
            {id: 2, name: '学习《十九大精神解读》考试', state: '将结束', time: '2019-08-31 24:00', long: '30分钟'},
            {id: 3, name: '学习《十九大精神解读》考试', state: '将结束', time: '2019-08-31 24:00', long: '30分钟'}]
        },
        {
          state: '未开始',
          list: [{id: 1, name: '学习《十九大精神解读》考试', state: '将结束', time: '2019-08-31 24:00', long: '30分钟'},
            {id: 2, name: '学习《十九大精神解读》考试', state: '将结束', time: '2019-08-31 24:00', long: '30分钟'},
            {id: 3, name: '学习《十九大精神解读》考试', state: '将结束', time: '2019-08-31 24:00', long: '30分钟'}]
        },
        {
          state: '已结束', list: [{id: 1, name: '学习《十九大精神解读》考试', state: '将结束', time: '2019-08-31 24:00', long: '30分钟'},
            {id: 2, name: '学习《十九大精神解读》考试', state: '将结束', time: '2019-08-31 24:00', long: '30分钟'},
            {id: 3, name: '学习《十九大精神解读》考试', state: '将结束', time: '2019-08-31 24:00', long: '30分钟'}]
        }
      ]
    }
  },
  created() {
    this.getExamInfo()//未考
  },
  methods: {
    ...mapActions({
      setBaseInfo: 'app/setBaseInfo'
    }),
    selectType(type) {
      this.type = type
      if (this.type == 2) {
        this.getExamInfoPast()//已考
      } else if (this.type == 1) {
        this.getExamInfo()//未考
      } else if (this.type == 3) {

      }

    },
    changeButton(type) {
      this.type = type
      if (this.type == 2) {
        return '查看答案';
      } else if (this.type == 1) {
        return '开始答题';
      } else if (this.type == 3) {
        return '开始学习';
      }
    },
    examDetail(type, id) {
      if (type == 1) {
        this.$router.push({path: '/mobile/exam/explain', query: {id: id}})
        console.log(id)
      } else if (type == 2) {// 已考
        this.getAnswer(id)
        // this.$router.push({path: '/mobile/exam/analysis', query: {id: id}})
        console.log(id)
      }
    },

    checkAnswer(e) {
      this.$router.push({path: '/mobile/exam/analysis', query: {id: e}})
      console.log(e)

    },

    getExamInfo() {
      getExamList({}).then(res => {
        console.log('----------------未考')
        console.log(res)
        if (res.code * 1 === 0) {
          for (var i = 0; i < res.data.list.length; i++) {
            res.data.list[i].endTime = this.$op.moment(res.data.list[i].endTime * 1000).format('YYYY-MM-DD')
          }
          this.examList = res.data.list
          this.total = res.data.total
          console.log(this.examList)
        }
      })
    },
    getExamInfoPast() {
      getExamListPast({}).then(res => {
        console.log('----------------已考')
        console.log(res)
        if (res.code * 1 === 0) {
          for (var i = 0; i < res.data.list.length; i++) {
            //循环输出列表时间戳为时间
            res.data.list[i].endTime = this.$op.moment(res.data.list[i].endTime * 1000).format('YYYY-MM-DD')
          }
          this.examList = res.data.list
          this.total = res.data.total
          console.log(this.examList)
        }
      })
    },
    getAnswer(id) {
      this.answerId = id;
      getAnswerList({testPaperId: id}).then(res => {
        console.log('----------------答题列表')
        console.log(res)
        if (res.code * 1 === 0) {
          for (var i = 0; i < res.data.list.length; i++) {
            res.data.list[i].updateTime = this.$op.moment(res.data.list[i].updateTime * 1000).format('YYYY-MM-DD')
          }
          this.answerList = res.data.list
        }
      })
    },
  }
}
</script>

<style scoped lang="less">
.online_exam {
  background-size: cover;
  background-attachment: fixed;
  background-image: url('~assets/mobile/meeting/info-background.png');
  padding-top: 5vw;

  .prompt {
    color: #FFFFFF;
    text-align: center;
    padding: 5vw 0vw;
  }


  .exam_type {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    text-align: justify;
    margin: 0 4vw 3vw 4vw;

    .type_item {
      width: 33.33%;
      height: 6vh;
      background: #ffffff;
      color: #F44436;
      line-height: 6vh;
      text-align: center;
      font-size: 2vh;
    }

    .active {
      background: #F44436;
      color: #ffffff;
    }

    .type_item:nth-child(1) {
      border-top-left-radius: 2vw;
      border-bottom-left-radius: 2vw;
    }

    .type_item:nth-child(3) {
      border-top-right-radius: 2vw;
      border-bottom-right-radius: 2vw;
    }
  }

  .history {
    border-top: 1px solid #999999;
    margin-bottom: 2vw;
  }


  .exam_state_list {
    padding: 0 4vw 4vw 4vw;
    font-size: 2.2vh;

    .exam_state_li {
      margin: 3vw 0;
      background: #ffffff;
      padding: 2vw 4vw 4vw 4vw;
      border-radius: 3vw;

      .exam_state {
        border-left: 4px solid #F44436;
        color: #333333;
        font-weight: bold;
        line-height: 2.2vh;
        margin: 2vw 0 2vw 0;

        span {
          margin-left: 2vw;
        }
      }

      .online_exam_list {
        .online_exam_li {
          //border-bottom: 1px solid #dddddd;
          padding: 3vw 0;

          .exam_name {
            height: 4.6vh;

            .name {
              color: #333333;
              font-size: 2vh;
              margin-right: 1vw;
              line-height: 4.6vh;
            }

            .state {
              display: inline-block;
              padding: 0 .5vw;
              color: #F44436;
              border: 1px solid #F44436;
              border-radius: 2px;
              font-size: 1.4vh;
            }

            .state1 {
              display: inline-block;
              padding: 0 .5vw;
              color: #FFFFFF;
              background-color:#F44436 ;
              border: 1px solid #F44436;
              border-radius: 2px;
              font-size: 1.4vh;
            }
          }

          .exam_time {
            span {
              display: inline-block;
              margin-right: 3vw;
              font-size: 1.6vh;
              color: #999999;
            }
          }
        }
      }
    }
  }
}


</style>
