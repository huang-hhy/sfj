<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>试题管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增</el-button>
      <div class="list-header-item">
        <span class="label">试题名称</span>
        <el-input v-model="page.questionTitle" class="w150 content" placeholder="请输入试题名称" />
      </div>
      <div class="list-header-item">
        <span class="label">试卷类型</span>
        <el-select v-model="page.paperTypeId" placeholder="请选择试卷类型" class="w150 content" @change="getList">
          <el-option v-for="it in typeOptions" :key="it.value" :label="it.label" :value="it.value" />
        </el-select>
      </div>
      <div class="list-header-item">
        <span class="label">试题类型</span>
        <el-select v-model="page.mold" placeholder="请选择试题类型" class="w150 content" @change="getList">
          <el-option v-for="it in moldOptions" :key="it.value" :label="it.label" :value="it.value" />
        </el-select>
      </div>
      <el-button type="primary" class="mr8" @click="getList">搜索</el-button>
      <el-button type="warning" class="mr8" @click="handleClear">清空</el-button>
      <el-upload
        style="display: inline-block"
        class="mr10"
        :action="importExcel()"
        :show-file-list="false"
        :headers="headers"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      >
        <el-button type="primary">导入</el-button>
      </el-upload>
    </div>
    <el-table :data="tableData" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item>
              <div class="test">
                <p class="subject">题目：{{ props.row.questionTitle }}</p>
                <div v-if="props.row.options" class="option">
                  <p v-for="(it,index) in props.row.options" :key="index">
                    {{ it.opt + "：" + it.content }}
                  </p>
                </div>
                <p class="answer">
                  <span class="name">答案：</span>
                  <span>{{ props.row.answer }}</span>
                </p>
                <p class="analysis">
                  <span class="name">解析：</span>
                  <span>{{ props.row.analysis }}</span>
                </p>
              </div>
              <p />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" width="50" type="index" label="序号" />
      <el-table-column align="center" label="题目">
        <template slot-scope="scope">
          {{ scope.row.questionTitle }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="试题类型" width="100">
        <template slot-scope="scope">
          <span
            :class="[scope.row.mold *1 === 1 ? 'mold1' : scope.row.mold *1 === 2 ? 'mold2' : 'mold3']"
          >{{ scope.row.mold * 1 === 1 ? '单选题' : scope.row.mold * 1 === 2 ? '多选题' : '问答题' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="试卷类型" width="100">
        <template slot-scope="scope">
          {{ scope.row.paperTypeId * 1 === 1 ? '在线考试' : scope.row.paperTypeId * 1 === 2 ? '调查问卷' : '调查问卷' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="标签" width="100">
        <template slot-scope="scope">
          {{ scope.row.questionClassificationName ? scope.row.questionClassificationName : '' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-popconfirm
            v-if="scope.row.status *1 === 0"
            title="确定停用该试题吗？"
            @onConfirm="updateStatus(scope.row.id, 1)"
          >
            <el-button slot="reference" type="success" :disabled="scope.row.id === '1'" size="mini">正常</el-button>
          </el-popconfirm>
          <el-popconfirm
            v-else
            title="确定启用该试题吗？"
            @onConfirm="updateStatus(scope.row.id, 0)"
          >
            <el-button slot="reference" type="warning" :disabled="scope.row.id === '1'" size="mini">停用</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column align="center" label="添加时间" width="180">
        <template slot-scope="scope">
          {{ $moment(scope.row.createTime * 1000).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
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
    <QuestionForm v-model="item" :mold-options="moldOptions" :type-options="typeOptions" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import QuestionForm from './form/question_form'
import {
  getQuestionList,
  getQuestion,
  saveQuestion,
  updateQuestion,
  updateQuestionStatus,
  deleteQuestion
} from '@/api/study'
import { getToken } from '@/utils/auth'

export default {
  name: 'QuestionList',
  components: {
    QuestionForm
  },
  data() {
    return {
      headers: { Authorization: getToken() },
      page: {
        current: 1,
        limit: 10,
        total: 0,
        questionTitle: '',
        paperTypeId: '',
        mold: ''
      },
      tableData: [],
      type: '',
      mold: '',
      item: {
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
          value: '1',
          label: '在线考试'
        },
        {
          value: '2',
          label: '调查问卷'
        }
      ]
    }
  },
  mounted() {
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
    getList() {
      const { current: pageNum, limit: pageSize, questionTitle, paperTypeId, mold } = this.page
      getQuestionList({ pageNum, pageSize }, { questionTitle, paperTypeId, mold }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    handleClear() {
      this.page.questionTitle = ''
      this.page.paperTypeId = ''
      this.page.mold = ''
      this.getList()
    },
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        questionTitle: '',
        answer: '',
        analysis: '',
        paperTypeId: '',
        mold: '',
        options: []
      }
    },
    edit(id) {
      getQuestion(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          this.item = JSON.parse(JSON.stringify(data))
        }
      })
    },
    del(id) {
      deleteQuestion(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    updateStatus(id, status) {
      updateQuestionStatus({ id, status }).then(res => {
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
        updateQuestion(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveQuestion(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    importExcel(name) {
      const url = '/api/paper/bank/importData'
      return url
    },
    handleSuccess(res) {
      if (res.code === 0) {
        this.$message.success('操作成功')
        this.getList()
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeUpload() {

    }
  }
}
</script>

<style lang="less" scoped>
.test {
  p {
    line-height: 18px;
  }

  .subject {
    font-weight: bold;
    line-height: 24px;
  }

  .answer {
    .name {
      color: #008000;
    }
  }

  .analysis {
    .name {
      color: #E6A23C;
    }
  }
}

.mold1 {
  color: #67C23A;
  border: 1px solid #C2E7B0;
  border-radius: 2px;
  display: inline-block;
  padding: 3px 10px;
}

.mold2 {
  color: #E6A23C;
  border: 1px solid #F5DAB1;
  border-radius: 2px;
  display: inline-block;
  padding: 3px 10px;
}

.mold3 {
  color: #409EFF;
  border: 1px solid #329FF0;
  border-radius: 2px;
  display: inline-block;
  padding: 3px 10px;
}
</style>
