<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>课程分类</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增分类</el-button>
      <div class="list-header-item">
        <span class="label">分类名称</span>
        <el-input v-model="page.typeName" class="w200 content" placeholder="请输入分类名称" />
      </div>
      <el-button type="primary" class="mr8" @click="getList()">搜索</el-button>
      <el-button type="warning" @click="clear">清空</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column type="index" label="编号" align="center" width="50" />
      <el-table-column label="分类名称" min-width="180" align="center" prop="typeName" />
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-popconfirm
            v-if="scope.row.status *1 === 0"
            title="确定禁用该课程吗？"
            @onConfirm="updateStatus(scope.row.id, 1)"
          >
            <el-button slot="reference" type="success" :disabled="scope.row.id === '1'" size="mini">正常</el-button>
          </el-popconfirm>
          <el-popconfirm
            v-else
            title="确定启用该课程吗？"
            @onConfirm="updateStatus(scope.row.id, 0)"
          >
            <el-button slot="reference" type="warning" :disabled="scope.row.id === '1'" size="mini">停用</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="240">
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
    <LessonCaseForm v-model="item" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import LessonCaseForm from './form/lesson_cate_form'
import {
  getLessonCateList,
  getLessonCate,
  saveLessonCate,
  updateLessonCate,
  deleteLessonCate
} from '@/api/study'

export default {
  name: 'LessonCate',
  components: { LessonCaseForm },
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
        typeName: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        typeName: ''
      }
    },
    edit(id) {
      getLessonCate(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          this.item = data
        }
      })
    },
    del(id) {
      deleteLessonCate(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    disabledAndEnabled(id, status) {
      updateLessonCate({ id, status }).then(res => {
        if (res.code * 1 === 0) {
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    updateStatus(id, status) {
      updateLessonCate({ id, status }).then(res => {
        if (res.code * 1 === 0) {
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doSubmit(data) {
      if (data.id) {
        updateLessonCate(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveLessonCate(data).then(res => {
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
      getLessonCateList({ pageNum, pageSize }, { typeName: this.page.typeName }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    clear() {
      this.page.typeName = ''
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
