<template>
  <el-dialog
    :title="formData.id ? '流出详情' : '新增流处'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="15vh"
  >
    <el-form ref="FloatingOutForm" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="流动时间" prop="flowTime">
        <el-date-picker
          v-model="formData.flowTime"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 100%;"
          :disabled="formData.id !==''"
        />
      </el-form-item>
      <el-form-item label="当前组织" prop="orgId">
        <el-select v-model="formData.orgId" placeholder="请选择" style="width: 100%;" :disabled="formData.id !==''" @change="getUsers">
          <el-option
            v-for="item in selectData"
            :key="item.id"
            :label="item.orgName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="流动人员" prop="userId">
        <el-select v-model="formData.userId" placeholder="请选择" style="width: 100%;" :disabled="formData.id !==''">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.userName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="流向组织" prop="outflowOrgName">
        <el-input v-model="formData.outflowOrgName" placeholder="请输入流向组织" :readonly="formData.id !==''" />
      </el-form-item>
      <el-form-item label="流动原因" prop="content">
        <el-input v-model="formData.content" type="textarea" :rows="2" placeholder="请输入流动原因" :readonly="formData.id !==''" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('FloatingOutForm')">取 消</el-button>
      <el-button v-if="!formData.id" type="primary" @click="handleSubmit('FloatingOutForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { queryOrg } from '@/api/permission'
import { getUsersByWhere } from '@/api/base'
import { encrypt, decrypt } from '@/utils/tools'

export default {
  name: 'FloatingOutForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      orgId: '',
      OrgIdsProps: {
        multiple: true,
        checkStrictly: true,
        children: 'children',
        label: 'label',
        value: 'id'
      },
      userList: [],
      formData: {
        id: '',
        orgId: '',
        orgName: '',
        currentOrgName: '',
        outflowOrgName: '',
        userId: '',
        flowTime: '',
        content: '',
        status: '',
        user: {
          userName: '',
          sex: '',
          phone: '',
          usersInfo: {
            nation: '',
            education: '',
            nativePlace: '',
            birthday: '',
            joinPartyTime: '',
            formalTime: '',
            imgUrl: '',
            isTw: ''
          }
        }
      },
      rules: {
        title: { required: true, message: '标题不能为空', trigger: 'blur' },
        content: { required: true, message: '内容不能为空', trigger: 'blur' }
      },
      selectData: [],
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        const tmp = jsonAssgin(this.formData, val)
        if (tmp.id) {
          this.formData.userId = tmp.user.id
        }
        tmp.flowTime = tmp.flowTime ? this.$moment(tmp.flowTime * 1000).format('YYYY-MM-DD HH:mm:ss') : ''
        // tmp.user.usersInfo.birthday = tmp.user.usersInfo.birthday ? this.$moment(tmp.user.usersInfo.birthday * 1000).format('YYYY-MM-DD HH:mm:ss') : ''
        // tmp.user.usersInfo.joinPartyTime = tmp.user.usersInfo.joinPartyTime ? this.$moment(tmp.user.usersInfo.joinPartyTime * 1000).format('YYYY-MM-DD HH:mm:ss') : ''
        tmp.user.usersInfo.formalTime = tmp.user.usersInfo.formalTime ? this.$moment(tmp.user.usersInfo.formalTime * 1000).format('YYYY-MM-DD HH:mm:ss') : ''
        tmp.user.userName = tmp.user.userName ? decrypt(tmp.user.userName) : ''
        tmp.user.phone = tmp.user.phone ? decrypt(tmp.user.phone) : ''
        this.formData = tmp
        this.getOrg()
        this.getUsers()
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    getOrg() {
      queryOrg({}).then(res => {
        if (res.code * 1 === 0) {
          this.selectData = res.data
        }
      })
    },
    getUsers() {
      getUsersByWhere({ orgId: this.formData.orgId }).then(res => {
        if (res.code * 1 === 0) {
          this.userList = res.data
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
          data.flowTime = data.flowTime ? this.$moment(data.flowTime).valueOf() / 1000 : ''
          // data.user.usersInfo.birthday = data.user.usersInfo.birthday ? this.$moment(data.user.usersInfo.birthday).valueOf() / 1000 : ''
          // data.user.usersInfo.joinPartyTime = data.user.usersInfo.joinPartyTime ? this.$moment(data.user.usersInfo.joinPartyTime).valueOf() / 1000 : ''
          data.user.usersInfo.formalTime = data.user.usersInfo.formalTime ? this.$moment(data.user.usersInfo.formalTime).valueOf() / 1000 : ''
          data.user.userName = data.user.userName ? encrypt(data.user.userName) : ''
          data.user.phone = data.user.phone ? encrypt(data.user.phone) : ''
          this.$emit('doSubmit', data)
          this.dialogFormVisible = false
          this.$refs[name].resetFields()
        }
      })
    }
  }
}
</script>

<style lang="less">
  .joins-box .joins {
    width: 100%;
    margin-bottom: 20px;
  }

  .joins-box .el-transfer-panel__item.el-checkbox {
    display: block !important;
  }
</style>
