<template>
  <el-dialog
    title="查看缴纳详情"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="600px"
  >
    <el-form
      ref="paymentForm"
      :model="list"
      :rules="paymentRules"
      label-width="100px"
      class="paymentForm"
    >
      <el-form-item label="缴纳人" prop="userName">
        <el-input v-model="list.userName" readonly />
      </el-form-item>
      <el-form-item label="所属组织" prop="orgName">
        <el-input v-model="list.orgName" readonly />
      </el-form-item>
      <el-form-item label="类别" prop="paymentChannels">
        <el-input v-model="list.paymentChannels" readonly />
      </el-form-item>
      <el-form-item label="应缴费用" prop="payableMoney">
        <el-input-number v-model="list.payableMoney" disabled />
      </el-form-item>
      <el-form-item label="实缴费用" prop="paidMoney">
        <el-input-number v-model="list.paidMoney" disabled />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="list.createTime"
          type="datetime"
          readonly
        />
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-date-picker
          v-model="list.updateTime"
          type="datetime"
          readonly
        />
      </el-form-item>
      <el-form-item v-if="list.status * 1 === 1" label="确认缴费时间" prop="payTime">
        <el-date-picker
          v-model="list.payTime"
          type="datetime"
          readonly
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="handleCancel('paymentForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "detail",
    props: {
      value: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        list: {},
        paymentRules: {},
        moment: moment
      }
    },
    watch: {
      value: {
        handler(val) {
          this.list = JSON.parse(JSON.stringify(val))
          this.list.paymentChannels = this.list.paymentChannels * 1 === 0 ? '系统录入' : this.list.paymentChannels
          this.list.createTime = this.moment(this.list.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.list.updateTime = this.moment(this.list.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.list.payTime = this.moment(this.list.payTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.dialogFormVisible = true
        },
        deep: true
      }
    },
    methods: {
      handleCancel(name) {
        this.dialogFormVisible = false
        this.$refs[name].resetFields()
      }
    }
  }
</script>

<style scoped lang="less">
  .paymentForm {
    max-height: 500px;
    overflow: auto;
  }

  .paymentForm::-webkit-scrollbar {
    width: 2px;
  }
</style>
