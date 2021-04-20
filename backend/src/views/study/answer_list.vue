<template>
  <el-dialog
    title="查看统计"
    :visible.sync="answerListFlag"
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
        <!--        <div class="list-header-item">-->
        <!--          <span class="label">考试人名称</span>-->
        <!--          <el-input v-model="page.title" class="w200 content" placeholder="请输入课程名称"/>-->
        <!--        </div>-->
        <el-button type="primary" class="mr8" @click="getList()">搜索</el-button>
        <el-button type="warning" @click="clear">清空</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" row-key="id" border>
        <el-table-column type="index" label="编号" align="center" width="50" />
        <el-table-column label="参考人" min-width="180" align="center" prop="userName" />
        <el-table-column label="名称" min-width="180" align="center" prop="title" />
        <el-table-column label="分数" min-width="180" align="center" prop="score" />
        <el-table-column label="是否合格" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.score > answerItem.param.qualifiedScore ? '合格' : '不合格' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.createTime * 1000).format('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="280">
          <template slot-scope="scope">
            <el-popconfirm
              v-if="scope.row.score<answerItem.param.qualifiedScore"
              title="确定发送提醒吗？"
              @onConfirm="sendPersonalMessage(scope.row.userId)"
            >
              <el-button slot="reference" type="warning" size="mini">发送提醒</el-button>
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
  </el-dialog>

</template>

<script>
import { getAnswerList, personalMessage } from '@/api/study'
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
      answerListFlag: false,
      page: {
        current: 1,
        limit: 10,
        total: 0,
        title: '',
        studyTypeId: ''
      },
      answerItem: {
        id: '',
        param: {}
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.answerItem = jsonAssgin(this.answerItem, val)
        this.page.testPaperId = this.answerItem.param.id
        delete this.answerItem.param.moldJson
        this.getList()
        this.answerListFlag = true
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
    sendPersonalMessage(userId) {
      personalMessage({ userId }).then(res => {
        if (res.code * 1 === 0) {
          this.$message.success('发送成功')
        }
      })
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
      const { current: pageNum, limit: pageSize } = this.page
      getAnswerList({ pageNum, pageSize }, { testPaperId: this.page.testPaperId }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.answerList
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
