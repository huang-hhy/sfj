<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>企业管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增企业</el-button>
      <div class="list-header-item">
        <span class="label">企业名称</span>
        <el-input v-model="page.name" class="w150 content" placeholder="请输入企业名称" @change="getList" />
      </div>
      <div class="list-header-item">
        <span class="label">状态</span>
        <el-select v-model="page.status" placeholder="请选状态" class="w100 content" @change="getList">
          <el-option label="全部" value="" />
          <el-option label="正常" value="0" />
          <el-option label="停用" value="1" />
        </el-select>
      </div>
      <el-button type="primary" class="mr10" @click="getList">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
    >
      <el-table-column
        type="index"
        label="编号"
        align="center"
        width="100"
      />
      <el-table-column
        prop="supplierName"
        label="企业名称"
        min-width="150"
      />
      <el-table-column
        prop="sldName"
        label="子域名"
        width="200"
        align="center"
      />
      <el-table-column
        prop="topName"
        label="顶级域名"
        width="200"
        align="center"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ $moment(scope.row.createTime * 1000).format('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-popconfirm
            v-if="scope.row.status *1 === 0 "
            title="确定停用该企业吗？"
            @onConfirm="updateSupplierStatus(scope.row.id, 1)"
          >
            <el-button slot="reference" type="success" :disabled="scope.row.id === '1'" size="mini">正常</el-button>
          </el-popconfirm>
          <el-popconfirm
            v-else
            title="确定启用该企业吗？"
            @onConfirm="updateSupplierStatus(scope.row.id, 0)"
          >
            <el-button slot="reference" type="warning" :disabled="scope.row.id === '1'" size="mini">停用</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="160"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">查看</el-button>
          <el-popconfirm
            title="确定删除该企业吗？"
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
    <SupplierForm v-model="item" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import {
  getSupplierList,
  getSupplier,
  saveSupplier,
  updateSupplier,
  deleteSupplier
} from '@/api/permission'
import SupplierForm from './form/supplier_form'
export default {
  name: 'SupplierManage',
  components: {
    SupplierForm
  },
  data() {
    return {
      item: {
        refresh: false,
        id: '',
        sldName: '',
        supplierName: '',
        englishSupplierName: '',
        bottomLogo: '',
        topLogo: '',
        topName: ''
      },
      tableData: [],
      page: {
        current: 1,
        limit: 10,
        total: 0,
        name: '',
        status: ''
      }
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
        supplierName: '',
        sldName: '',
        topName: '',
        createTime: ''
      }
    },
    edit(id) {
      getSupplier(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          this.item = data
        }
      })
    },
    updateSupplierStatus(id, status) {
      updateSupplier({ id, status }).then(res => {
        if (res.code === 0) {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    del(id) {
      deleteSupplier(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        }
      })
    },
    doSubmit(data) {
      if (data.id) {
        updateSupplier(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveSupplier(data).then(res => {
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
      // 获取列表信息
      const { current: pageNum, limit: pageSize, name: supplierName, status } = this.page
      getSupplierList({ pageNum, pageSize }, { supplierName, status }).then(res => {
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
  .title {
    font-size: 22px;
    font-weight: bold;
  }
</style>
