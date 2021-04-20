<template>
  <div>
    <el-dialog
      :title="(formData.id ? (formData.paperTypeId === '1' ? '编辑试卷' : '编辑问卷') : (formData.paperTypeId === '1' ? '添加试卷' : '添加问卷'))"
      :visible.sync="dialogFormVisible"
      label-width="120px"
      :close-on-click-modal="false"
      :show-close="false"
      top="8vh"
    >
      <el-form ref="exam_manage" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="试题名称" prop="title">
          <el-input v-model="formData.title" placeholder="请输入试题名称" />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="formData.startTime"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="09:00:00"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="formData.endTime"
            type="datetime"
            placeholder="选择结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="09:00:00"
          />
        </el-form-item>
        <el-form-item label="党组织">
          <el-cascader
            v-model="formData.pbOrgId"
            :options="orgTree"
            :props="cascaderProps"
            :show-all-levels="false"
            style="width: 100%"

          />
        </el-form-item>
        <el-form-item label="党内职务">
          <el-select v-model="formData.pbRoleId" placeholder="请选择党内职务" multiple>
            <el-option
              v-for="item in roleData"
              
              :label="item.userTypeName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="formData.paperTypeId" disabled placeholder="请选择类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="formData.paperTypeId*1!==2&&formData.paperTypeId" label="考试时长" prop="duration">
          <!--          <el-input-number v-model="formData.duration" :min="1" />-->
          <el-radio-group v-model="formData.duration">
            <el-radio :label="0.5">30分钟</el-radio>
            <el-radio :label="1">60分钟</el-radio>
            <el-radio :label="1.5">90分钟</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="formData.paperTypeId*1!==2" label="达标分数">
          <el-input-number v-model="formData.qualifiedScore" :min="1" />
        </el-form-item>
        <el-form-item v-if="formData.paperTypeId*1!==2" label="重考次数">
          <el-input-number v-model="formData.repeatNum" :min="1" />
        </el-form-item>
        <el-form-item label="生成方式" prop="paperCreate">
          <el-radio v-model="paperCreate" label="1">随机生成</el-radio>
          <el-radio v-model="paperCreate" label="2">自定义生成</el-radio>
        </el-form-item>
        <el-form-item label="标签" prop="questionClassificationNames">
          <el-checkbox-group v-model="questionClassificationNames" size="small">
            <span v-for="(item,index) in questionClassificationNameList" :key="index" style="margin-right: 5px">
              <el-checkbox v-if="item" :label="item" border />
            </span>
          </el-checkbox-group>
        </el-form-item>
        <div v-show="paperCreate*1===1">
          <el-form-item label="题型" prop="mold">
            <el-checkbox-group v-model="formData.moldJson.mold">
              <el-checkbox
                v-for="item in moldOptions"
                :key="item.value"
                :label="item.value"
                @change="changeMold(item,$event)"
              >{{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
            <div v-for="(item2,index2) in formData.moldJson.list" :key="index2" class="list-item">
              <span class="label">{{ item2.name }}</span>
              <span class="label2">题数</span>
              <el-input-number v-model="item2.count" size="mini" :min="1" />
              <span v-if="formData.paperTypeId*1!==2" class="label2">分值</span>
              <el-input-number v-if="formData.paperTypeId*1!==2" v-model="item2.score" size="mini" :min="1" />
            </div>
          </el-form-item>
          <el-form-item label="生成试卷">
            <el-button type="warning" size="small" :disabled="isGenerate" @click="randomQuestion">随机生成</el-button>
          </el-form-item>
        </div>
        <template v-if="paperCreate*1===2">
          <el-form-item label="生成试卷">
            <el-button type="success" size="small" :disabled="isGenerate" @click="customQuestion">自定义生成</el-button>
          </el-form-item>
        </template>
        <el-form-item v-if="formData.paperTypeId*1!==2" label="试卷总分">
          <el-input-number v-model="total" disabled />
        </el-form-item>

        <el-table :data="test" border>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item v-for="(item,index) in props.row.moldJson" :key="index">
                  <div class="test">
                    <p class="subject">{{ (index + 1) + "、" + item.questionTitle }}</p>
                    <div v-if="item.options" class="option">
                      <p v-for="(item2,index2) in item.options" :key="index2">{{ item2.opt + "：" + item2.content }}</p>
                    </div>
                    <p class="answer">
                      <span class="name">答案：</span>
                      <span>{{ item.answer }}</span>
                    </p>
                    <p class="analysis">
                      <span class="name">解析：</span>
                      <span>{{ item.analysis }}</span>
                    </p>
                  </div>
                  <p />
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column align="center" width="50" type="index" label="序号" />
          <el-table-column align="center" label="题型">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column v-if="formData.paperTypeId*1 === 1" align="center" label="分值">
            <template slot-scope="scope">{{ scope.row.score }}</template>
          </el-table-column>
          <el-table-column align="center" label="题数">
            <template slot-scope="scope">{{ scope.row.count }}</template>
          </el-table-column>
          <el-table-column v-if="formData.paperTypeId*1 === 1" align="center" label="小计">
            <template slot-scope="scope">{{ scope.row.total }}</template>
          </el-table-column>
        </el-table>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit('exam_manage')">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('exam_manage')">确 定</el-button>
      </div>
    </el-dialog>
    <customQuestion
      v-model="customItem"
      :mold-json="formData.moldJson.list"
      @getCustomData="getCustomData"
    />

  </div>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getExamRandomQuestion, getBankList, getQuestionClassification } from '@/api/study'
import customQuestion from './custom_question'

export default {
  name: 'ExamManageForm',
  components: {
    customQuestion
  },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    moldOptions: {
      type: Array,
      default: () => []
    },
    typeOptions: {
      type: Array,
      default: () => []
    },
    orgTree: {
      type: Array,
      default: () => []
    },
    roleData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      moldJson: [],
      test: [],
      type: '',
      mold: '',
      questionClassificationNameList: [],
      questionClassificationNames: [],
      formData: {
        id: '',
        title: '',
        pbOrgId: '',
        pbRoleId: '',
        paperTypeId: '',
        totalScore: '',
        qualifiedScore: 0,
        repeatNum: 0,
        duration: 1,
        moldJson: {
          mold: [],
          list: [],
          test: []
        },
        startTime: '',
        endTime: '',
        paperQuestions: [
          {
            questionBankId: '',
            score: ''
          }
        ],
        status: ''
      },
      cascaderProps: {
        value: 'id',
        checkStrictly: true,
        multiple: true
      },
      rules: {
        title: [{ required: true, message: '请输入试卷名称', trigger: 'blur' }],
        duration: [{ required: true, message: '请选择考试时长', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      customFormVisible: false,
      customItem: {
        refresh: false
      },
      paperCreate: '1'
    }
  },
  computed: {
    total: {
      get() {
        const list = JSON.parse(JSON.stringify(this.formData.moldJson.list))
        const test = JSON.parse(JSON.stringify(this.formData.moldJson.test))
        let sum = 0
        if (list.length) {
          list.forEach(item => {
            sum += item.count * item.score
          })
        } else if (test.length) {
          test.forEach(item => {
            sum += item.count * item.score
          })
        }
        return sum
      },
      set() {
      }
    },
    isGenerate() {
      if (this.formData.title && this.formData.startTime && this.formData.endTime && this.formData.paperTypeId && this.formData.moldJson.mold) {
        if (this.formData.paperTypeId * 1 !== 2) {
          if (!this.formData.duration) {
            return true
          }
        }
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = JSON.parse(JSON.stringify(jsonAssgin(this.formData, val)))
        console.log(this.formData)
        this.test = val.moldJson && val.moldJson.test ? val.moldJson.test : []
        this.dialogFormVisible = true
        this.getQuestionClassificationName()
      },
      deep: true
    },
    total: {
      handler(val) {
        this.formData.totalScore = val
      },
      deep: true
    }
  },
  methods: {
    getQuestionClassificationName() {
      getQuestionClassification({}).then(res => {
        if (res.code * 1 === 0) {
          this.questionClassificationNameList = res.data
        }
      })
    },
    getMoldList(questionList) {
      this.moldJson = []
      const moldOptions = this.moldOptions
      questionList.forEach(item => {
        moldOptions.forEach(mold => {
          if (mold.value === item.mold) {
            if (!this.moldJson[item.mold]) {
              this.moldJson[item.mold] = []
            }
            this.moldJson[item.mold].push(item)
          }
        })
      })
    },
    randomQuestion() {
      try {
        this.test = []
        var tmpList = JSON.parse(JSON.stringify(this.formData.moldJson.list))
        var params = []
        for (const i in tmpList) {
          const tmp = {
            paperTypeId: this.formData.paperTypeId * 1,
            mold: tmpList[i].mold,
            size: tmpList[i].count,
            questionClassificationNameList: this.questionClassificationNames
          }
          params.push(tmp)
        }
        getExamRandomQuestion(params).then(res => {
          if (res.code * 1 === 0) {
            if (!res.data.length) {
              this.$message.error('题目不充足')
              return
            }
            this.getMoldList(res.data)
            const tmpList = JSON.parse(JSON.stringify(this.formData.moldJson.list))
            for (var i in tmpList) {
              if (this.moldJson[tmpList[i].mold].length < tmpList[i].count) {
                this.$message.error('题目不充足')
                break
              }
              const temp = {
                mold: tmpList[i].mold,
                name: tmpList[i].name,
                count: tmpList[i].count,
                score: tmpList[i].score,
                total: tmpList[i].count * tmpList[i].score,
                moldJson: this.getRandomList(this.moldJson[tmpList[i].mold], tmpList[i].count)
              }
              this.test.push(temp)
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      } catch (e) {
        throw e
      }
    },
    getRandomList(list, count) {
      let temp = 0
      const tempList = []
      const newList = []
      for (let i = 0; i < count; i++) {
        temp = Math.floor(Math.random() * list.length)
        if (tempList.indexOf(temp) === -1) {
          tempList.push(temp)
          newList.push(list[temp])
        } else {
          i--
        }
      }
      return newList
    },
    changeMold(data, e) {
      if (e === true) {
        this.formData.moldJson.list.push({ mold: data.value, name: data.label, count: '', score: '' })
      } else {
        if (this.formData.moldJson.list) {
          this.formData.moldJson.list.forEach((item, index) => {
            if (item.mold === data.value) {
              this.formData.moldJson.list.splice(index, 1)
            }
          })
        }
      }
    },
    cancelSubmit(name) {
      this.$refs[name].resetFields()
      this.dialogFormVisible = false
    },
    customQuestion() {
      getBankList({
        paperTypeId: this.formData.paperTypeId,
        questionClassificationNameList: this.questionClassificationNames
      }).then(res => {
        if (res.code * 1 === 0) {
          const data = res.data
          const obj = {
            single: [],
            multiple: [],
            shortAnswer: []
          }
          for (const key in data) {
            if (data[key].length > 0) {
              if (data[key][0].mold * 1 === 1) {
                obj.single = data[key]
              } else if (data[key][0].mold * 1 === 2) {
                obj.multiple = data[key]
              } else if (data[key][0].mold * 1 === 3) {
                obj.shortAnswer = data[key]
              }
            }
          }
          this.customItem = {
            question: obj,
            paperTypeId: this.formData.paperTypeId,
            refresh: !this.customItem.refresh
          }
        }
      })
    },
    getCustomData(obj) {
      this.$set(this, 'test', obj)
      if (this.paperCreate * 1 === 2) {
        this.formData.moldJson.list = []
        this.formData.moldJson.mold = []
      }
      this.formData.moldJson.test = obj
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          const test = JSON.parse(JSON.stringify(this.test))
          var paperQuestions = []
          for (var i in test) {
            const tmp = test[i].moldJson
            for (var j in tmp) {
              paperQuestions.push({
                questionBankId: tmp[j].id,
                score: test[i].score ? test[i].score : 0
              })
            }
          }
          data.paperQuestions = paperQuestions
          data.moldJson.test = test
          data.pbRoleId = data.pbRoleId.join(',')
          console.log(JSON.stringify(data.pbOrgId))
          if (typeof data.pbOrgId !== 'string' && data.pbOrgId.length) {
            const arr = []
            data.pbOrgId.forEach(item => {
              arr.push(item[item.length - 1])
            })
            data.pbOrgId = arr.join(',')
          }
          this.$emit('doSubmit', JSON.parse(JSON.stringify(data)))
          this.cancelSubmit(name)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.label {
  margin-right: 10px;
}

.label2 {
  margin-left: 10px;
}

.test {
  p {
    line-height: 18px;
  }

  .subject {
    font-weight: bold;
    line-height: 24px;
  }

  .answer {
    .name {
      color: #008000;
    }
  }

  .analysis {
    .name {
      color: #E6A23C;
    }
  }
}
</style>
