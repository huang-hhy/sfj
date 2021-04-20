<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <p class="title">{{ list.title }}</p>
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="title_item">开始时间： {{ moment(list.startTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
        <span class="title_item" v-if="type === '在线考试'">试卷总分： {{ list.totalScore }} 分</span>
        <span class="title_item" v-if="type === '在线考试'">考试时长： {{ list.duration }} 小时</span>
        <span class="title_item">截止时间： {{ moment(list.startTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <div class="paperContent" v-for="(item, index) in list.moldJson.test" :key="index">
        <span class="paperName">
          {{ index === 0 ? '一、' : index === 1 ? '二、' : '三、' }} {{ item.name }}
        </span>
        <span v-if="type === '在线考试'" class="paperName">
          （每题 {{ item.score }} 分， 共 {{ item.total }} 分）
        </span>
        <div class="paperQuestion" v-for="(i, ind) in item.moldJson" :key="ind">
          <p class="paperTitle">
            <span class="index">{{ ind + 1 }}</span>
            <span>{{ i.questionTitle }}</span>
          </p>
          <div v-if="i.options.length > 0">
            <div v-if="item.mold * 1 === 1" class="paperOptions">
              <el-radio-group v-model="radio[ind]" v-for="(j, dex) in i.options" :key="dex" :disabled="readonly">
                <el-radio :label="j.opt">
                  <span class="opt">{{ j.opt }}</span>
                  <span>{{ j.content }}</span>
                </el-radio>
              </el-radio-group>
            </div>
            <div v-else-if="item.mold * 1 === 2" class="paperOptions">
              <el-checkbox-group v-model="check[ind]" v-for="(j, dex) in i.options" :key="dex" :disabled="readonly">
                <el-checkbox :label="j.opt">
                  <span class="opt">{{ j.opt }}</span>
                  <span>{{ j.content }}</span>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div v-else>
            <div v-if="item.mold * 1 === 3" class="paperOptions" style="margin: 20px;">
              <el-input type="textarea" v-model="textarea[ind]" :rows="4" />
            </div>
            <div v-else style="margin: 0 30px; font-size: 16px; line-height: 60px">暂无选项信息</div>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button size="small" type="warning" @click="handleReset">重置</el-button>
        <el-button size="small" type="success" @click="handleSubmit">提交</el-button>
      </div>
      <div v-if="type === '在线考试'" class="timer">
        <p>{{ time.hh > 9 ? time.hh : '0' + time.hh }} : {{ time.mm > 9 ? time.mm : '0' + time.mm }} : {{ time.ss > 9 ? time.ss : '0' + time.ss }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import { getPaper, getAnswerSave } from '@/api/pc'
  import moment from 'moment'
  import {decrypt, encrypt} from "../../../../libs/tools";

  export default {
    name: "paper",
    components: {
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
        type: '',
        readonly: false,
        list: {
          moldJson: {
            test: []
          }
        },
        moment: moment,
        radio: [],
        check: [],
        textarea: [],
        answerInfos: [],
        time: {
          timer: null,
          pastTime: 0,
          nowTime: 0,
          hh: 0,
          mm: 0,
          ss: 0,
          leave: false
        }
      }
    },
    beforeRouteLeave(to, form, next) {
      if (this.time.leave) {
        next(() => {})
      } else {
        this.$confirm('离开此页面视为提交答卷，确定离开？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          next(() => {})
          window.clearInterval(this.time.timer)
          this.getAnswer()
        }).catch(() => {})
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
        this.type = data.type
        this.readonly = this.status * 1 === 1
        this.time.pastTime = data.time * 1
        this.time.nowTime = parseInt(new Date().getTime() / 1000)
        this.getList()
      },
      getTime() {
        const remainTime = parseInt(this.list.duration * 3600 + this.time.pastTime - this.time.nowTime)
        this.time.hh = parseInt(remainTime / 3600)
        this.time.mm = parseInt((remainTime - this.time.hh * 3600) / 60)
        this.time.ss = parseInt(remainTime - this.time.hh * 3600 - this.time.mm * 60)
        if (this.type === '在线考试') {
          this.countDown()
        }
      },
      countDown() {
        const _this = this
        this.time.timer = window.setInterval(function () {
          if (_this.time.ss === 0 && _this.time.mm === 0 && _this.time.hh !== 0) {
            _this.time.ss = 59
            _this.time.mm = 59
            _this.time.hh -= 1
          } else if (_this.time.ss === 0 && _this.time.mm !== 0) {
            _this.time.ss = 59
            _this.time.mm -= 1
          } else if (_this.time.ss === 0 && _this.time.mm === 0 && _this.time.hh === 0) {
            _this.time.ss = 0
            window.clearInterval(_this.time.timer)
            _this.$confirm('考试时间已到，请提交试卷', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              _this.getAnswer()
            }).catch(() => {
              _this.$message.warning('考试时间已到，系统已为你自动提交')
              _this.getAnswer()
            })
          } else {
            _this.time.ss -= 1
          }
        }, 1000)
      },
      getList() {
        getPaper(this.id).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data
            this.list.moldJson = this.list.moldJson ? JSON.parse(this.list.moldJson) : ''
            this.getCheckList()
            this.getTime()
          }
        })
      },
      getCheckList() {
        this.list.moldJson.test.forEach(item => {
          if (item.mold * 1 === 1) {
            item.moldJson.forEach(i => {
              this.radio.push({})
            })
          } else if (item.mold * 1 === 2) {
            item.moldJson.forEach(i => {
              this.check.push([])
            })
          } else if (item.mold * 1 === 3) {
            item.moldJson.forEach(i => {
              this.textarea.push('')
            })
          }
        })
      },
      handleReset() {
        this.$confirm('确定重置所有选项？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.radio = []
          this.check = []
          this.textarea = []
          this.getCheckList()
          this.$message.success('重置选项成功')
        }).catch(() => {
          this.$message.info('已取消重置')
        })
      },
      getAnswer() {
        this.time.leave = true
        this.list.moldJson.test.forEach(item => {
          if (item.mold * 1 === 1) {
            item.moldJson.forEach((i, index) => {
              if (this.radio[index].length) {
                this.answerInfos.push({ questionBankId: i.id, myAnswer: this.radio[index]} )
              } else {
                this.answerInfos.push({ questionBankId: i.id, myAnswer: ''})
              }
            })
          } else if (item.mold * 1 === 2) {
            item.moldJson.forEach((i, index) => {
              this.check[index].sort(function (s, t) {
                const a = s.toUpperCase()
                const b = t.toUpperCase()
                if (a < b) return -1
                if (a > b) return 1
                return 0
              })
              if (this.check[index].length > 0) {
                let answer = ''
                this.check[index].forEach((j, ind) => {
                  if (ind === this.check[index].length - 1) {
                    answer = answer + j
                  } else {
                    answer = answer + j + ','
                  }
                })
                this.answerInfos.push({ questionBankId: i.id, myAnswer: answer })
              } else {
                this.answerInfos.push({ questionBankId: i.id, myAnswer: ''})
              }
            })
          } else if (item.mold * 1 === 3) {
            item.moldJson.forEach((i, index) => {
              if (this.textarea[index].length > 0) {
                this.answerInfos.push({ questionBankId: i.id, myAnswer: this.textarea[index] })
              }
            })
          }
        })
        const data = {
          testPaperId: this.id,
          answerInfos: this.answerInfos
        }
        getAnswerSave(data).then(res => {
          if (res.code * 1 === 0) {
            this.$message.success('提交试卷成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      handleSubmit() {
        this.$confirm('确定提交试卷？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getAnswer()
          window.clearInterval(this.time.timer)
          let params = {
            type: this.type
          }
          params = encrypt(JSON.stringify(params))
          this.$router.push({
            path: '/pc/profile/exam',
            query: {
              params: params
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    width: 1050px;
    margin: 20px auto;

    .title {
      font-size: 24px;
      font-weight: bold;
      color: #1a1a1a;
      text-align: center;
      margin: 50px 0 30px;
    }

    .title_item {
      font-size: 12px;
      display: inline-block;
      width: 24%;
      text-align: center;
    }

    .paperContent {
      margin: 0 30px;
      .paperName {
        font-size: 16px;
        line-height: 60px;
        margin: 50px 0 10px;
      }

      .paperQuestion {
        border: #e0dddd 1px solid;
        margin-bottom: 15px;
        line-height: 60px;

        .paperTitle {
          padding: 0 30px;
          background: #f3f1f1;
          font-size: 16px;

          .index {
            color: #e33a3c;
            margin-right: 30px;
            font-size: 18px;
            font-weight: bold;
          }
        }

        .paperOptions {
          font-size: 16px;
          margin: 0 30px;

          .el-radio-group {
            display: block;
            line-height: 60px;

            .opt {
              color: #8c939d;
              margin: 0 10px 0 20px;
            }
          }
        }
      }
    }

    .footer {
      text-align: right;
      margin: 30px;
    }

    .timer {
      position: fixed;
      top: 50%;
      right: 0;
      height: 60px;
      width: 120px;
      background: rgba(211, 77, 77, 0.8);
      color: #fafafa;
      font-size: 16px;
      text-align: center;
      font-weight: bold;
      line-height: 60px;
    }
  }
</style>
