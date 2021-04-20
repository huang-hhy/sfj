<template>
  <div class="learningEducation">
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <div class="content">
      <div class="onlineTest" v-if="examList || surveyList">
        <mainHeader :content="inlineTest" />
        <div class="exam" v-if="examList">
          <div class="examHeader">
            <span class="examType">在线考试</span>
            <i class="el-icon-info"/>
            <span class="title">{{ examList.title }}</span>
            <span class="examStatus">{{ examList.type * 1 === 1 ? '已考' : '未考' }}</span>
            <span class="handleMore" @click="examMore('在线考试')">查看更多</span>
            <span class="handleLook" @click="examLook('在线考试', examList.type)">查看详情</span>
          </div>
          <div class="examContent">
          <span class="item">
            <span class="icon"/>
            <span class="itemText">创建时间: {{ moment(examList.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </span>
            <span class="item">
            <span class="icon"/>
            <span class="itemText">更新时间： {{ moment(examList.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </span>
            <span class="item">
            <span class="icon"/>
            <span class="itemText">考试时长： {{ examList.duration }} 小时</span>
          </span>
            <span class="item">
            <span class="icon"/>
            <span class="itemText">开始时间： {{ moment(examList.startTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </span>
            <span class="item">
            <span class="icon"/>
            <span class="itemText">结束时间： {{ moment(examList.endTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </span>
            <span class="item">
            <span class="icon"/>
            <span class="itemText">总分： {{ examList.totalScore }} 分</span>
          </span>
          </div>
        </div>
        <div class="survey" v-if="surveyList">
          <div class="examHeader">
            <span class="examType">问卷调查</span>
            <i class="el-icon-info"/>
            <span class="title">{{ surveyList.title }}</span>
            <span class="examStatus">{{ surveyList.type * 1 === 1 ? '已参与' : '未参与' }}</span>
            <span class="handleMore" @click="examMore('问卷调查')">查看更多</span>
            <span class="handleLook" @click="examLook('问卷调查', surveyList.type)">查看详情</span>
          </div>
          <div class="examContent">
          <span class="item">
            <span class="icon"/>
            <span class="itemText">创建时间: {{ moment(surveyList.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </span>
            <span class="item">
            <span class="icon"/>
            <span class="itemText">更新时间： {{ moment(surveyList.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </span>
            <span class="item">
            <span class="icon"/>
            <span class="itemText">开始时间： {{ moment(surveyList.startTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </span>
            <span class="item">
            <span class="icon"/>
            <span class="itemText">结束时间： {{ moment(surveyList.endTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </span>
          </div>
        </div>
      </div>
      <div class="projectLearning" v-if="studyList && studyList.length > 0">
        <main-header :content="learning" />
        <div style="margin: 30px 0">
          <div class="studyList" v-for="(item, index) in studyList" :key="index" v-if="index < 3">
            <div class="el-card" @click="studyLook(item.id)">
              <img :src="attachUrl + item.imgUrl">
              <p class="title" v-if="item.title.length < 8">{{ item.title }}</p>
              <p class="title" v-else>
                <span v-for="(item2, index2) in item.title" :key="index2" v-if="index2 < 8">{{ item2 }}</span>
                <span>……</span>
              </p>
              <p class="compulsory">
                <el-tag v-if="item.compulsory * 1 === 0" type="success">必 修</el-tag>
                <el-tag v-else type="warning">选 修</el-tag>
              </p>
              <p class="item">组织名称： {{ item.orgName }}</p>
              <p class="item">学习人数： {{ item.userStudyNum }}</p>
              <p class="item">支部学习数： {{ item.orgStudyNum }}</p>
            </div>
          </div>
          <el-card class="studyMore">
            <div @click="studyMore">
              <i class="el-icon-plus"/>
              <p>查看更多</p>
            </div>
          </el-card>
        </div>
      </div>
      <div class="knowledgeParty" v-if="guideLinesList && guideLinesList.length > 0">
        <main-header :content="partyKnowledge" />
        <el-row class="guideLinesList" v-for="(item, index) in guideLinesList" :key="index" v-if="index< 5">
          <div @click="partyMore(item)">
            <el-col :span="16">{{ item.title }}</el-col>
            <el-col :span="8">
              <p style="text-align: right">{{ moment(item.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
            </el-col>
          </div>
        </el-row>
      </div>
    </div>
    <answer-form v-model="formList" :type="type" />
    <party-detail v-model="partyList" />
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import {getExamListNow, getExamListPast, getStudyType, getStudyList, getGuideLinesType, getGuidelines} from '@/api/pc'
  import Vue from 'vue'
  import moment from 'moment'
  import config from '@/config'
  import AnswerForm from "./form/answerForm"
  import PartyDetail from "./form/partyDetail";
  import mainHeader from "@/components/pc/common/mainHeader";
  import {encrypt} from "../../../libs/tools";

  export default {
    name: "index",
    middleware: 'pcUserAuth',
    components: {
      mainHeader,
      PartyDetail,
      AnswerForm,
      NavBar
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 学习教育',
      }
    },
    data() {
      return {
        examList: {},
        surveyList: {},
        studyList: [],
        guideLinesList: [],
        moment: moment,
        attachUrl: config.attachUrl,
        type: '',
        formList: {
          refresh: false,
          id: ''
        },
        partyList: {
          refresh: false
        },
        inlineTest: {
          sort: '1',
          name: '学习教育',
          title: '在线测试'
        },
        learning: {
          sort: '1',
          name: '学习教育',
          title: '专题学习'
        },
        partyKnowledge: {
          sort: '0',
          name: '学习教育',
          title: '党务知识',
          url: '/pc/learningEducation/partyKnowledge'
        }
      }
    },
    mounted() {
      this.setBaseInfo()
      this.getExamList()
      this.getSurveyList()
      this.getStudyList()
      this.getGuideLinesList()
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      getExamList() {
        const data = {
          paperTypeId: '1'
        }
        let temp1 = []
        let temp2 = []
        let type = '0'
        getExamListNow({}, data).then(res => {
          if (res.code * 1 === 0) {
            temp1 = res.data.list
            type = res.data.list.length > 0 ? '0' : '1'
            getExamListPast({}, data).then(res => {
              temp2 = res.data.list
              temp2.push.apply(temp1, temp2)
              this.examList = temp2[0]
              Vue.set(this.examList, 'type', type)
            })
          }
        })
      },
      getSurveyList() {
        const data = {
          paperTypeId: '2'
        }
        let temp1 = []
        let temp2 = []
        let type = '0'
        getExamListNow({}, data).then(res => {
          if (res.code * 1 === 0) {
            temp1 = res.data.list
            type = res.data.list.length > 0 ? '0' : '1'
            getExamListPast({}, data).then(res => {
              temp2 = res.data.list
              temp2.push.apply(temp1, temp2)
              this.surveyList = temp2[0]
              Vue.set(this.surveyList, 'type', type)
            })
          }
        })
      },
      getStudyList() {
        getStudyType({}).then(res => {
          if (res.code * 1 === 0) {
            const temp = res.data
            temp.forEach(item => {
              getStudyList({studyTypeId: item.id}).then(res => {
                if (res.code * 1 === 0) {
                  this.studyList.push.apply(this.studyList, res.data.list)
                }
              })
            })
          }
        })
      },
      getGuideLinesList() {
        getGuideLinesType({}).then(res => {
          if (res.code * 1 === 0) {
            const temp = res.data
            temp.forEach(item => {
              getGuidelines({workTypeId: item.id}).then(res => {
                this.guideLinesList.push.apply(this.guideLinesList, res.data)
              })
            })
          }
        })
      },
      examMore(type) {
        let params = {
          type: type
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: '/pc/learningEducation/exam',
          query: {
            name: '学习教育',
            params: params
          }
        })
      },
      examLook(type, status) {
        if (status * 1 === 0) {
          let params = {
            id: type === '在线考试' ? this.examList.id : this.surveyList.id,
            type: type,
            time: parseInt(new Date().getTime() / 1000)
          }
          params = encrypt(JSON.stringify(params))
          this.$router.push({
            path: '/pc/learningEducation/paper',
            query: {
              name: '学习教育',
              params: params
            }
          })
        } else {
          this.type = type
          this.examList.moldJson = JSON.parse(this.examList.moldJson)
          this.surveyList.moldJson = JSON.parse(this.surveyList.moldJson)
          let radio = 0
          let checkBox = 0
          if (type === '在线考试') {
            this.examList.moldJson.test.forEach(i => {
              if (i.mold * 1 === 1) {
                radio = i.score
              } else if (i.mold * 1 === 2) {
                checkBox = i.score
              }
            })
          } else {
            this.surveyList.moldJson.test.forEach(i => {
              if (i.mold * 1 === 1) {
                radio = i.score
              } else if (i.mold * 1 === 2) {
                checkBox = i.score
              }
            })
          }
          this.formList = {
            refresh: !this.formList.refresh,
            id: this.examList.id,
            type: this.type,
            qualifiedScore: this.examList.qualifiedScore,
            repeatNum: this.examList.repeatNum,
            radio: radio,
            checkBox: checkBox
          }
        }
      },
      studyMore() {
        this.$router.push({
          path: '/pc/learningEducation/course',
          query: {
            name: '学习教育'
          }
        })
      },
      studyLook(id) {
        let params = {
          id: id
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: '/pc/learningEducation/courseDetail',
          query: {
            name: '学习教育',
            params: params
          }
        })
      },
      partyMore(item) {
        this.partyList = JSON.parse(JSON.stringify(item))
        this.partyList.refresh = !this.partyList.refresh
      }
    }
  }
</script>

<style scoped lang="less">
  .learningEducation {
    .content {
      width: 1000px;
      margin: 20px auto;

      .onlineTest {
        margin: 50px 0 30px;
        .header {
          font-size: 18px;
          line-height: 60px;
          font-weight: bold;
          color: #d34d4d;

          i {
            font-size: 24px;
            font-weight: bold;
            margin-right: 10px;
          }
        }

        .exam, .survey {
          margin: 20px auto 50px;
          padding: 0 30px;

          span {
            display: inline-block;
            vertical-align: middle;
          }

          .examHeader {
            .examType {
              width: 87px;
              line-height: 32px;
              cursor: pointer;
              color: #fff;
              padding-left: 20px;
              background: url("~assets/pc/exam/exam.png") no-repeat;
            }

            i {
              vertical-align: middle;
              font-size: 32px;
              color: #e33a3c;
              line-height: 32px;
              margin-left: -10px;
              cursor: pointer;
            }

            .title {
              font-size: 14px;
              line-height: 32px;
              color: #949699;
              margin: 0 10px;
            }

            .examStatus {
              background: #a1a1a1;
              text-align: center;
              color: #FFFFFF;
              padding: 0 10px;
              border-radius: 20px;
              margin-left: 10px;
            }

            .handleLook, .handleMore:hover {
              color: #e33a3c;
              background: #ffffff;
              padding: 5px 10px;
              font-size: 14px;
              border: #e33a3c 1px solid;
              border-radius: 8px;
              float: right;
              cursor: pointer;
              margin: 0 10px;
            }

            .handleLook:hover, .handleMore {
              background: #e33a3c;
              color: #FFFFFF;
              margin: 0 10px;
              padding: 5px 10px;
              font-size: 14px;
              border: #e33a3c 1px solid;
              border-radius: 8px;
              float: right;
              cursor: pointer;
            }
          }

          .examContent {
            background: #f8f8f8;
            border: #eceaea 1px solid;
            margin: 20px 0;
            padding: 0 28px;

            .item {
              line-height: 30px;
              margin: 10px;
              width: 30%;

              .icon {
                width: 8px;
                height: 8px;
                background: #e8e8e8;
                border-radius: 50%;
                margin-right: 10px;
              }
            }
          }
        }
      }

      .projectLearning {
        overflow: hidden;
        margin: 30px 0;

        .studyList {
          float: left;

          .el-card {
            padding: 20px;
            width: 240px;
            margin: 0 15px 20px 0;
            cursor: pointer;
            text-align: center;

            img {
              width: 80px;
              height: 80px;
            }

            .title {
              font-size: 16px;
              font-weight: bold;
              margin: 15px 0;
            }

            .item {
              margin: 10px 0;
            }
          }

          .el-card:hover {
            box-shadow: #d0d3d5 2px 2px;
          }
        }

        .studyMore {
          width: 220px;
          float: left;
          height: 295px;
          font-size: 20px;
          line-height: 60px;
          color: #1a1a1a;
          text-align: center;
          padding: 80px 0;
          cursor: pointer;

          i {
            color: #d34d4d;
            font-size: 40px;
            font-weight: bold;
          }
        }

        .studyMore:hover {
          box-shadow: #d0d3d5 2px 2px;
        }
      }

      .knowledgeParty {
        .guideLinesList {
          width: 92%;
          margin: 10px auto;
          font-size: 14px;
          line-height: 30px;
          cursor: pointer;
        }

        .guideLinesList:hover {
          color: #d34d4d;
        }
      }
    }
  }
</style>
