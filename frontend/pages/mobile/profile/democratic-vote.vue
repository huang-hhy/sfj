<template>
<div>
  <nav-header :title="title"></nav-header>

  <div class="vote">

    <ul class="vote_state_list">
      <li class="vote_state_li" v-for="(item,index) in voteList" :key="index">
        <ul class="online_vote_list" >
          <li class="online_vote_li" v-for="(item2,index2) in item.list" :key="index2">
<!--            头像-->
            <img src="@/assets/mobile/profile/user.png" alt="">
            <div class="vote_name">
              <span class="name">{{item2.name}}</span>
              <span class="department">{{item2.department}}</span>
              <span class="state fr"  @click="vote(item2,index2)">+投票</span>
            </div>
            <div class="vote_time">
              <span>介绍：{{item2.introduce}}</span>
              <span >票数：{{item2.votes}}</span>
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
name: "democratic-vote",
  components: {NavHeader},
  props: {
    title: {
      type: String,
      default: '选举投票'
    }
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 选举投票',
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
  vote (item,index){
    item.votes = item.votes *1 +1
    var tmpList = this.voteList[0].list
    tmpList[index] = item
    this.voteList[0].list = tmpList
  }
  },
  data(){
  return{
    vote_count:10,
    voted:false,
    voteList: [
      {
        title:'未参加',
        list:[
          {id: 1, name: '张三', department: '太平镇党支部', introduce: '此人很厉害此人很厉害此人很厉害此人很厉害此人很厉害', votes: '233'},
          {id: 2, name: '李四', department: '太平镇党支部', introduce: '暂无介绍怎么办暂无介绍怎么办暂无介绍怎么办', votes: '233'},
          {id: 3, name: '王五', department: '太平镇党支部', introduce: '哈哈哈哈哈哈哈哈哈哈哈哈', votes: '233'}
        ]
      }
    ],
  }
  }
}
</script>

<style scoped lang="less">
.vote {
  padding: 3vw 5vw;
  background-size: cover;
  background-attachment: fixed;
  background-image: url('~assets/mobile/meeting/info-background.png');
  margin-top: 7vh;
  .vote_state_list {
    padding: 0 4vw 4vw 4vw;
    font-size: 2.2vh;

    .vote_state_li {
      margin: 3vw 0;
      background: #ffffff;
      padding: 2vw 4vw 4vw 4vw;
      border-radius: 3vw;

      .vote_state {
        border-left: 4px solid #F44436;
        color: #333333;
        font-weight: bold;
        line-height: 2.2vh;
        margin: 2vw 0 1vw 0;

        span {
          margin-left: 2vw;
        }
      }

      .online_vote_list {
        .online_vote_li {
          border-bottom: 1px solid #dddddd;
          padding: 3vw 0;

          img{
            width: 20vw;
            height: 20vw;
            border-radius: 50%;
            padding: 1.4vw;
            margin: 2vw 0;
            float: left;
          }


          .vote_name {
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
            .department {
              display: inline-block;
              padding: 0 .5vw;
              color: #21ADFC;
              border: 1px solid #21ADFC;
              font-size: 1.4vh;
            }
          }

          .vote_time {
            span {
              display: inline-block;
              margin-right: 3vw;
              font-size: 1.6vh;
              color: #999999;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}

</style>
