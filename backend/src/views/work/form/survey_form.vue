<template>
  <el-dialog
    :title="'参会情况'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="true"
    top="15vh"
    class="survey"
  >
    <div class="survey-header">
      <el-row class="panel-group">
        <el-col :span="8" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon icon-class="peoples" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                参会人数
              </div>
              <count-to :start-val="0" :end-val="surveySetting.attendTotal * 1" :duration="2600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon icon-class="peoples" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                实际人数
              </div>
              <count-to :start-val="0" :end-val="surveySetting.attend *1" :duration="2600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon icon-class="peoples" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                缺席人数
              </div>
              <count-to :start-val="0" :end-val="surveySetting.absent *1" :duration="2600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="survey-notic">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>通知反馈</span>
        </div>
        <el-row class="panel-group">
          <el-col :span="3" class="card-panel-col">
            <div class="card-panel-description">
              <div class="card-panel-text">
                {{ surveySetting.readNum }}
              </div>
              <div class="card-panel-text">
                已读人数
              </div>
            </div>
          </el-col>
          <el-col :span="3" class="card-panel-col">
            <div class="card-panel-description">
              <div class="card-panel-text">
                {{ surveySetting.unreadNum }}
              </div>
              <div class="card-panel-text">
                未读人数
              </div>
            </div>
          </el-col>
          <el-col :span="3" class="card-panel-col">
            <div class="card-panel-description">
              <div class="card-panel-text">
                {{ surveySetting.feedbackAttend }}
              </div>
              <div class="card-panel-text">
                反馈出席
              </div>
            </div>
          </el-col>
          <el-col :span="3" class="card-panel-col">
            <div class="card-panel-description">
              <div class="card-panel-text">
                {{ surveySetting.feedbackLeave }}
              </div>
              <div class="card-panel-text">
                反馈请假
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="survey-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>参会详情</span>
          <el-button style="float: right; padding: 3px" type="danger" @click="attendAllRecords">一键全部签到</el-button>
          <el-button style="float: right; padding: 3px;margin-right: 10px;" type="danger" @click="batchAttendRecords">批量签到</el-button>
          <el-button style="float: right; padding: 3px;" type="danger" @click="batchUnAttendRecords">批量未签到</el-button>
        </div>
        <div>
          <el-table :data="tableData" border @selection-change="selectRows">
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column align="center" label="姓名">
              <template slot-scope="scope">{{ scope.row.userName }}</template>
            </el-table-column>
            <el-table-column align="center" label="阅读状态">
              <template slot-scope="scope">{{ scope.row.isRead * 1 === 0 ? '未读': '已读' }}</template>
            </el-table-column>
            <el-table-column align="center" label="通知反馈">
              <template slot-scope="scope">{{ scope.row.feedback ? scope.row.feedback: '未反馈' }}</template>
            </el-table-column>
            <el-table-column align="center" label="签到专题">
              <template slot-scope="scope">{{ scope.row.states * 1 === 0 ? '未签到': scope.row.states * 1 === 1 ? '已签到': '请假' }}</template>
            </el-table-column>
          </el-table>
          <div class="page-wrap">
            <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
              :page-size="page.limit"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
import CountTo from 'vue-count-to'
import { getCentreListByRelationId } from '@/api/base'
import { batchAttendRecord, batchUnAttendRecord, attendAllRecord } from '@/api/work'
import { jsonAssgin } from '@/utils/tools'
import { decrypt } from '@/utils/tools'
export default {
  name: 'SurveyForm',
  components: {
    CountTo
  },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    meetingTypes: {
      type: Array,
      default: () => []
    },
    orgTree: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      surveySetting: {
        id: '',
        attend: '',
        readNum: '',
        feedbackAttend: '',
        feedbackLeave: '',
        attendTotal: '',
        absent: '',
        unreadNum: ''
      },
      page: {
        current: 1,
        limit: 10,
        total: 0
      },
      tableData: [],
      selection: [],
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val.id) {
          const tmp = jsonAssgin(this.surveySetting, val)
          this.surveySetting = tmp
          this.getList(this.value.id)
        }
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    selectRows(selection) {
      this.selection = selection.reduce((res, current) => {
        res.push({
          id: current.id,
          relationId: current.relationId,
          userId: current.userId
        })
        return res
      }, [])
    },
    batchAttendRecords() {
      if (!this.selection.length) {
        this.$message.error('请选择人员')
        return
      }
      batchAttendRecord(this.selection).then(res => {
        if (res.code * 1 === 0) {
          this.getList(this.value.id)
          this.$message.success('批量签到-操作成功')
        } else {
          this.$message.error('批量签到-操作失败')
        }
      })
    },
    batchUnAttendRecords() {
      if (!this.selection.length) {
        this.$message.error('请选择人员')
        return
      }
      batchUnAttendRecord(this.selection).then(res => {
        if (res.code * 1 === 0) {
          this.getList(this.value.id)
          this.$message.success('批量未签到-操作成功')
        } else {
          this.$message.error('批量未签到-操作失败')
        }
      })
    },
    attendAllRecords() {
      attendAllRecord({ meetingId: this.surveySetting.id }).then(res => {
        if (res.code * 1 === 0) {
          this.$message.success('签到成功')
        } else {
          this.$message.error('签到失败')
        }
      })
    },
    getList(relationId) {
      const { current: pageNum, limit: pageSize } = this.page
      getCentreListByRelationId({ pageNum, pageSize }, { relationId: relationId }).then(res => {
        if (res.code * 1 === 0) {
          const tmpList = res.data.list
          for (var i in tmpList) {
            tmpList[i].userName = decrypt(tmpList[i].userName)
          }
          this.tableData = tmpList
          this.page.total = res.data.total * 1
        }
      })
    },
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList(this.surveySetting.id)
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList(this.surveySetting.id)
    },
    cancelSubmit(name) {
      this.selection = []
      this.dialogFormVisible = false
      this.$refs[name].resetFields()
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          this.$emit('doSubmit', data)
          this.dialogFormVisible = false
          this.$refs[name].resetFields()
        }
      })
    }
  }
}
</script>

<style lang="less">
  .survey .el-dialog__body{
    padding: 0px 20px;
  }
  .survey-header{
    .panel-group {
      margin-top: 18px;

      .card-panel-col {
        margin-bottom: 10px;
      }

      .card-panel {
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border: 1px solid rgba(0, 0, 0, .08);

        &:hover {
          .card-panel-icon-wrapper {
            color: #fff;
          }

          .icon-people {
            background: #40c9c6;
          }

          .icon-message {
            background: #36a3f7;
          }

          .icon-money {
            background: #f4516c;
          }

          .icon-shopping {
            background: #34bfa3
          }
        }

        .icon-people {
          color: #40c9c6;
        }

        .icon-message {
          color: #36a3f7;
        }

        .icon-money {
          color: #f4516c;
        }

        .icon-shopping {
          color: #34bfa3
        }

        .card-panel-icon-wrapper {
          float: left;
          margin: 14px 0 0 14px;
          padding: 16px;
          transition: all 0.38s ease-out;
          border-radius: 6px;
        }

        .card-panel-icon {
          float: left;
          font-size: 48px;
        }

        .card-panel-description {
          float: right;
          font-weight: bold;
          margin: 26px;
          margin-left: 0px;

          .card-panel-text {
            line-height: 18px;
            color: rgba(0, 0, 0, 0.45);
            font-size: 16px;
            margin-bottom: 12px;
          }

          .card-panel-num {
            font-size: 20px;
          }
        }
      }
    }
  }

  .survey-notic{
    margin-bottom: 10px;
    .card-panel-text{
      text-align: center;
    }
  }

  .survey-content{

  }

  @media (max-width:550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
