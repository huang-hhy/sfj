<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>分组管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="addRole">新增分组</el-button>
      <div class="list-header-item">
        <span class="label">分组名称</span>
        <el-input v-model="page.key" class="w200 content" placeholder="请输入内容" @change="getList" />
      </div>
      <el-button type="primary" class="mr10" @click="getList">搜索</el-button>
    </div>

    <el-table :data="tableData" border>
      <el-table-column align="center" width="100" type="index" label="序号" />
      <el-table-column label="分组名称" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="150">
        <template slot-scope="scope">
          {{ $moment(scope.row.createTime * 1000 ).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-popconfirm
            v-if="scope.row.status *1 === 0"
            title="确定停用该分组吗？"
            @onConfirm="updateRoleStatus(scope.row.id, 1)"
          >
            <el-button slot="reference" type="success" :disabled="scope.row.id === '1'" size="mini">正常</el-button>
          </el-popconfirm>
          <el-popconfirm
            v-else
            title="确定启用该分组吗？"
            @onConfirm="updateRoleStatus(scope.row.id, 0)"
          >
            <el-button slot="reference" type="warning" :disabled="scope.row.id === '1'" size="mini">停用</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" :disabled="scope.row.id === '1'" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="warning" size="mini" :disabled="scope.row.id === '1'" @click="editAccess(scope.row.id)">数据权限</el-button>
          <el-popconfirm
            title="确定删除该分组吗？"
            @onConfirm="del(scope.row.id)"
          >
            <el-button slot="reference" type="danger" :disabled="scope.row.id === '1'" size="mini">删除</el-button>
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
    <RoleForm v-model="role" :role-list="roleList" @doSubmit="doSubmit" />
    <DataAccessForm v-model="dataAccessItem" :org-list="orgTree" @doSubmit="doDataScopeSubmit" />
  </el-card>
</template>

<script>
import {
  getRole,
  getRoleList,
  getAuthTree,
  saveRole,
  updateRole,
  deleteRole,
  queryOrgTree,
  getDataScope,
  updateDataScope
} from '@/api/permission'
import RoleForm from './form/role_form'
import DataAccessForm from './form/data_access_form'

export default {
  components: {
    RoleForm,
    DataAccessForm
  },
  data() {
    return {
      tableData: [],
      page: {
        current: 1,
        limit: 10,
        total: 0,
        key: ''
      },
      roleList: [],
      orgTree: [],
      role: {
        refresh: false,
        id: ''
      },
      dataAccessItem: {
        refresh: false,
        id: ''
      }
    }
  },
  created() {
    this.getList()
    this.getRoleList()
    this.getOrgTree()
  },
  methods: {
    addRole() {
      this.role = {
        refresh: !this.role.refresh,
        id: '',
        roleName: '',
        menuIds: [],
        roleKey: '',
        remark: '',
        sort: 1
      }
    },
    edit(id) {
      getRole(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.role.refresh
          this.role = data
        }
      })
    },
    editAccess(id) {
      getDataScope(id).then(res => {
        if (res.code === 0) {
          this.dataAccessItem = res.data
        }
      })
    },
    del(id) {
      deleteRole(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        }
      })
    },
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList()
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList()
    },
    getRoleList() {
      getAuthTree({ pageNum: 1, pageSize: 9999 }, {}).then(res => {
        if (res.code === 0) {
          this.roleList = JSON.parse(JSON.stringify(res.data))
        }
      })
    },
    getOrgTree() {
      const data = { pageNum: 1, pageSize: 9999 }
      queryOrgTree(data).then(res => {
        if (res.code === 0) {
          this.orgTree = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doDataScopeSubmit(data) {
      updateDataScope(data).then(res => {
        if (res.code === 0) {
          this.$message.success('编辑成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doSubmit(data) {
      if (data.id) {
        updateRole(data).then(res => {
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
        saveRole(data).then(res => {
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
      const { current: pageNum, limit: pageSize, key: roleName } = this.page
      getRoleList({ pageNum, pageSize }, { roleName }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    updateRoleStatus(id, status) {
      updateRole({ id, status }).then(res => {
        if (res.code === 0) {
          this.$message.success(status === 1 ? '启用成功' : '停用成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    font-size: 22px;
    font-weight: bold;
  }
  .el-button+.el-button {
    margin-left: 0;
  }
</style>
