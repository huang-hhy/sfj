<template>
  <!--  title="新增账号"-->
  <el-dialog
    :title="(formData.id ? '编辑账号' : '新增账号')"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="8vh"
  >
    <el-form ref="user" :model="formData" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="账号" prop="loginName">
            <el-input
              v-model.trim="formData.loginName"
              placeholder="请输入6-20位字符"
              maxlength="20"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入手机号" maxlength="11" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" placeholder="请输入所任职的职位" maxlength="120" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="formData.userName" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!formData.id">
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input
              v-model.trim="formData.password"
              type="password"
              maxlength="16"
              placeholder="请输入由数字、字母组成的6-16位密码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="再次密码" prop="password2">
            <el-input
              v-model="formData.password2"
              type="password"
              maxlength="16"
              placeholder="请输入由数字、字母组成的6-16位密码"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="党内职务" prop="userTypeId">
            <el-select
              v-model="formData.userTypeId"
              placeholder="请选用户类型"
            >
              <el-option
                v-for="item in userType"
                :key="item.id"
                :label="item.userTypeName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属组织" prop="orgId">
            <TreeSelect
              v-model="formData.orgId"
              width="100%"
              :options="options"
              :props="optionsProps"
              @selected="getOrgName"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="政治面貌" prop="usersInfo.userIdentity">
            <el-select
              v-model="formData.usersInfo.userIdentity"
              placeholder="请选择政治面貌"
              style="width: 100%;"
              :disabled="formData.id ===''"
            >
              <el-option label="群众" value="1" />
              <el-option label="积极分子" value="2" />
              <el-option label="发展对象" value="3" />
              <el-option label="预备党员" value="4" />
              <el-option label="正式党员" value="5" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="角色分组" prop="roleIds">
            <el-checkbox-group v-model="formData.roleIds">
              <el-checkbox v-for="role in roleList" :key="role.id" :label="role.id">{{ role.roleName }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="积分" prop="score">
            <el-input v-model="formData.usersInfo.score" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="民族" prop="nation">
            <el-input v-model="formData.usersInfo.nation" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学历" prop="education">
            <el-input v-model="formData.usersInfo.education" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="籍贯" prop="nativePlace">
            <el-input v-model="formData.usersInfo.nativePlace" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="行政职务" prop="nativePlace">
            <el-input v-model="formData.usersInfo.xzzw" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="formData.usersInfo.birthday"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职业" prop="profession">
            <el-input v-model="formData.usersInfo.profession" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入党时间" prop="joinPartyTime">
            <el-date-picker
              v-model="formData.usersInfo.joinPartyTime"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="转正时间" prop="formalTime">
            <el-date-picker
              v-model="formData.usersInfo.formalTime"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="个人身份">
            <el-input v-model="formData.usersInfo.grsf" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="照片" prop="imgUrl">
            <el-upload
              class="logo-uploader"
              :action="$config.uploadPath"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            >
              <img
                v-if="formData.usersInfo.imgUrl"
                :src="$config.downloadPath + formData.usersInfo.imgUrl"
                class="logo"
              >
              <i v-else class="el-icon-plus logo-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('user')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('user')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import TreeSelect from '@/components/tree-select'
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'

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
  name: 'UserForm',
  components: { TreeSelect },
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
      regionalOptions: [],
      formData: {
        id: '',
        orgId: '',
        orgName: '',
        loginName: '',
        userName: '',
        email: '',
        phone: '',
        sex: '',
        avatar: '',
        password: '',
        password2: '',
        roleIds: [],
        userTypeId: '',
        usersInfo: {
          score: '',
          nation: '',
          education: '',
          nativePlace: '',
          birthday: '',
          profession: '',
          joinPartyTime: '',
          formalTime: '',
          imgUrl: '',
          grsf: '',
          xzzw: ''
        }
      },
      rules: {
        loginName: [{ required: true, validator: validateUserName, trigger: 'blur' }],
        phone: [{ required: true, validator: validateMobile, trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        password2: [{ required: true, validator: validateSamePassword, trigger: 'blur' }],
        userName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        orgId: [{ required: true, message: '请选择组织', trigger: 'change' }]
        // roleId: [{ required: true, message: '请选择角色分组', trigger: 'change' }]
      },
      dialogFormVisible: false,
      optionsProps: {
        label: 'orgName',
        children: 'children',
        value: 'id'
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        const tmp = jsonAssgin(this.formData, val)
        // tmp.usersInfo.birthday = tmp.usersInfo.birthday ? this.$moment(tmp.usersInfo.birthday * 1000).format('YYYY-MM-DD HH:mm:ss') : ''
        // tmp.usersInfo.joinPartyTime = tmp.usersInfo.joinPartyTime ? this.$moment(tmp.usersInfo.joinPartyTime * 1000).format('YYYY-MM-DD HH:mm:ss') : ''
        tmp.usersInfo.formalTime = tmp.usersInfo.formalTime ? this.$moment(tmp.usersInfo.formalTime * 1000).format('YYYY-MM-DD HH:mm:ss') : ''
        this.formData = tmp
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    handleSuccess(res) {
      if (res.code === 0) {
        this.formData.usersInfo.imgUrl = res.data.url
        this.formData.avatar = res.data.url
        // console.log(this.formData)
      }
    },
    beforeUpload() {
    },
    getOrgName(id) {
      const arr = this.options
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
          // data.usersInfo.birthday = data.usersInfo.birthday ? this.$moment(data.usersInfo.birthday).valueOf() / 1000 : ''
          // data.usersInfo.joinPartyTime = data.usersInfo.joinPartyTime ? this.$moment(data.usersInfo.joinPartyTime).valueOf() / 1000 : ''
          data.usersInfo.formalTime = data.usersInfo.formalTime ? this.$moment(data.usersInfo.formalTime).valueOf() / 1000 : ''
          this.$emit('doSubmit', data)
          this.cancelSubmit(name)
          // console.log(this.formData)
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
