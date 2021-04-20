<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>数说党建</span>
    </div>
    <div class="list-header">
      <div class="list-header-item">
        <span class="label">月份</span>
        <el-date-picker
          v-model="month"
          value-format="yyyy-M"
          type="month"
          placeholder="选择年"
          @change="monthChange"
        />
        <span class="label">组织名称</span>
        <el-input v-model="page.orgIds" style="width: 250px" placeholder="请输入组织名称" />
      </div>
      <el-button type="primary" class="mr8" @click="getList()">搜索</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column label="党组织名称" min-width="180" align="center" prop="typeName" />
      <el-table-column label="会议得分" min-width="180" align="center" prop="typeName" />
      <el-table-column label="活动得分" min-width="180" align="center" prop="typeName" />
      <el-table-column label="学习得分" min-width="180" align="center" prop="typeName" />
      <el-table-column label="考试得分" min-width="180" align="center" prop="typeName" />
      <el-table-column label="总分" min-width="180" align="center" prop="typeName" />
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
export default {
  name: 'PartybuildStatisticList',
  data() {
    return {
      tableData: [],
      item: {
        refresh: false,
        id: ''
      },
      month: '',
      page: {
        current: 1,
        limit: 10,
        total: 0,
        orgIds: '',
        beginTime: '',
        endTime: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    monthChange(val) {
      if (!val) {
        this.page.beginTime = ''
        this.page.endTime = ''
        return false
      }
      const curMonth = val.split('-')[1]
      const curYear = val.split('-')[0]
      let nextMonth = curMonth * 1 + 1
      let nextYear = curYear
      if (nextMonth >= 13) {
        nextMonth = 1
        nextYear = curYear * 1 + 1
      }
      this.page.beginTime = this.$moment(val).unix()
      this.page.endTime = this.$moment(nextYear + '-' + nextMonth).unix()
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
      const queryParams = { pageNum, pageSize }
      console.log(queryParams)
      console.log(this.page)
    },
    clear() {

    }
  }
}
</script>

<style scoped>

</style>
