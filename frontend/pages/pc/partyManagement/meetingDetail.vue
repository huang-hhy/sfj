<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="card">
      <mainHeader :content="content" />
      <div class="container">
        <div class="containerT">
          <div class="header_l">
            <img :src="attachUrl + list.imgUrl">
          </div>
          <div class="header_r">
            <p class="title">{{ list.title }}</p>
            <p class="item">召开时间： {{ moment(list.conveneTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
            <el-row class="item">
              <el-col :span="12">
                <span>会议地点： {{ list.address }}</span>
              </el-col>
              <el-col :span="12">
                <span>会议时长： {{ list.times }} 分钟</span>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="12">
                <span>主讲人： {{ list.speaker }}</span>
              </el-col>
              <el-col :span="12">
                <span>主持人： {{ list.hostMan }}</span>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="12">
                <span>发布组织： {{ list.orgName }}</span>
              </el-col>
              <el-col :span="12">
                <span>会议议题： {{ list.topics }}</span>
              </el-col>
            </el-row>
          </div>
        </div>
        <div style="overflow: hidden">
          <div class="containerL">
            <el-form :model="list" label-width="110px" label-position="left">
              <el-tabs v-model="activityName" type="border-card">
                <el-tab-pane name="first" label="会议基本信息">
                  <div class="base">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="会议主题">
                          <span>{{ list.title }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="召开时间">
                          <span>{{ moment(list.conveneTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="会议地点">
                          <span>{{ list.address }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="会议议题">
                          <span>{{ list.topics }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="会议时长">
                          <span>{{ list.times * 1 }} 分钟</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="是否二维码签到">
                          <span>{{ list.isQrcode * 1 === 0 ? '否' : '是'}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="主讲人">
                          <span>{{ list.speaker }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="主持人">
                          <span>{{ list.hostMan }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="创建时间">
                          <span>{{ moment(list.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="更新时间">
                          <span>{{ moment(list.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
                <el-tab-pane name="second" label="会议文件">
                  <el-form-item v-if="list.videoUrl" label="学习视频">
                    <video height="200px" :src="attachUrl + list.videoUrl" controls="controls"/>
                  </el-form-item>
                  <el-form-item v-if="list.imgUrl" label="图片文件">
                    <span>{{ list.imgUrl }}</span>
                  </el-form-item>
                  <el-form-item v-if="list.annexUrl" label="附件文件">
                    <div v-if="list.annexUrl.length > 0">
                      <div v-for="(item, index) in list.annexUrl" :key="index">
                        <a :href="downloadUrl + '?name=' + item">{{ item }}</a>
                      </div>
                    </div>
                    <div v-else-if="list.annexUrl.length === 0">暂无附件信息</div>
                  </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="third" label="参与人信息">
                  <div v-for="(item, index) in list.participants" :key="index" class="participants">
                    <div class="participantsL">
                      <span>{{ index + 1 }}</span>
                    </div>
                    <div class="participantsR">
                      <el-form-item label="参与人姓名">
                        <span>{{ item.userName }}</span>
                      </el-form-item>
                      <el-form-item label="联系方式">
                        <span>{{ item.phone ? item.phone : '暂未取得联系方式' }}</span>
                      </el-form-item>
                      <el-form-item label="admin">
                        <span>{{ item.admin ? '是': '否' }}</span>
                      </el-form-item>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane name="fourth" label="反馈信息">
                  <el-form-item label="状态">
                    <el-select v-model="list.status">
                      <el-option
                        v-for="item in attend"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="反馈内容">
                    <el-input v-model="list.feedback" type="textarea" :rows="4"/>
                  </el-form-item>
                  <el-button type="primary" style="float:right;" size="small" @click="handleAttend">提交</el-button>
                </el-tab-pane>
                <el-tab-pane name="fifth" label="活动打卡">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="打卡状态" label-width="80px">
                        <el-select v-model="list.states">
                          <el-option
                            v-for="item in attendState"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-button type="primary" @click="handleStates">打卡</el-button>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </el-form>
          </div>
          <el-tabs v-model="activityName2" type="border-card" class="containerR">
            <el-tab-pane name="first" label="相关会议">
              <div v-for="(item, index) in meetingList" :key="index" style="margin: 20px 0; overflow: hidden">
                <div class="meetingL">
                  <div class="index">{{ index + 1 }}</div>
                </div>
                <div class="meetingMessage" @click="handleLook(item.id)">
                  <el-badge
                    v-if="item.isRead * 1 === 0"
                    value="未读"
                  >
                    <p class="title">{{ item.title }}</p>
                  </el-badge>
                  <p v-else class="title">{{ item.title }}</p>
                  <p>召开时间： {{ moment(item.conveneTime * 1000).format('YYYY-MM-DD') }}</p>
                  <p style="margin-left: 65px; margin-bottom: 5px;">{{ moment(item.conveneTime * 1000).format('HH:mm:ss') }}</p>
                  <p>会议地点： {{item.address }}</p>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import {getMeeting, noticeCentreAttend, meetingAttend, getMeetingList} from '@/api/pc'
  import config from '@/config'
  import moment from 'moment'
  import mainHeader from "@/components/pc/common/mainHeader";
  import {decrypt} from "../../../libs/tools";

  export default {
    name: "meetingDetail",
    components: {
      mainHeader,
      NavBar
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 活动详情',
      }
    },
    data() {
      return {
        list: {},
        meetingList: [],
        id: '',
        meetingTypeId: '',
        attachUrl: config.attachUrl,
        moment: moment,
        activityName: 'first',
        activityName2: 'first',
        downloadUrl: '/api/common/download/resource',
        attend: [{
          label: '未反馈',
          value: '0'
        }, {
          label: '出席',
          value: '1'
        }, {
          label: '请假',
          value: '2'
        }],
        attendState: [{
          label: '未签到',
          value: '0'
        }, {
          label: '签到',
          value: '1'
        }, {
          label: '请假',
          value: '2'
        }],
        content : {
          sort: '2',
          name: '党务管理',
          url: '/pc/partyManagement',
          title: '组织生活',
          path: '/pc/partyManagement/meeting',
          topic: ''
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
        this.meetingTypeId = data.meetingTypeId
        this.getList()
        this.activityName = 'first'
        this.activityName2 = 'first'
      },
      getList() {
        getMeeting(this.id).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data
            this.content.topic = this.list.title
            this.list.participants = JSON.parse(this.list.participants)
            this.list.annexUrl = JSON.parse(this.list.annexUrl)
          }
        })
        const params = {
          pageNum: 1,
          pageSize: 9999
        }
        const data = {
          meetingTypeId: this.meetingTypeId,
          status: ''
        }
        getMeetingList(params, data).then(res => {
          if (res.code * 1 === 0) {
            this.meetingList = res.data.list
          }
        })
      },
      handleAttend() {
        const data = {
          status: this.list.status,
          relationId: this.id,
          feedback: this.list.feedback
        }
        if (data.status * 1 !== 0) {
          noticeCentreAttend(data).then(res => {
            if (res.code * 1 === 0) {
              this.$message.success('反馈成功')
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$message.warning('反馈状态未选，无法反馈')
        }
      },
      handleStates() {
        const data = {
          states: this.list.states,
          meetingId: this.id
        }
        if (data.states * 1 === 0) {
          this.$message.warning('未选择打卡状态，无法打卡')
        } else {
          meetingAttend(data).then(res => {
            if (res.code * 1 === 0) {
              this.$message.success('打卡成功')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      },
      handleLook(id) {
        this.id = id
        this.getList()
      }
    }
  }
</script>

<style lang="less">
  .base, .participantsR, .talentMessage {
    .el-form-item__label, .el-form-item__content {
      line-height: 15px;
    }
  }
</style>
<style scoped lang="less">
  .card {
    width: 1050px;
    margin: 20px auto;

    .container {
      margin: 50px 30px;

      .containerT {
        margin-bottom: 50px;
        overflow: hidden;

        .header_l {
          float: left;
          text-align: center;

          img {
            width: 150px;
            height: 150px;
            border: #c5c6cb 1px solid;
            border-radius: 50%;
            overflow: hidden;
            margin-top: 10px;
          }
        }

        .header_r {
          float: left;
          margin-left: 50px;
          width: 700px;

          .title {
            font-size: 18px;
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 20px;
          }

          .item {
            font-size: 14px;
            margin: 15px 0;
          }
        }
      }

      .containerL {
        width: 70%;
        float: left;

        .base {
          margin: 20px 10px;
        }

        .participants {
          overflow: hidden;
          margin: 20px 0;

          .participantsL {
            float: left;
            font-size: 40px;
            font-weight: bold;
            line-height: 96px;
            text-align: center;
            color: #e33a3c;
            width: 35%;
          }

          .participantsR {
            float: left;
            width: 64%;
          }
        }
      }

      .containerR {
        float: left;
        margin-left: 30px;
        padding-bottom: 20px;
        width: 26%;
        overflow: hidden;

        .meetingL {
          float: left;
          margin: 10px 0;

          .index {
            width: 60px;
            height: 60px;
            border: #e33a3c 1px solid;
            border-radius: 50%;
            line-height: 60px;
            text-align: center;
            font-size: 30px;
            color: #e33a3c;
          }
        }
        .meetingMessage {
          float: right;
          cursor: pointer;

          .title {
            font-size: 16px;
            margin-bottom: 10px;
            color: #000000;
          }
        }
      }
    }
  }
</style>
