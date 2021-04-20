<template>
  <div>
  <nav-header :title="title"></nav-header>
<div class="test">
  <div class="card">
    <span :class="{attend:true,active:this.type==1}" @click="changeType('attend',1)">已参加</span>
    <span :class="{no_attend:true,active:this.type==2}" @click="changeType('no-attend',2)">未参加</span>
  </div>
<!--  未参加的民主评议-->
  <ul class="test_state_list" v-show="changeShowType == 'no-attend'">
    <li class="test_state_li" v-for="(item,index) in testList" :key="index" @click="testDetail(item.state)">
      <ul class="online_test_list" >
        <li class="online_test_li" v-for="(item2,index2) in item.list" :key="index2">
          <div class="test_name">
            <span class="name">{{item2.name}}</span>
            <span class="state fr">{{item2.state}}</span>
          </div>
          <div class="test_time">
            <span>发起时间：{{item2.startTime}}</span>
            <span>结束时间：{{item2.finishTime}}</span>
          </div>
        </li>
      </ul>
    </li>
  </ul>
<!--  已参加的民主评议-->
  <ul class="test_state_list" v-show="changeShowType == 'attend'">
    <li class="test_state_li" v-for="(item,index) in noTestList" :key="index" @click="testDetail(item.state)">
      <ul class="online_test_list" >
        <li class="online_test_li" v-for="(item2,index2) in item.list" :key="index2">
          <div class="test_name">
            <span class="name">{{item2.name}}</span>
            <span class="state fr">{{item2.state}}</span>
          </div>
          <div class="test_time">
            <span>发起时间：{{item2.startTime}}</span>
            <span>结束时间：{{item2.finishTime}}</span>
          </div>
        </li>
      </ul>
    </li>

  </ul>
</div>
  </div>
</template>

<script>
import NavHeader from "@/components/mobile/layout/nav-header";
export default {
name: "democracy",
  components: {NavHeader},
  props: {
    title: {
      type: String,
      default: '民主评议'
    }
  },
  methods: {
    changeType(name,type){
      this.changeShowType = name
      this.type = type
    },
    testDetail(state){
      if (state == '未参加') {
        this.$router.push('/mobile/profile/democratic-vote')
      } else if (state == '已参加') {
        this.$router.push(' ')
      }
    }
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 民主测评',
      meta: [
        {
          hid: this.$store.state.app.title,
          name: this.$store.state.app.title,
          content: this.$store.state.app.title
        }
      ]
    }
  },
  data(){
  return{
    type: '1',
    changeShowType: 'no-attend',
    testList: [
      {
        state:'未参加',
        list:[
          {id: 1, name: '干部民主测评1', state: '我要投票', startTime: '2019-08-31 24:00', finishTime: '2019-09-02 24:00'},
          {id: 2, name: '干部民主测评2', state: '我要投票', startTime: '2019-08-31 24:00', finishTime: '2019-09-02 24:00'},
          {id: 3, name: '干部民主测评3', state: '我要投票', startTime: '2019-08-31 24:00', finishTime: '2019-09-02 24:00'}
        ]
      },

    ],
    noTestList: [
      {
        state: '已参加',
        list: [{id: 1, name: '干部民主测评4', state: '查看结果', startTime: '2019-08-31 24:00', finishTime: '2019-09-02 24:00'},
          {id: 2, name: '干部民主测评5', state: '查看结果', startTime: '2019-08-31 24:00', finishTime: '2019-09-02 24:00'},
          {id: 3, name: '干部民主测评6', state: '查看结果', startTime: '2019-08-31 24:00', finishTime: '2019-09-02 24:00'}]
      },
    ]
  }
  }

}
</script>

<style scoped lang="less">
.test {
  padding: 3vw 5vw;
  background-size: cover;
  background-attachment: fixed;
  background-image: url('~assets/mobile/meeting/info-background.png');
  margin-top: 7vh;

.card {
  display: flex;
  text-align: center;

span {
  display: inline-block;
  width: 50%;
  font-size: 2vh;
  height: 4.8vh;
  line-height: 5vh;
  background: #ffffff;
  color: #F44436;
}

.attend {
  border-top-left-radius: 2vw;
  border-bottom-left-radius: 2vw;
}

.no_attend {
  border-top-right-radius: 2vw;
  border-bottom-right-radius: 2vw;
}
  .active {
    background: #F44436;
    color: #ffffff;
  }
}
}

.test_state_list {
  padding: 0 4vw 4vw 4vw;
  font-size: 2.2vh;

  .test_state_li {
    margin: 3vw 0;
    background: #ffffff;
    padding: 2vw 4vw 4vw 4vw;
    border-radius: 3vw;

    .test_state {
      border-left: 4px solid #F44436;
      color: #333333;
      font-weight: bold;
      line-height: 2.2vh;
      margin: 2vw 0 1vw 0;

      span {
        margin-left: 2vw;
      }
    }

    .online_test_list {
      .online_test_li {
        border-bottom: 1px solid #dddddd;
        padding: 3vw 0;

        .test_name {
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
            font-size: 1.4vh;
          }
        }

        .test_time {
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

</style>
