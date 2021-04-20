<template>
  <el-dialog
    :title="(article.id ? '编辑文章' : '新增文章')"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="8vh"
    :append-to-body="true"
  >
    <el-form ref="article_form" :model="article" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="articleTitle">
        <el-input v-model="article.articleTitle" type="textarea" placeholder="请输入文章标题" />
      </el-form-item>
      <el-form-item label="logo" prop="articleShowImg">
        <el-upload
          class="logo-uploader"
          :action="$config.uploadPath"
          :show-file-list="false"
          :headers="headers"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="article.articleShowImg" :src="$config.downloadPath + article.articleShowImg" class="logo">
          <i v-else class="el-icon-plus logo-uploader-icon" />
        </el-upload>
        <el-button v-if="article.articleShowImg" class="logoDel" type="danger" size="mini" round @click="logoDel">删除
        </el-button>

      </el-form-item>
      <el-form-item label="内容" prop="articleInfo">
        <vue-ueditor-wrap v-model="article.articleInfo.content" :config="myConfig" />
        <!--        <editor-bar v-model="article.articleInfo.content" :is-clear="isClear" @change="change" />-->
        <!--        <Tinymce ref="tinymce" v-model="article.articleInfo.content" />-->
      </el-form-item>
      <el-form-item label="频道" prop="articleChannelId">
        <TreeSelect
          v-model="article.articleChannelId"
          width="100%"
          :options="cateList"
          :props="optionsProps"
          @selected="getCateName"
        />
      </el-form-item>
      <el-form-item label="文章视频" prop="videoUrl">
        <el-upload
          class="logo-uploader"
          :action="$config.uploadPath"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
          accept=".wmv,.asf,.asx,.rm,. rmvb,.mpg,.mpeg,.mpemp4,.3gp,.mov,.m4v,.avi,.dat,.mkv,.flv,.vob,.mp4"
        >
          <!--          <img v-if="article.articleShowImg" :src="$config.downloadPath + article.articleShowImg" class="logo">-->
          <el-button type="primary" size="small">点击上传</el-button>
        </el-upload>
        <el-progress v-if="progressBar" :percentage="percentage" color="#67c23a" />
        <el-link v-if="article.videoUrl" type="primary" @click="openVideo('/api' + article.videoUrl)">查看视频</el-link>
      </el-form-item>
      <el-form-item label="专属名" prop="articleName">
        <el-input v-model="article.articleName" placeholder="请输入专属名" />
      </el-form-item>
      <el-form-item label="文章来源" prop="source">
        <el-input v-model="article.source" placeholder="请输入文章来源" />
      </el-form-item>
      <el-form-item label="显示排序" prop="sort">
        <el-input-number v-model="article.sort" />
      </el-form-item>
      <el-form-item label="首页展示" prop="isShow">
        <el-select v-model="article.isShow" placeholder="请选择是否首页展示">
          <el-option label="是" :value="1" />
          <el-option label="否" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否置顶" prop="isHot">
        <el-select v-model="article.isHot" placeholder="请选择是否首页展示">
          <el-option label="是" :value="1" />
          <el-option label="否" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="附件上传">
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
      <el-form-item label="状态" prop="status">
        <el-select v-model="article.status" placeholder="请选择文章状态">
          <el-option label="正常" :value="'0'" />
          <el-option label="停用" :value="'1'" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('article_form')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('article_form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import TreeSelect from '@/components/tree-select'
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'
import { getSensitiveWord } from '@/api/base'
import axios from 'axios'

export default {
  name: 'ArticleForm',
  components: { TreeSelect },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    cateList: {
      type: Array,
      default: () => []
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

    const validatArticleTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入文章标题'))
      } else if (value) {
        validatSensitive(value, callback)
      } else {
        callback()
      }
    }

    // const validatArticleName = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入专属名'))
    //   } else if (value) {
    //     validatSensitive(value, callback)
    //   } else {
    //     callback()
    //   }
    // }

    const validatArticleInfo = (rule, value, callback) => {
      if (!value.content || value.content === '') {
        callback(new Error('请输入文章内容'))
      } else if (value.content) {
        validatSensitive(value.content, callback)
      } else {
        callback()
      }
    }

    return {
      isClear: false,
      headers: { Authorization: getToken() },
      imageUrl: '',
      optionsProps: {
        label: 'articleChannelName',
        children: 'children',
        value: 'id'
      },
      article: {
        id: '',
        articleChannelId: '',
        articleTitle: '',
        articleName: '',
        sort: 0,
        isShow: '',
        status: '',
        articleInfo: { content: '' },
        browseNumber: 0,
        articleShowImg: '',
        enclosure: '',
        isHot: 0,
        source: ''
      },
      percentage: 0,
      progressBar: false,
      contentFileList: [],
      rules: {
        articleTitle: [{ validator: validatArticleTitle, trigger: 'blur' }],
        // articleShowImg: [{ required: true, message: '请添加文章展示图', trigger: 'blur' }],
        // articleName: [{ validator: validatArticleName, trigger: 'blur' }],
        articleChannelId: [{ required: true, message: '请选择文章频道', trigger: 'blur' }],
        isShow: [{ required: true, message: '请选择是否首页展示', trigger: 'blur' }],
        status: [{ required: true, message: '请选择文章状态', trigger: 'blur' }],
        articleInfo: [{ validator: validatArticleInfo, trigger: 'blur' }]
      },
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 500,
        // headers: { Authorization: getToken() },
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！部署在国外的服务器，如果无法访问，请自备梯子）
        serverUrl: '/api/ueditor/exec',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/UEditor/'
      },
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(n) {
        this.article = jsonAssgin(this.article, n)
        if (this.$refs['tinymce'] !== undefined) {
          this.$refs['tinymce'].setContent(this.article.articleInfo.content)
        }
        if (this.article.enclosure && JSON.parse(this.article.enclosure)) {
          this.$set(this, 'contentFileList', JSON.parse(this.article.enclosure))
        }
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    change(val) {
      console.log(val)
    },
    logoDel() {
      this.article.articleShowImg = ''
    },
    handleSuccess(res) {
      if (res.code === 0) {
        this.article.articleShowImg = res.data.url
      }
    },
    handleVideoSuccess(res) {
      if (res.code === 0) {
        // this.article.videoUrl = res.data.url
        this.$set(this.article, 'videoUrl', res.data.url)
        this.$message.success('上传成功')
        this.percentage = 100
      }
    },
    beforeVideoUpload() {
      this.progressBar = true
      this.percentage = 0
    },
    beforeUpload() {

    },
    getCateName(id) {
      const arr = this.cateList
      const index = arr.findIndex(item => item.id === id)
      this.article.articleChannelName = index !== -1 && arr[index].articleChannelName ? arr[index].articleChannelName : ''
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.article))
          this.$emit('doSubmit', data)
          this.cancelSubmit(name)
        }
      })
    },
    cancelSubmit(name) {
      this.$refs[name].resetFields()
      this.article.enclosure = ''
      this.contentFileList = []
      this.article.articleShowImg = ''
      this.percentage = 0
      this.progressBar = false
      this.dialogFormVisible = false
    },
    openVideo(url) {
      window.open(url)
    },
    handleContentSuccess(res) {
    },
    handleContentChange(file, fileList) {
      this.contentFileList = fileList
    },
    removeContent(file, fileList) {
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
          this.article.enclosure = JSON.stringify(this.contentFileList)
          this.$message.success('上传成功')
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

.logoDel {
  position: absolute;
  bottom: 10px;
  left: 150px;
}
</style>
