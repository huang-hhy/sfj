<template>
  <div class="start-survey">
    <p class="survey_name">问卷调查样例</p>
    <ul class="survey_a_list">
      <li class="survey_a_li" v-for="(item1,index1) in survey.item" :key="index1">
        <p class="survey_a_title">
          <span>{{item1.type==1?"单选题，"+'共'+item1.num+'题，合计'+item1.sum+'分': item1.type==2?'多选题，共'+item1.num+'题，合计'+item1.sum+'分':''}}</span>
        </p>
        <ul class="survey_ac_list">
          <li class="survey_ac_li" v-for="(item2,index2) in item1.subject" :key="index2">
            <div class="survey_ac_subject">
              <span class="icon">{{item2.num}}.</span>
              <p class="subject">{{item2.title}}</p>
            </div>
            <ul class="survey_option_list" v-if="item1.type==1">
              <li class="survey_option_li" v-for="(item3,index3) in item2.option" :key="index3">
                <el-radio v-model="item2.answer" :label="item3.opt">{{item3.opt+'.'+item3.content}}
                </el-radio>
              </li>
            </ul>
            <ul class="survey_option_list" v-if="item1.type==2">
              <li class="survey_option_li" v-for="(item3,index3) in item2.option" :key="index3">
                <el-checkbox-group v-model="item2.answer">
                  <el-checkbox :label="item3.opt">{{item3.opt+'. '+item3.content}}</el-checkbox>
                </el-checkbox-group>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "start-survey",
  data() {
    return {
      survey: {}
    }
  },
  mounted() {
    this.survey = {
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
.start-survey {
  padding: 0 5vw;

  .survey_name {
    line-height: 5vh;
    font-size: 2.4vh;
    color: #333333;
    text-align: center;
    font-weight: bold;
  }

  .survey_a_list {
    .survey_a_li {
      .survey_a_title {
        font-size: 2vh;
        color: #333333;
        line-height: 4vh;
      }

      .survey_ac_list {
        .survey_ac_li {
          margin: 2vw 0 4vw 0;

          .survey_ac_subject {
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

          .survey_option_list {
            .survey_option_li {
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

            .survey_option_li:hover {
              background-color: #f3f3f3;
            }
          }
        }
      }
    }
  }
}
</style>
