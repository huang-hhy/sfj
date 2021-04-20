<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>积分规则</span>
    </div>
    <div class="list-header">
      <el-button type="primary" class="mr10" @click="add">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column type="index" label="编号" align="center" width="50" />
      <el-table-column label="名称" width="250" align="center" prop="title" />
      <el-table-column label="描述" align="center" prop="content" />
      <el-table-column label="时间" width="120" align="center" prop="limitTime">
        <template slot-scope="scope">
          {{ scope.row.limitTime *1 === 1 ? '每年' : scope.row.limitTime *1 === 2 ? '每季' : scope.row.limitTime *1 === 3 ? '每月' : '每日' }}
        </template>
      </el-table-column>
      <el-table-column label="上限" width="120" align="center" prop="limitNum">
        <template slot-scope="scope">
          {{ scope.row.limitNum }} 次
        </template>
      </el-table-column>
      <el-table-column label="积分" width="120" align="center" prop="score" />
      <el-table-column label="状态" width="120" align="center" prop="score">
        <template slot-scope="scope">
          <el-popconfirm
            v-if="scope.row.status *1 === 0"
            title="确定停用该规则吗？"
            @onConfirm="updateStatus(scope.row.id, 1)"
          >
            <el-button slot="reference" type="success" size="mini">正常</el-button>
          </el-popconfirm>
          <el-popconfirm
            v-else
            title="确定启用该规则吗？"
            @onConfirm="updateStatus(scope.row.id, 0)"
          >
            <el-button slot="reference" type="warning" size="mini">停用</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
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
    <SuperForm
      v-model="item"
      title="积分规则"
      :params="params"
      :form-setting="formSetting"
      @doSubmit="doSubmit"
    />
  </el-card>
</template>

<script>
import SuperForm from '@/components/SuperForm'
import {
  getScoreRuleList,
  getScoreRule,
  saveScoreRule,
  updateScoreRule
} from '@/api/work'
export default {
  name: 'ScoreRule',
  components: { SuperForm },
  data() {
    return {
      formSetting: {
        closeOnClickModal: false,
        showClose: false,
        showTop: '15vh',
        formLabelWidth: '100px',
        width: '40%'
      },
      tableData: [],
      item: {
        refresh: false,
        id: ''
      },
      page: {
        current: 1,
        limit: 10,
        total: 0
      }
    }
  },
  computed: {
    params() {
      return [
        {
          type: 'text',
          label: '标题',
          key: 'title',
          placeholder: '请输入标题',
          rules: {
            required: true, message: '标题不能为空', trigger: 'blur'
          }
        },
        {
          type: 'select',
          label: '所属类型',
          key: 'ruleType',
          placeholder: '请选择所属模块',
          options: [
            {
              value: '1',
              label: '党组织生活-阅读'
            },
            {
              value: '2',
              label: '党组织生活-反馈出席'
            },
            {
              value: '3',
              label: '党组织生活-签到'
            },
            {
              value: '4',
              label: '通知公告-阅读'
            }
          ]
        },
        {
          type: 'textarea',
          label: '描述',
          key: 'content',
          placeholder: '请输入描述',
          rules: {
            required: true, message: '描述不能为空', trigger: 'blur'
          }
        },
        {
          type: 'text',
          label: '次数限制',
          key: 'limitNum',
          placeholder: '请输入标题'
        },
        {
          type: 'select',
          label: '时间限制',
          key: 'limitTime',
          placeholder: '请选择时间限制',
          options: [
            {
              value: 1,
              label: '每年'
            },
            {
              value: 2,
              label: '每季'
            },
            {
              value: 3,
              label: '每月'
            },
            {
              value: 4,
              label: '每日'
            }
          ]
        },
        {
          type: 'text',
          label: '积分',
          key: 'score',
          placeholder: '请输入积分'
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
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        title: '',
        ruleType: '',
        content: '',
        limitNum: '',
        limitTime: '',
        score: ''
      }
    },
    edit(id) {
      getScoreRule(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          this.item = data
        }
      })
    },
    updateStatus(id, status) {

    },
    doSubmit(data) {
      if (data.id) {
        updateScoreRule(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveScoreRule(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    getList() {
      const { current: pageNum, limit: pageSize } = this.page
      getScoreRuleList({ pageNum, pageSize }, {}).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
