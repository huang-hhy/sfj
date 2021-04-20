<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>思想汇报</span>
    </div>
    <div class="list-header">
      <div class="list-header-item">
        <span class="label">标题</span>
        <el-input v-model="page.title" class="w200 content" placeholder="请输入标题" />
      </div>
      <el-button type="primary" class="mr8" @click="getList()">搜索</el-button>
      <el-button type="danger" @click="clear">清空</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column type="index" label="编号" align="center" width="50" />
      <el-table-column label="标题" min-width="180" align="center" prop="title" />
      <el-table-column label="内容" min-width="180" align="center" prop="content" />
      <el-table-column label="汇报人" width="180" align="center" prop="userName" />
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">查看</el-button>
          <el-popconfirm title="确定删除该分类吗？" @onConfirm="del(scope.row.id)">
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
    <ThoughtReportForm v-model="item" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import { decrypt } from '@/utils/tools'
import ThoughtReportForm from './form/thought_report_form'
import {
  getThoughReportList,
  getThoughReport,
  saveThoughReport,
  updateThoughReport,
  deleteThoughReport
} from '@/api/work'

export default {
  name: 'ThoughtReport',
  components: {
    ThoughtReportForm
  },
  data() {
    return {
      tableData: [],
      item: {
        refresh: false,
        id: ''
      },
      page: {
        current: 1,
        limit: 10,
        total: 0,
        title: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const { current: pageNum, limit: pageSize } = this.page
      getThoughReportList({ pageNum, pageSize }, { title: this.page.title }).then(res => {
        if (res.code === 0) {
          const tmpList = res.data.list
          for (var i in tmpList) {
            tmpList[i].userName = decrypt(tmpList[i].userName)
          }
          this.tableData = tmpList
          this.page.total = res.data.total * 1
        }
      })
    },
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        title: '',
        content: '',
        reportTime: '',
        annexUrl: '',
        userId: '',
        userName: '',
        orgName: ''
      }
    },
    edit(id) {
      getThoughReport(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.reportTime = this.$moment(data.reportTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          data.refresh = !this.item.refresh
          this.item = data
        }
      })
    },
    del(id) {
      deleteThoughReport(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doSubmit(data) {
      if (data.id) {
        updateThoughReport(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveThoughReport(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList()
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList()
    },
    clear() {
      this.page.title = ''
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
