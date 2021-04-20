<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>组织管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增组织</el-button>
      <el-button type="warning" class="mr10" @click="importOrg()">导入组织</el-button>
      <el-button type="primary" class="mr10" @click="exportExcel()">导出组织</el-button>
    </div>
    <el-table
      :data="orgTree"
      style="width: 100%"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column
        prop="label"
        label="组织名称"
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
    <OrgForm v-model="org" :org-tree="orgTree" :org-type="orgType" @doSubmit="doSubmit" />
    <OrgImport v-model="selectedOrg" :import-type="importType" :org-tree="orgTree" :get-list="getList" />
  </el-card>
</template>

<script>
import OrgForm from './form/org_form'
import OrgImport from './form/org_import'
import { queryOrgTree, getOrg, saveOrg, updateOrg, deleteOrg, queryOrgType } from '@/api/permission'
import { exportOrg } from '@/api/base'

export default {
  name: 'OrgManage',
  components: {
    OrgForm,
    OrgImport
  },
  data() {
    return {
      tableData: [],
      importType: 0,
      page: {
        current: 1,
        limit: 10,
        total: 0,
        loginName: '',
        userName: '',
        roleId: '',
        status: ''
      },
      org: {
        refresh: false,
        id: ''
      },
      selectedOrg: {
        refresh: false,
        id: ''
      },
      orgTree: [],
      orgType: []
    }
  },
  mounted() {
    this.getList()
    this.getOrgType()
  },
  methods: {
    add() {
      this.org = {
        refresh: !this.org.refresh,
        id: '',
        parentId: '',
        orgName: '',
        address: '',
        orgTypeId: '',
        orgTypeName: '',
        children: [],
        lng: '',
        lat: '',
        sort: ''
      }
    },
    edit(id) {
      getOrg(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.org.refresh
          this.org = data
        }
      })
    },
    del(id) {
      deleteOrg(id).then(res => {
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
        updateOrg(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveOrg(data).then(res => {
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
      const data = { pageNum: 1, pageSize: 9999 }
      queryOrgTree(data).then(res => {
        if (res.code === 0) {
          this.orgTree = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getOrgType() {
      const data = { pageNum: 1, pageSize: 9999 }
      queryOrgType(data).then(res => {
        if (res.code === 0) {
          this.orgType = res.data.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    exportExcel() {
      exportOrg({}).then(res => {
        console.log(res)
        if (res.code === 0) {
          const url = this.$config.exportPath + '/profile/download/' + res.msg
          window.open(url)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    importOrg() {
      this.selectedOrg = {
        refresh: !this.org.refresh,
        id: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 22px;
  font-weight: bold;
}
</style>
