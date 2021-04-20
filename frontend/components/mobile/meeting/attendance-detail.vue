<template>
  <div class="attendance_detail">
    <div class="qr_code">
      <img src="@/assets/mobile/meeting/qr-code.png" alt="">
      <p>请参会人员扫描二维码完成签到</p>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">已签到</el-menu-item>
      <el-menu-item index="2">未签到</el-menu-item>
      <el-menu-item index="3">已请假</el-menu-item>
    </el-menu>
    <ul class="ad_list">
      <li class="ad_li" v-for="(item,index) in signList" :key="index">
        <img :src="item.img" alt="">
        <div class="detail">
          <p class="name">{{item.name}}</p>
          <p class="time">
            <img src="@/assets/mobile/meeting/qr-code.png" alt="">
            <span>{{item.time}}</span>
          </p>
        </div>
      </li>
    </ul>
    <div class="attendance_bt">
      <p class="replace_sign">
        <img src="@/assets/mobile/meeting/qr-code.png" alt="">
        <span>代签到</span>
      </p>
      <p class="repair_sign">补签到</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "attendance-detail",
    data() {
      return {
        activeIndex: '1',
        signList: []
      }
    },
    mounted() {
      this.signList = [
        {
          id: 1,
          name: '曾峰1',
          img: require('@/assets/mobile/meeting/people1.png'),
          time: '2019-08-19 09:28:30',
          state: '已签到'
        },
        {
          id: 2,
          name: '曾峰2',
          img: require('@/assets/mobile/meeting/people2.png'),
          time: '2019-08-19 09:28:30',
          state: '已签到'
        },
        {
          id: 3,
          name: '曾峰3',
          img: require('@/assets/mobile/meeting/people1.png'),
          time: '2019-08-19 09:28:30',
          state: '已签到'
        }
      ]
    },
    methods: {
      handleSelect(key, keyPath) {
        this.activeIndex = key
        console.log(this.activeIndex)
        if (this.activeIndex == 1) {
          this.signList = [
            {
              id: 1,
              name: '曾峰1',
              img: require('@/assets/mobile/meeting/people1.png'),
              time: '2019-08-19 09:28:30',
              state: '已签到'
            },
            {
              id: 2,
              name: '曾峰2',
              img: require('@/assets/mobile/meeting/people2.png'),
              time: '2019-08-19 09:28:30',
              state: '已签到'
            },
            {
              id: 3,
              name: '曾峰3',
              img: require('@/assets/mobile/meeting/people1.png'),
              time: '2019-08-19 09:28:30',
              state: '已签到'
            }
          ]
        } else if (this.activeIndex == 2) {
          this.signList = [
            {
              id: 4,
              name: '曾峰4',
              img: require('@/assets/mobile/meeting/people1.png'),
              time: '2019-08-19 09:28:30',
              state: '未签到'
            },
            {
              id: 5,
              name: '曾峰5',
              img: require('@/assets/mobile/meeting/people2.png'),
              time: '2019-08-19 09:28:30',
              state: '未签到'
            },
            {
              id: 6,
              name: '曾峰6',
              img: require('@/assets/mobile/meeting/people1.png'),
              time: '2019-08-19 09:28:30',
              state: '未签到'
            }
          ]
        } else if (this.activeIndex == 3) {
          this.signList = [
            {
              id: 7,
              name: '曾峰7',
              img: require('@/assets/mobile/meeting/people1.png'),
              time: '2019-08-19 09:28:30',
              state: '已请假'
            },
            {
              id: 8,
              name: '曾峰8',
              img: require('@/assets/mobile/meeting/people2.png'),
              time: '2019-08-19 09:28:30',
              state: '已请假'
            },
            {
              id: 9,
              name: '曾峰9',
              img: require('@/assets/mobile/meeting/people1.png'),
              time: '2019-08-19 09:28:30',
              state: '已请假'
            }
          ]
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .attendance_detail {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background: #f3f3f3;

    .qr_code {
      background: #F27954;
      padding: 5vw 0;
      text-align: center;

      img {
        width: 42vw;
        height: 42vw;
        border-radius: 1vw;
      }

      p {
        font-size: 2vh;
        line-height: 5vh;
        color: #ffffff;
      }
    }

    .el-menu {
      width: 100%;
      margin-bottom: 1vh;
      border: 1px solid #CCCCCC;
      background: #ffffff;

      .el-menu-item {
        margin: 3vw 8vw;
        line-height: 3vh;
        padding: 0 3vw;
        width: calc(33% - 16vw);
        text-align: center;
      }
    }

    .el-menu--horizontal {
      border-bottom: none;
      margin: 0;
      padding: 0;
      line-height: 0;

      .el-menu-item {
        height: 4vh;
        color: #343434;
      }

      .is-active {
        border-bottom: 2px solid #F4473A;
        color: #F4473A;
      }
    }

    .ad_list {
      background: #ffffff;
      padding: 2vw 8vw;

      .ad_li {
        padding: 2vw 0;
        display: flex;

        img {
          width: 12vw;
          height: 12vw;
          border-radius: 1vw;
          margin-right: 2.5vw;
        }

        .detail {
          .name {
            font-size: 2vh;
            color: #333333;
            line-height: 7vw;
          }

          .time {
            line-height: 5vw;

            img {
              display: inline-block;
              width: 4vw;
              height: 4vw;
              margin-right: .2vw;
              vertical-align: middle;
            }

            span {
              font-size: 1.8vh;
              color: #999999;
              vertical-align: middle;
            }
          }
        }
      }
    }

    .attendance_bt {
      position: fixed;
      display: flex;
      bottom: 0;
      width: 100%;
      height: 7vh;

      .replace_sign {
        width: 50%;
        text-align: center;
        background: #ffffff;
        color: #333333;
        margin: auto 0;

        img {
          width: 5vw;
          height: 5vw;
        }

        span {
          display: block;
          font-size: 1.8vh;
        }
      }

      .repair_sign {
        width: 50%;
        font-size: 2.4vh;
        color: #ffffff;
        background: #F44436;
        line-height: 7vh;
        text-align: center;
      }
    }
  }

</style>
