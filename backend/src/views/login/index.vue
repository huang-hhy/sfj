<template>
  <div class="login-container">
    <div class="login-main">
      <div class="title">{{ title }}</div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        class="login-form nomal"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">{{ loginType === true? '账号登录':'手机登录' }}</h3>
        </div>
        <div v-if="loginType === true" class="nomalForm">
          <el-form-item
            :rules="{ required: true, trigger: 'blur', message: '请输入账号' }"
            prop="loginName"
            class="form-item"
          >
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="loginName"
              v-model.trim="loginForm.loginName"
              placeholder="账号"
              name="loginName"
              type="text"
              tabindex="1"
              autocomplete="off"
            />
          </el-form-item>
          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item
              :rules="{ required: true, trigger: 'blur', message: '请输入密码' }"
              prop="password"
              class="form-item"
            >
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                autocomplete="off"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>

          <el-form-item
            :rules="{ required: true, trigger: 'blur', message: '请输入验证码' }"
            prop="loginIdentify"
          >
            <el-row>
              <el-col :span="14" class="form-item">
                <el-input
                  ref="loginIdentify"
                  v-model.trim="loginForm.loginIdentify"
                  placeholder="请输入验证码"
                  name="loginName"
                  type="text"
                  tabindex="3"
                  @keyup.enter.native="handleLogin"
                />
              </el-col>
              <el-col :span="10" style="padding-left: 20px">
                <img :src="indetifyCode" alt="" style="width: 145px; height: 47px;" @click="makeCode">
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div v-if="loginType === false" class="mobileForm">
          <el-form-item
            :rules="{ required: true, trigger: 'blur', message: '请输入手机号' }"
            prop="mobile"
            class="form-item"
          >
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="mobile"
              v-model.trim="loginForm.mobile"
              placeholder="请输入手机号"
              name="mobile"
              type="text"
              tabindex="4"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            :rules="{ required: true, trigger: 'blur', message: '请输入验证码' }"
            prop="code"
          >
            <el-row>
              <el-col :span="14" class="form-item">
                <el-input
                  ref="code"
                  v-model.trim="loginForm.code"
                  placeholder="请输入验证码"
                  name="code"
                  type="text"
                  tabindex="5"
                  @keyup.enter.native="handleLogin"
                />
              </el-col>
              <el-col :span="10" style="padding-left: 20px">
                <el-button
                  :type="codeBtnSetting.typeCss"
                  :disabled="codeBtnSetting.disabled"
                  style="height: 47px;width: 100%;"
                  @click="sendCode"
                >
                  {{ codeBtnSetting.text }}
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <el-form-item>
          <el-row>
            <el-col>
              <el-button
                :loading="loading"
                type="primary"
                style="width:100%;"
                @click.native.prevent="handleLogin"
              >
                登录
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="sub-btn">
                <a href="javascript:;" @click="changeLoginType(!loginType)">{{ loginType === true? '切换手机登录':'切换账号登录' }}</a>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="sub-btn tr">
                <a href="javascript:;" @click="goToRegister">注册账号</a>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

    </div>
    <div class="copyright">版权所有：联通（广东）产业互联网有限公司 粤ICP备17109783号-6 地址：广州市广州国际生物岛广州生命科学创新中心A塔23楼 电话：18602030737 传真：22181999</div>
  </div>
</template>

<script>
import { captchaImage, getSupplierInfo, getSmsCode } from '@/api/base'
export default {
  name: 'Login',
  data() {
    return {
      title: '党建云平台',
      loginType: true,
      codeBtnSetting: {
        typeCss: 'primary',
        disabled: false,
        text: '获取验证码',
        t: ''
      },
      loginForm: {
        loginName: '',
        password: '',
        loginIdentify: '',
        uuid: '',
        supplierId: '',
        mobile: '',
        code: ''
      },
      loginRules: {},
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      indetifyCode: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    },
    loginType: {
      handler(val) {
        if (val) {
          const rules = {
            loginName: [{ required: true, trigger: 'blur', message: '请输入账号' }],
            password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
            loginIdentify: [
              { required: true, trigger: 'blur', message: '请输入验证码' }
            ]
          }
          this.loginRules = JSON.parse(JSON.stringify(rules))
        } else {
          const rules = {
            mobile: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
            code: [
              { required: true, trigger: 'blur', message: '请输入验证码' }
            ]
          }
          this.loginRules = JSON.parse(JSON.stringify(rules))
        }
      },
      deep: true
    }
  },
  created() {
    getSupplierInfo().then(res => {
      if (res.code === 0 && res.data) {
        this.loginForm.supplierId = res.data.id
        this.title = res.data.supplierName
        sessionStorage.setItem('logo', '')
        sessionStorage.setItem('title', res.data.supplierName)
      }
    })
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.loginName === '') {
      this.$refs.loginName.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.makeCode()
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    sendCode() {
      if (this.loginForm.mobile) {
        getSmsCode({ mobile: this.loginForm.mobile, type: 1 }).then(res => {
          if (res.code * 1 === 0) {
            this.codeBtnSetting.typeCss = ''
            this.codeBtnSetting.disabled = true
            this.codeBtnSetting.text = '59'
            this.setCount()
          }
        })
      } else {
        this.$message.error('请输入手机号码')
      }
    },
    setCount() {
      const _this = this
      this.codeBtnSetting.t = setInterval(function() {
        if (_this.codeBtnSetting.text > 0) {
          _this.codeBtnSetting.text = _this.codeBtnSetting.text * 1 - 1
        } else {
          _this.codeBtnSetting.typeCss = 'primary'
          _this.codeBtnSetting.disabled = false
          _this.codeBtnSetting.text = '重新发送'
          clearTimeout(_this.codeBtnSetting.t)
        }
      }, 1000)
    },
    changeLoginType(type) {
      this.$refs.loginForm.clearValidate()
      this.loginForm = {
        loginName: '',
        password: '',
        loginIdentify: '',
        mobile: '',
        code: ''
      }
      this.loginType = type
    },
    goToRegister() {
      this.$router.push({ path: '/register' })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
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
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.loginType) {
            this.$store.dispatch('user/login', this.loginForm)
              .then(() => {
                this.$message.success('登录成功')
                this.$router.push({ path: '/desktop' })
                this.loading = false
              })
              .catch(error => {
                this.makeCode()
                this.$message.error(error)
                this.loading = false
              })
          } else {
            this.$store.dispatch('user/mobileLogin', this.loginForm)
              .then(() => {
                this.$message.success('登录成功')
                this.$router.push({ path: '/desktop' })
                this.loading = false
              })
              .catch(error => {
                this.makeCode()
                this.$message.error(error)
                this.loading = false
              })
          }
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // 生成四位随机验证码
    makeCode() {
      captchaImage().then(res => {
        if (res.code * 1 === 0) {
          this.indetifyCode = 'data:image/gif;base64,' + res.data.img
          this.loginForm.uuid = res.data.uuid
        }
      })
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #fff;
  $light_gray: #fff;
  $cursor: #889aa4;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/login/login-bg.png");
    background-size: cover;
    background-position: center;
    position: relative;

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #C0C4CC;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .form-item {
      border: 1px solid rgba(0, 192, 255, 0.6);
      /*border: 1px solid rgba(255, 255, 255, 0.1);*/
      background: transparent;
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #E3393C;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -60%, 0);
    }

    .login-form {
      position: relative;
      width: 470px;
      max-width: 100%;
      padding: 50px 35px 30px;
      margin: 0 auto;
      background: #fff;
      border: 2px solid #eee;
      /*overflow: hidden;*/
      /*background-image: url("../../assets/images/login/login-border.png");*/
      /*background-size: 100% 100%;*/
      /*background-position: center;*/
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;
      .title {
        font-size: 30px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: normal;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }

    .title {
      text-align: center;
      font-size: 48px;
      color: #E3393C;
      font-weight: bold;
      margin-bottom: 30px;
    }

    .form-item{
      border: 1px solid $light_gray;
    }

    .el-button--primary{
      background: $light_gray;
      border: 1px solid $light_gray;
    }

    .sub-btn {
      display: block;
      width: 100%;
      color: $light_gray;
    }

    .tr {
      text-align: right;
    }

    .copyright {
      width:100%;
      color:#eee;
      position: fixed;
      bottom: 5px;
      text-align: center
    }
  }
</style>
