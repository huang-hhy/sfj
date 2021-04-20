<template>
  <el-dialog
    title="答卷列表"
    :visible.sync="dialogFormVisible"
    :show-close="false"
    :close-on-click-modal="false"
    width="800px"
  >
    <div class="answerForm">
      <el-table
        :data="list"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align': 'center', 'background-color': '#f8f8f8'}"
        class="table"
      >
        <el-table-column label="试卷标题" prop="title" />
        <el-table-column label="试卷总分" prop="totalScore" />
        <el-table-column label="得分" prop="score" />
        <el-table-column label="考试结果">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.score < paper.qualifiedScore" type="warning">不及格</el-tag>
            <el-tag v-else type="success">达 标</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" min-width="120">
          <template slot-scope="scope">
            {{ moment(scope.row.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.score < paper.qualifiedScore" :disabled="scope.$index !== list.length - 1 || scope.$index === paper.repeatNum - 1" size="mini" type="success" @click="handleRecode(scope.row.testPaperId)">重考</el-button>
            <el-button size="mini" type="primary" @click="handleLook(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="cancel">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getAnswerList, getAnswer } from '@/api/pc'
  import moment from 'moment'
  import Vue from 'vue'
  import {encrypt} from "../../../../../libs/tools";

  export default {
    name: "answerForm",
    props: {
      value: {
        type: Object,
        default: () => {}
      },
      type: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        paper: {},
        list: [],
        moment: moment
      }
    },
    watch: {
      value: {
        handler(val) {
          const data = JSON.parse(JSON.stringify(val))
          Vue.delete(data, 'refresh')
          this.paper = data
          this.getList()
          this.dialogFormVisible = true
        },
        deep: true
      }
    },
    methods: {
      getList() {
        const data = {
          testPaperId: this.paper.id
        }
        getAnswerList({}, data).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data.list
            this.list.forEach(item => {
              getAnswer(item.id).then(res => {
                if (res.code * 1 === 0) {
                  let score = 0
                  let totalScore = 0
                  const temp = res.data.answerInfos
                  temp.forEach(i => {
                    if (i.mold * 1 === 1) {
                      totalScore = totalScore + this.paper.radio
                      if (i.isCorrect * 1 === 1) {
                        score = score + this.paper.radio
                      }
                    } else if (i.mold * 1 === 2) {
                      totalScore = totalScore + this.paper.checkBox
                      if (i.isCorrect * 1 === 1) {
                        score = score + this.paper.checkBox
                      }
                    }
                  })
                  Vue.set(item, 'score', score)
                  Vue.set(item, 'totalScore', totalScore)
                }
              })
            })
          }
        })
      },
      handleLook(id) {
        let params = {
          id: id,
          type: this.type
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: '/pc/profile/exam/answer',
          query: {
            params: params
          }
        })
      },
      handleRecode(id) {
        let params = {
          id: id,
          type: this.type,
          time: parseInt(new Date().getTime() / 1000)
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: '/pc/profile/exam/paper',
          query: {
            params: params
          }
        })
      },
      changeCurrent(current) {
        this.page.pageNum = current
        this.getList()
      },
      changeSize(limit) {
        this.page.pageSize = limit
        this.getList()
      },
      cancel() {
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped lang="less">
  .answerForm {
    max-height: 500px;
    overflow: auto;

    .table {
      margin-bottom: 30px;
    }

    .pagination {
      float: right;
    }
  }

  .answerForm::-webkit-scrollbar {
    width: 2px;
  }
</style>
