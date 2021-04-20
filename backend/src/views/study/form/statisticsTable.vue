<template>
  <el-dialog
    title="查看统计"
    :visible.sync="statisticsFlag"
    width="90%"
    :close-on-click-modal="false"
    :show-close="true"
    top="10vh"
  >
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" row-key="id" border>
        <el-table-column label="参与组织数" min-width="180" align="center" prop="orgTotal" />
        <el-table-column label="参与人员数" min-width="180" align="center" prop="peopleTotal" />
      </el-table>
      <div v-for="(v,k) in statisticResult" :key="k" class="question-box">
        <!--        <div>{{k+1}}.[{{v.name}}]</div>-->
        <div v-for="(item,index) in v.moldJson" :key="index">
          <div class="question-tit">{{ k + 1 }}.{{ item.questionTitle }} <span class="question-type">[{{
            v.name
          }}]</span></div>
          <template v-if="v.mold*1!==3">
            <div>
              <el-table :data="item.options" style="width: 100%" row-key="id" border>
                <el-table-column label="选项" min-width="180" align="center" prop="content">
                  <template slot-scope="scope">
                    <span>{{ scope.row.content }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="小计" min-width="180" align="center" prop="count" />
                <el-table-column label="占比" min-width="180" align="center" prop="proportion">
                  <template slot-scope="scope">
                    <el-progress :percentage="scope.row.proportion*100" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
          <template v-else>
            <div class="question-box">

              <el-button type="default" size="large" @click="openDetail(item)">查看详细信息</el-button>
            </div>

          </template>
        </div>

      </div>
    </el-card>
    <el-dialog
      title="查看统计"
      :visible.sync="detailFlag"
      width="90%"
      :show-close="true"
      :close-on-click-modal="false"
      append-to-body
    >
      <div class="list-header">
        <el-input v-model="page.keyword" style="width: 250px" placeholder="关键词" />
        <el-button type="success">搜索</el-button>
      </div>
      <el-table :data="detailData" style="width: 100%" row-key="id" border>
        <el-table-column label="序号" align="center" type="index" width="50" />
        <el-table-column label="答案文本" min-width="180" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row }}</p>
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
    </el-dialog>

  </el-dialog>

</template>

<script>
import { getAnswerStatistics, personalMessage } from '@/api/study'
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
      statisticsFlag: false,
      statisticResult: [],
      detailData: [],
      page: {
        id: '',
        keyword: '',
        total: 0,
        limit: 10
      },
      statisticsItem: {
        id: '',
        param: {}
      },
      detailFlag: false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.statisticsItem = jsonAssgin(this.statisticsItem, val)
        this.page.testPaperId = this.statisticsItem.param.id
        delete this.statisticsItem.param.moldJson
        this.getList()
        this.statisticsFlag = true
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    del(id) {
    },
    openDetail(obj) {
      this.detailFlag = true
      this.page = {
        id: '',
        keyword: '',
        total: 0,
        limit: 10
      }
      this.detailData = obj.answerList
      this.getDetail()
    },
    sendPersonalMessage(userId) {
      personalMessage({ userId }).then(res => {
        if (res.code * 1 === 0) {
          this.$message.success('发送成功')
        }
      })
    },
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getDetail()
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getDetail()
    },
    getList() {
      getAnswerStatistics({ id: this.page.testPaperId }, {}).then(res => {
        if (res.code === 0) {
          this.tableData = []
          this.tableData.push(res.data)
          this.statisticResult = res.data.statisticResult
        }
      })
    },
    getDetail() {
      console.log(this.page)
    },
    clear() {
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.question-box {
  margin: 15px 0;

  .question-tit {
    font-size: 16px;
  }

  .question-type {
    font-size: 14px;
    color: #666;
  }
}
</style>
