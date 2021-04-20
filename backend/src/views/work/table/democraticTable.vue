<template>
  <el-dialog
    title="民主评议结果"
    :visible.sync="democraticFlag"
    width="80%"
    :close-on-click-modal="false"
    :show-close="true"
    top="10vh"
  >
    <el-card class="box-card">
      <div slot="header" class="title">
        <span>参与评选有效次数：{{ page.total }}</span>
      </div>
      <div class="list-content">
        <el-table :data="tableData" border>
          <el-table-column align="center" label="姓名">
            <template slot-scope="scope">{{ scope.row.userName }}</template>
          </el-table-column>
          <el-table-column align="center" label="优秀" width="200">
            <template slot-scope="scope">{{ scope.row['0'] ? scope.row['0'] : 0 }}</template>
          </el-table-column>
          <el-table-column align="center" label="合格" width="200">
            <template slot-scope="scope">{{ scope.row['1'] ? scope.row['1'] : 0 }}</template>
          </el-table-column>
          <el-table-column align="center" label="不合格" width="200">
            <template slot-scope="scope">{{ scope.row['2'] ? scope.row['2'] : 0 }}</template>
          </el-table-column>
          <el-table-column align="center" label="不合格原因" width="200">
            <template slot-scope="scope"><p>{{ scope.row.reasonList ? scope.row.reasonList.join(',') : '' }}</p></template>
          </el-table-column>
        </el-table>
      </div>
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
  </el-dialog>
</template>

<script>
import { getDemocraticTable } from '@/api/work'

export default {
  name: 'DemocraticTable',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      tableData: [],
      democraticFlag: false,
      page: {
        current: 1,
        limit: 10,
        total: 0
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.democraticItem = val
        this.democraticFlag = true
        this.getList(val.id)
      },
      deep: true
    }
  },
  mounted() {
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
    getList(id) {
      const { current: pageNum, limit: pageSize } = this.page
      getDemocraticTable({ democraticAppraisalId: id, pageNum, pageSize }).then(res => {
        if (res.code * 1 === 0) {
          this.page.total = res.data[res.data.length - 1].total
          const arr = res.data
          arr.pop()
          this.tableData = arr
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .limit_rows {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .list-content {
    display: flex;

    .org_list {
      margin-right: 10px;
      min-width: 200px;
      max-width: 200px;
      border: 1px solid #dddddd;
    }
  }
</style>
