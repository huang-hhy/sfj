<template>
  <div class="integral_detail">
    <div class="head_time">
      <p class="fl">
        2019-08
      </p>
      <p class="fr">
        月到年
      </p>
    </div>
    <ul class="integral_d_list">
      <li class="integral_d_li" v-for="(item,index) in integralList" :key="index">
        <div class="integral_d_l">
          <p class="content">
            <span class="type">{{item.type}}</span>
            <span class="name">{{item.name}}</span>
          </p>
          <p class="time">{{item.time}}</p>
        </div>
        <div class="integral_d_r">
          <p :class="{grade:item.grade>=0,grade2:item.grade<0}">{{item.grade}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "detail",
    data() {
      return {
        integralList: [
          {id: 1, name: '党的十九大重要思想（一）', type: '学习', grade: '+5', time: '2019-08-31'},
          {id: 2, name: '党的十九大重要思想（二）', type: '学习', grade: '+5', time: '2019-08-31'},
          {id: 3, name: '党组织扶贫活动', type: '参加', grade: '+15', time: '2019-08-31'},
          {id: 4, name: '优秀党员选举大会迟到', type: '减少积分', grade: '-10', time: '2019-08-31'},
          {id: 5, name: '7月党费迟缴', type: '减少积分', grade: '-10', time: '2019-08-31'}

        ]
      }
    }
  }
</script>

<style scoped lang="less">
  .integral_detail {
    .head_time {
      overflow: auto;
      padding: 2vw 5vw;
      background: #DEDEDE;
      font-size: 2vh;
      line-height: 3vh;
    }

    .integral_d_list {
      padding: 0 5vw;

      .integral_d_li {
        padding: 2vw 0 1vw 0;
        overflow: auto;
        border-bottom: 1px solid #dedede;

        .integral_d_l {
          float: left;

          .content {
            font-size: 2vh;
            line-height: 3vh;

            .type {
              color: #F44436;
              display: inline-block;
              margin-right: 1.5vw;
            }

            .name {
              color: #333333;
            }
          }

          .time {
            font-size: 1.6vh;
            color: #999999;
            line-height: 2.8vh;
          }
        }

        .integral_d_r {
          float: right;

          .grade {
            margin: auto 0;
            color: #F44436;
            font-size: 2.4vh;
            line-height: 5.8vh;
          }

          .grade2 {
            margin: auto 0;
            color: #999999;
            font-size: 2.4vh;
            line-height: 5.8vh;
          }
        }

      }
    }
  }
</style>
