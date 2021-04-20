<template>
  <el-dialog
    title="修改用户密码"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="20vh"
  >
    <el-form ref="user" :model="user" :rules="rules" label-width="80px">
      <el-form-item label="密码" prop="password">
        <el-input
          v-model.trim="user.password"
          type="password"
          maxlength="16"
          placeholder="请输入由数字、字母组成的6-16位密码"
        />
      </el-form-item>
      <el-form-item label="再次密码" prop="password2">
        <el-input
          v-model="user.password2"
          type="password"
          maxlength="16"
          placeholder="请输入由数字、字母组成的6-16位密码"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('user')">取 消</el-button>
      <el-button v-if="value.action !== 'check'" type="primary" @click="handleSubmit('user')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  resetUserPwd
} from '@/api/permission'

export default {
  name: 'PassForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
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
      if (value === this.user.password) {
        callback()
      }
      return callback(new Error('密码输入不一致'))
    }
    return {
      dialogFormVisible: false,
      user: {
        id: '',
        password: '',
        password2: ''
      },
      rules: {
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        password2: [{ required: true, validator: validateSamePassword, trigger: 'blur' }]
      }
    }
  },
  watch: {
    value: {
      handler(n) {
        this.user.id = n.id
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
      const _this = this
      _this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(_this.user))
          delete data.password2
          resetUserPwd(data).then(res => {
            if (res.code === 0) {
              this.$message.success('保存成功')
              this.$emit('getList')
              this.cancelSubmit(name)
            } else {
              this.$message.error(res.msg)
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
