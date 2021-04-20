<template>
  <div class="attendance">
    <div class="meeting">
      <h2 class="title">{{ item.title }}</h2>
      <div class="info">
        <!--        <img src="~assets/mobile/meeting/people1.png" alt="">-->
        <span>主持人：{{ item.hostMan }}</span>
        <span>主讲人：{{ item.speaker }}</span>
      </div>
      <div class="info_item">
        <svg t="1590392258504" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="4202" width="32" height="32">
          <path
            d="M764.9 503.5H520.5V259.2c0-139.8 111.2-254.5 247.8-255.7 67.7-0.6 131.2 25.4 179 73.2 47.8 47.8 73.8 111.3 73.3 178.9-1.2 136.6-115.9 247.9-255.7 247.9z m-188-56.4h188c109 0 198.4-86.1 199.3-192 0.4-52.4-19.7-101.6-56.7-138.6-36.6-36.6-85.2-56.7-136.9-56.7h-1.8c-105.8 1-191.9 90.4-191.9 199.4v187.9z m-323.5 573.5c-66.8 0-129.5-26-176.8-73.3-47.8-47.8-73.8-111.4-73.2-179 1.2-136.6 115.9-247.8 255.7-247.8h244.4v244.3c0 139.9-111.2 254.6-247.9 255.7l-0.2-28.2 0.2 28.2c-0.8 0.1-1.5 0.1-2.2 0.1z m5.7-443.7c-109 0-198.4 86.1-199.3 191.9-0.5 52.4 19.7 101.6 56.7 138.6 36.6 36.6 85.2 56.7 136.9 56.7h1.6c105.9-0.9 192-90.3 192-199.4V576.9H259.1z m244.3-73.4H259.7c-65.3 0-127.7-24.2-175.7-68.2-48.8-44.7-77.3-105-80.3-169.8C0.5 196.3 24.9 130.8 72.6 80.9c23.1-24.2 50.3-43.2 80.8-56.6C185 10.4 218.7 3.4 253.5 3.4c66.8 0 129.6 26 176.8 73.2 47.2 47.2 73.2 110 73.2 176.8l-0.1 250.1zM253.5 59.8c-53.4 0-103.2 21.3-140.1 60-36.9 38.7-55.8 89.4-53.3 143 2.3 49.8 24.4 96.3 62.1 130.9 37.6 34.5 86.5 53.4 137.6 53.4h187.4V253.5c0-51.7-20.1-100.4-56.7-136.9-36.7-36.6-85.3-56.8-137-56.8z m517.1 960.8h-2.3c-136.6-1.2-247.8-115.9-247.8-255.7V520.5h244.3c139.9 0 254.6 111.2 255.7 247.9 0.5 67.6-25.5 131.2-73.3 178.9-47.2 47.3-109.9 73.3-176.6 73.3zM576.9 576.9v187.9c0 109 86.1 198.4 191.9 199.4h1.8c51.7 0 100.2-20.1 136.9-56.7 37-37 57.2-86.2 56.8-138.6-0.9-105.9-90.3-192-199.3-192H576.9z"
            p-id="4203" fill="#FFFEFE"></path>
        </svg>
        <span>发布者：{{ item.orgName }}</span>
      </div>
      <div class="info_item">
        <svg t="1590392462024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="5114" width="32" height="32">
          <path
            d="M511.3 64c-247 0-448 201-448 448s201 448 448 448 448-201 448-448-200.9-448-448-448z m223.8 772.1c-8.9-6.2-20.9-7.2-30.9-1.4-10.3 5.9-15.5 17.2-14.2 28.3-45.5 23.3-96 37.9-149.6 41.9-4-11.1-14.5-19-27-19-12.6 0-23.1 8.1-27.1 19.3-49.2-3.1-95.9-15.2-138.5-34.7 3.3-12.3-1.7-25.8-13.3-32.4-12-6.9-26.8-4.2-35.7 5.6-42.2-27.1-78.9-62-108-102.7 11.1-8.7 14.5-24.4 7.3-37-7.5-13-23.6-17.8-37-11.6-23.2-44.8-38-94.7-42.4-147.4 15.6-0.3 28.2-13 28.2-28.7 0-15.9-12.9-28.8-28.8-28.8h-0.1c3.1-50.9 16-99.2 36.7-143.1 0.3 0.2 0.5 0.4 0.7 0.5 13.8 7.9 31.4 3.2 39.3-10.5 7.9-13.8 3.2-31.4-10.5-39.3-0.4-0.3-0.9-0.4-1.3-0.6 28.2-42.4 64.3-79.1 106.3-107.8 0.1 0.2 0.2 0.5 0.3 0.7 7.9 13.8 25.6 18.5 39.3 10.5 13.8-7.9 18.5-25.6 10.5-39.3-0.2-0.3-0.4-0.5-0.6-0.8 44.6-21.8 94-35.4 146.1-38.9 0.5 15.4 13.1 27.8 28.7 27.8 15.4 0 27.9-12.2 28.6-27.5 51.4 4 100 17.9 144 39.7-5.2 13.1-0.3 28.3 12.2 35.5 12.4 7.1 27.8 4 36.6-6.7 41.2 28.5 76.7 64.6 104.4 106.3-8.9 9-11.1 23-4.5 34.5 6.6 11.4 19.7 16.4 31.8 13.4 21.7 45.1 34.9 94.9 37.9 147.5-10.8 4.1-18.6 14.5-18.6 26.8 0 12 7.4 22.3 17.9 26.6-3.9 50.2-17.2 97.8-38.2 141-10.8-1-21.7 4.2-27.5 14.2-5.8 10.1-4.8 22.2 1.6 31.1-27.6 42.1-63.2 78.4-104.6 107z"
            fill="#ffffff" p-id="5115"></path>
          <path
            d="M728.2 605.4l-189.9-109V251.3c0-14.9-12.1-27-27-27s-27 12.1-27 27V512c0 0.3 0.1 0.6 0.1 0.9 0 1 0.2 1.9 0.3 2.9 0.1 0.8 0.2 1.6 0.4 2.5 0.2 0.9 0.5 1.7 0.8 2.5 0.3 0.8 0.6 1.7 0.9 2.4 0.4 0.8 0.8 1.5 1.2 2.3 0.4 0.7 0.8 1.5 1.3 2.2 0.5 0.7 1.1 1.4 1.7 2 0.6 0.7 1.1 1.3 1.8 1.9 0.6 0.6 1.3 1.1 1.9 1.6 0.8 0.6 1.5 1.2 2.3 1.7 0.3 0.2 0.5 0.4 0.7 0.5l203.4 116.7c4.2 2.5 8.9 3.6 13.5 3.6 9.3 0 18.4-4.8 23.4-13.5 7.5-12.9 3.1-29.4-9.8-36.8z"
            fill="#FFFEFE" p-id="5116"></path>
        </svg>
        <span>召开时间：{{ item.conveneTime }}</span>
      </div>
      <div class="info_item">
        <svg t="1590392503255" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="6934" width="32" height="32">
          <path
            d="M516.318163 986.248378 496.50577 968.138736C481.455418 954.441395 128 629.146067 128 420.37704 128 206.200673 302.200673 32 516.318163 32 730.499238 32 904.755258 206.200673 904.755258 420.37704 904.755258 629.204944 551.184438 954.441395 536.134086 968.138736L516.318163 986.248378 516.318163 986.248378ZM516.320877 109.395348C342.886749 109.395348 201.82999 250.509422 201.82999 423.942426 201.82999 559.894774 413.53032 789.716768 516.320877 887.629926 619.167622 789.716768 830.925267 559.894774 830.925267 423.942426 830.925267 250.509422 689.753878 109.395348 516.320877 109.395348L516.320877 109.395348ZM516.318198 574.390579C422.499299 574.390579 346.194944 498.084973 346.194944 404.331216 346.194944 310.512313 422.499299 234.20796 516.318198 234.20796 610.13585 234.20796 686.440202 310.512313 686.440202 404.331216 686.440202 498.148864 610.071958 574.390579 516.318198 574.390579L516.318198 574.390579ZM516.318358 311.603308C465.160902 311.603308 423.599181 353.16503 423.599181 404.326803 423.599181 455.42919 465.160902 496.995232 516.318358 496.995232 567.479053 496.995232 609.041853 455.42919 609.041853 404.326803 609.041853 353.16503 567.425066 311.603308 516.318358 311.603308L516.318358 311.603308Z"
            p-id="6935" fill="#FFFEFE"></path>
        </svg>
        <span>会议地点：</span>
      </div>
      <p class="address">{{ item.address }}</p>
    </div>
    <div class="content">
      <div class="title">
        <span class="border"></span>
        <span class="type">会议议题</span>
        {{ item.topics }}
      </div>
      <div class="file" v-show="annexUrl.length>0">
        <div class="pdf">
          <img src="~assets/mobile/meeting/pdf.png" alt="附件">
          <p>
            <span>9月份党支部委员会会议纪要.pdf</span>
            <span style="float: left">1.2MB</span>
            <a :href="downloadUrl + '?name=' + annexUrl" class="more">下载查看</a>
          </p>
        </div>
        <!--        <img src="~assets/mobile/meeting/right.png" alt="" class="more">-->
      </div>
      <div class="title">
        <span class="border"></span>
        参会人
        <!--        <p class="fr">-->
        <!--          <span class="signed">5人签到</span>-->
        <!--          <span class="unsigned">3人未签到</span>-->
        <!--        </p>-->
      </div>
      <ul>
        <li v-for="(item,index) in peopleList" :key="index">
          <div class="people_info">
            <span>{{ item.userName }}</span>
            <span style="text-align: center;padding-left: 3vw">联系方式：{{ item.phone }}</span>
            <span class="fr">{{ item.admin == true ? '我自己' : '' }}</span>
          </div>
        </li>
      </ul>
    </div>
    <!--    确认通知状态-->
<!--    <div class="button_group fl">-->
<!--      <el-input-->
<!--        type="textarea"-->
<!--        placeholder="说点什么吧..."-->
<!--        rows='2' cols='50'-->
<!--        maxlength="255"-->
<!--      >-->
<!--      </el-input>-->
<!--      <button class="fl button_leave" @click="">-->
<!--        {{ item.status == 0 ? '请假' : item.status == 2 ? '已请假' : item.status == 1 ? '未请假' : '' }}-->
<!--      </button>-->
<!--      <button class="fr button_sign" @click="">-->
<!--        {{ item.status == 0 ? '出席' : item.status == 1 ? '确认出席' : item.status == 2 ? '不出席' : '' }}-->
<!--      </button>-->
<!--    </div>-->
    <!--    实际参加会议确认状态-->
        <div class="button_group fl">
          <button class="fl button_leave" @click="leave()">
            {{ item.states == 0 ? '请假' : item.states == 2 ? '已请假' : item.states == 1 ? '请假' : '' }}
          </button>
          <button class="fr button_sign" @click="sign()">
            {{ item.states == 0 ? '签到' : item.states == 1 ? '已签到' : item.states == 2 ? '签到' : item.states == 0 && item.isQrcode == 1 ? '二维码签到' : '' }}
          </button>
        </div>
  </div>
</template>

<script>
import {getMeetingDetail, getDownload, setActivityLeave, setMeetingLeave} from "@/api/mobile";
import config from '@/config'

export default {
  name: "meeting-attendance",
  props: {
    signedType: {
      type: String
    }
  },
  data() {
    return {
      meetingId: this.$route.query,
      downloadUrl: '/api/common/download/resource',
      attachUrl: config.attachUrl,
      annexUrl: '',
      signed: '',
      leaved: '',
      peopleList: [],
      item: {}
    }
  },
  methods: {
    getMeetingInfo(id) {
      getMeetingDetail(id).then(res => {
        if (res.code * 1 === 0) {
          this.item = res.data
          this.annexUrl = res.data.annexUrl.replace(/\[|\"|]/g, "")
          this.peopleList = res.data.participants ? JSON.parse(res.data.participants) : ''
          console.log('this.peopleList')
          console.log(this.peopleList)
          res.data.conveneTime = this.$op.moment(res.data.conveneTime * 1000).format('YYYY-MM-DD HH:MM:SS')
          console.log(this.item)
        }
      })
    },
    sign() {
      let data = {
        meetingId: this.meetingId.id,
        states: 1
      }
      this.setActivityState(data)
    },
    leave() {
      let data = {
        meetingId: this.meetingId.id,
        states: 2
      }
      this.setActivityState(data)
    },
    setActivityState(data) {
      setActivityLeave(data).then(res => {
        console.log('data')
        console.log(data)
        if (res.code * 1 === 0) {
          console.log(res)
          this.$toast('提交成功')
        } else {
          console.log(res)
          this.$toast(res.msg)
        }
      })
    },
    setMeetingStatus(data) {
      setMeetingLeave(data).then(res => {
        console.log('data')
        console.log(data)
        if (res.code * 1 === 0) {
          console.log(res)
          this.$toast('提交成功')
        } else {
          console.log(res)
          this.$toast(res.msg)
        }
      })
    }


  },
  mounted() {
    if (this.signedType == 1) {
      this.signed = '签 到'
    } else if (this.signedType == 2) {
      this.signed = '代 签 到'
    } else if (this.signedType == 3) {
      this.signed = '补 签 到'
    }
    this.leaved = '请假'
    let {id} = this.$route.query
    console.log('接收的id' + id)
    this.getMeetingInfo(id)
  },
  components: {
    config
  }
}
</script>

<style scoped lang="less">
.attendance {
  background: #F5F5F5;
  margin-top: 7vh;

  .meeting {
    padding: 8vw 12vw;
    background: url(~assets/mobile/meeting/bg1.png) no-repeat center 0 scroll;

    .title {
      font-size: 2.8vh;
      line-height: 4.8vh;
      color: #ffffff;
      text-align: center;
    }

    .info {
      text-align: center;
      padding-bottom: 3vh;
      border-bottom: 1px solid #ffffff;
      color: #ffffff;

      img {
        width: 7vw;
        height: 7vw;
        vertical-align: middle;
      }

      span {
        font-size: 1.8vh;
        vertical-align: middle;
      }
    }

    .info_item {
      padding: 1vw;
      line-height: 3.2vh;
      position: relative;

      svg {
        width: 4vw;
        height: 4vw;
        margin-right: 1vw;
        vertical-align: middle;
        /*align:center*/
      }

      span {
        font-size: 2vh;
        color: #ffffff;
        display: inline-block;
        position: absolute;
        top: -.8vw;
        /*right: 0;*/
        padding-top: 2vw;
      }
    }

    .address {
      font-size: 2vh;
      color: #EEEEEE;
      text-align: center;
      line-height: 4vh;
    }
  }

  .content {
    padding: 2vw 12vw;
    margin-bottom: 6vh;

    .title {
      margin-top: 3vw;
      font-size: 2vh;
      color: #333333;
      line-height: 3.2vh;
      margin-bottom: 3vw;

      .border {
        border-left: 3px solid #F44436;
        margin-right: 1vw;
      }

      .type {
        border: 1px solid #F44436;
        color: #F44436;
        font-size: .6vh;
        vertical-align: middle;
        padding: .5vw 1vw;
      }

      span {
        margin-right: 1vw;
      }

      .signed {
        padding-right: 2vw;
        border-right: 1px solid #CCCCCC;
      }
    }

    .file {
      background: #ffffff;
      border: 1px solid #CCCCCC;
      border-radius: 2vw;
      padding: 4vw;
      overflow: auto;
      color: #F44E41;

      .pdf {
        display: flex;
        float: left;
        vertical-align: middle;

        img {
          width: 10vw;
          height: 10vw;
          border-radius: 2vw;
        }

        p {
          margin: 0 2vw;

          span {
            display: block;
            vertical-align: middle;
            line-height: 2.8vh;
          }
        }
      }

      .more {
        float: right;
        //width: 3vw;
        height: 4vw;
        margin-top: 3vw;
      }
    }

    .people_list {
      display: flex;
      //flex-wrap: wrap;
      //justify-content: space-between;
      width: 100%;
    }

    .people_li {
      //width: 20%;

      p {
        display: inline-block;
        width: 100%;
        text-align: center;
        line-height: 3.8vh;
        font-size: 1.8vh;
      }
    }

    .people_list {
      .people_li {
        //width: -webkit-calc(100% / 5);
        //width: calc(100% / 5);
      }
    }

    .people_list:after {
      content: ' ';
      flex: auto;
    }
  }

  .people_info {
    line-height: 3.8vh;
  }

  .button_group {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  button {
    width: 40%;
    margin: auto 5% 2%;
    font-size: 2.4vh;
    display: inline-block;
    border-radius: 4px;
  }

  .button_sign {
    color: #ffffff;
    background: #F44436;
    line-height: 6vh;
    font-size: 2.2vh;
  }

  .button_leave {
    border: 1px solid #F44436;
    color: #F44436;
    background: #ffffff;
    line-height: 6vh;
    font-size: 2.2vh;

  }
}
</style>
