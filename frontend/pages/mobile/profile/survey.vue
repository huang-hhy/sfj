<template>
  <div>
  <div class="header-main">
    <nav-header  :title="title"></nav-header>
  </div>
  <div class="online_survey">
    <ul class="online_survey_list">
      <li class="online_survey_li survey_state_li" v-for="(item,index) in surveyList" :key="index" @click="surveyDetail(item.state) ">
        <div class="survey_name">
          <span class="name">{{item.name}}</span>
          <span class="state">{{item.state}}</span>
        </div>
        <div class="survey_time">
          <span>开始时间：{{item.startTime}}</span>
          <span>结束时间：{{item.finishTime}}</span>
        </div>

      </li>
    </ul>
  </div>
  </div>
</template>

<script>
import NavHeader from "@/components/mobile/layout/nav-header";
export default {
name: "survey",
  components: {NavHeader},
  props: {
    title: {
      type: String,
      default: '问卷调查'
    }
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 问卷调查',
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
    surveyDetail(state){
      if (state == '已参加'){
        alert('问卷调查已完成')
      }else if(state == '未参加'){
        this.$router.push('/mobile/profile/surveyDetail')
      }
    }

  },
  data() {
  return {
    surveyList: [
      {
        id: 1,
        name: '2020年5月党支部调查问卷',
        state: '未参加',
        startTime: '2020-5-1 00:00:00',
        finishTime: '2020-5-31 23:59:59',
      },
      {
        id: 2,
        name: '2020年4月党支部调查问卷',
        state: '已参加',
        startTime: '2020-5-1 00:00:00',
        finishTime: '2020-5-31 23:59:59',
      },
      {
        id: 3,
        name: '2020年3月党支部调查问卷',
        state: '已参加',
        startTime: '2020-5-1 00:00:00',
        finishTime: '2020-5-31 23:59:59',
      }
    ]
  }
  }
}
</script>

<style scoped lang="less">
.header-main {
  width: 100%;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 5vw;
  background-color: #F44436;
  position: relative;
}
.online_survey {
  background-size: cover;
  background-attachment: fixed;
  background-image: url('~assets/mobile/meeting/info-background.png');
  padding: 3vw 5vw;
}
.survey_state_li {
  margin: 3vw 0;
  background: #ffffff;
  padding: 2vw 4vw 4vw 4vw;
  border-radius: 3vw;
}
.online_survey_list {
  .online_survey_li {
    border-bottom: 1px solid #dddddd;
    padding: 3vw 0;


    .survey_name {
      height: 4.6vh;

      .name {
        color: #333333;
        font-size: 2vh;
        margin-right: 1vw;
        line-height: 4.6vh;
        padding-left: 3vw;
      }

      .state {
        display: inline-block;
        padding: 0 .5vw;
        color: #F44436;
        border: 1px solid #F44436;
        font-size: 1.4vh;
        float: right;
        margin-right: 3vw;
      }
    }

    .survey_time {
      span {
        display: inline-block;
        margin-right: 3vw;
        font-size: 1.6vh;
        color: #999999;
        padding-left: 3vw;
      }
    }
  }
}
</style>
