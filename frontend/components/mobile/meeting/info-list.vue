<template>
  <div class="info-list">
    <ul class="m_info_list">
      <li class="m_info_li" v-for="(item,index) in info" :key="item.id">
        <p class="info_type" @click="showList(item.id)">
          <span>{{ item.typeName }}
          <i class="el-icon-arrow-down"></i></span>
        </p>
        <!--          &&item.id==item2.meetingTypeId-->
        <div v-if="total==0&&item.id==meetingTypeId" class="prompt"><p>{{showMsg(msg)}}</p></div>
        <ul class="info_list" v-else>
          <li class="info_li" v-for="(item2,index2) in infoList.list" :key="index2"
              v-show="item.id==item2.meetingTypeId&&total > 0" @click="gotoDetail(item2.id)">
              <div class="info_li_l">
                <span class="month">{{ item2.conveneTime.substr(0, 4) }}年</span>
                <span class="day">{{ item2.conveneTime.substr(8, 2) }}</span>
                <span class="week">{{ item2.conveneTime.substr(5, 2) }}月</span>
              </div>
              <div class="info_li_r">
                <p class="name">{{ item2.title }}
                  <span>{{item2.isRead ==1?'已读':item2.isRead == 0?'未读':''}}</span>
                </p>
                <p class="type">
                  <span>{{ item2.conveneTime.substr(11, 5) }}开始</span>
                  <span> {{ item2.address }}</span>
                  <span>{{ item2.states == 0 ? "未签到" : item2.states == 1 ? "已签到" : item2.states == 2 ? '已请假' : '' }}</span>
                  <span></span>
                </p>
              </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import {getMeetingList} from "@/api/mobile";

export default {
  name: "meeting-info",
  data() {
    return {
      infoList: [],
      total: '',
      msg:'',
      meetingTypeId:''
    }

  },
  props: ['info', 'infolist'],
  methods: {
    showList(id) {
      this.getList(id)
    },
    showMsg(msg) {
      this.msg = msg
      if (this.total == 0) {
        return '这里空空如也~'
      }
    },
    gotoDetail(id){
      this.$router.push({path: '/mobile/meeting/attendance', query: {id: id}})
      console.log(id)
    },

    getList(id) {
      this.meetingTypeId = id
      getMeetingList({meetingTypeId: id}).then(res => {
        if (res.code * 1 === 0) {
          this.infoList = res.data
          this.total = res.data.total
          for (var i = 0; i < res.data.list.length; i++) {
            res.data.list[i].conveneTime = this.$op.moment(res.data.list[i].conveneTime * 1000).format('YYYY-MM-DD HH:MM:SS')
          }
        }
      })
    }
  },
  mounted() {
  }
}

</script>

<style scoped lang="less">
.info-list {
  overflow: auto;

  .m_info_list {
    margin: 4vw 4vw;
    font-size: 2.2vh;

    .m_info_li {
      margin: 2vw 0;
      background: #ffffff;
      padding: 2vw 4vw 4vw 4vw;
      border-radius: 3vw;

      .info_type {
        border-left: 4px solid #F44436;
        color: #333333;
        font-weight: bold;
        line-height: 2.2vh;
        margin: 2vw 0 1vw 0;

        span {
          margin-left: 2vw;
        }
      }

      .info_list {
        .info_li {
          display: flex;
          //border-bottom: 1px solid #dddddd;
          border-top: 1px solid #dddddd;
          padding: 3vw 0;

          .info_li_l {
            width: 15vw;
            height: 15vw;
            background: #FFBB00;
            color: #ffffff;
            border-radius: 2vw;
            text-align: center;
            cursor: pointer;

            span {
              display: block;
              line-height: 2.8vh;
            }

            .month {
              font-size: 1.6vh;
            }

            .day {
              font-size: 3.8vh;
            }

            .week {
              font-size: 1.6vh;
            }
          }

          .info_li_r {
            padding: 1.5vw 4vw;

            .name {
              font-weight: bold;
              margin-bottom: 3vw;
              color: #333333;
              span {
                margin-right: 2vw;
                font-size: 1.6vh;
                overflow: hidden;
                font-weight: normal;
                color: #FFFFFF;
                background: #F44436;
                padding: 0.5vw;
                border-radius: 1vw;
              }
            }


            .type {
              span {
                margin-right: 2vw;
                font-size: 1.6vh;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
}
.prompt {
  color: #333333;
  text-align: center;
  padding: 5vw 0vw;
}
</style>
