<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>课程管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增课程</el-button>
      <div class="list-header-item">
        <span class="label">课程分类</span>
        <el-select v-model="page.studyTypeId" placeholder="请选择分类" class="w200 content" @change="getList">
          <el-option label="全部" value="" />
          <el-option v-for="it in typeOptions" :key="it.id" :label="it.typeName" :value="it.id" />
        </el-select>
      </div>
      <div class="list-header-item">
        <span class="label">课程名称</span>
        <el-input v-model="page.title" class="w200 content" placeholder="请输入课程名称" />
      </div>
      <el-button type="primary" class="mr8" @click="getList()">搜索</el-button>
      <el-button type="warning" @click="clear">清空</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column type="index" label="编号" align="center" width="50" />
      <el-table-column label="名称" min-width="180" align="center" prop="title" />
      <el-table-column label="类型" min-width="100" align="center" prop="typeName" />
      <el-table-column label="打卡时长（秒）" min-width="100" align="center" prop="times" />
      <el-table-column label="学分" min-width="100" align="center" prop="score" />
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">查看</el-button>
          <el-popconfirm title="确定删除该课程吗？" @onConfirm="del(scope.row.id)">
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
    <LessonForm v-model="item" :type-options="typeOptions" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import LessonForm from './form/lesson_form'
import { deleteLesson, getLesson, getLessonCateSelect, getLessonList, saveLesson, updateLesson } from '@/api/study'

export default {
  name: 'LessonList',
  components: { LessonForm },
  data() {
    return {
      tableData: [],
      typeOptions: [],
      item: {
        refresh: false,
        id: ''
      },
      page: {
        current: 1,
        limit: 10,
        total: 0,
        title: '',
        studyTypeId: ''
      }
    }
  },
  mounted() {
    this.getType()
    this.getList()
  },
  methods: {
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        title: '',
        imgUrl: '',
        studyTypeId: '',
        videoUrl: '',
        times: '',
        score: '',
        checkStatus: 0
      }
    },
    edit(id) {
      getLesson(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          // console.log(data)
          data.refresh = !this.item.refresh
          data.imgUrl = data.imgUrl ? data.imgUrl : ''
          data.videoUrl = data.videoUrl ? data.videoUrl : ''
          this.item = Object.assign(this.item, data)
        }
      })
    },
    del(id) {
      deleteLesson(id).then(res => {
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
        updateLesson(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveLesson(data).then(res => {
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
    getType() {
      getLessonCateSelect().then(res => {
        if (res.code === 0) {
          this.typeOptions = res.data
        }
      })
    },
    getList() {
      const { current: pageNum, limit: pageSize } = this.page
      getLessonList({ pageNum, pageSize }, { studyTypeId: this.page.studyTypeId, title: this.page.title }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    clear() {
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
