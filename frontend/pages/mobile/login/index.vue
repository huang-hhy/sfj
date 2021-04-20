<template>
  <div class="container">
    <div class="main">
      <h2 class="title">智慧党建</h2>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        label-position="left"
      >
        <el-form-item prop="loginName" class="form-item">
          <el-input
            ref="loginName"
            v-model.trim="loginForm.loginName"
            placeholder="请输入账号"
            name="loginName"
            type="text"
            tabindex="1"
            autocomplete="on"
          >
            <img slot="prefix" src="@/assets/mobile/login/user.png" class="icon">
          </el-input>
        </el-form-item>

        <el-form-item prop="password" class="form-item">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.enter.native="handleLogin"
          >
            <img slot="prefix" src="@/assets/mobile/login/psw.png" class="icon">
            <img
              slot="suffix"
              @click="showPwd"
              :src='"@/assets/mobile/login/eye"+(passwordType==="password"?"":"-open")+".png"'
              class="icon">
          </el-input>
        </el-form-item>
        <el-form-item prop="code" class="form-item">
          <el-row>
            <el-col :span="16" class="item-code">
              <el-input
                ref="code"
                v-model.trim="loginForm.loginIdentify"
                placeholder="请输入验证码"
                name="code"
                type="text"
                tabindex="3"
                @keyup.enter.native="handleLogin"
              >
                <img slot="prefix" src="@/assets/mobile/login/lock.png" class="icon">
              </el-input>
            </el-col>
            <el-col :span="8" style="padding-left: 5px">
              <img :src="indetifyCode" alt="" style="width: 100%; height: 40px;" @click="makeCode">
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="agree">
          <el-row>
            <el-col>
              <el-checkbox label="同意" v-model="loginForm.agree"></el-checkbox>《中国联通用户隐私政策》
            </el-col>
          </el-row>
          <el-row>
            <el-button
              :loading="loading"
              type="danger"
              class="btn"
              size="medium"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import SIdentify from '@/components/SIdentify/index'
  import {captchaImage, login} from '@/api/common'
  import { encrypt } from '@/libs/tools'
import {mapActions} from "vuex";
  export default {
    components: {
      SIdentify
    },
    data() {
      const validatorCode = (rule, value, callback) => {
        if (value === this.indetifyCode) {
          callback()
        } else if (value) {
          this.makeCode()
        }
        return callback(new Error('验证码输入错误'))
      }
      return {
        loginForm: {
          loginName: '',
          password: '',
          loginIdentify: '',
          uuid: '',
          agree: false
        },
        loginRules: {
          loginName: [{required: true, trigger: 'blur', message: '请输入账号'}],
          password: [{required: true, trigger: 'blur', message: '请输入密码'}],
          loginIdentify: [{validator: validatorCode, trigger: 'blur'}],
          agree: [{required: true, checkfunc : true,trigger: 'blur', message: '请同意协议'}]
        },
        passwordType: 'password',
        loading: false,
        indetifyCode: '' // 验证码
      }
    },
    mounted() {
      this.makeCode()
      this.setBaseInfo()
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        console.log('登录')
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            let data = {
              userName: encrypt(this.loginForm.loginName),
              password: encrypt(this.loginForm.password),
              code: this.loginForm.loginIdentify,
              uuid: this.loginForm.uuid,
              supplierId: this.$store.state.app.id
            }
            login(data).then(res => {
              if (res.code === 0) {
                sessionStorage.setItem('token', res.data.token)
                console.log(res.data.token)
                this.$store.commit('app/SET_TOKEN',res.data.token )
                this.$toast('登录成功')
                this.$router.push({path: '/mobile/profile'})
              } else {
                this.$toast('登录失败')
                console.log('登录失败')
                console.log(res.msg)
                this.$toast(res.msg)
                this.makeCode()
              }
            })
          } else {
            return false
          }
        })
      },
      makeCode() {
        captchaImage().then(res => {
          if (res.code * 1 === 0) {
            this.indetifyCode = 'data:image/gif;base64,' + res.data.img
            this.loginForm.uuid = res.data.uuid
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .container {
    background-image: url("~@/assets/mobile/login/login-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100vh;
    position: relative;
  }

  .main {
    min-height: 300px;
    height: 90vw;
    width: 80vw;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .title {
    height: 7vw;
    margin: 4vw auto;
    text-align: center;
    font-size: 3vh;
    color: #E4393C;
    font-weight: bold;
    letter-spacing: 2vw;
  }

  .form-item {
    width: 70vw;
    margin: 0 auto 20px;
  }
  .agree {
    width: 70vw;
    margin: 0 auto;
    font-size: 1vh;
  }
  .agree /deep/ .el-checkbox__label{
    padding-left: 5px;
  }
  .agree /deep/ .el-checkbox__inner:hover {
    border-color: #E4393C;
  }
  .agree /deep/ .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #E4393C;
    border-color: #E4393C;
  }

  .agree /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #E4393C;
  }
  .form-item /deep/ .el-input__inner {
    border: none;
    border-bottom: 1px solid #EBEBEB;
    border-radius: inherit;
  }
  .icon {
    height: 6vw;
    width: 5vw;
  }
  .btn {
    width: 70vw;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #E4393C;
    border: 1px solid #E4393C;
  }
</style>
