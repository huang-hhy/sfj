<template>
  <el-dialog
    title="自定义生成"
    :visible.sync="customFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="10vh"
  >
    <el-form ref="customForm">
      <template v-if="customData.paperTypeId*1===1">
        <el-form-item label="单选题分数">
          <el-input-number v-model="singleScore" size="mini" :min="0" />
        </el-form-item>
        <el-form-item label="多选题分数">
          <el-input-number v-model="multipleScore" size="mini" :min="0" />
        </el-form-item>
      </template>
      <el-checkbox-group v-model="selectedQuestion">
        <el-collapse v-model="activeNames">
          <el-collapse-item :title="moldList[0].name" name="1">
            <div v-for="(item,index) in customData.question.single" :key="index" class="question">
              <el-checkbox
                :label="JSON.stringify(item)"
              >题目：{{ item.questionTitle }}
              </el-checkbox>
              <div v-for="(val,key) in item.options" :key="key" class="options">
                <p>{{ val.opt }}.{{ val.content }}</p>
              </div>
              <div class="analysis">分析：{{ item.analysis }}</div>
              <div v-if="customData.paperTypeId*1===1" class="answer">答案：{{ item.answer }}</div>
            </div>
          </el-collapse-item>
          <el-collapse-item :title="moldList[1].name" name="2">
            <div v-for="(item,index) in customData.question.multiple" :key="index" class="question">
              <el-checkbox
                :label="JSON.stringify(item)"
              >题目：{{ item.questionTitle }}
              </el-checkbox>
              <div v-for="(val,key) in item.options" :key="key" class="options">
                <p>{{ val.opt }}.{{ val.content }}</p>
              </div>
              <div class="analysis">分析：{{ item.analysis }}</div>
              <div v-if="customData.paperTypeId*1===1" class="answer">答案：{{ item.answer }}</div>
            </div>
          </el-collapse-item>
          <el-collapse-item v-if="customData.paperTypeId*1!==1" :title="moldList[2].name" name="3">
            <div v-for="(item,index) in customData.question.shortAnswer" :key="index">
              <el-checkbox
                :label="JSON.stringify(item)"
              >题目：{{ item.questionTitle }}
              </el-checkbox>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-checkbox-group>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit()">取 消</el-button>
      <el-button type="primary" @click="handleSubmit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'

export default {
  name: 'CustomQuestion',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      customData: {
        question: {},
        paperTypeId: ''
      },
      customFormVisible: false,
      activeNames: ['1'],
      selectedQuestion: [],
      moldType: [],
      moldList: [
        {
          mold: '1',
          moldJson: [],
          score: 0,
          total: 0,
          name: '单选题',
          count: 0
        },
        {
          mold: '2',
          moldJson: [],
          score: 0,
          total: 0,
          name: '多选题',
          count: 0
        },
        {
          mold: '3',
          moldJson: [],
          score: 0,
          total: 0,
          name: '简答题',
          count: 0
        }
      ],
      singleScore: 0,
      multipleScore: 0
    }
  },
  watch: {
    value: {
      handler(val) {
        this.customData = JSON.parse(JSON.stringify(jsonAssgin(this.customData, val)))
        this.customFormVisible = true
      },
      deep: true
    }
  },
  mounted() {
  },
  created() {
  },
  methods: {
    cancelSubmit() {
      this.customFormVisible = false
    },
    handleSubmit() {
      const selectedQuestion = JSON.parse(JSON.stringify(this.selectedQuestion))
      for (let i = 0; i < selectedQuestion.length; i++) {
        selectedQuestion[i] = JSON.parse(selectedQuestion[i])
      }
      const moldList = JSON.parse(JSON.stringify(this.moldList))
      const singleList = []
      const multipleList = []
      const shortAnswer = []
      selectedQuestion.forEach(item => {
        if (item.mold * 1 === 1) {
          singleList.push(item)
        } else if (item.mold * 1 === 2) {
          multipleList.push(item)
        } else if (item.mold * 1 === 3) {
          shortAnswer.push(item)
        }
      })

      moldList.forEach(item => {
        if (item.mold * 1 === 1) {
          item.moldJson = singleList
          item.count = singleList.length
          item.score = this.singleScore
          item.total = singleList.length ? this.singleScore * singleList.length : 0
        } else if (item.mold * 1 === 2) {
          item.moldJson = multipleList
          item.count = multipleList.length
          item.score = this.multipleScore
          item.total = multipleList.length ? this.multipleScore * multipleList.length : 0
        } else if (item.mold * 1 === 3) {
          item.count = shortAnswer.length
          item.moldJson = shortAnswer
          item.total = 0
        }
      })

      if (this.customData.paperTypeId * 1 === 1) {
        for (let i = 0; i < moldList.length; i++) {
          if (moldList[i].mold * 1 === 3) {
            moldList.splice(i, 1)
          }
        }
      }

      this.$refs['customForm'].resetFields()
      this.$emit('getCustomData', moldList)
      this.customFormVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-checkbox__label {
  text-overflow: ellipsis !important;
  white-space: normal !important;
  font-size: 16px !important;
  vertical-align: middle;
}

/deep/ .el-collapse-item__header {
  font-size: 16px;
}

.question {
  margin-bottom: 20px;
  color: #606266;
}

.options, .analysis, .answer, .score {
  margin: 0 25px;
  font-size: 15px;
}

.options p {
  line-height: 10px;
}
</style>
