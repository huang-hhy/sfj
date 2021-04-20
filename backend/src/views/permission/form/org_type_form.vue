<template>
  <el-dialog
    :title="formData.id ? '编辑组织类型' : '新增组织类型'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="8vh"
  >
    <el-form ref="orgType" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="类型名称" prop="orgTypeName">
        <el-input v-model.trim="formData.orgTypeName" placeholder="类型名称" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.trim="formData.sort" type="number" placeholder="排序" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('orgType')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('orgType')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'

export default {
  name: 'OrgTypeForm',
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
        orgTypeName: '',
        sort: 1
      },
      rules: {
        orgTypeName: { required: true, message: '请输入类型名称', trigger: 'blur' }
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
