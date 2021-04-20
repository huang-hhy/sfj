<template>
  <el-dialog
    :title="formData.id ? '编辑职务' : '新增职务'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="15vh"
  >
    <el-form ref="userType" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="职务名称" prop="userTypeName">
        <el-input v-model.trim="formData.userTypeName" placeholder="职务名称" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.trim="formData.sort" type="number" placeholder="排序" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('userType')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('userType')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'

export default {
  name: 'UserTypeForm',
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
        userTypeName: '',
        sort: 1
      },
      rules: {
        userTypeName: { required: true, message: '请输入职务名称', trigger: 'blur' }
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
