<template>
  <el-dialog
    title="修改密码"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="8vh"
  >
    <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model.trim="formData.oldPassword"
          type="password"
          placeholder="请输入旧密码"
        />
      </el-form-item>
      <el-form-item label="密码" prop="newPassword">
        <el-input
          v-model.trim="formData.newPassword"
          type="password"
          maxlength="16"
          placeholder="请输入由数字、字母组成的6-16位密码"
        />
      </el-form-item>
      <el-form-item label="再次密码" prop="newPassword2">
        <el-input
          v-model="formData.newPassword2"
          type="password"
          maxlength="16"
          placeholder="请输入由数字、字母组成的6-16位密码"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('formData')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('formData')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  changePassword
} from '@/api/user'
export default {
  name: 'PassForm',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validatePassword = function(rule, value, callback) {
      // 6-16位数字密码验证规则
      if (value) {
        const myreg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/)
        if (value.length >= 6 && value.length <= 16 && myreg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入由数字、字母组成的6-16位密码'))
        }
      } else {
        return callback(new Error('请输入由数字、字母组成的6-16位密码'))
      }
    }
    const validateSamePassword = (rule, value, callback) => {
      if (value === this.formData.newPassword) {
        callback()
      }
      return callback(new Error('密码输入不一致'))
    }
    return {
      dialogFormVisible: false,
      formData: {
        userId: this.$store.state.user.userId,
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      rules: {
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        newPassword2: [{ required: true, validator: validateSamePassword, trigger: 'blur' }]
      }
    }
  },
  watch: {
    value() {
      this.dialogFormVisible = true
    }
  },
  methods: {
    cancelSubmit(name) {
      this.$refs[name].resetFields()
      this.dialogFormVisible = false
    },
    handleSubmit(name) {
      const _this = this
      _this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(_this.formData))
          delete data.newPassword2
          changePassword(data).then(res => {
            if (res.code === 0) {
              _this.$message.success('保存成功')
              _this.$store.dispatch('user/logout').then(() => {
                _this.$router.push(`/login`)
              })
            } else {
              _this.$message.error(res.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
