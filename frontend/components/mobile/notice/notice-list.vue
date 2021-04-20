<template>
  <div class="notice">
    <div class="card">
      <span :class="{send:true,active:this.type==1}" @click="changeType('send',1)">我发出的</span>
      <span :class="{receive:true,active:this.type==2}" @click="changeType('receive',2)">我收到的</span>
    </div>
    <ul class="notice_list" v-show="changeShowType == 'receive'">
      <li class="notice_li" v-for="(item,index) in notice" :key="index" @click="noticeDetail(item.id)">
        <div class="top">
          <p class="fl">{{item.title}}</p>
          <span class="fr">{{item.updateTime}}</span>
        </div>
        <p class="resource">
          来源：{{item.orgName}}
        </p>
        <p class="content">{{item.content}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {getNoticeList} from '@/api/mobile'
  export default {
    name: "notice-list",
    methods: {
      changeType(name,type) {
        this.changeShowType = name
        this.type = type
      },
      noticeDetail(id){
        console.log(id)
        this.$router.push({path:'/mobile/notice/detail',query:{id:id} })
      },
      getNotice(){
        //查询通知公告列表
        getNoticeList({}).then(res =>{
          console.log(res)
          if (res.code * 1 === 0) {
            for (var i = 0; i < res.data.list.length; i++) {
              //循环输出列表时间戳为时间
              res.data.list[i].updateTime = this.$op.moment(res.data.list[i].updateTime * 1000).format('YYYY-MM-DD')
              res.data.list[i].createTime = this.$op.moment(res.data.list[i].createTime * 1000).format('YYYY-MM-DD')
            }
            this.notice = res.data.list
          } else {
            this.$toast(res.msg)
          }
        })
      }
    },
    mounted() {
      this.getNotice()
    },
    data() {
      return {
        type: '2',
        changeShowType: 'receive',
        notice: [
          {
            id: 1,
            name: '关于组织扶贫工作会议1',
            time: '11:31 上午',
            resource: '综合部办公室',
            content: '为贯彻落实十九大精神，实现2020年全民脱贫目标，党组织决定组织全体广东分公司全体党员于2019年6月10日一起…'
          },
        ]
      }
    }
  }
</script>

<style scoped lang="less">
  .notice {
    padding: 3vw 5vw;
    background-size: cover;
    background-attachment: fixed;
    background-image: url('~assets/mobile/meeting/info-background.png');

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

      .send {
        border-top-left-radius: 2vw;
        border-bottom-left-radius: 2vw;
      }

      .receive {
        border-top-right-radius: 2vw;
        border-bottom-right-radius: 2vw;
      }
      .active {
        background: #F44436;
        color: #ffffff;
      }
    }

    .notice_list {
      margin-top: 3vw;

      .notice_li {
        background: #ffffff;
        margin-bottom: 3vw;
        border-radius: 2vw;
        padding: 4vw;

        .top {
          line-height: 5vh;
          overflow: auto;

          p {
            color: #333333;
            font-weight: bold;
            font-size: 2.4vh;
          }

          span {
            font-size: 1.8vh;
            color: #A0A0A0;
          }
        }

        .resource {
          font-size: 1.8vh;
          color: #A0A0A0;
          padding-bottom: 2vw;
        }

        .content {
          text-align: justify;
          font-size: 2vh;
          line-height: 3vh;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
</style>
