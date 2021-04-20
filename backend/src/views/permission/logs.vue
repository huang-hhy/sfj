<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>操作日志</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="cleanOper">清除记录</el-button>
    </div>

    <el-table :data="tableData" border>
      <el-table-column align="center" width="100" type="index" label="序号" />
      <el-table-column label="操作模块" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="操作类型" min-width="180">
        <template slot-scope="scope">
          {{ businessType[scope.row.businessType] }}
        </template>
      </el-table-column>
      <el-table-column label="IP" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.operIp }}
        </template>
      </el-table-column>
      <el-table-column label="操作人" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.operName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-popconfirm
            title="确定删除该类型吗？"
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
  </el-card>
</template>

<script>
import {
  getOperlogList,
  cleanOperlog,
  deleteOperlog
} from '@/api/permission'

export default {
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
      },
      businessType: {
        0: '其它',
        1: '新增',
        2: '修改',
        3: '删除',
        4: '授权',
        5: '导出',
        6: '导入',
        7: '强退',
        8: '生成代码',
        9: '清空数据'
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    cleanOper() {
      this.$confirm('清除所有操作记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cleanOperlog().then(res => {
          if (res.code === 0) {
            this.$message.success('清除成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    del(id) {
      deleteOperlog(id).then(res => {
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
    getList() {
      const { current: pageNum, limit: pageSize } = this.page
      getOperlogList({ pageNum, pageSize }, {}).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
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
