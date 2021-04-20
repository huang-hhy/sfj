<template>
<div>
  <nav-header title="党费缴纳"></nav-header>
  <div class="pay">
    <div class="card">
      <span :class="{attend:true,active:this.type==1}" @click="changeType('attend',1)">未缴党费</span>
      <span :class="{no_attend:true,active:this.type==2}" @click="changeType('no-attend',2)">已缴党费</span>

    </div>
    <!--  待办事项-->
    <ul class="pay_state_list" v-show="changeShowType == 'attend'">
      <li class="pay_state_li" v-for="(item,index) in payList" :key="index" @click="payDetail(item.state)">
        <ul class="online_pay_list" >
          <li class="online_pay_li" v-for="(item2,index2) in item.list" :key="index2">
            <div class="pay_name">
              <span class="name">{{item2.title}}</span>
              <span class="state fr">去缴纳</span>
            </div>
            <div class="pay_time">
              <span>接收时间：{{item2.acceptTime}}</span>
              <span>发送人：{{item2.sender}}</span>
              <span>来自组织：{{item2.organization}}</span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <!--  已办事项-->
    <ul class="pay_state_list" v-show="changeShowType == 'no-attend'">
      <li class="pay_state_li" v-for="(item,index) in nopayList" :key="index" @click="payDetail(item.state)">
        <ul class="online_pay_list" >
          <li class="online_pay_li" v-for="(item2,index2) in item.list" :key="index2">
            <div class="pay_name">
              <span class="name">{{item2.title}}</span>
              <span class="state fr">已缴纳</span>
            </div>
            <div class="pay_time">
              <span>接收时间：{{item2.acceptTime}}</span>
              <span>发送人：{{item2.sender}}</span>
              <span>来自组织：{{item2.organization}}</span>
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
name: "pay",
  components: {NavHeader},
  head() {
    return {
      title: this.$store.state.app.title + '- 党费缴纳',
      meta: [
        {
          hid: this.$store.state.app.title,
          name: this.$store.state.app.title,
          content: this.$store.state.app.title
        }
      ]
    }
  },
  methods:{
    changeType(name,type){
      this.changeShowType = name
      this.type = type
    },
    payDetail(state){
      if (state == '未缴党费') {
        this.$router.push('/mobile/profile/pay-detail')
      } else if (state == '已缴党费') {

      }
    }
  },
  data(){
    return{
      type: '1',
      changeShowType: 'attend',
      payList: [
        {
          state:'未缴党费',
          list:[
            {id: 1, title: '2020年4月党费收缴标准',  acceptTime: '2019-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'},
            {id: 2, title: '2020年5月党费收缴标准',  acceptTime: '2019-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'},
            {id: 3, title: '2020年6月党费收缴标准',  acceptTime: '2019-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'}
          ]
        },

      ],
      nopayList: [
        {
          state: '已缴党费',
          list: [
            {id: 1, title: '2020年1月党费收缴标准', acceptTime: '2020-01-01 24:00', sender: '党委管理员',organization:'中共始兴县组织'},
            {id: 2, title: '2020年2月党费收缴标准',  acceptTime: '2020-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'},
            {id: 3, title: '2020年3月党费收缴标准',  acceptTime: '2020-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'}]
        },
      ]
    }
  }
}
</script>

<style scoped lang="less">
.pay {
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

.pay_state_list {
  padding: 0 4vw 4vw 4vw;
  font-size: 2.2vh;

  .pay_state_li {
    margin: 3vw 0;
    background: #ffffff;
    padding: 2vw 4vw 4vw 4vw;
    border-radius: 3vw;

    .pay_state {
      border-left: 4px solid #F44436;
      color: #333333;
      font-weight: bold;
      line-height: 2.2vh;
      margin: 2vw 0 1vw 0;

      span {
        margin-left: 2vw;
      }
    }

    .online_pay_list {
      .online_pay_li {
        border-bottom: 1px solid #dddddd;
        padding: 3vw 0;

        .pay_name {
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
          .type {
            display: inline-block;
            padding: 0 .5vw;
            color: #21ADFC;
            border: 1px solid #21ADFC;
            font-size: 1.4vh;
          }
        }

        .pay_time {
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
