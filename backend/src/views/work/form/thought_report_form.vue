<template>
  <el-dialog
    title="思想汇报 - 详情"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="15vh"
  >
    <el-form ref="ThoughtReportForm" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" :readonly="formData.id !==''" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="formData.content" type="textarea" :rows="2" placeholder="请输入内容" :readonly="formData.id !==''" />
      </el-form-item>
      <el-form-item label="汇报人" prop="userName">
        <el-input v-model="formData.userName" placeholder="请输入汇报人" :readonly="formData.id !==''" />
      </el-form-item>
      <el-form-item label="所属组织" prop="orgName">
        <el-input v-model="formData.orgName" placeholder="请输入汇报人" :readonly="formData.id !==''" />
      </el-form-item>
      <el-form-item label="附件文件" prop="annexUrl">
        <el-upload
          class="upload-demo"
          :action="$config.uploadPath"
          :headers="headers"
          :on-preview="handleAnnexUrlPreview"
          multiple
          :file-list="defaultAnnexUrl"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('ThoughtReportForm')">取 消</el-button>
      <el-button v-if="!formData.id" type="primary" @click="handleSubmit('ThoughtReportForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'
import { decrypt } from '@/utils/tools'

export default {
  name: 'ThoughtReportForm',
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
      headers: { Authorization: getToken() },
      OrgIdsProps: {
        multiple: true,
        checkStrictly: true,
        children: 'children',
        label: 'label',
        value: 'id'
      },
      formData: {
        id: '',
        title: '',
        content: '',
        reportTime: '',
        annexUrl: '',
        userId: '',
        userName: '',
        orgName: ''
      },
      defaultAnnexUrl: [],
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
        tmp.userName = decrypt(tmp.userName)
        this.defaultAnnexUrl = tmp.annexUrl ? JSON.parse(tmp.annexUrl) : []
        this.formData = tmp
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    handleAnnexUrlPreview(file) {
      console.log(file)
    },
    cancelSubmit(name) {
      this.dialogFormVisible = false
      this.$refs[name].resetFields()
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          data.receiveOrgIds = data.receiveOrgIds.join(',')
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
