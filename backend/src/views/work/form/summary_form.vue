<template>
  <el-dialog
    :title="'会议纪要'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="15vh"
  >
    <el-form ref="SummaryForm" :model="formData" :rules="rules" label-width="100px">
      <el-row>
        <!--        <el-col :span="24">-->
        <!--          <el-form-item label="记录人" prop="title">-->
        <!--            <el-input v-model="formData.title" placeholder="请输入会议主题" />-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <el-col :span="24">
          <el-form-item label="会议内容" prop="content">
            <el-input v-model="formData.content" type="textarea" rows="2" placeholder="请输入会议内容" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="意见及建议" prop="feedback">
            <el-input v-model="formData.feedback" placeholder="请输入意见及建议" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会议记录图片" prop="hostMan">
            <el-upload
              class="upload-demo"
              :action="$config.uploadPath"
              :headers="headers"
              :on-preview="handleRecordImgUrlPreview"
              :on-remove="handleRecordImgUrlRemove"
              :before-remove="beforeRecordImgUrlRemove"
              :on-success="handleRecordImgUrlSuccess"
              multiple
              :limit="3"
              :on-exceed="handleRecordImgUrlExceed"
              :file-list="defaultRecordImgUrl"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="会场图片" prop="hostMan">
            <el-upload
              class="upload-demo"
              :action="$config.uploadPath"
              :headers="headers"
              :on-preview="handlePlaceImgUrlPreview"
              :on-remove="handlePlaceImgUrlRemove"
              :before-remove="beforePlaceImgUrlRemove"
              :on-success="handlePlaceImgUrlSuccess"
              multiple
              :limit="3"
              :on-exceed="handlePlaceImgUrlExceed"
              :file-list="defaultPlaceImgUrl"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="音频文件" prop="hostMan">
            <el-upload
              class="upload-demo"
              :action="$config.uploadPath"
              :headers="headers"
              :on-preview="handleAudioUrlPreview"
              :on-remove="handleAudioUrlRemove"
              :before-remove="beforeAudioUrlRemove"
              :on-success="handleAudioUrlSuccess"
              multiple
              :limit="1"
              :on-exceed="handleAudioUrlExceed"
              :file-list="defaultAudioUrl"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="视频文件" prop="hostMan">
            <el-upload
              class="upload-demo"
              :action="$config.uploadPath"
              :headers="headers"
              :on-preview="handleVideoUrlPreview"
              :on-remove="handleVideoUrlRemove"
              :before-remove="beforeVideoUrlRemove"
              :on-success="handleVideoUrlSuccess"
              multiple
              :limit="1"
              :on-exceed="handleVideoUrlExceed"
              :file-list="defaultVideoUrl"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="附件文件" prop="hostMan">
            <el-upload
              class="upload-demo"
              :action="$config.uploadPath"
              :headers="headers"
              :on-preview="handleAnnexUrlPreview"
              :on-remove="handleAnnexUrlRemove"
              :before-remove="beforeAnnexUrlRemove"
              :on-success="handleAnnexUrlSuccess"
              multiple
              :limit="3"
              :on-exceed="handleAnnexUrlExceed"
              :file-list="defaultAnnexUrl"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('SummaryForm')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('SummaryForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'

export default {
  name: 'SummaryForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    meetingTypes: {
      type: Array,
      default: () => []
    },
    orgTree: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: { Authorization: getToken() },
      formData: {
        meetingId: '',
        content: '',
        feedback: '',
        recordImgUrl: '',
        placeImgUrl: '',
        audioUrl: '',
        videoUrl: '',
        annexUrl: ''
      },
      defaultRecordImgUrl: [],
      removeRecordImgUrlIndex: 0,
      defaultPlaceImgUrl: [],
      removePlaceImgUrlIndex: 0,
      defaultAudioUrl: [],
      removeAudioUrlIndex: 0,
      defaultVideoUrl: [],
      removeVideoUrlIndex: 0,
      defaultAnnexUrl: [],
      removeAnnexUrlIndex: 0,
      rules: {
        title: { required: true, message: '请输入会议主题', trigger: 'blur' },
        address: { required: true, message: '请输入会议地址', trigger: 'blur' },
        conveneTime: { required: true, message: '请选择会议时间', trigger: 'blur' },
        times: { required: true, message: '请输入会议时长', trigger: 'blur' },
        meetingTypeId: { required: true, message: '请选择会议类型', trigger: 'blur' },
        participants: { required: true, message: '请选择参会人员', trigger: 'blur' }
      },
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        const tmp = jsonAssgin(this.formData, val)
        tmp.recordImgUrl = tmp.recordImgUrl.length ? JSON.parse(tmp.recordImgUrl) : []
        tmp.placeImgUrl = tmp.placeImgUrl.length ? JSON.parse(tmp.placeImgUrl) : []
        tmp.audioUrl = tmp.audioUrl.length ? JSON.parse(tmp.audioUrl) : []
        tmp.videoUrl = tmp.videoUrl.length ? JSON.parse(tmp.videoUrl) : []
        tmp.annexUrl = tmp.annexUrl.length ? JSON.parse(tmp.annexUrl) : []
        this.formData = tmp
        this.defaultRecordImgUrl = tmp.recordImgUrl.reduce((res, current) => {
          const t = current.split('/')
          res.push({
            name: t[t.length - 1],
            url: current
          })
          return res
        }, [])

        this.defaultPlaceImgUrl = tmp.placeImgUrl.reduce((res, current) => {
          const t = current.split('/')
          res.push({
            name: t[t.length - 1],
            url: current
          })
          return res
        }, [])
        this.defaultAudioUrl = tmp.audioUrl.reduce((res, current) => {
          const t = current.split('/')
          res.push({
            name: t[t.length - 1],
            url: current
          })
          return res
        }, [])

        this.defaultVideoUrl = tmp.videoUrl.reduce((res, current) => {
          const t = current.split('/')
          res.push({
            name: t[t.length - 1],
            url: current
          })
          return res
        }, [])
        this.defaultAnnexUrl = tmp.annexUrl.reduce((res, current) => {
          const t = current.split('/')
          res.push({
            name: t[t.length - 1],
            url: current
          })
          return res
        }, [])

        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    handleRecordImgUrlSuccess(res) {
      if (res.code === 0) {
        const recordImgUrl = this.formData.recordImgUrl ? JSON.parse(JSON.stringify(this.formData.recordImgUrl)) : []
        recordImgUrl.push(res.data.url)
        this.formData.recordImgUrl = recordImgUrl
      }
    },
    handleRecordImgUrlRemove(file, fileList) {
      const recordImgUrl = JSON.parse(JSON.stringify(this.formData.recordImgUrl))
      recordImgUrl.splice(this.removeRecordImgUrlIndex, 1)
      this.formData.recordImgUrl = recordImgUrl
    },
    handleRecordImgUrlPreview(file) {
      console.log(file)
    },
    handleRecordImgUrlExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRecordImgUrlRemove(file, fileList) {
      this.removeRecordImgUrlIndex = fileList.findIndex(v => v.uid === file.uid)
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    handlePlaceImgUrlSuccess(res) {
      if (res.code === 0) {
        const placeImgUrl = this.formData.placeImgUrl ? JSON.parse(JSON.stringify(this.formData.placeImgUrl)) : []
        placeImgUrl.push(res.data.url)
        this.formData.placeImgUrl = placeImgUrl
      }
    },
    handlePlaceImgUrlRemove(file, fileList) {
      const placeImgUrl = JSON.parse(JSON.stringify(this.formData.placeImgUrl))
      placeImgUrl.splice(this.removePlaceImgUrlIndex, 1)
      this.formData.placeImgUrl = placeImgUrl
    },
    handlePlaceImgUrlPreview(file) {
      console.log(file)
    },
    handlePlaceImgUrlExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforePlaceImgUrlRemove(file, fileList) {
      this.removePlaceImgUrlIndex = fileList.findIndex(v => v.uid === file.uid)
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    handleAudioUrlSuccess(res) {
      if (res.code === 0) {
        const audioUrl = this.formData.audioUrl ? JSON.parse(JSON.stringify(this.formData.audioUrl)) : []
        audioUrl.push(res.data.url)
        this.formData.audioUrl = audioUrl
      }
    },
    handleAudioUrlRemove(file, fileList) {
      const audioUrl = JSON.parse(JSON.stringify(this.formData.audioUrl))
      audioUrl.splice(this.removeAudioUrlIndex, 1)
      this.formData.audioUrl = audioUrl
    },
    handleAudioUrlPreview(file) {
      console.log(file)
    },
    handleAudioUrlExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeAudioUrlRemove(file, fileList) {
      this.removeAudioUrlIndex = fileList.findIndex(v => v.uid === file.uid)
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    handleVideoUrlSuccess(res) {
      if (res.code === 0) {
        const videoUrl = this.formData.videoUrl ? JSON.parse(JSON.stringify(this.formData.videoUrl)) : []
        videoUrl.push(res.data.url)
        this.formData.videoUrl = videoUrl
      }
    },
    handleVideoUrlRemove(file, fileList) {
      const videoUrl = JSON.parse(JSON.stringify(this.formData.videoUrl))
      videoUrl.splice(this.removeVideoUrlIndex, 1)
      this.formData.videoUrl = videoUrl
    },
    handleVideoUrlPreview(file) {
      console.log(file)
    },
    handleVideoUrlExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeVideoUrlRemove(file, fileList) {
      this.removeVideoUrlIndex = fileList.findIndex(v => v.uid === file.uid)
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    handleAnnexUrlSuccess(res) {
      if (res.code === 0) {
        const annexUrl = this.formData.annexUrl ? JSON.parse(JSON.stringify(this.formData.annexUrl)) : []
        annexUrl.push(res.data.url)
        this.formData.annexUrl = annexUrl
      }
    },
    handleAnnexUrlRemove(file, fileList) {
      const annexUrl = JSON.parse(JSON.stringify(this.formData.annexUrl))
      annexUrl.splice(this.removeAnnexUrlIndex, 1)
      this.formData.annexUrl = annexUrl
    },
    handleAnnexUrlPreview(file) {
      console.log(file)
    },
    handleAnnexUrlExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeAnnexUrlRemove(file, fileList) {
      this.removeAnnexUrlIndex = fileList.findIndex(v => v.uid === file.uid)
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    cancelSubmit(name) {
      this.defaultRecordImgUrl = []
      this.removeRecordImgUrlIndex = 0
      this.defaultPlaceImgUrl = []
      this.removePlaceImgUrlIndex = 0
      this.defaultAudioUrl = []
      this.removeAudioUrlIndex = 0
      this.defaultVideoUrl = []
      this.removeVideoUrlIndex = 0
      this.defaultAnnexUrl = []
      this.removeAnnexUrlIndex = 0
      this.dialogFormVisible = false
      this.$refs[name].resetFields()
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          data.recordImgUrl = JSON.stringify(data.recordImgUrl)
          data.placeImgUrl = JSON.stringify(data.placeImgUrl)
          data.audioUrl = JSON.stringify(data.audioUrl)
          data.videoUrl = JSON.stringify(data.videoUrl)
          data.annexUrl = JSON.stringify(data.annexUrl)
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
