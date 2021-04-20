<template>
  <div class="start-exam">
    <p class="exam_name">{{ paper.title }}</p>
    <el-form ref="answer" :model="answer">
      <ul class="exam_a_list">
        <li class="exam_a_li" v-for="(item1,index1) in paper.moldJson.test" :key="index1">
          <p class="exam_a_title">
          <span>{{
              item1.mold == 1 ? "单选题，" + '共' + item1.count + '题，合计' + item1.total + '分' : item1.mold == 2 ? '多选题，共' + item1.count + '题，合计' + item1.total + '分' : ''
            }}</span>
          </p>
          <!--        题目-->
          <ul class="exam_ac_list">
            <li class="exam_ac_li" v-for="(i,index) in item1.moldJson" :key="index">
              <div class="exam_ac_subject">
                <span class="icon" v-if="i.id">{{ (index + 1) }}.</span>
                <p class="subject" v-if="i.questionTitle">{{ i.questionTitle }}</p>
              </div>
              <!--            单选-->
              <ul class="exam_option_list" v-if="item1.mold==1">
                <li class="exam_option_li" v-for="(j,index) in i.options" :key="index" v-model="radio">
                  <el-radio v-model="radio" :label="j.opt" v-if="j.opt "
                            @click.native="clickRadio(j)">{{ j.opt + '.' + j.content }}
<!--                    @click.native.prevent="clickRadio(j)"-->
                  </el-radio>
                </li>
              </ul>
              <!--            多选-->
              <ul class="exam_option_list" v-if="item1.mold==2">
                <li class="exam_option_li" v-for="(j,index) in i.options" :key="index" @click="clickCheckbox(j)">
                  <el-checkbox-group v-model="checkList" >
                    <el-checkbox :label="j.opt" v-if="j.opt ,j.content" v-model="j.questionBankId">
                      {{ j.opt + '. ' + j.content }}
                    </el-checkbox>
                  </el-checkbox-group>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </el-form>
    <div class="button">
      <el-button @click="gotoForm()" class="button_push" size="mini">提 交</el-button>
    </div>
  </div>
</template>

<script>
import {getExamDetail, setAnswer} from '@/api/mobile'

export default {
  name: "start-exam",
  data() {
    return {
      testPaperId:this.$route.query,
      answerInfos:[],
      answer: {
        questionBankIdRadio: '',
        questionBankIdCheckBox: '',
        myAnswer: ''
      },
      paper: {
        createTime: '',                   //创建时间
        updateTime: '',                   //更新时间
        endTime: '',                      //结束时间
        id: '',                           //试卷id
        title: '',                        //标题
        repeatNum: '',                    //允许重考次数（-1无限制）
        paperTypeId: '',                  //试卷类型
        totalScore: '',                   //总分
        duration: '',                     //考试时长
        moldJson: {                       //试题类型json
          mold: '',
          list: [],
          test: {
            mold: '',
            name: '',
            count: '',
            score: '',
            total: '',
            moldJson: {
              params: '',
              id: '',
              questionTitle: '',
              answer: '',
              analysis: '',
              mold: '',
              options: {
                params: '',
                id: '',
                questionBankId: '',
                opt: '',
                content: ''
              }
            }
          }
        },
        startTime: '',                    //开始时间
        status: '',                       //状态（0正常 1停用）
        paperQuestions: {
          questionBankId: '',             //题库表id
          questionTitle: '',              //题库表标题
          score: ''                       //分数
        }
      },
      checkList: [],
      radio: [],

    }
  },
  methods: {
    clickRadio(e) {
      console.log('----------单选-----------')
      console.log(e.questionBankId)
      console.log(e.opt)
      this.answer.questionBankIdRadio = e.questionBankId
      // e.id === this.radio ? this.radio = "" : this.radio = e.id
      this.num++
      e === this.num % 2 ? this.e = true :this.e = false
    },
    clickCheckbox(e){
      console.log('----------多选----------')
      console.log(e.questionBankId)
      console.log(e.opt)
      this.answer.questionBankIdCheckBox = e.questionBankId
    },
    // 提交
    gotoForm: function () {
      let data = {
        testPaperId:this.testPaperId.id,
        answerInfos:[
          //多选
          {questionBankId: this.answer.questionBankIdCheckBox,myAnswer: JSON.stringify(this.checkList)},
          //单选
          {questionBankId: this.answer.questionBankIdRadio,myAnswer: this.radio},
        ]
      };
      console.log('data')
      console.log(data)
      this.setExamInfo(data)
      this.$router.push({path:'/mobile/exam/result'})

    },
    getExamInfo(id) {
      //查询考试试卷信息详情
      getExamDetail(id).then(res => {
        console.log(res)
        if (res.code * 1 === 0) {
          let data = res.data
          data.moldJson = data.moldJson ? JSON.parse(data.moldJson) : '' //将 JSON 字符串转换为对象
          this.paper = data
          console.log('paper')
          console.log(this.paper)
        }
      })
    },
    setExamInfo(data) {
      //新增答题信息
      setAnswer(data).then(res => {
        if (res.code * 1 === 0) {
          console.log(res)
          this.$toast('提交成功')
        } else {
          console.log(res)
          this.$toast(res.msg)
        }
      })

    }
  },
  mounted() {
    let {id} = this.$route.query
    console.log("试卷id")
    this.getExamInfo(id)
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
              answer: '',
              option: [
                {opt: 'A', content: '《〈中华人民共和国刑法〉》'},
                {opt: 'B', content: '《〈中华人民共和国合同法〉》'},
                {opt: 'C', content: '《〈中华人民共和国民法通则〉》'},
                {opt: 'D', content: '《〈中华人民共和国环境保护法〉》'},
              ]
            },
            {
              num: 2, title: '我国第一部社会主义性质的宪法是在哪一年出台？',
              answer: '',
              option: [
                {opt: 'A', content: '1976'},
                {opt: 'B', content: '1977'},
                {opt: 'C', content: '1978'},
                {opt: 'D', content: '1979'},
              ]
            },
            {
              num: 3, title: '中国共产党确立毛泽东思想为党的指导思想是在哪次会议上？',
              answer: '',
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
              answer: [],
              option: [
                {opt: 'A', content: '国旗'},
                {opt: 'B', content: '国歌'},
                {opt: 'C', content: '国徽'},
                {opt: 'D', content: '首都'},
              ]
            },
            {
              num: 7, title: '社会主义法制的基本要求是（ ）',
              answer: [],
              option: [
                {opt: 'A', content: '有法可依'},
                {opt: 'B', content: '有法必依'},
                {opt: 'C', content: '执法必严'},
                {opt: 'D', content: '违法必究'},
              ]
            },
            {
              num: 8, title: '党在社会主义初级阶段的基本纲领的内容包括建设有中国特色的社会主义',
              answer: [],
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

<style scoped lang="less">
.button {
  text-align: center;
  margin-top: 10px;
}

.start-exam {
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

            .exam_option_li:hover {
              //background-color: #f3f3f3;
            }
          }
        }
      }
    }
  }
}
</style>
