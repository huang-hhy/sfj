<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增工作指引类型</el-button>
      <div class="list-header-item">
        <span class="label">指引类型</span>
        <el-input v-model="page.title" class="w200 content" placeholder="请输入指引类型名称" />
      </div>
      <el-button type="primary" class="mr8" @click="getList()">搜索</el-button>
      <el-button type="warning" @click="clear">清空</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column type="index" label="编号" align="center" width="50" />
      <el-table-column label="名称" min-width="180" align="center" prop="title" />
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-popconfirm
            v-if="scope.row.status *1 === 0"
            title="确定停用该分类吗？"
            @onConfirm="updateStatus(scope.row.id, 1)"
          >
            <el-button slot="reference" type="success" :disabled="scope.row.id === '1'" size="mini">正常</el-button>
          </el-popconfirm>
          <el-popconfirm
            v-else
            title="确定启用分类告吗？"
            @onConfirm="updateStatus(scope.row.id, 0)"
          >
            <el-button slot="reference" type="warning" :disabled="scope.row.id === '1'" size="mini">停用</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">查看</el-button>
          <el-popconfirm title="确定删除该数据吗？" @onConfirm="del(scope.row.id)">
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
    <SuperForm
      v-model="item"
      title="工作指引类型"
      :params="params"
      :form-setting="formSetting"
      @doSubmit="doSubmit"
    />
  </el-card>
</template>

<script>
import {
  guidelinesTypeList,
  guidelinesTypeAdd,
  guidelinesTypeUpdate,
  getGuidelinesType,
  deleteGuidelinesType
} from '@/api/study'
import SuperForm from '@/components/SuperForm'

export default {
  name: 'LessonList',
  components: { SuperForm },
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
        title: ''
      },
      formSetting: {
        closeOnClickModal: false,
        showClose: false,
        showTop: '15vh',
        formLabelWidth: '100px',
        width: '40%'
      }
    }
  },
  computed: {
    params() {
      return [
        {
          type: 'text',
          label: '指引类型',
          key: 'title',
          placeholder: '请输入指引类型名称',
          rules: {
            required: true, message: '指引类型不能为空', trigger: 'blur'
          }
        },
        {
          type: 'select',
          label: '状态',
          key: 'status',
          placeholder: '请选择指引类型状态',
          options: [{ value: 0, label: '启用' }, { value: 0, label: '停用' }],
          rules: {
            required: true, message: '项目类型不能为空', trigger: 'blur'
          }
        }
      ]
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
        title: ''
      }
    },
    edit(id) {
      getGuidelinesType(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          this.item = Object.assign(this.item, data)
        }
      })
    },
    del(id) {
      deleteGuidelinesType(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    updateStatus(id, status) {
      guidelinesTypeUpdate({ id, status }).then(res => {
        if (res.code * 1 === 0) {
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doSubmit(data) {
      if (data.id) {
        guidelinesTypeUpdate(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        guidelinesTypeAdd(data).then(res => {
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
      guidelinesTypeList({ pageNum, pageSize }, { title: this.page.title }).then(res => {
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
