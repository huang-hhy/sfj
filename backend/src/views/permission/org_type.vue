<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>组织类型管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增类型</el-button>
    </div>

    <el-table :data="tableData" border>
      <el-table-column align="center" width="100" type="index" label="序号" />
      <el-table-column label="类型名称" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.orgTypeName }}
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
            title="确定停用该类型吗？"
            @onConfirm="updatePackStatus(scope.row.id, 1)"
          >
            <el-button slot="reference" type="success" size="mini">正常</el-button>
          </el-popconfirm>
          <el-popconfirm
            v-else
            title="确定启用该类型吗？"
            @onConfirm="updatePackStatus(scope.row.id, 0)"
          >
            <el-button slot="reference" type="warning" size="mini">停用</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
          <el-popconfirm
            title="确定删除该类型吗？"
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
    <OrgTypeForm v-model="item" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import {
  getOrgType,
  getOrgTypeList,
  saveOrgType,
  updateOrgType,
  deleteOrgType
} from '@/api/permission'
import OrgTypeForm from './form/org_type_form'

export default {
  components: {
    OrgTypeForm
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
      item: {
        refresh: false,
        id: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        userTypeName: ''
      }
    },
    edit(id) {
      getOrgType(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          this.item = data
        }
      })
    },
    del(id) {
      deleteOrgType(id).then(res => {
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
    doSubmit(data) {
      if (data.id) {
        updateOrgType(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveOrgType(data).then(res => {
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
      getOrgTypeList({ pageNum, pageSize }, {}).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    updatePackStatus(id, status) {
      updateOrgType({ id, status }).then(res => {
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
</style>
