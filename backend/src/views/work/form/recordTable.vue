<template>
  <el-dialog
    title="查看统计"
    :visible.sync="recordFlag"
    width="90%"
    :close-on-click-modal="false"
    :show-close="true"
    top="10vh"
  >
    <el-card class="box-card">
      <div class="list-header">
        <!--        <div class="list-header-item">-->
        <!--          <span class="label">合格/不合格</span>-->
        <!--          <el-select v-model="page.studyTypeId" placeholder="合格/不合格" class="w200 content" @change="getList">-->
        <!--            <el-option label="全部" value=""/>-->
        <!--            <el-option label="合格" value="0"/>-->
        <!--            <el-option label="不合格" value="1"/>-->
        <!--          </el-select>-->
        <!--        </div>-->
        <div class="list-header-item">
          <span class="label">用户名称</span>
          <el-input v-model="page.userName" class="w200 content" placeholder="请输入用户名称" />
          <span class="label">月份</span>
          <el-date-picker
            v-model="page.cardMonth"
            class="w150 content"
            type="month"
            value-format="yyyy-M"
            placeholder="选择月"
          />
        </div>
        <el-button type="primary" class="mr8" @click="getList()">搜索</el-button>
        <el-button type="warning" @click="clear">重置</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" row-key="id" border>
        <el-table-column type="index" label="编号" align="center" width="50" />
        <el-table-column label="用户名称" min-width="180" align="center" prop="userName" />
        <el-table-column label="年份" min-width="180" align="center" prop="cardYear" />
        <el-table-column label="月份" min-width="180" align="center" prop="cardMonth" />
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
import { getGreetingCardsLogList } from '@/api/work'
import { jsonAssgin } from '@/utils/tools'

export default {
  name: 'RecordTable',
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
      recordFlag: false,
      page: {
        current: 1,
        limit: 10,
        total: 0,
        id: '',
        cardYear: '',
        cardMonth: '',
        userName: ''
      },
      recordItem: {
        id: ''
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.recordItem = jsonAssgin(this.recordItem, val)
        this.page.id = this.recordItem.id
        this.getList()
        this.recordFlag = true
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    add() {

    },
    edit(id) {

    },
    doSubmit(data) {

    },
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList()
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList()
    },
    getType() {

    },
    getList() {
      const { current: pageNum, limit: pageSize, userName } = this.page
      var cardMonth = this.page.cardMonth
      if (cardMonth) {
        cardMonth = cardMonth.split('-')[1] * 1
      } else {
        cardMonth = ''
      }
      getGreetingCardsLogList({
        pageNum,
        pageSize,
        userName,
        cardId: this.recordItem.id,
        cardMonth: cardMonth
      }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    clear() {
      this.page = {
        current: 1,
        limit: 10,
        total: 0,
        id: '',
        cardYear: '',
        cardMonth: '',
        userName: ''
      }
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
