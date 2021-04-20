<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>基本设置</span>
    </div>
    <el-form ref="supplier" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="企业名称" prop="supplierName">
        <el-input v-model="formData.supplierName" />
      </el-form-item>
      <el-form-item label="logo" prop="log">
        <el-upload
          class="logo-uploader"
          :action="$config.uploadPath"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="formData.topLogo" :src="$config.downloadPath + formData.topLogo" class="logo">
          <i v-else class="el-icon-plus logo-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="英文名" prop="englishSupplierName">
        <el-input v-model="formData.englishSupplierName" />
      </el-form-item>
      <el-form-item label="子域名" prop="sldName">
        <el-input v-model="formData.sldName" readonly />
      </el-form-item>
      <el-form-item label="顶级域名" prop="topName">
        <el-input v-model="formData.topName" />
      </el-form-item>
      <!--      <el-form-item label="小程序AppID" prop="appId">-->
      <!--        <el-input v-model="formData.appId" />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="小程序密钥" prop="secret">-->
      <!--        <el-input v-model="formData.secret" />-->
      <!--      </el-form-item>-->
      <el-form-item label="">
        <el-button type="primary" @click="handleSubmit('supplier')">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  getSupplierInfoByToken,
  updateSupplier
} from '@/api/permission'
import { getToken } from '../../utils/auth'

export default {
  data() {
    return {
      headers: { Authorization: getToken() },
      formData: {
        id: '',
        sldName: '',
        supplierName: '',
        englishSupplierName: '',
        bottomLogo: '',
        topLogo: '',
        topName: '',
        packId: '',
        appId: '',
        secret: ''
      },
      packList: [],
      rules: {
        supplierName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        sldName: [{ required: true, message: '请输入子域名', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      getSupplierInfoByToken().then(res => {
        if (res.code === 0) {
          this.formData = res.data
        }
      })
    },
    handleSuccess(res) {
      if (res.code === 0) {
        this.formData.topLogo = res.data.url
      }
    },
    beforeUpload() {

    },
    handleSubmit() {
      updateSupplier(this.formData).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.getInfo()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    font-size: 22px;
    font-weight: bold;
  }

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
