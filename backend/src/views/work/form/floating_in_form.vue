<template>
  <el-dialog
    :title="(formData.id ? '流入详情' : '新增流入')"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="8vh"
  >
    <el-form ref="FloatingInForm" :model="formData" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="流动时间" prop="flowTime">
            <el-date-picker
              v-model="formData.flowTime"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              :disabled="formData.id !==''"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="当前组织" prop="currentOrgName">
            <el-input v-model="formData.currentOrgName" :readonly="formData.id !==''" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="流向组织" prop="orgId">
            <el-select v-model="formData.orgId" placeholder="请选择流向组织" style="width: 100%;" :disabled="formData.id !==''" @change="getOrgName">
              <el-option
                v-for="item in selectData"
                :key="item.id"
                :label="item.orgName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="流动原因" prop="content">
            <el-input v-model="formData.content" type="textarea" rows="2" :readonly="formData.id !==''" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="font-size: 16px;font-weight: 600;margin-bottom: 10px;">
          <span>基本信息</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="user.userName">
            <el-input v-model="formData.user.userName" :readonly="formData.id !==''" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="user.sex">
            <el-select v-model="formData.user.sex" placeholder="请选择性别" style="width: 100%;" :disabled="formData.id !==''">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="民族" prop="nation">
            <el-input v-model="formData.user.usersInfo.nation" :readonly="formData.id !==''" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="user.phone">
            <el-input v-model="formData.user.phone" :readonly="formData.id !==''" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="籍贯" prop="nativePlace">
            <el-input v-model="formData.user.usersInfo.nativePlace" :readonly="formData.id !==''" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="formData.user.usersInfo.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              :disabled="formData.id !==''"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学历" prop="education">
            <el-input v-model="formData.user.usersInfo.education" :readonly="formData.id !==''" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否台湾籍" prop="user.usersInfo.isTw">
            <el-select v-model="formData.user.usersInfo.isTw" placeholder="请选择性别" style="width: 100%;" :disabled="formData.id !==''">
              <el-option label="否" value="0" />
              <el-option label="是" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入党时间" prop="joinPartyTime">
            <el-date-picker
              v-model="formData.user.usersInfo.joinPartyTime"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              :disabled="formData.id !==''"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="转正时间" prop="formalTime">
            <el-date-picker
              v-model="formData.user.usersInfo.formalTime"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              :disabled="formData.id !==''"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="照片" prop="imgUrl">
            <el-upload
              class="logo-uploader"
              :action="$config.uploadPath"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
              :disabled="formData.id !==''"
            >
              <img v-if="formData.user.usersInfo.imgUrl" :src="$config.downloadPath + formData.user.usersInfo.imgUrl" class="logo">
              <i v-else class="el-icon-plus logo-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('FloatingInForm')">取 消</el-button>
      <el-button v-if="!formData.id" type="primary" @click="handleSubmit('FloatingInForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'
import { queryOrg } from '@/api/permission'
import { encrypt, decrypt } from '@/utils/tools'

const validateUserName = function(rule, value, callback) {
  if (value.length < 6 || value.length > 20) {
    return callback(new Error('请输入6-20位字符'))
  } else {
    callback()
  }
  // 账号验证规则
  // if (value % 1 === 0) {
  //   if (value.length < 6 || value.length > 20) {
  //     return callback(new Error('请输入6-20位数字的账号'))
  //   }
  //   callback()
  // } else {
  //   return callback(new Error('请输入数字'))
  // }
}
const validateMobile = function(rule, value, callback) {
  // 手机号验证规则
  if (value && value % 1 === 0) {
    const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    if (value.length === 11 && myreg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入有效手机号'))
    }
  } else {
    return callback(new Error('请输入数字'))
  }
}
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
export default {
  name: 'FloatingInForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    options: {
      type: Array,
      default: () => []
    },
    userType: {
      type: Array,
      default: () => []
    },
    roleList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    var validateSamePassword = (rule, value, callback) => {
      if (value === this.formData.password) {
        callback()
      }
      return callback(new Error('密码输入不一致'))
    }
    return {
      headers: { Authorization: getToken() },
      selectData: [],
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
        loginName: [{ required: true, validator: validateUserName, trigger: 'blur' }],
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        password2: [{ required: true, validator: validateSamePassword, trigger: 'blur' }],
        'flowTime': [{ required: true, message: '请选择流动时间', trigger: 'blur' }],
        'currentOrgName': [{ required: true, message: '请输入当前组织', trigger: 'blur' }],
        'user.phone': [{ required: true, validator: validateMobile, trigger: 'blur' }],
        'user.userName': [{ required: true, message: '请输入名称', trigger: 'blur' }],
        'user.sex': [{ required: true, message: '请选择性别', trigger: 'blur' }],
        orgId: [{ required: true, message: '请选择组织', trigger: 'change' }]
      },
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        const tmp = jsonAssgin(this.formData, val)
        tmp.flowTime = tmp.flowTime ? this.$moment(tmp.flowTime * 1000).format('YYYY-MM-DD HH:mm:ss') : ''
        // tmp.user.usersInfo.birthday = tmp.user.usersInfo.birthday ? this.$moment(tmp.user.usersInfo.birthday * 1000).format('YYYY-MM-DD HH:mm:ss') : ''
        // tmp.user.usersInfo.joinPartyTime = tmp.user.usersInfo.joinPartyTime ? this.$moment(tmp.user.usersInfo.joinPartyTime * 1000).format('YYYY-MM-DD HH:mm:ss') : ''
        tmp.user.usersInfo.formalTime = tmp.user.usersInfo.formalTime ? this.$moment(tmp.user.usersInfo.formalTime * 1000).format('YYYY-MM-DD HH:mm:ss') : ''
        tmp.user.userName = tmp.user.userName ? decrypt(tmp.user.userName) : ''
        tmp.user.phone = tmp.user.phone ? decrypt(tmp.user.phone) : ''
        this.formData = tmp
        this.getOrg()
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    handleSuccess(res) {
      if (res.code === 0) {
        this.formData.user.usersInfo.imgUrl = res.data.url
      }
    },
    beforeUpload() {
    },
    getOrg() {
      queryOrg({}).then(res => {
        if (res.code * 1 === 0) {
          this.selectData = res.data
        }
      })
    },
    getOrgName(id) {
      const arr = this.selectData
      const index = arr.findIndex(item => item.id === id)
      this.formData.orgName = index !== -1 && arr[index].orgName ? arr[index].orgName : ''
    },
    cancelSubmit(name) {
      this.$refs[name].resetFields()
      this.dialogFormVisible = false
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
          this.cancelSubmit(name)
        }
      })
    }
  }
}
</script>

<style scoped>

  .logo-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .logo-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .logo-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .logo {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
