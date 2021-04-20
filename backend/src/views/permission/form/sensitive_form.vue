<template>
  <el-dialog
    :title="formData.id ? '编辑敏感词' : '新增敏感词'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="20vh"
  >
    <el-form ref="sensitive" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="敏感词" prop="word">
        <el-input v-model.trim="formData.sensitiveThesaurusName" placeholder="敏感词" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('sensitive')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('sensitive')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'

export default {
  name: 'SensitiveForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      formData: {
        id: '',
        sensitiveThesaurusName: ''
      },
      rules: {
        sensitiveThesaurusName: { required: true, message: '请输入敏感词', trigger: 'blur' }
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
      this.$refs[name].resetFields()
      this.dialogFormVisible = false
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          this.$emit('doSubmit', data)
          this.cancelSubmit(name)
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-scrollbar {
    overflow-x: hidden;
    height: 400px;
  }
</style>
