<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>活动列表</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增</el-button>
      <div class="list-header-item">
        <span class="label">主题</span>
        <el-input v-model="page.title" class="w200 content" placeholder="请输入主题" />
      </div>
      <div class="list-header-item">
        <span class="label">类型</span>
        <el-select
          v-model="page.meetingTypeId"
          placeholder="请选择类型"
          class="w200 content"
        >
          <el-option
            v-for="it in meetingTypes"
            :key="it.id"
            :label="it.typeName"
            :value="it.id"
          />
        </el-select>
      </div>
      <el-button type="primary" class="mr8" @click="getList">搜索</el-button>
    </div>
    <div class="list-content">
      <el-scrollbar class="org_list SideBar-scrollbar">
        <el-tree
          :data="orgTree"
          node-key="id"
          default-expand-all
          :props="defaultProps"
          :expand-on-click-node="false"
          @node-click="getListByOrg"
        />
      </el-scrollbar>
      <el-table :data="tableData" border>
        <el-table-column align="center" width="50" type="index" label="序号" />
        <el-table-column align="center" label="活动主题">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column align="center" label="开始时间" width="180">
          <template slot-scope="scope">
            {{ $moment(scope.row.conveneTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动时长" width="100">
          <template slot-scope="scope">{{ scope.row.times }}</template>
        </el-table-column>
        <el-table-column align="center" label="类型" width="150">
          <template slot-scope="scope">{{ scope.row.typeName }}</template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="100">
          <template slot-scope="scope">
            {{
              scope.row.status * 1 === 0 ? '未开始' : scope.row.status * 1 === 1 ? '进行中' : scope.row.status * 1 === 2 ? '已结束' : '已归档'
            }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="success" @click="showSurvey(scope.row.id)">概况</el-button>
            <el-button size="mini" type="warning" @click="showSummary(scope.row.id)">纪要</el-button>
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="del(scope.row.id)"
            >
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-wrap">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        :page-size="page.limit"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <OrgLifeForm v-model="item" :meeting-types="meetingTypes" :org-tree="orgTree" @doSubmit="doSubmit" />
    <SurveyForm v-model="surveySetting" :meeting-types="meetingTypes" :org-tree="orgTree" />
    <SummaryForm
      v-model="summarySetting"
      :meeting-types="meetingTypes"
      :org-tree="orgTree"
      @doSubmit="doSummarySubmit"
    />
  </el-card>
</template>

<script>
import OrgLifeForm from './form/org_activity_form'
import SurveyForm from './form/survey_form'
import SummaryForm from './form/summary_form'
import { queryOrgTree } from '@/api/permission'
import {
  getMeetingList,
  getMeeting,
  saveMeeting,
  updateMeeting,
  deleteMeeting,
  getMeetingCateList,
  getMeetingSurvey,
  getMeetingSummary,
  saveMeetingSummary
} from '@/api/work'

export default {
  name: 'OrgLifeList',
  components: {
    OrgLifeForm,
    SurveyForm,
    SummaryForm
  },
  data() {
    return {
      formSetting: {
        closeOnClickModal: false,
        showClose: false,
        showTop: '8vh',
        formLabelWidth: '100px',
        width: ''
      },
      orgTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      name: '',
      type: '',
      page: {
        current: 1,
        limit: 10,
        total: 0,
        title: '',
        orgId: '',
        meetingTypeId: ''
      },
      meetingTypes: [],
      item: {
        refresh: false,
        id: ''
      },
      surveySetting: {
        refresh: false,
        id: '',
        attend: '',
        readNum: '',
        feedbackAttend: '',
        feedbackLeave: '',
        attendTotal: '',
        absent: '',
        unreadNum: ''
      },
      summarySetting: {
        refresh: false,
        id: ''
      }
    }
  },
  mounted() {
    this.getType()
    this.getOrgTree()
    this.getList()
  },
  methods: {
    getOrgTree() {
      const data = { pageNum: 1, pageSize: 9999 }
      queryOrgTree(data).then(res => {
        if (res.code === 0) {
          this.orgTree = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getListByOrg(org) {
      this.page.orgId = org.id
      this.getList()
    },
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList()
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList()
    },
    doSubmit(data) {
      // console.log(data)
      // return
      if (data.id) {
        updateMeeting(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveMeeting(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    handleClear() {
      this.getList()
    },
    getType() {
      getMeetingCateList({ pageNum: 1, pageSize: 999999 }, {distinguish: "1"}).then(res => {
        if (res.code === 0) {
          this.meetingTypes = res.data.list
          console.log(this.meetingTypes)
        }
      })
    },
    getList() {
      const { current: pageNum, limit: pageSize } = this.page
      getMeetingList({ pageNum, pageSize }, {
        title: this.page.title,
        orgId: this.page.orgId,
        meetingTypeId: this.page.meetingTypeId,
        distinguish: "1"
      }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        title: '',
        hostMan: '',
        address: '',
        speaker: '',
        conveneTime: '',
        times: '',
        meetingTypeId: '',
        isQrcode: '0',
        topics: '',
        imgUrl: '',
        annexUrl: [],
        videoUrl: '',
        participants: []
      }
    },
    edit(id) {
      getMeeting(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          data.participants = data.participants ? JSON.parse(data.participants) : []
          data.annexUrl = data.annexUrl ? JSON.parse(data.annexUrl) : []
          data.conveneTime = this.$moment(data.conveneTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.item = data
        }
      })
    },
    del(id) {
      deleteMeeting(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showSurvey(id) {
      this.surveySetting.id = id
      getMeetingSurvey({ id }).then(res => {
        if (res.code * 1 === 0) {
          this.surveySetting.attend = res.data.attend
          this.surveySetting.readNum = res.data.readNum
          this.surveySetting.feedbackAttend = res.data.feedbackAttend
          this.surveySetting.feedbackLeave = res.data.feedbackLeave
          this.surveySetting.attendTotal = res.data.attendTotal
          this.surveySetting.absent = res.data.absent
          this.surveySetting.unreadNum = res.data.unreadNum
          this.surveySetting.refresh = !this.surveySetting.refresh
        }
      })
    },
    showSummary(id) {
      this.summarySetting.meetingId = id
      getMeetingSummary(id).then(res => {
        if (res.code * 1 === 0) {
          const data = res.data || ''
          console.log(data)
          if (data === '') {
            this.summarySetting.refresh = !this.summarySetting.refresh
          } else {
            data.refresh = !this.summarySetting.refresh
            this.summarySetting = JSON.parse(JSON.stringify(data))
          }
        }
      })
    },
    doSummarySubmit(data) {
      saveMeetingSummary(data).then(res => {
        if (res.code === 0) {
          this.$message.success('添加成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-button + .el-button {
  margin-left: 0;
}

.limit_rows {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.list-content {
  display: flex;
  .org_list {
    margin-right: 10px;
    border: 1px solid #dddddd;
    min-width: 200px;
    max-width: 30%;
    max-height: 65vh;
    overflow-y: auto;
  }
}
/deep/ .el-scrollbar__wrap {
  overflow-x: auto;
}
</style>
