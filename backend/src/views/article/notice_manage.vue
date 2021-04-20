<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>公告管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增公告</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column type="index" label="编号" align="center" width="50" />
      <el-table-column prop="noticeTitle" label="公告内容" min-width="150" align="center" />
      <el-table-column prop="noticeContent" label="公告内容" min-width="150" align="center" />
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-popconfirm
            v-if="scope.row.status *1 === 0"
            title="确定停用该公告吗？"
            @onConfirm="updateNoticeStatus(scope.row, 1)"
          >
            <el-button slot="reference" type="success" :disabled="scope.row.id === '1'" size="mini">正常</el-button>
          </el-popconfirm>
          <el-popconfirm
            v-else
            title="确定启用该公告吗？"
            @onConfirm="updateNoticeStatus(scope.row, 0)"
          >
            <el-button slot="reference" type="warning" :disabled="scope.row.id === '1'" size="mini">停用</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">查看</el-button>
          <el-popconfirm title="确定删除该轮播图吗？" @onConfirm="del(scope.row.id)">
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
    <NoticeForm v-model="item" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import NoticeForm from './form/notice_form'
import {
  getNoticeList,
  getNotice,
  saveNotice,
  updateNotice,
  deleteNotice
} from '@/api/base'

export default {
  name: 'NoticeManage',
  components: {
    NoticeForm
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
        path: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    add() {
      this.item = {
        id: '',
        showImg: '',
        noticeContent:'',
        noticeTitle:'',
        refresh: !this.item.refresh
      }
    },
    edit(id) {
      getNotice(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          this.item = data
        }
      })
    },
    del(id) {
      deleteNotice(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    updateNoticeStatus(row, status) {
      row.status = status
      updateNotice(row).then(res => {
        if (res.code === 0) {
          this.$message.success('修改成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doSubmit(data) {
      if (data.id) {
        updateNotice(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveNotice(data).then(res => {
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
    getList() {
      const { current: pageNum, limit: pageSize } = this.page
      getNoticeList({ pageNum, pageSize }, {}).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    }
  }
}
</script>

<style lang="less">
  img {
    width: 50px;
    height: 50px;
  }
</style>
