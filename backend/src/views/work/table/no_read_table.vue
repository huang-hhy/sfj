<template>
  <el-dialog
    title="当月未缴费记录"
    :visible.sync="dialogFlag"
    width="80%"
    :close-on-click-modal="false"
    :show-close="true"
    top="10vh"
  >
    <el-card class="box-card">
      <div class="list-content">
        <el-table :data="tableData" border>
          <el-table-column align="center" label="组织名">
            <template slot-scope="scope">{{ scope.row }}</template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="page-wrap">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          :page-size="page.limit"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div> -->
    </el-card>
  </el-dialog>
</template>

<script>
import { getPartyFeeNoReadOrg } from '@/api/work'

export default {
  name: 'NoReadTable',
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
      dialogFlag: false,
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
        this.dialogFlag = true
        this.getList()
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
    getList() {
      getPartyFeeNoReadOrg({}).then(res => {
        if (res.code * 1 === 0) {
          this.tableData = res.data
          this.page.total = res.data.length
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
