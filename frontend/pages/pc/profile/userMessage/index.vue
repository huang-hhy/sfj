<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <main-header :content="content" style="margin: 20px 0" />
      <el-form
        :model="list"
        label-width="80px"
        :rules="userRules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="list.userName" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录名" prop="loginName">
              <el-input v-model="list.loginName" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="list.sex" style="width: 360px">
                <el-option
                  v-for="item in sexList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="list.phone"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="userId">
              <el-input v-model="list.usersInfo.userId" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="list.email"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker
                v-model="list.usersInfo.birthday"
                type="date"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入党日期" prpo="joinPartyTime">
              <el-date-picker
                v-model="list.usersInfo.joinPartyTime"
                type="date"
                value-format="yyyy-MM-dd"
                readonly
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="民族" prop="nation">
              <el-input v-model="list.usersInfo.nation" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历" prop="education">
              <el-input v-model="list.usersInfo.education" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="籍贯" prop="nativePlace">
              <el-input v-model="list.usersInfo.nativePlace" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职业" prop="profession">
              <el-input v-model="list.usersInfo.profession" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="组织身份" prop="userIdentity">
              <el-select v-model="list.usersInfo.userIdentity" style="width: 360px" @change="changeUserIdentity">
                <el-option
                  v-for="item in identityList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属组织" prop="orgId">
              <el-select v-model="list.orgId" style="width: 360px" @change="changeOrg">
                <el-option
                  v-for="item in orgList"
                  :key="item.id"
                  :label="item.orgName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end" style="margin: 20px 0">
          <el-col :span="2">
            <el-button @click="handleReture">返回</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="handleEdit">保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import moment from 'moment'
  import { getOrgList, updateUser } from '@/api/pc'
  import {encrypt} from "../../../../libs/tools"
  import mainHeader from "../../../../components/pc/common/mainHeader";

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

  export default {
    name: "index",
    components: {
      mainHeader,
      NavBar
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 个人信息',
      }
    },
    data() {
      return {
        list: {
          usersInfo: {}
        },
        userRules: {
          userName: [{ required: true, message: '请填入用户名', trigger: 'blur' }],
          loginName: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
          phone: [{ required: true, validator: validateMobile, trigger: 'blur' }],
          email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
          orgId: [{ required: true, message: '请选择所属组织', trigger: 'change' }]
        },
        orgList: [],
        moment: moment,
        sexList: [{
          label: '男',
          value: '0'
        }, {
          label: '女',
          value: '1'
        }],
        identityList: [{
          label: '群众',
          value: '1'
        }, {
          label: '积极分子',
          value: '2'
        }, {
          label: '发展对象',
          value: '3'
        }, {
          label: '预备党员',
          value: '4'
        }, {
          label: '正式党员',
          value: '5'
        }],
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '个人信息'
        }
      }
    },
    mounted() {
      this.setBaseInfo()
      this.setUserCenter()
      this.getList()
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo',
        setUserCenter: 'user/setUserCenter'
      }),
      getList() {
        const data = this.$store.state.user
        setTimeout(() => {
          this.list = {
            id: data.id,
            userName: data.userName,
            loginName: data.loginName,
            email: data.email,
            orgId: data.orgId,
            orgName: data.orgName,
            phone: data.phone,
            sex: data.sex,
            userTypeName: data.userTypeName,
            score: data.score * 1,
            usersInfo: {
              birthday: data.usersInfo.birthday,
              joinPartyTime: data.usersInfo.joinPartyTime,
              userId: data.usersInfo.userId,
              nation: data.usersInfo.nation ? data.usersInfo.nation : '',
              education: data.usersInfo.education ? data.usersInfo.education : '',
              nativePlace: data.usersInfo.nativePlace ? data.usersInfo.nativePlace : '',
              profession: data.usersInfo.profession ? data.usersInfo.profession : '',
              userIdentity: data.usersInfo.userIdentity ? data.usersInfo.userIdentity : ''
            },
          }
        }, 100)
        getOrgList({}).then(res => {
          if (res.code * 1 === 0) {
            this.orgList = res.data
          }
        })
      },
      changeOrg() {
        this.list.orgId = this.$store.state.user.orgId
        this.$message.warning('如需修改组织，请到关系转接修改')
      },
      changeUserIdentity() {
        this.list.usersInfo.userIdentity = this.$store.state.user.usersInfo.userIdentity
        this.$message.warning('不可修改')
      },
      handleReture() {
        this.$router.push({ path: '/pc/profile' })
      },
      handleEdit() {
        this.$confirm('确定保存修改？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.list.phone && this.list.email) {
            const data = JSON.parse(JSON.stringify(this.list))
            data.email = encrypt(data.email)
            data.phone = encrypt(data.phone)
            data.userName = encrypt(data.userName)
            data.loginName = encrypt(data.loginName)
            updateUser(data).then(res => {
              if (res.code * 1 === 0) {
                this.$router.go(0)
                this.$message.success('修改成功')
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            this.$message.error('带 * 的为必填项，请填写')
          }
        }).catch(() => {})
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    width: 1050px;
    margin: 20px auto;


    .el-form {
      margin: 40px 0;
      .el-input {
        width: 360px;
      }
    }
  }
</style>
