<template>
  <el-dialog
    :title="(formData.id ? '编辑公告' : '新增公告')"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="20vh"
  >
    <el-form ref="affiche_form" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="公告标题" prop="noticeTitle">
        <el-input v-model="formData.noticeTitle" placeholder="请输入公告标题" />
      </el-form-item>
      <el-form-item label="公告类型">
        <el-select v-model="formData.noticeType" placeholder="请选择公告类型">
          <el-option label="通知" :value="'1'" />
          <el-option label="公告" :value="'2'" />
        </el-select>
      </el-form-item>
      <el-form-item label="公告内容" prop="noticeContent">
        <el-input v-model="formData.noticeContent" type="textarea" placeholder="请输入公告内容" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('affiche_form')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('affiche_form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getSensitiveWord } from '@/api/base'
export default {
  name: 'NoticeForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    const validatSensitive = (value, callback) => {
      getSensitiveWord(value).then(res => {
        if (res.code === 0) {
          if (res.data.sensitiveWordList && res.data.sensitiveWordList.length > 0) {
            callback(new Error('存在敏感词：' + res.data.sensitiveWordList.join(',')))
          } else {
            callback()
          }
        } else {
          callback(new Error('敏感词检测失败'))
        }
      })
    }

    const validaNoticeTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入请输入公告标题'))
      } else if (value) {
        validatSensitive(value, callback)
      } else {
        callback()
      }
    }

    const validaNoticeContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入请输入公告内容'))
      } else if (value) {
        validatSensitive(value, callback)
      } else {
        callback()
      }
    }

    return {
      formData: {
        id: '',
        noticeTitle: '',
        noticeType: '1',
        noticeContent: ''
      },
      rules: {
        noticeTitle: [{ validator: validaNoticeTitle, trigger: 'blur' }],
        noticeContent: [{ validator: validaNoticeContent, trigger: 'blur' }]
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
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          this.$emit('doSubmit', data)
          this.cancelSubmit(name)
        }
      })
    },
    cancelSubmit(name) {
		// console.log(this.$refs[name])
      this.$refs[name].resetFields()
      // this.$refs.affiche_form.resetFields()
      this.dialogFormVisible = false
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
