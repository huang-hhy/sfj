<template>
  <div class="register-container">
    <div class="register-main">
      <el-form
        ref="registerForm"
        :model="licenseForm"
        class="register-form"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">{{ title }}</h3>
        </div>

        <el-form-item prop="registerName" class="form-item">
          <el-upload
            class="upload-demo"
            action="/api/CrtBasicService/uploadCrt"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">上传授权文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col>
              <el-button
                :loading="loading"
                type="primary"
                style="width:100%;"
                @click.native.prevent="getCode"
              >
                获取机器码
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <p>{{ code }}</p>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div class="copyright">版权所有：联通（广东）产业互联网有限公司 粤ICP备17109783号-6 地址：广州市广州国际生物岛广州生命科学创新中心A塔23楼 电话：18602030737 传真：22181999</div>
  </div>
</template>

<script>
import { getMachineCode } from '@/api/system'
export default {
  name: 'License',
  components: {

  },
  data() {
    return {
      title: '授权',
      licenseForm: {
        auth: ''
      },
      fileList: [],
      loading: false,
      code: ''
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    getCode() {
      getMachineCode().then(res => {
        this.code = res.data
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
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
    .register-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .register-container {
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
      min-height: 150px;
      padding: 20px;
      border: 1px solid rgba(0, 192, 255, 0.6);
      /*border: 1px solid rgba(255, 255, 255, 0.1);*/
      background: transparent;
      border-radius: 5px;
      color: #454545;
    }

    .agreement {
      color: #E3393C;
      cursor: pointer;
    }
    .entry{
      margin: 5px 0;
    }

    p{
      text-indent: 2em;
      line-height: 24px;
      text-align: justify;
    }
    .entryHeader{
      font-weight: bold;
      line-height: 24px;
    }
    /*.registrationAgreement{*/
    /*  max-height: 500px;*/
    /*}*/
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #E3393C;
  .register-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .register-main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -60%, 0);
      .title{
        margin-top: 80px;
      }
    }

    .register-form {
      position: relative;
      width: 470px;
      max-width: 100%;
      padding: 50px 35px 30px;
      margin: 0 auto;
      background: #fff;
      border: 2px solid #eee;
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
      color: $light_gray;
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
      color: #eee;
    }

    .tr {
      text-align: right;
    }

    .copyright {
      width: 100%;
      color: #eee;
      position: fixed;
      bottom: 5px;
      text-align: center
    }
  }
</style>
