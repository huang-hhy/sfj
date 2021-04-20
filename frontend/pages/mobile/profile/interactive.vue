<template>
<div>
  <nav-header :title="title"></nav-header>
  <div class="interactive">
    <ul class="interactive_state_list">
      <li class="interactive_state_li" v-for="(item,index) in interactiveList" :key="index" @click="interDetail(item.index)">
        <ul class="online_interactive_list" >
          <li class="online_interactive_li" v-for="(item2,index2) in item.list" :key="index2">
            <div class="interactive_name">
              <span class="name">{{item2.title}}</span>
              <span class="type">{{item2.type}}</span>
              <span class="state fr">去参与</span>
            </div>
            <div class="interactive_time">
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
  name: "interactive",
  components: {NavHeader},
  props: {
    title: {
      type: String,
      default: '党员互动'
    }
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 党员互动',
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
    interDetail(item,index){
      this.$router.push('/mobile/profile/inter-detail')

    }
  },
  data(){
    return{
      interactiveList: [
        {
          state:'待办事项',
          list:[
            {id: 1, title: '战疫在行动', type: '活动', acceptTime: '2019-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'},
            {id: 2, title: '创建文明城市标语征集', type: '活动', acceptTime: '2019-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'},
            {id: 3, title: '活动归档', type: '比赛', acceptTime: '2019-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'}
          ]
        },

      ],
    }
  }
}
</script>

<style scoped lang="less">
.interactive {
  padding: 3vw 5vw;
  background-size: cover;
  background-attachment: fixed;
  background-image: url('~assets/mobile/meeting/info-background.png');
  margin-top: 7vh;

}

.interactive_state_list {
  padding: 0 4vw 4vw 4vw;
  font-size: 2.2vh;

.interactive_state_li {
  margin: 3vw 0;
  background: #ffffff;
  padding: 2vw 4vw 4vw 4vw;
  border-radius: 3vw;

.interactive_state {
  border-left: 4px solid #F44436;
  color: #333333;
  font-weight: bold;
  line-height: 2.2vh;
  margin: 2vw 0 1vw 0;

span {
  margin-left: 2vw;
}
}

.online_interactive_list {
.online_interactive_li {
  border-bottom: 1px solid #dddddd;
  padding: 3vw 0;

.interactive_name {
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

.interactive_time {
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
