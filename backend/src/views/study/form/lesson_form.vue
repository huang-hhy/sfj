<template>
  <el-dialog
    :title="formData.id ? '编辑课程' : '新增课程'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="15vh"
    width="60%"
  >
    <el-form ref="LessonForm" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="课程名称" prop="title">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="封面图片" prop="imgUrl">
        <el-upload
          class="logo-uploader"
          :action="$config.uploadPath"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleImgUrl"
          :before-upload="beforeImgUrlUpload"
        >
          <img v-if="formData.imgUrl" :src="$config.downloadPath + formData.imgUrl" class="logo">
          <i v-else class="el-icon-plus logo-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="选修/必修">
        <el-radio v-model="formData.compulsory" :label="'1'">选修</el-radio>
        <el-radio v-model="formData.compulsory" :label="'0'">必修</el-radio>
      </el-form-item>
      <el-form-item label="课程分类">
        <el-select v-model="formData.studyTypeId" placeholder="请选择课程类型">
          <el-option v-for="it in typeOptions" :key="it.id" :label="it.typeName" :value="it.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="课程形式">
        <el-select v-model="formData.courseType" placeholder="请选择课程形式">
          <el-option :label="'课件在线学习'" :value="0" />
          <el-option :label="'文字资料学习'" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="打卡时长" prop="times">
        <!--        <el-input-number v-model="formData.times" :min="1" />-->
        <!--        <span>秒</span>-->
        <el-radio-group v-model="formData.times">
          <el-radio :label="15">15秒</el-radio>
          <el-radio :label="30">30秒</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学分">
        <el-input-number v-model="formData.score" :min="1" />
      </el-form-item>
      <el-form-item v-if="formData.courseType*1===1" label="文字资料">
        <editor-bar v-model="formData.literature" is-clear:false />
      </el-form-item>
      <el-form-item v-if="formData.courseType*1===0" label="课件上传（视频）">
        <el-upload
          class="logo-uploader"
          :action="$config.uploadPath"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <video
            v-if="formData.videoUrl"
            :src="$config.downloadPath + formData.videoUrl"
            controls="controls"
            width="100%"
          >
            您的浏览器不支持视频播放
          </video>
          <!--          <i v-else class="el-icon-plus logo-uploader-icon" />-->
          <el-button v-else type="primary" size="small">点击上传</el-button>
          <el-progress
            v-if="videoFlag == true"
            type="circle"
            :percentage="videoUploadPercent"
            style="margin-top:7px;"
          />
        </el-upload>
      </el-form-item>
      <el-form-item v-if="formData.courseType*1===0" label="课件上传（音频）">
        <el-upload
          ref="audioUpload"
          class="logo-uploader"
          :action="$config.uploadPath"
          :headers="headers"
          :auto-upload="false"
          multiple
          :file-list="audioFileList"
          :on-success="handleAudioSuccess"
          :on-change="handleAudioChange"
          :before-remove="removeAudio"
          :before-upload="beforeUpload"
        >
          <el-button type="primary" size="small">选择文件</el-button>
        </el-upload>
        <el-button v-if="audioFileList.length" type="primary" size="small" @click="submitAudioUpload">上传</el-button>
      </el-form-item>
      <el-form-item v-if="formData.courseType*1===0" label="课件上传（文档）">
        <el-upload
          ref="contentUpload"
          class="logo-uploader"
          :action="$config.uploadPath"
          :headers="headers"
          :auto-upload="false"
          multiple
          :file-list="contentFileList"
          :on-success="handleContentSuccess"
          :on-change="handleContentChange"
          :before-remove="removeContent"
          :before-upload="beforeUpload"
        >
          <el-button type="primary" size="small">选择文件</el-button>
        </el-upload>
        <el-button v-if="contentFileList.length" type="primary" size="small" @click="submitContentUpload">上传</el-button>
      </el-form-item>
      <!--      <el-form-item>-->
      <!--        <el-radio-group v-model="formData.checkStatus">-->
      <!--          <el-radio :label="0">草稿</el-radio>-->
      <!--          <el-radio :label="1">待审核</el-radio>-->
      <!--          <el-radio :label="2">已通过</el-radio>-->
      <!--          <el-radio :label="3">已发布</el-radio>-->
      <!--          <el-radio :label="4">下架</el-radio>-->
      <!--        </el-radio-group>-->
      <!--      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('LessonForm')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('LessonForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'
import EditorBar from '@/components/WangEditor'
import axios from 'axios'

export default {
  name: 'LessonForm',
  components: { EditorBar },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    typeOptions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: { Authorization: getToken() },
      formData: {
        id: '',
        title: '',
        imgUrl: '',
        studyTypeId: '',
        videoUrl: '',
        times: 0,
        score: '',
        checkStatus: 0,
        literature: '',
        compulsory: '0',
        courseType: 0,
        audioUrl: '',
        content: ''
      },
      audioFileList: [],
      contentFileList: [],
      rules: {
        name: { required: true, message: '请输入课程名称', trigger: 'blur' },
        times: { required: true, message: '请选择打卡时长', trigger: 'blur' }
      },
      dialogFormVisible: false,
      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: '',
      // 进度条的进度，
      isShowUploadVideo: false,
      // 显示上传按钮
      videoForm: {
        showVideoPath: ''
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = jsonAssgin(this.formData, val)
        if (this.formData.audioUrl && JSON.parse(this.formData.audioUrl)) {
          this.$set(this, 'audioFileList', JSON.parse(this.formData.audioUrl))
        }
        if (this.formData.content && JSON.parse(this.formData.content)) {
          this.$set(this, 'contentFileList', JSON.parse(this.formData.content))
        }
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    handleImgUrl(res) {
      if (res.code === 0) {
        this.formData.imgUrl = res.data.url
      }
    },
    beforeImgUrlUpload() {

    },
    handleSuccess(res) {
      if (res.code === 0) {
        this.formData.videoUrl = res.data.url
      }
    },
    handleAudioSuccess(res) {
    },
    handleContentSuccess(res) {
    },
    beforeUpload() {

    },
    // 上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 50
      // if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) === -1) {
      //   console.log('请上传正确的视频格式')
      //   return false
      // }
      if (!fileSize) {
        console.log('视频大小不能超过50MB')
        return false
      }
      this.isShowUploadVideo = false
    },
    // 进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    // 上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true
      this.videoFlag = false
      this.videoUploadPercent = 0
      // 前台上传地址
      this.formData.video = res.data.url
      if (file.status === 'success') {
        this.videoForm.showVideoPath = file.url
      } else {
        console.log('上传失败，请重新上传')
      }
    },
    cancelSubmit(name) {
      this.formData.literature = ''
      this.audioFileList = []
      this.contentFileList = []
      this.formData.audioUrl = ''
      this.formData.content = ''
      this.$refs[name].resetFields()
      this.dialogFormVisible = false
    },
    handleSubmit(name) {
      const _this = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          _this.$emit('doSubmit', data)
          _this.cancelSubmit(name)
        }
      })
    },
    openFile(url) {
      window.open(url)
    },
    submitAudioUpload() {
      const formData = new FormData()
      this.audioFileList.forEach(item => {
        formData.append('files', item.raw)
      })
      axios({
        url: this.$config.mutiUploadPath,
        headers: this.headers,
        method: 'post',
        data: formData
      }).then(res => {
        if (res.data.code * 1 === 0) {
          const urlArr = res.data.data
          for (let i = 0; i < this.audioFileList.length; i++) {
            this.audioFileList[i].url = urlArr[i]
            delete this.audioFileList[i].raw
          }
          this.formData.audioUrl = JSON.stringify(this.audioFileList)
          this.$message.success('上传成功')
        }
      })
    },
    handleAudioChange(file, fileList) {
      this.audioFileList = fileList
    },
    handleContentChange(file, fileList) {
      this.contentFileList = fileList
    },
    submitContentUpload() {
      const formData = new FormData()
      this.contentFileList.forEach(item => {
        formData.append('files', item.raw)
      })
      axios({
        url: this.$config.mutiUploadPath,
        headers: this.headers,
        method: 'post',
        data: formData
      }).then(res => {
        if (res.data.code * 1 === 0) {
          const urlArr = res.data.data
          for (let i = 0; i < this.contentFileList.length; i++) {
            this.contentFileList[i].url = urlArr[i]
            delete this.contentFileList[i].raw
          }
          this.formData.content = JSON.stringify(this.contentFileList)
          this.$message.success('上传成功')
        }
      })
    },
    removeAudio(file, fileList) {
      this.audioFileList = fileList
    },
    removeContent(file, fileList) {
      this.contentFileList = fileList
    }
  }
}
</script>

<style scoped lang="less">
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
