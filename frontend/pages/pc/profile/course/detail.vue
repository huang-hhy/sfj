<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <main-header :content="content" style="margin: 20px 0"/>
      <div class="main">
        <img :src="attachUrl + list.imgUrl">
        <div class="mainContent">
          <div class="title">
            <span v-if="list.title && list.title.length < 25">{{ list.title }}</span>
            <span v-else>
              <p>
                <span v-for="(item, index) in list.title" :key="index" v-if="index < 26">{{ item }}</span>
              </p>
              <span v-for="(item, index) in list.title" :key="index" v-if="index > 25">{{ item }}</span>
            </span>
            <el-tag v-if="list.compulsory * 1 === 0" type="success">必 修</el-tag>
            <el-tag v-else type="warning">选 修</el-tag>
          </div>
          <div class="item">
            <span>课程分类： {{ list.typeName }}</span>
            <span>组织名称： {{ list.orgName }}</span>
          </div>
          <div class="item">
            <span>课程积分： {{ list.score }}</span>
            <span>观看时长： {{ list.times }} 秒</span>
          </div>
          <div class="item">
            <span>学习人数： {{ list.userStudyNum }}</span>
            <span>支部学习人数： {{ list.orgStudyNum }}</span>
          </div>
          <div class="item">
            <span>创建时间: {{ moment(list.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
            <span>更新时间: {{ moment(list.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </div>
          <div class="item">
            <el-button type="warning" @click="startStudy" style="margin-right: 30px">开始学习</el-button>
            <el-button type="success" @click="handleShare">分享</el-button>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-tabs v-model="activityTab" type="border-card" class="tabL">
          <el-tab-pane name="first" label="基本信息">
            <p class="message">
              {{ list.title }}创建于 {{ moment(list.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}}，更新于{{
              moment(list.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}，由{{ list.orgName}}发布，属于{{ list.typeName
              }}。
            </p>
            <p class="message">
              本课程共{{ list.score }}分，需观看{{ list.times }}秒以上的视频才可获得积分
            </p>
            <p class="message">
              本课程有{{ list.orgStudyNum }}个支部正在学习，共{{ list.userStudyNum }}人学习
            </p>
            <div class="status">
              <span style="margin-right: 20px">状态:</span>
              <span>
              <el-tag v-if="list.checkStatus * 1 === 0" type="info">草稿</el-tag>
              <el-tag v-if="list.checkStatus * 1 === 1" type="warning">待审核</el-tag>
              <el-tag v-if="list.checkStatus * 1 === 2" type="primary">已通过</el-tag>
              <el-tag v-if="list.checkStatus * 1 === 3" type="success">已发布</el-tag>
              <el-tag v-if="list.checkStatus * 1 === 4" type="error">已下架</el-tag>
            </span>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="list.courseType * 1 === 0" label="学习视频" name="second">
            <div style="overflow: hidden">
              <div style="float: left" @click="getTime">
                <video
                  :src="attachUrl + list.videoUrl"
                  controls="controls"
                  id="videoPlayer"
                  style="float: left; width: 240px"
                />
              </div>
              <div style="float: left; line-height: 40px; font-size: 14px; margin-left: 40px">
                <p>课程名称： {{ list.title }}</p>
                <p>课程分类： {{ list.typeName }}</p>
                <p>组织名称： {{ list.orgName }}</p>
                <p>课程积分: {{ list.score }}</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane v-else-if="list.courseType * 1 === 1" label="学习资料" name="third">
            <p v-html="list.literature" style="margin: 20px"></p>
          </el-tab-pane>
          <el-tab-pane label="学习达人" name="fourth">
            <div class="talent" v-for="(item, index) in talent" :key="index">
              <div class="pic">
                <img :src="attachUrl + item.miniPic">
              </div>
              <div class="talentMessage">
                <p>用户名称： {{ item.userName }}</p>
                <p>打卡次数： {{ item.num }}</p>
                <p>学习课程数： {{ item.studyNum }}</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="支部打卡情况" name="fifth">
            <div class="brach" v-for="(item, index) in brachList" :key="index">
              <div class="pic">
                <img :src="attachUrl + item.miniPic">
              </div>
              <div class="brachMessage">
                <p>党支部名称： {{ item.userName }}</p>
                <p>打卡次数： {{ item.num }}</p>
                <p>学习课程数： {{ item.studyNum }}</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="分享情况" name="sixth">
            <el-table
              :data="shareList"
              :cell-style="{'text-align': 'center'}"
              :header-cell-style="{'text-align': 'center', 'background-color': '#f8f8f8'}"
              border
              style="margin: 20px auto"
            >
              <el-table-column label="分享人" prop="userName"/>
              <el-table-column label="分享课程" prop="studyCourse.title"/>
              <el-table-column label="被分享者" prop="coverUserName"/>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleLook(scope.row.studyCourseId)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activityTab2" type="border-card" class="tabR">
          <el-tab-pane label="相关课程" name="first">
            <div class="studyList" v-for="(item, index) in studyList" :key="index" @click="changeList(item.id)">
              <div class="studyImg">
                <img :src="attachUrl + item.imgUrl">
              </div>
              <div class="studyContent">
                <p class="title" v-if="item.title.length < 8">{{ item.title }}</p>
                <p class="title" v-else>
                  <span v-for="(item2, index2) in item.title" :key="index2" v-if="index2 < 8">{{ item2 }}</span>
                  <span>……</span>
                </p>
                <p class="item">课程类型： {{ item.typeName }}</p>
                <p class="item">组织名称： {{ item.orgName }}</p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <share v-model="formList" @doSubmit="doSubmit"/>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import {
    getStudy,
    getTalent,
    branchRanking,
    getStudyList,
    saveStudyShare,
    getStudyShare,
    getUserList,
    studySave
  } from '@/api/pc'
  import config from '@/config'
  import moment from 'moment'
  import Video from "../../../mobile/study/studyDetail";
  import Share from "./form/share";
  import Vue from 'vue'
  import mainHeader from "../../../../components/pc/common/mainHeader";
  import {decrypt} from "../../../../libs/tools";

  export default {
    name: "detail",
    components: {
      mainHeader,
      Share,
      Video,
      NavBar
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 课程详情',
      }
    },
    data() {
      return {
        id: '',
        list: {},
        attachUrl: config.attachUrl,
        moment: moment,
        activityTab: 'first',
        activityTab2: 'first',
        talent: [],
        brachList: [],
        studyList: [],
        formList: {
          refresh: false,
          studyCourseId: '',
          title: '',
          coverUserId: ''
        },
        shareList: [],
        timer: null,
        times: 0,
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '专题学习',
          path: '/pc/profile/course',
          topic: ''
        }
      }
    },
    beforeRouteLeave(to, form, next) {
      window.clearInterval(this.timer)
      next(() => {
      })
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
        this.getList()
        this.getTalent()
        this.getBranchRanking()
        this.getShare()
      },
      getList() {
        this.activityTab = 'first'
        getStudy(this.id).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data
            this.content.topic = this.list.title
            if (this.list.courseType * 1 === 0) {
              setTimeout(() => {
                this.times = parseInt(document.getElementById('videoPlayer').duration)
              }, 300)
            } else if (this.list.courseType * 1 === 1) {
              this.times = this.list.times * 1
              this.getTime()
            }
            const data = {
              studyTypeId: this.list.studyTypeId
            }
            getStudyList(data).then(res => {
              if (res.code * 1 === 0) {
                this.studyList = res.data.list
              }
            })
          }
        })
      },
      getTalent() {
        getTalent({}).then(res => {
          if (res.code * 1 === 0) {
            this.talent = res.data
          }
        })
      },
      getBranchRanking() {
        branchRanking({}).then(res => {
          if (res.code * 1 === 0) {
            this.brachList = res.data
          }
        })
      },
      getShare() {
        getStudyShare({}).then(res => {
          if (res.code * 1 === 0) {
            this.shareList = res.data
            getUserList({}).then(res => {
              if (res.code * 1 === 0) {
                const temp = res.data
                temp.forEach(item => {
                  this.shareList.forEach(i => {
                    if (item.id === i.userId) {
                      Vue.set(i, 'userName', item.userName)
                    }
                    if (item.id === i.coverUserId) {
                      Vue.set(i, 'coverUserName', item.userName)
                    }
                  })
                })
              }
            })
          }
        })
      },
      changeList(id) {
        this.id = id
        window.clearInterval(this.timer)
        this.getList()
      },
      handleLook(id) {
        this.id = id
        window.clearInterval(this.timer)
        this.getList()
      },
      handleShare() {
        this.formList = {
          studyCourseId: this.list.id,
          title: this.list.title,
          orgId: '',
          coverUserId: '',
          refresh: !this.formList.refresh
        }
      },
      doSubmit(d) {
        const data = {
          studyCourseId: d.studyCourseId,
          coverUserId: d.coverUserId
        }
        saveStudyShare(data).then(res => {
          if (res.code * 1 === 0) {
            this.$message.success('分享成功')
            this.getShare()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      getStudyScore() {
        const data = {
          studyCourseId: this.list.id,
          title: this.list.title,
          score: this.list.score
        }
        studySave(data).then(res => {
          if (res.code * 1 === 0) {
            this.$message.success('打卡成功，已获得积分')
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      getTime() {
        const _this = this
        this.timer = window.setInterval(function () {
          if (_this.times === 0) {
            window.clearInterval(_this.timer)
            _this.getStudyScore()
          } else {
            _this.times -= 1
          }
        }, 1000)
      },
      startStudy() {
        if (this.list.courseType * 1 === 0) {
          this.activityTab = 'second'
        } else if (this.list.courseType * 1 === 1) {
          this.activityTab = 'third'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    width: 1050px;
    margin: 20px auto;

    .main {
      overflow: hidden;
      margin: 50px 0;

      img {
        float: left;
        margin: 0 50px;
        width: 200px;
        border-radius: 50%;
        overflow: hidden;
      }

      .mainContent {
        float: left;

        .title {
          font-size: 24px;
          font-weight: bold;
          color: #1a1a1a;
          margin-bottom: 30px;
          line-height: 40px;
        }

        .item {
          font-size: 14px;
          line-height: 40px;

          span {
            display: inline-block;
            width: 300px;
          }

          .el-button {
            margin: 20px 0;
          }
        }
      }
    }

    .footer {
      overflow: hidden;

      .tabL {
        float: left;
        width: 60%;

        .message {
          line-height: 30px;
          font-size: 14px;
          text-indent: 2em;
        }

        .status {
          margin: 20px 0;
          font-size: 16px;
          line-height: 30px;
        }

        .talent, .brach {
          overflow: hidden;
          margin: 20px 0;

          .pic {
            float: left;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            text-align: center;
            border: #c4c1c1 1px solid;
            overflow: hidden;
          }

          .talentMessage, .brachMessage {
            float: left;
            font-size: 14px;
            margin-left: 50px;
            line-height: 30px;
          }
        }
      }

      .tabR {
        float: right;
        width: 37%;

        .studyList {
          overflow: hidden;
          cursor: pointer;
          margin: 20px 0;

          .studyImg {
            float: left;
            line-height: 90px;
            margin-left: 10px;

            img {
              width: 80px;
              height: 80px;
            }
          }

          .studyContent {
            float: left;
            margin-left: 30px;
            line-height: 30px;

            .title {
              font-size: 16px;
              font-weight: bold;
            }

            .item {
              font-size: 12px;
            }
          }
        }

        .studyList:hover {
          border: #d0d3d5 1px solid;
          box-shadow: #d0d3d5 2px 2px;
        }
      }
    }
  }
</style>
