<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <main-header :content="content" style="margin: 20px 0" />
      <div class="main">
        <div class="main_header">
          <p class="title">{{ list.title }}</p>
          <el-row type="flex" justify="center">
            <el-col :span="6">创建时间： {{ moment(list.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</el-col>
            <el-col :span="5">发布组织： {{ list.orgName }}</el-col>
            <el-col :span="3">试卷总分： {{ score.totalScore }}分</el-col>
          </el-row>
          <div v-if="content.type === '在线考试'" :class="score.total >= score.qualifiedScore ? 'standard' : 'retake'">
            <span>{{ score.total >= score.qualifiedScore ? '达标' : '不合格' }}</span>
          </div>
        </div>
        <div class="main_detail" v-for="(item, index) in list.answerInfos" :key="index">
          <p class="detail_title">
            <span>{{ index + 1 }}、</span>
            <span>{{ item.questionTitle }}</span>
          </p>
          <div class="detail_options">
            <div v-if="item.options.length > 0">
              <div v-if="item.mold * 1 === 1">
                <div style="float: left">
                  <el-radio-group
                    v-model="item.myAnswer"
                    v-for="(i, ind) in item.options"
                    :key="ind"
                    disabled
                  >
                    <el-radio :label="i.opt">
                      <span class="opt">{{ i.opt }}</span>
                      <span>{{ i.content }}</span>
                    </el-radio>
                  </el-radio-group>
                </div>
                <div class="score" v-if="item.isCorrect * 1 === 1">+{{ score.radioScore }}</div>
              </div>
              <div v-if="item.mold * 1 === 2">
                <div style="float: left">
                  <el-checkbox-group
                    v-model="item.myAnswer"
                    v-for="(i, ind) in item.options"
                    :key="ind"
                    disabled
                  >
                    <el-checkbox :label="i.opt">
                      <span class="opt">{{ i.opt }}</span>
                      <span>{{ i.content }}</span>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="score" v-if="item.isCorrect * 1 === 1">+{{ score.multipleScore }}</div>
              </div>
            </div>
            <div v-else>
              <div v-if="item.mold * 1 === 3">
                <el-input v-model="item.myAnswer" type="textarea" :rows="4" readonly />
              </div>
              <p v-else>暂无选项信息</p>
            </div>
          </div>
          <div class="detail_analysis">
            <p class="answer">正确答案： {{ item.answer }}</p>
            <p class="analysis">答案解析： {{ item.analysis }}</p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import { getAnswer, getPaper } from '@/api/pc'
  import moment from 'moment'
  import mainHeader from "../../../../components/pc/common/mainHeader";
  import {decrypt} from "../../../../libs/tools";

  export default {
    name: "answer",
    components: {
      mainHeader,
      NavBar
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 考试详情',
      }
    },
    data() {
      return {
        id: '',
        list: {},
        paperList: {},
        moment: moment,
        score: {
          total: 0,
          qualifiedScore: 0,
          radioScore: 0,
          multipleScore: 0,
          totalScore: 0

        },
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '',
          path: '/pc/profile/exam',
          topic: '',
          type: ''
        }
      }
    },
    mounted() {
      this.setBaseInfo()
      this.getData(this.$route.query.params)
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      getData(data) {
        data = JSON.parse(decrypt(data))
        this.id = data.id
        this.content.type = data.type
        this.content.title = data.type
        this.content.topic = data.type === '在线考试' ? '考卷详情' : '问卷详情'
        this.getList()
      },
      getList() {
        getAnswer(this.id).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data
            this.list.answerInfos.forEach(item => {
              if (item.mold * 1 === 2) {
                item.myAnswer = item.myAnswer.split(',')
              }
            })
            getPaper(this.list.testPaperId).then(res => {
              if (res.code * 1 === 0) {
                let temp = res.data
                temp.moldJson = JSON.parse(temp.moldJson)
                this.score.qualifiedScore = temp.qualifiedScore
                this.score.totalScore = temp.totalScore
                temp.moldJson.test.forEach(item => {
                  if (item.mold * 1 === 1) {
                    this.score.radioScore = item.score
                  } else if (item.mold * 1 === 2) {
                    this.score.multipleScore = item.score
                  }
                })
                this.getScore()
              }
            })
          }
        })
      },
      getScore() {
        this.list.answerInfos.forEach(item => {
          if (item.mold * 1 === 1 && item.isCorrect * 1 === 1) {
            this.score.total = this.score.total + this.score.radioScore
          } else if (item.mold * 1 === 2 && item.isCorrect * 1 === 1) {
            this.score.total = this.score.total + this.score.multipleScore
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    width: 1050px;
    margin: 20px auto;

    .main {
      .main_header {
        text-align: center;
        margin: 20px;
        position: relative;

        .title {
          font-size: 20px;
          line-height: 60px;
        }

        .standard, .retake {
          position: absolute;
          top: 0;
          right: 240px;
          width: 100px;
          height: 100px;
          line-height: 100px;
          border-radius: 50%;
          font-size: 24px;
          font-weight: bold;
          transform: rotate(30deg);
        }

        .standard {
          border: #d33a31 2px solid;
          color: #d33a31;
        }

        .retake {
          border: #3b8070 2px solid;
          color: #3b8070;
        }
      }

      .main_detail {
        border: #e0dddd 1px solid;
        margin: 50px 0;

        .detail_title {
          background: #f3f1f1;
          font-size: 16px;
          padding: 0 30px;
          line-height: 60px;
        }

        .detail_options {
          margin: 20px 0;
          padding: 0 30px;
          line-height: 60px;
          overflow: hidden;
          .el-radio-group {
            display: block;
            line-height: 60px;
          }

          .opt {
            margin-right: 10px;
          }

          .score {
            float: left;
            margin-left: 50px;
            color: #d33a31;
            font-size: 40px;
            transform: rotate(20deg);
          }
        }

        .detail_analysis {
          border-top: #e0dddd 1px dashed;
          padding: 0 30px;
          line-height: 40px;
        }
      }
    }
  }
</style>
