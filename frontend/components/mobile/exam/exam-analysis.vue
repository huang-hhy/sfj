<template>
  <div class="exam_analysis">
    <p class="exam_name">{{ item.title }}</p>

    <ul class="exam_a_list">
      <li class="exam_a_li" v-for="(item1,index1) in item.answerInfos" :key="index1">
<!--                <p class="exam_a_title">-->
<!--                  <span>{{-->
<!--                      item1.type == 1 ? "单选题，" + '共' + item1.num + '题，合计' + item1.sum + '分' : item1.type == 2 ? '多选题，共' + item1.num + '题，合计' + item1.sum + '分' : ''-->
<!--                    }}</span>-->
<!--                </p>-->
        <ul class="exam_ac_list">
          <li class="exam_ac_li">
            <!--            题目-->
            <div class="exam_ac_subject">
              <span class="icon">{{ (index1 + 1) }}.</span>
              <p class="subject">{{ item1.questionTitle }}</p>
            </div>
            <!--            单选选项-->
            <ul class="exam_option_list" v-if="questionType==1">
              <li
                :class="['exam_option_li',item1.answer==item1.myAnswer&&item2.opt==item1.myAnswer?'right':item1.answer!=item1.myAnswer&&item2.opt==item1.myAnswer?'wrong':item2.opt==item1.answer?'right':'']"
                v-for="(item2,index2) in item1.options" :key="index2">
                <span>{{ item2.opt + '.' + item2.content }}</span>
              </li>
            </ul>
            <!--            多选选项-->
            <ul class="exam_option_list" v-if="questionType>1">
              <li
                :class="['exam_option_li',item1.answer==(item1.myAnswer.indexOf(item2.opt)+1)&&item2.opt==item1.myAnswer?'right':(item1.myAnswer.indexOf(item2.opt)+1)&&item2.opt==item1.myAnswer?'wrong':item2.opt==item1.answer?'right':'']"
                v-for="(item2,index2) in item1.options" :key="index2">
                <!--                :class="['exam_option_li',(item1.myAnswer.indexOf(item2.opt)+1)&&(item1.answer.indexOf(item2.opt)+1)?'right':(item1.myAnswer.indexOf(item2.opt)+1)&&(item2.answer.indexOf(item2.opt))?'wrong':'']"-->

                <span v-model="item2.myAnswer,item2.opt">{{ item2.opt + '.' + item2.content }}</span>
              </li>
            </ul>
            <div class="answer_result">
              <p :class="[item1.isCorrect== 1?'right':'wrong']">
                您的答案为{{ item1.myAnswer.toString().replace(/\[|\"|]/g, '') }}.{{ item1.isCorrect == 1 ? '回答：正确' : '回答：错误' }}</p>
            </div>
            <p class="answer_analysis">答案解析：{{ item1.analysis + '.故本题正确答案为：' + item1.answer }}</p>
          </li>
        </ul>
      </li>
    </ul>

<!--    <ul class="exam_a_list">-->
<!--      <li class="exam_a_li" v-for="(item1,index1) in exam.item" :key="index1">-->
<!--        <p class="exam_a_title">-->
<!--          <span>{{-->
<!--              item1.type == 1 ? "单选题，" + '共' + item1.num + '题，合计' + item1.sum + '分' : item1.type == 2 ? '多选题，共' + item1.num + '题，合计' + item1.sum + '分' : ''-->
<!--            }}</span>-->
<!--        </p>-->
<!--        <ul class="exam_ac_list">-->
<!--          <li class="exam_ac_li" v-for="(item2,index2) in item1.subject" :key="index2">-->
<!--            <div class="exam_ac_subject">-->
<!--              <span class="icon">{{ item2.num }}.</span>-->
<!--              <p class="subject">{{ item2.title }}</p>-->
<!--            </div>-->
<!--            <ul class="exam_option_list" v-if="item1.type==1">-->
<!--              <li-->
<!--                :class="['exam_option_li',item2.answer==item2.correct&&item3.opt==item2.correct?'right':item2.answer!=item2.correct&&item3.opt==item2.answer?'wrong':'']"-->
<!--                v-for="(item3,index3) in item2.option" :key="index3">-->
<!--                <el-radio v-model="item2.answer" :label="item3.opt" style="pointer-events: none;">-->
<!--                  {{ item3.opt + '.' + item3.content }}-->
<!--                </el-radio>-->
<!--              </li>-->
<!--            </ul>-->
<!--            <ul class="exam_option_list" v-if="item1.type==2">-->
<!--              <li-->
<!--                :class="['exam_option_li',(item2.answer.indexOf(item3.opt)+1)&&(item2.correct.indexOf(item3.opt)+1)?'right':(item2.answer.indexOf(item3.opt)+1)&&(item2.correct.indexOf(item3.opt))?'wrong':'']"-->
<!--                v-for="(item3,index3) in item2.option" :key="index3">-->
<!--                <el-checkbox-group v-model="item2.answer">-->
<!--                  <el-checkbox :label="item3.opt"-->
<!--                               style="pointer-events: none;">{{ item3.opt + '. ' + item3.content }}-->
<!--                  </el-checkbox>-->
<!--                </el-checkbox-group>-->
<!--              </li>-->
<!--            </ul>-->
<!--            <div class="answer_result">-->
<!--              <p v-if="item1.type==1" :class="[item2.answer==item2.correct?'right':'wrong']">-->
<!--                {{ item2.answer == item2.correct ? '回答：正确' : '回答：错误' }}</p>-->
<!--              <p v-if="item1.type==2"-->
<!--                 :class="[item2.answer.toString().replace(/,/g, '')==item2.correct.toString().replace(/,/g, '')?'right':'wrong']">-->
<!--                {{-->
<!--                  item2.answer.toString().replace(/,/g, '') == item2.correct.toString().replace(/,/g,-->
<!--                    '') ? '回答：正确' : '回答：错误'-->
<!--                }}</p>-->
<!--              <p class="answer_analysis">{{ item2.analysis }}</p>-->
<!--            </div>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </li>-->
<!--    </ul>-->
  </div>
</template>

<script>
import {getAnswer} from '@/api/mobile'

export default {
  name: "exam-analysis",
  data() {
    return {
      questionType: '',
      radio: true,
      checked1: true,
      checked2: false,
      checked3: false,
      checkList: [],
      exam: {},
      item: {}
    }
  },
  methods: {
    getAnswerInfo(id) {
      //查询答卷信息详情
      getAnswer(id).then(res => {
        console.log(res)
        if (res.code * 1 === 0) {
          console.log('-------------答卷信息详情-----')
          this.item = res.data
          for (var i = 0; i < res.data.answerInfos.length; i++) {
            this.questionType += this.item.answerInfos[i].myAnswer.length
            // this.answer += this.item.answerInfos[i].myAnswer.toString().replace(/\[|\"|]/g, '')
          }
          console.log(this.item)
        }
      })
    }
  },
  mounted() {
    let {id} = this.$route.query
    console.log(id)
    this.getAnswerInfo(id)
    this.exam = {
      id: 1, name: '随堂测试',
      item: [
        {
          type: 1,
          num: 5,
          sum: 50,
          subject: [
            {
              num: 1, title: '下列规范性法律文件中,其作用主要在执行社会公共事务的是',
              answer: 'A',
              correct: 'A',
              analysis: '答案解析：中国共产党第十九次全国代表大会，是在全面建成小康社会决胜阶段、中国特色社会主义进入新时代的关键时期召开的一次十分重要的大会。 故，此题的正确答案为：B',
              option: [
                {opt: 'A', content: '《〈中华人民共和国刑法〉》'},
                {opt: 'B', content: '《〈中华人民共和国合同法〉》'},
                {opt: 'C', content: '《〈中华人民共和国民法通则〉》'},
                {opt: 'D', content: '《〈中华人民共和国环境保护法〉》'},
              ]
            },
            {
              num: 2, title: '我国第一部社会主义性质的宪法是在哪一年出台？',
              answer: 'B',
              correct: 'D',
              analysis: '答案解析：中国共产党第十九次全国代表大会，是在全面建成小康社会决胜阶段、中国特色社会主义进入新时代的关键时期召开的一次十分重要的大会。 故，此题的正确答案为：B',
              option: [
                {opt: 'A', content: '1976'},
                {opt: 'B', content: '1977'},
                {opt: 'C', content: '1978'},
                {opt: 'D', content: '1979'},
              ]
            },
            {
              num: 3, title: '中国共产党确立毛泽东思想为党的指导思想是在哪次会议上？',
              answer: 'D',
              correct: 'C',
              analysis: '答案解析：中国共产党第十九次全国代表大会，是在全面建成小康社会决胜阶段、中国特色社会主义进入新时代的关键时期召开的一次十分重要的大会。 故，此题的正确答案为：B',
              option: [
                {opt: 'A', content: '三大'},
                {opt: 'B', content: '五大'},
                {opt: 'C', content: '六大'},
                {opt: 'D', content: '七大'},
              ]
            }
          ]
        },
        {
          type: 2,
          num: 5,
          sum: 50,
          subject: [
            {
              num: 6, title: '下列在我国宪法上内容规定了的是',
              answer: ['A', 'C', 'D'],
              correct: ['A', 'C', 'D'],
              analysis: '答案解析：中国共产党第十九次全国代表大会，是在全面建成小康社会决胜阶段、中国特色社会主义进入新时代的关键时期召开的一次十分重要的大会。 故，此题的正确答案为：B',
              option: [
                {opt: 'A', content: '国旗'},
                {opt: 'B', content: '国歌'},
                {opt: 'C', content: '国徽'},
                {opt: 'D', content: '首都'},
              ]
            },
            {
              num: 7, title: '社会主义法制的基本要求是（ ）',
              answer: ['A', 'B', 'D'],
              correct: ['A', 'B', 'D'],
              analysis: '答案解析：中国共产党第十九次全国代表大会，是在全面建成小康社会决胜阶段、中国特色社会主义进入新时代的关键时期召开的一次十分重要的大会。 故，此题的正确答案为：B',
              option: [
                {opt: 'A', content: '有法可依'},
                {opt: 'B', content: '有法必依'},
                {opt: 'C', content: '执法必严'},
                {opt: 'D', content: '违法必究'},
              ]
            },
            {
              num: 8, title: '党在社会主义初级阶段的基本纲领的内容包括建设有中国特色的社会主义',
              answer: ['A', 'C'],
              correct: ['A', 'D'],
              analysis: '答案解析：中国共产党第十九次全国代表大会，是在全面建成小康社会决胜阶段、中国特色社会主义进入新时代的关键时期召开的一次十分重要的大会。 故，此题的正确答案为：B',
              option: [
                {opt: 'A', content: '经济'},
                {opt: 'B', content: '政治'},
                {opt: 'C', content: '文化'},
                {opt: 'D', content: '民主'},
                {opt: 'E', content: '文明'}
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less">
.exam_analysis {
  padding: 0 5vw;
  margin-top: 7vh;

  .exam_name {
    line-height: 5vh;
    font-size: 2.4vh;
    color: #333333;
    text-align: center;
    font-weight: bold;
  }

  .exam_a_list {
    .exam_a_li {
      .exam_a_title {
        font-size: 2vh;
        color: #333333;
        line-height: 4vh;
      }

      .exam_ac_list {
        .exam_ac_li {
          margin: 2vw 0 4vw 0;

          .exam_ac_subject {
            display: flex;
            font-size: 2vh;
            text-align: center;
            margin: 2vw 0;

            .icon {
              margin-right: 1vw;
            }

            .subject {
              text-align: justify;
              line-height: 5vw;
              vertical-align: middle;
            }
          }

          .exam_option_list {
            .exam_option_li {
              display: block;
              line-height: 5vh;
              height: 5vh;
              padding: 0 3vw;
              background: #fff;
              color: #666;
              cursor: pointer;
              border-radius: 1vw;
              margin-bottom: 3vw;
              border: 1px solid #DEDEDE;

              .el-radio__input.is-checked + .el-radio__label {
                color: #666;
              }

              .el-radio {
                width: 100%;
                height: 4.4vh;
              }

              .el-checkbox {
                width: 100%;
                height: 4.4vh;
              }
            }

            .right {
              border: 1px solid #37C03B;

              .el-radio__input.is-checked .el-radio__inner {
                border-color: #37C03B;
                background: #37C03B;
              }

              .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                border-color: #37C03B;
                background: #37C03B;
              }
            }

            .wrong {
              border: 1px solid #F44436;

              .el-radio__input.is-checked .el-radio__inner {
                border-color: #F44436;
                background: #F44436;
              }

              .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                border-color: #F44436;
                background: #F44436;
              }
            }

            .exam_option_li:hover {
              background-color: #f3f3f3;
            }
          }

          .answer_result {
            font-size: 1.8vh;

            .right {
              color: #008000;
            }

            .wrong {
              color: #FF0000;
            }

            .answer_analysis {
              padding: 1vw 0;
              line-height: 2.4vh;
            }
          }
        }
      }
    }
  }
}
</style>
