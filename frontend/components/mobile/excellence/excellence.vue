<template>
  <div class="excellence">
    <div class="excellence_info">
      <div class="info">
        <img src="@/assets/mobile/meeting/people1.png" alt="">
        <div class="info_r">
          <h2 class="name">王媛媛</h2>
          <p>系统集成（云数据）党总支</p>
        </div>
      </div>
      <div class="integral">
        <div class="time">
          <p class="fl">
            2019-08
          </p>
          <p class="fr">
            月到年
          </p>
        </div>
        <ul class="integral_list">
          <li class="integral_li">
            <p class="name">本月个人积分</p>
            <div class="point">
              <div class="point_item">
                <p class="grade">126</p>
                <p class="type">月积分</p>
              </div>
              <div class="point_item">
                <p class="type">不参与排名</p>
              </div>
            </div>
            <button class="detail" @click="integralDetail">积分明细</button>
          </li>
          <li class="integral_li">
            <p class="name">本月组织积分
              <span>系统集成（云数据）党总支</span>
            </p>
            <div class="point">
              <div class="point_item">
                <p class="grade">26</p>
                <p class="type">月积分</p>
              </div>
              <div class="point_item">
                <p class="grade">5</p>
                <p class="type">月排名</p>
              </div>
            </div>
            <button class="detail" @click="integralDetail">积分明细</button>
          </li>
        </ul>
      </div>
      <ul class="ranking_list">
        <li class="ranking_li" @click="ranking">
          <img src="@/assets/mobile/excellence/personal.png" alt="">
          <p>个人排行榜</p>
        </li>
        <li class="ranking_li" @click="ranking">
          <img src="@/assets/mobile/excellence/organization.png" alt="">
          <p>组织排行榜</p>
        </li>
        <li class="ranking_li" @click="ranking">
          <img src="@/assets/mobile/excellence/integral.png" alt="">
          <p>增减积分</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "excellence",
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
    head() {
      return {
        title: this.$store.state.app.title + '- 积分申请',
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
      ranking() {
        this.$router.push('/mobile/excellence/ranking')
      },
      integralDetail() {
        this.$router.push('/mobile/excellence/detail')
      },
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
  .excellence {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background: #EBEBEB;

    .excellence_info {
      /*overflow: auto;*/
      background: url(~assets/mobile/meeting/bg1.png) no-repeat center -12vh scroll;

      .info {
        display: flex;
        padding: 5vw 5vw 4vw 5vw;

        img {
          width: 18vw;
          height: 18vw;
          border-radius: 50%;
          background: #F8BCA9;
          padding: 2vw;
          margin-right: 2vw;
        }

        .info_r {
          color: #ffffff;

          .name {
            line-height: 10vw;
            font-size: 2.4vh;
            font-weight: bold;
          }

          p {
            line-height: 8vw;
            font-size: 2vh;
          }
        }
      }

      .integral {
        margin: 3vw 5vw;
        border-radius: 1vw;
        background: #ffffff;
        padding: 4vw 0 0 0;

        .time {
          overflow: auto;
          padding: 0 5vw 2vw 5vw;
          border-bottom: 1px solid #dddddd;
          font-size: 2vh;
        }

        .integral_list {
          margin-top: 4vw;

          .integral_li {
            padding-bottom: 2vw;

            .name {
              font-size: 1.8vh;
              margin: 0 5vw;
              color: #333333;

              span {
                display: inline-block;
                padding-left: 2vw;
                color: #999999;
                float: right;
              }
            }

            .point {
              overflow: auto;
              width: 100%;
              display: flex;
              margin-top: 3vw;

              .point_item {
                width: 50%;
                text-align: center;
                margin: auto 0;

                .type {
                  font-size: 1.8vh;
                  color: #999999;
                }

                .grade {
                  font-size: 3vh;
                  color: #F44436;
                  line-height: 3vh;
                }
              }

            }

            .detail {
              background: #ffffff;
              display: block;
              padding: 1.4vw 3.4vw;
              font-size: 1.8vh;
              border-radius: 4vw;
              border: 1px solid #F44436;
              color: #F44436;
              text-align: center;
              margin: 5vw auto;
            }
          }
        }
      }

      .ranking_list {
        margin: 0 5vw;
        padding: 5vw 5vw 2vw 5vw;
        display: flex;
        justify-content: space-between;
        text-align: justify;
        background: #ffffff;
        border-radius: 1vw;

        .ranking_li {
          text-align: center;
          width: 26%;

          img {
            width: 10vw;
            height: 10vw;
            padding: 2vw;
            border-radius: 30%;
            border: 1px solid #F44436;
          }

          p {
            font-size: 2vh;
            line-height: 6vh;
            color: #333333;
          }
        }
      }
    }

  }
</style>
