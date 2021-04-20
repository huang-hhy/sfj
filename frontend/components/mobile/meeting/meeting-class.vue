<template>
  <div class="meeting-class">
    <div class="class_info">
      <img src="~assets/mobile/meeting/meeting.png" alt="">
      <p>会议信息</p>
    </div>
    <infoList :info="info" :infolist="infoList"></infoList>
    <div class="meeting_class_list">
      <div class="meeting_class_li" @click="meetingType(1)">
        <img src="~assets/mobile/meeting/order-meeting.png" alt="">
        <p>预约会议</p>
      </div>
      <div class="meeting_class_li" @click="meetingType(2)">
        <img src="~assets/mobile/meeting/sign-in.png" alt="">
        <p>会议签到</p>
      </div>
      <div class="meeting_class_li" @click="meetingType(3)">
        <img src="~assets/mobile/meeting/my-meeting.png" alt="">
        <p>我的会议</p>
      </div>
      <div class="meeting_class_li" @click="meetingType(4)">
        <img src="~assets/mobile/meeting/meeting-summary.png" alt="">
        <p>会议纪要</p>
      </div>
    </div>
  </div>
</template>

<script>
  import infoList from "@/components/mobile/meeting/info-list";
  import {getMeetingType,getMeetingList} from '@/api/mobile'
  import {mapActions} from "vuex";

  export default {
    name: "meeting-class",
    head() {
      return {
        title: this.$store.state.app.title + '- 在线学习',
        meta: [
          {
            hid: this.$store.state.app.title,
            name: this.$store.state.app.title,
            content: this.$store.state.app.title
          }
        ]
      }
    },
    data() {
      return {
        info: [],
        infoList: [],
      }
    },
    components: {
      infoList
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      meetingType(index) {
        if (index == 1) {
          this.$router.push('/mobile/meeting/appointment')
        } else if (index == 2) {
          this.$router.push('/mobile/meeting/attendance')
        } else if (index == 3) {
          this.$router.push('/mobile/meeting/info')
        } else if (index == 4) {
          this.$router.push('/mobile/meeting/summary')
        }
      },
      getTypeList(){
        //异步
        return new Promise((resolve, reject) => {
          try{
            getMeetingType({}).then(res=>{
              resolve(res)
              // if (res.code * 1 === 0) {
              //   this.info = res.data
              //   console.log(this.info)
              // }
            })
          }catch (e){
            reject(e)
          }
        })

      },
      getList(id){
        getMeetingList({meetingTypeId:id}).then(res=>{
          if (res.code * 1 === 0) {
            this.infoList = res.data
            console.log('this.infoList')
            console.log(this.infoList)
          }
        })
      }
    },
    async mounted() {
      this.setBaseInfo()
      // this.getTypeList()
      // this.getList()
      let res = await this.getTypeList()
      console.log('--------------res')
      console.log(res)
      if (res.code * 1 === 0) {
        this.info = res.data
        console.log('this.info')
        console.log(this.info)
        this.getList(res.data[0].id)
        // for (var i = 0; i < res.data.length; i++) {
        //   this.getList(res.data[i].id)
        // }

      }
      // this.info = [
      //   {
      //     type: 'aaaa',
      //     infoList: [
      //       {id: 1, month: '20-10', day: '20', week: '星期一', name: '10月份党支部委员会', time: '09:30-10:45', place: '小会议室'},
      //       {id: 2, month: '20-09', day: '20', week: '星期三', name: '9月份党支部委员会', time: '09:30-10:45', place: '小会议室'},
      //       {id: 3, month: '20-08', day: '20', week: '星期四', name: '8月份党支部委员会', time: '09:30-10:45', place: '小会议室'},
      //     ]
      //   }
      // ]
    },
    asyncData(context) {
      if (process.server) {

      }
    }
  }
</script>

<style scoped lang="less">
  .meeting-class {
    background-size: cover;
    background-attachment: fixed;
    background-image: url('~assets/mobile/meeting/info-background.png');
    padding-bottom: 5vw;
    margin-top: 7vh;

    .class_info {
      padding-top: 5vw;
      text-align: center;
      overflow: auto;

      img {
        width: 10vw;
        height: 10vw;
        border-radius: 50%;
        padding: 2vw;
        background: #FFB992;
      }

      p {
        margin-top: 3vw;
        color: #ffffff;
        font-size: 2.6vh;
      }
    }

    .meeting_class_list {
      margin-left: 5vw;
      margin-right: 5vw;
      background: #ffffff;
      border-radius: 3vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      text-align: justify;

      .meeting_class_li {
        width: calc(50% - 1px);
        padding: 4vw;
        margin: 0 auto;
        text-align: center;

        img {
          width: 10vw;
          height: 12vw;
          margin-bottom: 2vw;
        }

        p {
          color: #6F6F6F;
          font-size: 2.2vh;
          line-height: 3vh;
        }
      }

      .meeting_class_li:nth-child(1) {
        border-right: 1px solid #EEEEEE;
        border-bottom: 1px solid #EEEEEE;
      }

      .meeting_class_li:nth-child(2) {
        border-bottom: 1px solid #EEEEEE;
      }

      .meeting_class_li:nth-child(3) {
        border-right: 1px solid #EEEEEE;
      }
    }
  }

</style>
