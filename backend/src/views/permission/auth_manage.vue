<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>权限管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增权限</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column
        prop="label"
        label="权限名称"
        min-width="180"
      />
      <el-table-column
        label="操作"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
          <el-popconfirm
            title="确定删除该权限吗？"
            @onConfirm="del(scope.row.id)"
          >
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <AuthForm v-model="auth" :options="tableData" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import AuthForm from './form/auth_form'
import {
  getAuthTree,
  deleteAuth,
  saveAuth,
  updateAuth,
  getAuth
} from '@/api/permission'

export default {
  name: 'AuthManage',
  components: { AuthForm },
  data() {
    return {
      tableData: [],
      auth: {
        refresh: false,
        id: '',
        parentId: '',
        menuName: '',
        sort: '',
        path: '',
        perms: '',
        menuType: ''
      },
      roleList: [],
      userAction: {
        refresh: false,
        id: '',
        action: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    add() {
      this.auth = {
        refresh: !this.auth.refresh,
        id: '',
        parentId: '',
        menuName: '',
        sort: 1,
        path: '',
        perms: '',
        menuType: ''
      }
    },
    edit(id) {
      getAuth(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.auth.refresh
          this.auth = data
        }
      })
    },
    del(id) {
      deleteAuth(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        }
      })
    },
    doSubmit(data) {
      if (data.id) {
        updateAuth(data).then(res => {
          if (res.code === 0) {
            if (res.code === 0) {
              this.$message.success('保存成功')
              this.getList()
            } else {
              this.$message.error(res.msg)
            }
          }
        })
      } else {
        saveAuth(data).then(res => {
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
      getAuthTree({ pageNum: 1, pageSize: 9999 }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
  .title {
    font-size: 22px;
    font-weight: bold;
  }
</style>
