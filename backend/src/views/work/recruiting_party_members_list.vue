<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>发展党员列表</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增发展党员</el-button>
      <el-button type="danger" class="mr10" @click="batchDel">批量删除</el-button>
      <div class="list-header-item">
        <span class="label">分类名称</span>
        <el-input v-model="page.typeName" class="w200 content" placeholder="请输入分类名称" />
      </div>
      <el-button type="primary" class="mr8" @click="getList">搜索</el-button>
      <el-button type="warning" @click="clear">清空</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border @selection-change="changeSelection">
      <el-table-column type="selection" align="center" width="50" />
      <el-table-column type="index" label="编号" align="center" width="80" />
      <el-table-column label="用户名称" min-width="180" align="center" prop="userName" />
      <el-table-column label="用户手机号码" min-width="180" align="center" prop="phone" />
      <el-table-column label="组织" min-width="180" align="center" prop="applyOrgId">
        <template slot-scope="scope">
          {{ getOrgName(scope.row.applyOrgId) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status * 1 === 1" size="mini" type="success" disabled>已通过</el-button>
          <el-popconfirm
            v-else-if="scope.row.status * 1 === 0"
            title="确定通过审核？"
            @onConfirm="updateStatus(scope.row.id, '1')"
          >
            <el-button slot="reference" type="warning" size="mini">待审核</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">查看</el-button>
          <el-popconfirm title="确定删除该成员吗？" @onConfirm="handleDel(scope.row.id)">
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
    <SuperForm v-model="value" :fields="fields" :model="model" :footer="footer" :title="title" @submit="handleSubmit" />
  </el-card>
</template>

<script>
import {
  standardizationStepOne,
  standardizationList,
  saveStandardization,
  checkStandardization,
  deleteStandardization
} from '@/api/work'
import {
  queryOrg
} from '@/api/permission'
import SuperForm from '@/components/custom-form/superForm/SuperForm'

export default {
  name: 'RecruitingPartyMembersList',
  components: { SuperForm },
  data() {
    return {
      tableData: [],
      regionalList: [],
      fields: [],
      value: {},
      model: {},
      title: '',
      footer: true,
      page: {
        current: 1,
        limit: 10,
        total: 0,
        typeName: '',
        selections: []
      }
    }
  },
  mounted() {
    this.getList()
    this.getRegionalList()
  },
  methods: {
    getOrgName(value) {
      const index = this.regionalList.findIndex(item => item.value === value)
      return index !== -1 && this.regionalList[index].label ? this.regionalList[index].label : ''
    },
    getRegionalList() {
      const _this = this
      const data = { pageNum: 1, pageSize: 9999 }
      queryOrg(data).then(res => {
        if (res.code === 0) {
          res.data.forEach(item => {
            _this.regionalList.push({ label: item.orgName, value: item.id })
          })
        } else {
          _this.$message.error(res.msg)
        }
      })
    },
    add() {
      this.footer = true
      this.model = {}
      standardizationStepOne({}).then(res => {
        if (res.code === 0) {
          const customForm = res.data[0].partyCustomForm.customForm
          this.fields = JSON.parse(customForm)
          this.fields.unshift({
            label: '组织',
            prop: 'applyOrgId',
            props: {
              placeholder: '请选择组织'
            },
            options: this.regionalList,
            rules: [
              {
                message: '请选择组织',
                required: true,
                trigger: 'change'
              }
            ],
            type: 'select'
          })
          this.fields.unshift({
            label: '手机号码',
            prop: 'phone',
            props: {
              placeholder: '请输入手机号码'
            },
            rules: [
              {
                message: '请输入手机号码',
                required: true
              }
            ],
            type: 'input'
          })
          this.fields.unshift({
            label: '用户名',
            prop: 'userName',
            props: {
              placeholder: '请输入用户名'
            },
            rules: [
              {
                message: '请输入用户名',
                required: true,
                trigger: 'blur'
              }
            ],
            type: 'input'
          })
          this.title = '新增' + res.data[0].stepName
          this.value = { time: new Date() }
        }
      })
    },
    edit(id) {
      this.footer = false
      this.$router.push({ path: '/work/recruiting-party-members-process-list', query: { id }})
    },
    handleSubmit(form) {
      const data = {}
      data.status = '0'
      data.userName = form.model.userName
      data.phone = form.model.phone
      data.applyOrgId = form.model.applyOrgId
      data.orgName = this.getOrgName(data.applyOrgId)
      data.partyStandardizationFlow = {}
      const fields = form.fields
      for (const a in form.model) {
        if (form.model.hasOwnProperty(a)) {
          if (typeof form.model[a] === 'string') {
            form.model[a] = form.model[a].replace(/\r\n/g, '<br>').replace(/\n/g, '<br/>')
          }
        }
      }
      fields.forEach(item => {
        item.props.value = form.model[item.prop]
      })
      data.partyStandardizationFlow.customForm = JSON.stringify(fields)
      saveStandardization(data).then(res => {
        if (res.code === 0) {
          this.$message.success('添加成功')
          this.value = {}
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleDel(id) {
      deleteStandardization(id).then(res => {
        if (res.code * 1 === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeSelection(e) {
      this.page.selections = []
      e.forEach(item => {
        this.page.selections.push(item.id)
      })
    },
    batchDel() {
      this.$confirm('确认删除选中的用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteStandardization(this.page.selections).then(res => {
          if (res.code * 1 === 0) {
            this.getList()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {})
    },
    updateStatus(id, status) {
      const data = { id, status }
      checkStandardization(data).then(res => {
        if (res.code === 0) {
          this.$message.success('修改成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getList() {
      const { current: pageNum, limit: pageSize } = this.page
      standardizationList({ pageNum, pageSize }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    clear() {
      this.page.typeName = ''
      this.getList()
    },
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList()
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList()
    }
  }
}
</script>

<style scoped>
</style>
