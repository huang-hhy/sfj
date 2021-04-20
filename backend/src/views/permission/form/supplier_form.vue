<template>
  <el-dialog
    :title="(formData.id ? '编辑' : '添加')"
    :visible.sync="dialogFormVisible"
    label-width="80px"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <el-form ref="supplier" :model="formData" :rules="rules" label-width="100px">
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
        <el-input v-model="formData.sldName" />
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
      <el-form-item v-if="formData.id" label="套餐" prop="packId">
        <el-radio-group v-model="formData.packId">
          <el-radio v-for="item in packList" :key="item.id" :label="item.id">{{ item.packName }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('supplier')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('supplier')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import {
  getPackAll
} from '@/api/permission'
import { getToken } from '../../../utils/auth'

export default {
  name: 'SupplierForm',
  components: {},
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
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
      },
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = jsonAssgin(this.formData, val)
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  mounted() {
    getPackAll().then(res => {
      if (res.code === 0) {
        this.packList = res.data
      }
    })
  },
  methods: {
    handleSuccess(res) {
      if (res.code === 0) {
        this.formData.topLogo = res.data.url
      }
    },
    beforeUpload() {

    },
    cancelSubmit(name) {
      this.$refs[name].resetFields()
      this.dialogFormVisible = false
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
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
