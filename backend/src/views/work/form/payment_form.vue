<template>
  <el-dialog
    :title="formData.id ? '编辑 - 人员缴费信息' : '添加 - 人员缴费信息'"
    :visible.sync="dialogFormVisible"
    width="40%"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="15vh"
    append-to-body
  >
    <el-form ref="PaymentForm" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="选择人员" prop="userId">
        <el-select v-model="formData.userId" placeholder="请选择人员" :disabled="status === '1'">
          <el-option
            v-for="item in userList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="缴费状态" prop="userId">
        <el-select v-model="formData.status" placeholder="请选择缴费状态">
          <el-option
            v-for="item in payment"
            :label="item.label"
            :value="item.value"
          />

        </el-select>
      </el-form-item>

      <el-form-item label="缴费金额" prop="payableMoney">
        <el-input v-model="formData.payableMoney" type="number" placeholder="请输入缴费金额" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('PaymentForm')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('PaymentForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getUsersByWhere } from '@/api/base'

export default {
  name: 'PaymentForm',
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
        status:'',
        partyFeePayId: '',
        userId: '',
        payableMoney: '',
        payChannel: ''
      },
      payment:[{value:'0',label:'未缴费'},{value:'1',label:'已缴费'}],
      status: '0',
      userList: [],
      rules: {
        userId: { required: true, message: '缴纳人员不能为空', trigger: 'blur' },
        payChannel: { required: true, message: '支付通道不能为空', trigger: 'blur' },
        payableMoney: { required: true, message: '缴费金额不能为空', trigger: 'blur' }
      },
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.status = val.status ? val.status : '0'
        this.formData = jsonAssgin(this.formData, val)
        this.getUsers(val.orgId)
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    getUsers(orgId) {
      getUsersByWhere({ orgId }).then(res => {
        console.log(res)
        if (res.code * 1 === 0) {
          const tmpList = res.data
          const tmp = tmpList.reduce((res, current) => {
            res.push({
              value: current.id,
              label: current.userName
            })
            return res
          }, [])
          this.userList = JSON.parse(JSON.stringify(tmp))
          // console.log(this.userList)
        }
      })
    },
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
