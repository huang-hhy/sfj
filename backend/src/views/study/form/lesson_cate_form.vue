<template>
  <el-dialog
    :title="formData.id ? '编辑 - 课程分类' : '新增 - 课程分类'"
    :visible.sync="dialogFormVisible"
    width="40%"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="15vh"
  >
    <el-form ref="lesson_cate_form" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="分类名称" prop="typeName">
        <el-input v-model="formData.typeName" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('lesson_cate_form')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('lesson_cate_form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'
export default {
  name: 'LessonCaseForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      headers: { Authorization: getToken() },
      formData: {
        id: '',
        typeName: ''
      },
      rules: {
        typeName: { required: true, message: '请输入分类名称', trigger: 'blur' }
      },
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = jsonAssgin(this.formData, val)
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    cancelSubmit(name) {
      this.dialogFormVisible = false
      this.$refs[name].resetFields()
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          this.$emit('doSubmit', data)
          this.dialogFormVisible = false
          this.$refs[name].resetFields()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
