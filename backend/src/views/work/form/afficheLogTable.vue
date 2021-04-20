<template>
  <el-dialog
    title="查看统计"
    :visible.sync="afficheLogFlag"
    width="90%"
    :close-on-click-modal="false"
    :show-close="true"
    top="10vh"
  >
    <el-card class="box-card">
      <div class="list-header" />
      <el-table :data="tableData" style="width: 100%" row-key="id" border>
        <el-table-column type="index" label="编号" align="center" width="50" />
        <el-table-column label="姓名" min-width="180" align="center" prop="userName" />
        <el-table-column label="是否已读" min-width="180" align="center" prop="title">
          <template>
            <span>已读</span>
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
  </el-dialog>

</template>

<script>
import { getAfficheLog } from '@/api/work'
import { jsonAssgin } from '@/utils/tools'

export default {
  name: 'AnswerList',
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
      afficheLogFlag: false,
      page: {
        current: 1,
        limit: 10,
        total: 0,
        title: '',
        studyTypeId: ''
      },
      afficheLogData: {
        id: '',
        param: {}
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.afficheLogData = jsonAssgin(this.afficheLogData, val)
        this.getList()
        this.afficheLogFlag = true
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
      const { current: pageNum, limit: pageSize } = this.page
      getAfficheLog({ pageNum, pageSize, afficheId: this.afficheLogData.id }).then(res => {
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
