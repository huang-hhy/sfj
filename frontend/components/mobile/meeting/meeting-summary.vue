<template>
  <div>
    <div class="meeting_summary">
      <h2 class="title">9月份党支部委员会会议纪要</h2>
      <p class="time">
        <span>陈兰：2019-09-21</span>
        <span>11:00</span>
      </p>
      <div class="meeting_content">
        <div class="name">
          <img src="~assets/mobile/meeting/handbag.png" alt="">
          <span>9月份党支部委员会</span>
        </div>
        <p class="content">本次党支部委员会以“深入贯彻党的十九大精神·紧扣新时代要求推动改革发展”为议题，支部领导及各位同志充分发表了自己的看法，现整理为会议纪要，请同志们继续学习讨论。</p>
      </div>
      <div class="meeting_img">
        <img src="~assets/image/test.png" alt="">
        <img src="~assets/image/test.png" alt="">
        <img src="~assets/image/test.png" alt="">
      </div>
      <div class="file">
        <div class="pdf">
          <img src="~assets/mobile/meeting/pdf.png" alt="">
          <p>
            <span>9月份党支部委员会会议纪要.pdf</span>
            <span>1.2MB</span>
          </p>
        </div>
        <img src="~assets/mobile/meeting/right.png" alt="" class="more">
      </div>
      <div class="read">
        <p class="read_member">
          <span class="member">已读成员</span>
          <span class="number">（13）</span>
        </p>
        <p class="name">张明，夏雨，张小敏，陈浩民，杨世坤，刘琦，孙敏芳，杨轩，董晓仁，张史勇，任家萱，张璐曼、欧阳</p>
      </div>
    </div>
    <reply></reply>
  </div>
</template>

<script>
  import reply from "@/components/mobile/reply/reply";

  export default {
    name: "meeting-summary",
    components: {
      reply
    }
  }
</script>

<style scoped lang="less">
  .meeting_summary {
    padding: 5vw;

    .title {
      font-size: 2.8vh;
      line-height: 3.2vh;
      margin-bottom: 2vw;
      font-weight: bold;
      color: #000;
    }

    .time {
      line-height: 2.4vh;

      span {
        font-size: 1.8vh;
        margin-right: 2vw;
        color: #9D9D9D;
      }
    }

    .meeting_content {
      font-size: 2vh;
      text-align: justify;
      color: #444444;

      .name {
        line-height: 5.6vh;

        img {
          width: 5vw;
          height: 5vw;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .content {
        line-height: 3.6vh;
        padding: 1vw 0;
      }
    }

    .meeting_img {
      padding: 4vw 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 32%;
        height: 14vh;
        border-radius: 2vw;
      }
    }

    .file {
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
        width: 3vw;
        height: 4vw;
        margin-top: 3vw;
      }
    }

    .read {
      margin: 4vw 0;

      .read_member {
        border-left: 2px solid #F44436;
        line-height: 1.8vh;
        margin: 4vw 0;

        span {
          font-size: 1.8vh;
          color: #333333;

        }

        .member {
          padding: 0 1.5vw;
        }
      }

      .name {
        font-size: 1.8vh;
        color: #9C9C9C;
        line-height: 3vh;
      }
    }
  }
</style>
