<template>
  <div class="exam_detail">
    <h2 class="name">{{ test.name }}</h2>
    <div class="matter">
      <span>开始时间：{{ test.start }}</span>
      <span>结束时间：{{ test.end }}</span>
      <span>试卷类型：{{ test.type }}</span>
      <span>考试时长：{{ test.duration }}</span>
      <span>试卷总分：{{ test.total }}分</span>
    </div>
    <ul class="mold_list">
      <li v-for="(item,index) in test.mold" :key="index" class="mold_li">
        <p class="mold">
          <span>{{ index==0?'一、':index==1?'二、':'三、' }}</span>
          {{ item.name+"，共"+item.count+"道，每道"+item.score+"分，共"+item.sum+"分" }}</p>
        <ul class="subject_list">
          <li v-for="(item2,index2) in item.list" :key="index2" class="subject_li">
            <p class="subject">{{ (index2+1)+"、"+item2.subject }}</p>
            <div v-if="item.name!=='问答题'">
              <p v-for="(option,o) in item2.option" :key="o" class="option">{{ "选项"+option.opt+"："+option.content }}</p>
            </div>
            <p class="answer">答案：{{ item2.answer }}</p>
            <p v-if="item.name!=='问答题'" class="analysis">解析：{{ item2.analysis }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import data from './json/exam.json'
export default {
  name: 'ExamDetail',
  data() {
    return {
      test: {}
    }
  },
  mounted() {
    this.test = data.test
  }
}
</script>

<style scoped lang="less">
.exam_detail {
  font-size: 16px;
  .name {
    text-align: center;
    font-size: 24px;
    color: #000;
    margin: 20px 0;
  }
  .matter {
    text-align: center;
    line-height: 26px;
    span {
      display: inline-block;
      margin-right: 30px;
    }
  }
  .mold_list {
    margin: 10px 80px;
    list-style: none;
    .mold_li {
      .mold {
        font-size: 18px;
        margin: 10px 0;
      }
      .subject_list {
        list-style: none;
        .subject_li {
          .subject {
            margin: 15px 0 10px 0;
          }
          .option {
            line-height: 22px;
          }
          .answer{
            line-height: 32px;
          }
          .analysis{
            line-height: 22px;
          }
        }
      }
    }
  }
}
</style>
