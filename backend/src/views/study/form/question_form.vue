<template>
  <el-dialog
    :title="(formData.id ? '编辑问题' : '添加问题')"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="8vh"
  >
    <el-form ref="question_form" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="题目" prop="questionTitle">
        <el-input v-model="formData.questionTitle" type="text" placeholder="请输入题目内容" />
      </el-form-item>
      <el-form-item label="试卷类型" prop="paperTypeId">
        <el-select v-model="formData.paperTypeId" placeholder="请选择试卷类型">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="试题类型" prop="mold">
        <el-select v-model="formData.mold" placeholder="请选择试卷类型">
          <el-option
            v-for="item in moldOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="试题标签" prop="questionClassificationName">
        <el-input v-model="formData.questionClassificationName" type="text" placeholder="请输入题目内容" />
      </el-form-item>
      <div v-if="formData.mold *1 !==3 && formData.mold">
        <el-form-item
          v-for="(item, index) in formData.options"
          :key="index"
          :label="'选项' + idx[index]"
          :prop="'options.' + index + '.content'"
          :rules="{
            required: true, message: '选项'+idx[index]+'不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="item.content" :placeholder="'请输入选项的内容'" style="width: 270px" />
          <el-button type="danger" @click.prevent="removeOption(index)">X</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click.prevent="addOption()">添加</el-button>
        </el-form-item>
        <el-form-item v-if="formData.paperTypeId*1===1" label="正确答案">
          <el-radio-group v-if="formData.mold *1 ===1" v-model="formData.answer">
            <el-radio
              v-for="(item,index) in formData.options"
              :key="item.opt"
              :label="item.opt"
            >{{ idx[index] + ' . ' + item.content }}
            </el-radio>
          </el-radio-group>
          <el-checkbox-group v-if="formData.mold *1 ===2" v-model="formData.answerArray" @change="selectAnswer">
            <el-checkbox
              v-for="(item,index) in formData.options"
              :key="item.opt"
              :label="item.opt"
            >{{ idx[index] + ' . ' + item.content }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="答案解析">
          <el-input v-model="formData.analysis" type="textarea" placeholder="请输入答案解析" />
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('question_form')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('question_form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'

export default {
  name: 'QuestionForm',
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
    }
  },
  data() {
    return {
      idx: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'],
      formData: {
        id: '',
        questionTitle: '',
        answer: '',
        answerArray: [],
        analysis: '',
        paperTypeId: '',
        mold: '',
        questionClassificationName: '',
        options: [
          {
            opt: '',
            content: ''
          }
        ]
      },
      rules: {
        // questionTitle: [{ required: true, message: '请输入题目内容', trigger: 'blur' }],
        paperTypeId: [{ required: true, message: '请选择试卷类型', trigger: 'blur' }],
        mold: [{ required: true, message: '请选择试题类型', trigger: 'blur' }],
        answer: [{ required: true, message: '请选择正确答案', trigger: 'blur' }],
        options: [{ required: true, message: '请输入选项内容', trigger: 'blur' }],
        analysis: [{ required: true, message: '请输入答案解析', trigger: 'blur' }]
      },
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        console.log(val.answer)
        val.answerArray = val.mold === '2' ? val.answer.split(',') : []
        this.formData = jsonAssgin(this.formData, val)
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    selectAnswer(d) {
      this.formData.answer = d.join(',')
    },
    addOption() {
      var tmpArr = JSON.parse(JSON.stringify(this.formData.options))
      if (tmpArr.length >= 25) {
        this.$message.warning('最多只能添加26个选项')
        return false
      }
      const obj = {
        opt: '',
        content: ''
      }
      tmpArr.push(obj)
      this.formData.options = this.changeOpt(tmpArr)
    },
    changeOpt(arr) {
      arr.forEach((item, index) => {
        item.opt = this.idx[index]
      })
      return arr
    },
    removeOption(idx) {
      var tmpArr = JSON.parse(JSON.stringify(this.formData.options))
      tmpArr.splice(idx, 1)
      this.formData.options = this.changeOpt(tmpArr)
      if (this.formData.mold * 1 === 2) {
        var answerArray = JSON.parse(JSON.stringify(this.formData.answerArray))
        answerArray.splice(idx, 1)
        this.formData.answerArray = answerArray
        this.formData.answer = answerArray.join(',')
      }
    },
    cancelSubmit(name) {
      this.$refs[name].resetFields()
      this.dialogFormVisible = false
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          data.answerArray = data.answerArray.sort((f, s) => {
            return f > s ? 1 : -1
          })
          this.$emit('doSubmit', data)
          this.cancelSubmit(name)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
