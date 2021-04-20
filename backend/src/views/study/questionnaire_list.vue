<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>问卷管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增</el-button>
      <!--      <el-button type="success" class="mr10" @click="handleAdd2">随机生成试卷</el-button>-->
      <div class="list-header-item">
        <span class="label">问卷名称</span>
        <el-input v-model="page.title" class="w150 content" placeholder="请输入试卷名称" />
      </div>
      <el-button type="primary" class="mr8" @click="getList">搜索</el-button>
      <el-button type="warning" class="mr8" @click="handleClear">清空</el-button>
    </div>
    <el-table :data="tableData" border>
      <!--      <el-table-column type="expand">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-table :data="JSON.parse(JSON.stringify(scope.row.moldJson))">-->
      <!--            <el-table-column type="index" width="100" />-->
      <!--            <el-table-column property="name" label="题型" width="120" />-->
      <!--            <el-table-column v-if="scope.row.total" property="score" label="分值" width="100" />-->
      <!--            <el-table-column property="count" label="题数" width="100" />-->
      <!--            <el-table-column v-if="scope.row.total" property="total" label="小计" width="100" />-->
      <!--          </el-table>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column align="center" width="50" type="index" label="序号" />
      <el-table-column align="center" label="问卷名称">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column align="center" label="开始时间" width="180">
        <template slot-scope="scope">{{ $moment(scope.row.startTime * 1000).format('YYYY-MM-DD HH:mm') }}</template>
      </el-table-column>
      <el-table-column align="center" label="结束时间" width="180">
        <template slot-scope="scope">{{ $moment(scope.row.endTime * 1000).format('YYYY-MM-DD HH:mm') }}</template>
      </el-table-column>
      <el-table-column align="center" label="类型" width="120">
        <template slot-scope="scope">
          {{ scope.row.paperTypeId * 1 === 1 ? '在线考试' : scope.row.paperTypeId * 1 === 2 ? '调查问卷' : '民主评议' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">{{
          scope.row.status === '0' ? '正常' : scope.row.status === '1' ? '停用' : ''
        }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="check(scope.row)">查看统计</el-button>
          <!--          <el-button size="mini" type="success" @click="detail">查看详情</el-button>-->
          <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-popconfirm
            title="确定删除该试题吗？"
            @onConfirm="del(scope.row.id)"
          >
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
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
    <ExamManageForm
      v-model="item"
      :mold-options="moldOptions"
      :type-options="typeOptions"
      :org-tree="orgTree"
      :role-data="roleData"
      @doSubmit="doSubmit"
    />
    <StatisticsTable v-model="statisticsItem" />
  </el-card>
</template>

<script>
import ExamManageForm from './form/exam_manage_form'
import StatisticsTable from './form/statisticsTable'
import {
  getExamList,
  getExam,
  saveExam,
  updateExam,
  updateExamStatus,
  deleteExam
} from '@/api/study'
import { getRoleList, queryOrgTree } from '@/api/permission'

export default {
  name: 'QuestionnaireList',
  components: {
    ExamManageForm,
    StatisticsTable
  },
  data() {
    return {
      tableData: [],
      name: '',
      type: '',
      page: {
        current: 1,
        limit: 10,
        total: 0,
        title: '',
        paperTypeId: '2'
      },
      statisticsItem: {
        refresh: false,
        id: ''
      },
      orgTree: [],
      roleData: [],
      item: {
        refresh: false,
        id: ''
      },
      exam2: {
        refresh: false,
        id: ''
      },
      moldOptions: [
        {
          value: '1',
          label: '单选题'
        },
        {
          value: '2',
          label: '多选题'
        },
        {
          value: '3',
          label: '问答题'
        }
      ],
      typeOptions: [
        {
          value: '2',
          label: '调查问卷'
        }
      ]
    }
  },
  mounted() {
    this.getRoleList()
    this.getOrgTree()
    this.getList()
  },
  methods: {
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList()
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList()
    },
    detail() {
      const { href } = this.$router.resolve({
        path: '/exam/exam-detail'
      })
      window.open(href, '_blank')
    },
    handleClear() {
      this.page.title = ''
      this.getList()
    },
    getList() {
      const { current: pageNum, limit: pageSize, title, paperTypeId } = this.page
      getExamList({ pageNum, pageSize }, { title, paperTypeId }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    add() {
      this.item = {
        id: '',
        refresh: !this.item.refresh,
        title: '',
        paperTypeId: '2',
        totalScore: '',
        duration: '',
        moldJson: {
          mold: [],
          list: [],
          test: []
        },
        startTime: '',
        endTime: '',
        paperQuestions: [
          {
            questionBankId: '',
            score: ''
          }
        ],
        pbRoleId: [],
        pbOrgId: [],
        status: ''
      }
    },
    handleAdd2() {
    },
    edit(id) {
      getExam(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          console.log(data)
          data.moldJson = JSON.parse(data.moldJson)
          data.startTime = this.$moment(data.startTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          data.endTime = this.$moment(data.endTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          data.refresh = !this.item.refresh
          data.pbRoleId = data.pbRoleId ? data.pbRoleId.split(',') : [],
          this.item = JSON.parse(JSON.stringify(data))
          console.log(this.item)
        }
      })
    },
    del(id) {
      deleteExam(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doSubmit(data) {
      var saveData = JSON.parse(JSON.stringify(data))
      saveData.moldJson = JSON.stringify(saveData.moldJson)
      saveData.startTime = this.$moment(saveData.startTime, 'YYYY-MM-DD HH:mm:ss').valueOf() / 1000
      saveData.endTime = this.$moment(saveData.endTime, 'YYYY-MM-DD HH:mm:ss').valueOf() / 1000
      delete saveData.status
      console.log(saveData.id)
      if (saveData.id) {
        updateExam(saveData).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveExam(saveData).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    updateStatus(id, status) {
      updateExamStatus({ id, status }).then(res => {
        if (res.code === 0) {
          this.$message.success('修改成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    cancelSubmit() {
      this.dialogFormVisible = false
    },
    getOrgTree() {
      const data = { pageNum: 1, pageSize: 9999 }
      queryOrgTree(data).then(res => {
        if (res.code === 0) {
          this.orgTree = res.data
          // console.log(this.orgTree)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getRoleList() {
      getRoleList({ pageNum: 1, pageSize: 999 }, { roleName: '' }).then(res => {
        if (res.code * 1 === 0) {
          this.roleData = res.data.list
        }
      })
    },
    check(obj) {
      // console.log(obj)
      this.statisticsItem = {
        id: '',
        refresh: !this.statisticsItem.refresh,
        param: obj
      }
    }
  }
}
</script>

<style scoped>
.limit_rows {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
