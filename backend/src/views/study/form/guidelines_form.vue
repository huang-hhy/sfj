<template>
  <el-dialog
    title="编辑"
    :visible.sync="dialogFormVisible"
    width="60%"
    :close-on-click-modal="false"
    :show-close="false"
    top="10vh"
  >
    <el-form ref="guidelinesForm" :model="formData" :rules="rules" label-width="140px">
      <el-form-item label="工作指引类型" prop="workTypeId">
        <el-select v-model="formData.workTypeId" placeholder="请选择指引类型">
          <el-option
            v-for="(item,index) in typeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工作指引标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入工作指引标题" />
      </el-form-item>
      <el-form-item label="工作指引内容" prop="content">
        <editor-bar v-model="formData.content" is-clear:false />
      </el-form-item>
      <el-form-item label="附件">
        <el-upload
          class="logo-uploader"
          :action="$config.uploadPath"
          :show-file-list="true"
          multiple
          :limit="5"
          :file-list="files"
          :headers="headers"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
        >
          <i class="el-icon-plus logo-uploader-icon" />
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('guidelinesForm')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('guidelinesForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getToken } from '@/utils/auth'
import { jsonAssgin } from '@/utils/tools'
import EditorBar from '@/components/WangEditor'

export default {
  name: 'GuidelinesForm',
  components: { EditorBar },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    typeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: { Authorization: getToken() },
      dialogFormVisible: false,
      formData: {
        id: '',
        enclosure: '',
        content: '',
        title: '',
        workTypeId: ''
      },
      rules: {
        workTypeId: [{
          required: true, message: '工作指引类型不能为空', trigger: 'blur'
        }],
        title: [{
          required: true, message: '工作指引标题不能为空', trigger: 'blur'
        }],
        content: [{
          required: true, message: '工作指引内容不能为空', trigger: 'blur'
        }]
      },
      files: [],
      fileList: []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = jsonAssgin(this.formData, val)
        if (val.enclosure && JSON.parse(val.enclosure)) {
          this.files = JSON.parse(val.enclosure)
        }
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  mounted() {

  },
  methods: {
    cancelSubmit(name) {
      this.$refs[name].resetFields()
      this.fileList = []
      this.files = []
      this.dialogFormVisible = false
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.dealFile()
          this.formData.enclosure = JSON.stringify(this.fileList)
          const data = JSON.parse(JSON.stringify(this.formData))
          this.$emit('doSubmit', data)
          this.cancelSubmit(name)
        }
      })
    },
    beforeUpload(file) {
      this.files.push({
        name: file.name,
        uid: file.uid,
        url: ''
      })
      console.log(this.files)
    },
    beforeRemove(file, fileList) {
      const uid = file.uid
      for (var key in this.files) {
        if (this.files[key].uid === uid) {
          this.files.splice(key, 1)
        }
      }
    },
    handleSuccess(res) {
      if (res.code * 1 === 0) {
        this.$message.success('上传成功')
      } else {
        this.$message.error('上传失败')
      }
    },
    dealFile() {
      if (this.files) {
        this.fileList = JSON.parse(JSON.stringify(this.files))
        this.files.forEach((item, index) => {
          if (item.response || item.url) {
            delete this.fileList[index].response
            delete this.fileList[index].percentage
            delete this.fileList[index].status
            delete this.fileList[index].uid
            this.fileList[index].url = item.response ? item.response.data.url : item.url
            this.fileList[index].name = item.name
          } else {
            this.$message.warning('文件尚未上传成功，请稍后再试')
            return
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
