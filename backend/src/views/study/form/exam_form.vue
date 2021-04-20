<template>
  <el-dialog
    :title="(exam.id ? '随机生成试卷' : '自定义试卷')"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="8vh"
  >
    <el-form ref="exam" :model="exam" :rules="rules" label-width="80px">
      <el-form-item label="试题类型"> {{ exam.type }} </el-form-item>
      <el-form-item v-for="(item,index) in exam.mold" :key="index" :label="item.name">
        {{ item.count }}道
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import data from './../json/exam.json'
export default {
  name: 'ExamForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      moldList: [],
      exam: {
        id: '',
        type: '在线考试',
        mold: []
      },
      rules: {
        name: [{ required: true, message: '请输入试卷名称', trigger: 'blur' }]
      },
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        console.log('--1--')
        this.exam = jsonAssgin(this.exam, val)
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  mounted() {
    this.getMoldList()
    console.log(this.exam.id)
    // if (this.exam.id === 1) {
    this.randomQuestion()
    // }
  },
  methods: {
    getMoldList() {
      const examList = data.examList
      const moldOptions = data.moldOptions
      examList.forEach(item => {
        if (item.type === this.exam.type) {
          moldOptions.forEach(mold => {
            if (mold.value === item.mold) {
              if (!this.moldList[item.mold]) {
                this.moldList[item.mold] = []
              }
              this.moldList[item.mold].push(item)
            }
          })
        }
      })
      console.log(this.moldList)
    },
    cancelSubmit() {
      this.dialogFormVisible = false
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.exam))
          this.$emit('doSubmit', data)
          this.dialogFormVisible = false
        }
      })
    },
    randomQuestion() {
      this.getRandomList(this.moldList['单选题'], 5)
    },
    getRandomList(list, count) {
      if (list.length < count) {
        console.log('题目不够')
      }
      // let temp = 0
      // const tempList = []
      // const newList = []
      // for (let i = 0; i < count; i++) {
      //   temp = Math.floor(Math.random() * list.length)
      //   console.log(temp)
      //   if (~tempList.indexOf(temp)) {
      //     tempList.push(temp)
      //     newList.push(list[temp])
      //   } else {
      //     i--
      //   }
      // }
      // console.log(newList)
      // return newList
    }
  }
}
</script>

<style scoped>

</style>
