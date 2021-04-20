<template>
<div>
  <nav-header :title="title"></nav-header>
  <div class="todo">
    <div class="card">
      <span :class="{attend:true,active:this.type==1}" @click="changeType('attend',1)">待办事项</span>
      <span :class="{no_attend:true,active:this.type==2}" @click="changeType('no-attend',2)">已办事项</span>

    </div>
    <!--  待办事项-->
    <ul class="todo_state_list" v-show="changeShowType == 'attend'">
      <li class="todo_state_li" v-for="(item,index) in todoList" :key="index" @click="todoDetail(item.state)">
        <ul class="online_todo_list" >
          <li class="online_todo_li" v-for="(item2,index2) in item.list" :key="index2">
            <div class="todo_name">
              <span class="name">{{item2.title}}</span>
              <span class="type">{{item2.type}}</span>
              <span class="state fr">去确认</span>
            </div>
            <div class="todo_time">
              <span>接收时间：{{item2.acceptTime}}</span>
              <span>发送人：{{item2.sender}}</span>
              <span>来自组织：{{item2.organization}}</span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <!--  已办事项-->
    <ul class="todo_state_list" v-show="changeShowType == 'no-attend'">
      <li class="todo_state_li" v-for="(item,index) in noTodoList" :key="index" @click="todoDetail(item.state)">
        <ul class="online_todo_list" >
          <li class="online_todo_li" v-for="(item2,index2) in item.list" :key="index2">
            <div class="todo_name">
              <span class="name">{{item2.title}}</span>
              <span class="type">{{item2.type}}</span>
              <span class="state fr">已确认</span>
            </div>
            <div class="todo_time">
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
name: "todo",
  components: {NavHeader},
  props: {
    title: {
      type: String,
      default: '待办事项'
    }
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 待办事项',
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
    changeType(name,type){
      this.changeShowType = name
      this.type = type
    },
    todoDetail(state){
      if (state == '待办事项') {
        this.$router.push('/mobile/profile/todo-detail')
      } else if (state == '已办事项') {
        this.$router.push(' ')
      }
    }
  },
  data(){
    return{
      type: '1',
      changeShowType: 'attend',
      todoList: [
        {
          state:'待办事项',
          list:[
            {id: 1, title: '战疫在行动', type: '通知', acceptTime: '2019-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'},
            {id: 2, title: '会议通知待办', type: '公告', acceptTime: '2019-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'},
            {id: 3, title: '活动归档待办', type: '活动', acceptTime: '2019-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'}
          ]
        },

      ],
      noTodoList: [
        {
          state: '已办事项',
          list: [
            {id: 1, title: '关于干部民主测评4已办', type: '通知', acceptTime: '2019-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'},
            {id: 2, title: '干部民主测评5公告已办', type: '公告', acceptTime: '2019-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'},
            {id: 3, title: '干部民主测评6已办', type: '公告', acceptTime: '2019-08-31 24:00', sender: '党委管理员',organization:'中共始兴县组织'}]
        },
      ]
    }
  }
}
</script>

<style scoped lang="less">
.todo {
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

.todo_state_list {
  padding: 0 4vw 4vw 4vw;
  font-size: 2.2vh;

  .todo_state_li {
    margin: 3vw 0;
    background: #ffffff;
    padding: 2vw 4vw 4vw 4vw;
    border-radius: 3vw;

    .todo_state {
      border-left: 4px solid #F44436;
      color: #333333;
      font-weight: bold;
      line-height: 2.2vh;
      margin: 2vw 0 1vw 0;

      span {
        margin-left: 2vw;
      }
    }

    .online_todo_list {
      .online_todo_li {
        border-bottom: 1px solid #dddddd;
        padding: 3vw 0;

        .todo_name {
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

        .todo_time {
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
