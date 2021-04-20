<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>试卷管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="handleAdd">新增</el-button>
      <el-button type="success" class="mr10" @click="handleAdd2">随机生成试卷</el-button>
      <div class="list-header-item">
        <span class="label">试卷名称</span>
        <el-input v-model="name" class="w150 content" placeholder="请输入试卷名称" />
      </div>
      <div class="list-header-item">
        <span class="label">试卷类型</span>
        <el-select
          v-model="type"
          placeholder="请选择试卷类型"
          class="w150 content"
          @change="selectType"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-button type="primary" class="mr8" @click="handleSearch">搜索</el-button>
      <el-button type="danger" class="mr8" @click="handleClear">清空</el-button>
    </div>
    <el-table :data="tableData.slice((page.current-1)*page.limit,page.current*page.limit)" border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.moldList.list">
            <el-table-column type="index" width="100" />
            <el-table-column property="name" label="题型" width="120" />
            <el-table-column v-if="scope.row.total" property="score" label="分值" width="100" />
            <el-table-column property="count" label="题数" width="100" />
            <el-table-column v-if="scope.row.total" property="total" label="小计" width="100" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align="center" width="50" type="index" label="序号" />
      <el-table-column align="center" label="试卷名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="开始时间" width="180">
        <template slot-scope="scope">{{ scope.row.start }}</template>
      </el-table-column>
      <el-table-column align="center" label="结束时间" width="180">
        <template slot-scope="scope">{{ scope.row.end }}</template>
      </el-table-column>
      <el-table-column align="center" label="试卷类型" width="120">
        <template slot-scope="scope">{{ scope.row.type }}</template>
      </el-table-column>
      <el-table-column align="center" label="试卷总分" width="80">
        <template slot-scope="scope">{{ scope.row.total?scope.row.total:'-' }}</template>
      </el-table-column>
      <el-table-column align="center" label="考试时长" width="100">
        <template slot-scope="scope">{{ scope.row.duration?scope.row.duration:'-' }}</template>
      </el-table-column>
      <el-table-column align="center" label="考试状态" width="100">
        <template slot-scope="scope">{{ scope.row.state? '已考':'未考' }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="detail">查看详情</el-button>
          <el-button size="mini" type="warning" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      v-model="exam"
      :mold-options="moldOptions"
      :type-options="typeOptions"
      @doSubmit="doSubmit"
    />
  </el-card>
</template>

<script>
import ExamManageForm from './form/exam_manage_form'
import data from './json/exam.json'

export default {
  name: 'ExamManage',
  components: {
    ExamManageForm
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
        loginName: '',
        userName: '',
        roleId: '',
        status: '',
        orgId: ''
      },
      exam: {
        refresh: false,
        id: ''
      },
      exam2: {
        refresh: false,
        id: ''
      },
      moldOptions: [
        {
          value: 1,
          label: '单选题'
        },
        {
          value: 2,
          label: '多选题'
        }
      ],
      typeOptions: [
        {
          value: 1,
          label: '在线考试'
        },
        {
          value: 2,
          label: '民主测评'
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleAdd2() {
      this.exam2 = {
        refresh: !this.exam.refresh,
        id: '1',
        type: '在线考试',
        mold: [
          { id: 1, name: '单选题', count: 5 },
          { id: 2, name: '多选题', count: 5 },
          { id: 3, name: '问答题', count: 4 }
        ]
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
    detail() {
      const { href } = this.$router.resolve({
        path: '/exam/exam-detail'
      })
      window.open(href, '_blank')
    },
    doSubmit(data) {
      console.log(data)
    },
    handleSearch() {
    },
    handleClear() {
      this.exam = {}
      this.getList()
    },
    getList() {
      this.tableData = data.exam
      this.page.total = this.tableData.length * 1
    },
    selectType() {
      this.getList()
      const list = []
      this.tableData.forEach(item => {
        if (item.type === this.exam.type) {
          list.push(item)
        }
      })
      this.tableData = list
    },
    handleAdd() {
      this.exam = {
        refresh: !this.exam.refresh,
        id: '',
        subject: '',
        duration: '',
        type: '',
        moldList: {
          mold: [],
          list: []
        },
        answer: '',
        state: ''
      }
    },
    handleEdit(row) {
      const data = JSON.parse(JSON.stringify(row))
      data.refresh = !this.exam.refresh
      this.exam = Object.assign(this.exam, data)
    },
    handleDelete() {
    },
    cancelSubmit() {
      this.dialogFormVisible = false
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
