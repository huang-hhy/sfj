<template>
  <div class="ranking_list">
    <div class="ranking_top">
      <div class="top_time">
        <p class="fl">
          2019-08
        </p>
        <p class="fr">
          月到年
        </p>
      </div>
      <div class="menu">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">个人排行榜</el-menu-item>
          <el-menu-item index="2">组织排行榜</el-menu-item>
        </el-menu>
      </div>
      <ul class="ranking_three_list">
        <li class="ranking_three_li">
          <img src="@/assets/mobile/excellence/first.png" alt="" class="num">
          <img src="@/assets/mobile/meeting/people1.png" alt="" class="photo">
          <p class="name">张星</p>
          <p class="org">系统集成（云数据）党总支</p>
          <p class="grade">498</p>
        </li>
        <li class="ranking_three_li">
          <img src="@/assets/mobile/excellence/second.png" alt="" class="num">
          <img src="@/assets/mobile/meeting/people1.png" alt="" class="photo">
          <p class="name">张星</p>
          <p class="org">系统集成（云数据）党总支</p>
          <p class="grade">598</p>
        </li>
        <li class="ranking_three_li">
          <img src="@/assets/mobile/excellence/third.png" alt="" class="num">
          <img src="@/assets/mobile/meeting/people1.png" alt="" class="photo">
          <p class="name">张星</p>
          <p class="org">系统集成（云数据）党总支</p>
          <p class="grade">478</p>
        </li>
      </ul>
    </div>
    <ul class="ranking_l_list">
      <li class="ranking_l_li" v-for="(item,index) in rankingList" :key="index">
        <div class="ranking_l_li_l">
          <span class="number">{{item.id}}</span>
          <img :src="item.img" alt="">
          <div class="content">
            <p class="name">{{item.name}}</p>
            <p class="org">{{item.org}}</p>
          </div>
        </div>
        <div class="ranking_l_li_r">{{item.grade}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ranking-list",
    data() {
      return {
        activeIndex: '1',
        rankingList: [
          {id: 1, name: '张星1', img: require('@/assets/mobile/meeting/people1.png'), org: '系统集成（云数据）党总支', grade: 598},
          {id: 2, name: '张星2', img: require('@/assets/mobile/meeting/people1.png'), org: '系统集成（云数据）党总支', grade: 498},
          {id: 3, name: '张星3', img: require('@/assets/mobile/meeting/people1.png'), org: '系统集成（云数据）党总支', grade: 478},
          {id: 4, name: '张星4', img: require('@/assets/mobile/meeting/people1.png'), org: '系统集成（云数据）党总支', grade: 476},
          {id: 5, name: '张星5', img: require('@/assets/mobile/meeting/people1.png'), org: '系统集成（云数据）党总支', grade: 475},
          {id: 6, name: '张星6', img: require('@/assets/mobile/meeting/people1.png'), org: '系统集成（云数据）党总支', grade: 470},

        ]
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        this.activeIndex = key
      }
    }
  }
</script>

<style scoped lang="less">
  .ranking_list {
    .ranking_top {
      background: #EA3905;
      background: linear-gradient(to bottom, #EA3905, #FFFEFE);
      /*background: -moz-linear-gradient(top, #EA3905, #aaa);*/
      /*background: -o-linear-gradient(top,#EA3905, #aaa);*/

      .top_time {
        overflow: auto;
        padding: 2vw 5vw;
        font-size: 2vh;
        line-height: 2.8vh;
      }

      .menu {
        width: 50%;
        margin: 0 25%;

        .el-menu {
          width: 100%;
          background: transparent;

          .el-menu-item {
            line-height: 3vh;
            padding: 0 3vw;
            color: #ffffff;
            width: 50%;
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
            background: transparent;
            color: #ffffff;
            text-align: center;
            margin: 2vw auto;
          }

          .is-active {
            border-bottom: 2px solid #ffffff;
            color: #ffffff;
            font-weight: bold;
          }
        }
      }

      .ranking_three_list {
        margin: 0 5vw;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        text-align: justify;

        .ranking_three_li {
          width: 32.5%;
          background: #ffffff;
          margin: 0 auto;
          text-align: center;
          border-top-left-radius: 2vw;
          border-top-right-radius: 2vw;

          .num {
            width: 6vw;
            height: 6vw;
            display: block;
            margin: 0 auto 3vw auto;
          }

          .photo {
            width: 12vw;
            height: 12vw;
            display: block;
            margin: 0 auto 1vw auto;
            border: 1px solid #dddddd;
            border-radius: 50%;
          }

          .name {
            font-size: 2.2vh;
            color: #333333;
            line-height: 4.6vh;
          }

          .org {
            padding: 0 1.5vw;
            font-size: 1.6vh;
            color: #999999;
            line-height: 2vh;
          }

          .grade {
            color: #F44436;
            font-size: 2.8vh;
            line-height: 4.6vh;
          }
        }

        .ranking_three_li:nth-child(1) {
          margin-top: 4vh;
        }

        .ranking_three_li:nth-child(2) {
          margin-top: 1vh;
        }

        .ranking_three_li:nth-child(3) {
          margin-top: 7vh;
        }
      }

    }

    .ranking_l_list {
      padding: 0 5vw;

      .ranking_l_li {
        padding: 2vw 0;
        border-bottom: 1px solid #DEDEDE;
        overflow: auto;

        .ranking_l_li_l {
          float: left;
          margin: auto 0;
          display: flex;

          .number {
            font-size: 2.4vh;
            color: #666666;
            margin-right: 2vw;
            line-height: 10vw;
          }

          img {
            width: 10vw;
            height: 10vw;
            margin-right: 1vw;
            border-radius: 50%;
            border: 1px solid #DEDEDE;
          }

          .content {
            .name {
              font-size: 2vh;
              line-height: 6vw;
              color: #333333;
            }

            .org {
              font-size: 1.4vh;
              line-height: 4vw;
              color: #999999;
            }
          }
        }

        .ranking_l_li_r {
          float: right;
          color: #F44436;
          font-size: 2.4vh;
          line-height: 10vw;
        }
      }
    }
  }
</style>
