<template>
  <div class="exam_result">
    <h2 class="exam_title">学习《十九大精神解读》考试</h2>
    <div class="result_des">
      <img src="@/assets/mobile/meeting/pdf.png" alt=""/>
      <p>恭喜你，通过考试！</p>
    </div>
    <ul class="result_item_list">
      <li class="result_item_li">
        <p class="name">答题用时</p>
        <p class="content">10分10秒</p>
      </li>
      <li class="result_item_li">
        <p class="name">合格分/总分</p>
        <p class="content">60/100</p>
      </li>
      <li class="result_item_li">
        <p class="name">剩余可考</p>
        <p class="content">4次</p>
      </li>
    </ul>
    <ul class="result_judge_list">
      <li v-for="(item,index) in examResult" :key="index" class="result_judge_li">
        <p :class="{right:item.result==='right',wrong:item.result==='wrong'}">{{item.num}}</p>
      </li>
    </ul>
    <div class="result_bt">
      <button class="again">再考一次</button>
      <button class="result">查看答案</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "exam-result",
    data() {
      return {
        examResult: [
          {num: 1, result: 'right'},
          {num: 2, result: 'right'},
          {num: 3, result: 'wrong'},
          {num: 4, result: 'right'},
          {num: 5, result: 'right'},
          {num: 6, result: 'right'},
          {num: 7, result: 'right'},
          {num: 8, result: 'right'},
          {num: 9, result: 'wrong'},
          {num: 10, result: 'right'},
          {num: 11, result: 'right'},
          {num: 12, result: 'wrong'},
          {num: 13, result: 'right'},
          {num: 14, result: 'right'},

        ]
      }
    }
  }
</script>

<style scoped lang="less">
  .exam_result {
    .exam_title {
      text-align: center;
      padding: 3.5vh;
      margin-top: 7vh;
      font-size: 2.4vh;
      color: #ffffff;
      background: #F27954;
    }

    .result_des {
      position: relative;

      img {
        width: 28vw;
        height: 26vw;
        margin: 6vw auto;
        display: block;
      }

      p {
        width: 100%;
        position: absolute;
        bottom: 1vw;
        text-align: center;
        color: #ffffff;
        font-size: 1.8vh;
      }
    }

    .result_item_list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      text-align: justify;
      padding: 0 5vw;

      .result_item_li {
        width: 33.3%;
        text-align: center;
        line-height: 3vh;

        .name {
          font-size: 1.8vh;
          color: #999999;
        }

        .content {
          font-size: 2vh;
          color: #333333;
        }
      }
    }

    .result_judge_list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      text-align: justify;
      padding: 5vw;
    }

    .result_judge_li {
      width: 10%;
      margin-bottom: 2vw;

      p {
        /*width: ;*/
        margin: 0 8%;
        height: 7vw;
        line-height: 7vw;
        text-align: center;
        border-radius: 1vw;
      }
    }

    .right {
      border: 1px solid #37C03B;
    }

    .wrong {
      border: 1px solid #F44436;
    }

    .result_judge_list:after {
      content: ' ';
      flex: auto;
    }

    .result_judge_list {
      .result_judge_li {
        width: -webkit-calc(100% / 10);
        width: calc(100% / 10);
      }
    }

    .result_bt {
      width: 100%;
      position: fixed;
      bottom: 7vh;
      padding: 0 6vw;
      display: flex;
      justify-content: space-between;

      button {
        width: 46%;
        height: 5vh;
        color: #ffffff;
        font-size: 2vh;
        text-align: center;
        line-height: 5vh;
        border-radius: 1vw;
      }

      .again {
        background: #FFBE00;
      }

      .result {
        background: #F44436;
      }
    }
  }
</style>
