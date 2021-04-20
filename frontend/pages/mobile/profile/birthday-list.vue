<template>
<div>
  <nav-header title="生日贺卡"></nav-header>

  <div class="birthday">
    <ul class="birthday_state_list">
      <li class="birthday_state_li" v-for="(item,index) in birthdayList" :key="index" @click=" cardDetail(item.index)">
        <ul class="online_birthday_list" >
          <li class="online_birthday_li">
            <div class="birthday_name">
              <span class="name">{{item.title}}</span>
              <span class="state fr">查看贺卡</span>
            </div>
            <div class="birthday_time">
              <span>接收时间：{{item.time}}</span>
              <span>来自组织：{{item.organization}}</span>
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
name: "birthday-list",
  components: {NavHeader},
  head() {
    return {
      title: this.$store.state.app.title + '- 生日贺卡',
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
    cardDetail(item,index){
      this.$router.push('/mobile/profile/birthday')

    }
  },
  data(){
    return {
      birthdayList: [
        {id:1,title:'入党一周年生日快乐!',organization:'中共始兴县组织',time:'2019-08-31 24:00'},
        {id:2,title:'入党二周年生日快乐!',organization:'中共始兴县组织',time:'2019-08-31 24:00'},
        {id:3,title:'入党三周年生日快乐!',organization:'中共始兴县组织',time:'2019-08-31 24:00'},
        {id:4,title:'入党四周年生日快乐!',organization:'中共始兴县组织',time:'2019-08-31 24:00'}
      ]
    }
  },
}
</script>

<style scoped lang="less">
.birthday {
  padding: 3vw 5vw;
  background-size: cover;
  background-attachment: fixed;
  background-image: url('~assets/mobile/meeting/info-background.png');
  margin-top: 7vh;

}
.birthday_state_list {
  padding: 0 4vw 4vw 4vw;
  font-size: 2.2vh;

  .birthday_state_li {
    margin: 3vw 0;
    background: #ffffff;
    padding: 2vw 4vw 4vw 4vw;
    border-radius: 3vw;

    .birthday_state {
      border-left: 4px solid #F44436;
      color: #333333;
      font-weight: bold;
      line-height: 2.2vh;
      margin: 2vw 0 1vw 0;

      span {
        margin-left: 2vw;
      }
    }

    .online_birthday_list {
      .online_birthday_li {
        border-bottom: 1px solid #dddddd;
        padding: 3vw 0;

        .birthday_name {
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

        .birthday_time {
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
