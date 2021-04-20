<template>
  <div>
    <el-upload
      :limit="1"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      ref="upload"
      action="string"
      list-type="picture-card"
      :http-request="UploadImage">
      <i class="el-icon-plus"></i>
    </el-upload>
    <div class="list" style="margin-top: 10px">
      <a :href="downloadUrl + '?name=' + uploadAnnexUrl">{{ uploadAnnexUrl }}</a>
    </div>
  </div>
</template>

<script>
  import {uploadFile} from '@/api/pc'

  export default {
    inject: ['xdhForm'],
    props: {
      value: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        downloadUrl: '/api/common/download/resource',
        uploadAnnexUrl: ''
      }
    },
    methods: {
      handleExceed() {
        this.$message.warning('只能上传一个文件，请先移除之前上传的文件')
      },
      handleRemove() {
        this.$message.success('移除文件成功')
        this.uploadAnnexUrl = ''
      },
      UploadImage(param) {
        let fd = new FormData()
        fd.append('file', param.file)  //要提交给后台的文件
        uploadFile(fd).then(res => {
          if (res.code === 0) {
            this.uploadAnnexUrl = res.data.url
          }
        })
      },
    }
  }
</script>
<style scoped>
  .list {
    height: 120px;
    overflow-x: hidden;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding-left: 20px;
    font-size: 14px;
    width: 100%;
  }
</style>
