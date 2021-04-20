<template>
  <el-dialog
    title="新增留言"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="600px"
  >
    <el-form
      v-model="list"
      ref="newBbsForm"
      :rules="newRules"
      label-width="70px"
    >
      <el-form-item label="留言内容" ref="content">
        <el-input v-model="list.content" type="textarea" :rows="4"/>
      </el-form-item>
      <el-form-item label="留言附件">
        <el-upload
          :action="upload"
          list-type="picture-card"
          :http-request="handleUpload"
        >
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>
      <!--      <el-form-item label="是否公开">-->
      <!--        <el-radio-group v-model="list.isPublic">-->
      <!--          <el-radio label="0">公开</el-radio>-->
      <!--          <el-radio label="1">非公开</el-radio>-->
      <!--        </el-radio-group>-->
      <!--      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleCancel('newBbsForm')">取消</el-button>
      <el-button size="small" type="primary" @click="handleConfirm('newBbsForm')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {uploadFile} from '@/api/pc'

  export default {
    name: "newBbs",
    props: {
      value: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        list: {},
        newRules: {
          content: {required: true, message: '请输入留言内容', trigger: 'blur'}
        },
        upload: '/api/common/upload'
      }
    },
    watch: {
      value: {
        handler(val) {
          this.list = JSON.parse(JSON.stringify(val))
          this.list.imgUrl = this.list.imgUrl ? this.list.imgUrl.splice(',') : []
          this.dialogFormVisible = true
        },
        deep: true
      }
    },
    methods: {
      handleUpload(res) {
        let fd = new FormData
        fd.append('file', res.file)
        uploadFile(fd).then(res => {
          if (res.code * 1 === 0) {
            this.list.imgUrl.push(res.data.url)
          }
        })
      },
      handleCancel(name) {
        this.dialogFormVisible = false
        this.$refs[name].resetFields()
      },
      handleConfirm(name) {
        if (this.list.imgUrl) {
          this.list.imgUrl = JSON.stringify(this.list.imgUrl)
        }
        const data = JSON.parse(JSON.stringify(this.list))
        this.$emit('doSubmit', data)
        this.handleCancel(name)
      }
    }
  }
</script>

<style scoped>

</style>
