<template>
<div>
  <nav-header title="缴纳详情"></nav-header>

  <div class="news_detail" v-for="(item,index) in payList" :key="index">
    <h2 class="title">{{item.title}}</h2>
    <div class="news_d_h">
      <div class="news_d_l">
        <span class="source">来源：{{item.from}}</span>
        <p class="time">发布时间：{{ item.time }}</p>
        <p class="read">阅读量：190</p>
      </div>
      <div class="news_d_r">
        <img src="@/assets/mobile/news/right.png" alt="">
      </div>

    </div>
    <div class="content">
      <p>{{item.content}}</p>
    </div>
  </div>

  <div class="appointment_btn">
    <button class="draft">应缴金额：50元</button><button class="release">支付</button>
  </div>
</div>
</template>

<script>
import NavHeader from "@/components/mobile/layout/nav-header";
import NewsDetail from "@/components/pc/news/news-detail";
export default {
name: "pay-detail",
  components: {NewsDetail, NavHeader},
  data(){
  return {
    payList: [
      {id:1,title:'关于收缴党费的通知',content:'各支部、全体党员：按照上级党组织要求，结合流动人才党员实际，请各支部通知所有党员，按照今年上半年缴纳党费的标准缴纳下半年（7月份到12月份）6个月的党费，如有工作变化或薪资待遇调整，请主动联系所在支部，重新予以申报、核算党费缴纳的标准，并按照规定按期、足额缴纳党费。（请与所在支部的党费收缴专员核实确认）。',from:'中共始兴县组织',time:'2019-08-31 24:00'}
    ]
  }
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 缴纳详情',
      meta: [
        {
          hid: this.$store.state.app.title,
          name: this.$store.state.app.title,
          content: this.$store.state.app.title
        }
      ]
    }
  }

}
</script>

<style scoped lang="less">
.news_detail {
  margin-bottom: 8vh;
  margin-top: 7vh;
  padding: 2vw 5vw;

  .content {
    font-size: 2vh;
    line-height: 3.2vh;
    padding: 0.3vh 0;
    text-align: justify;
  }

  .title {
    font-size: 2.6vh;
    margin-bottom: 2vw;
    line-height: 3.4vh;
    text-align: justify;
    // border: 1px solid #000;
  }

  .news_d_h {
    // border: 1px solid #000;
    overflow: auto;
    height: 8vh;
    line-height: 0;

    .news_d_l {
      float: left;
      // margin: auto 0;
      .source {
        // height: 3vh;
        border-top-right-radius: 1vw;
        border-bottom-right-radius: 1vw;
        font-size: 1.6vh !important;
        display: inline-block;
        padding: 2vw;
        background: #FE4141;
        color: #fff;
      }

      .time {
        font-size: 1.6vh !important;
        line-height: 2vh;
        margin: auto 0;
        height: 2.5vh;
      }

      .read {
        font-size: 1.6vh !important;
        line-height: 1vh;
        margin: auto 0;
        height: 2.5vh;
      }

    }

    .news_d_r {
      float: right;

      img {
        margin: auto 0;
        width: 28vw;
        height: 6vh;
      }

    }
  }

  .article_name {
    text-align: center;
    font-size: 1.8vh;
    line-height: 0vh;
    // border: 1px solid #000;
  }

  .article_time {
    text-align: center;
    font-size: 1.8vh;

    .time {
      margin-right: 2vw;
    }
  }

  .detail {

  }
}
.appointment_btn {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;

button {
  width: 50%;
  height: 7vh;
  font-size: 2.4vh;
  display: inline-block;
}
.draft {
  //border-top: 1px solid #EEEEEE;
  background: #ffffff;
  color: #F44436;
  text-align: center;
}

.release {
  border-top: 1px solid #F44436;
  background: #F44436;
  color: #ffffff;
}
}
</style>
