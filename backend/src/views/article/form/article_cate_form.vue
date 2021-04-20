<template>
  <el-dialog
    :title="(articleChannel.id ? '编辑文章频道' : '新增文章频道')"
    :visible.sync="dialogFormVisible"
    label-width="130px"
    :close-on-click-modal="false"
    :show-close="false"
    top="8vh"
  >
    <el-form ref="article_cate_form" :model="articleChannel" :rules="rules" label-width="140px">
      <el-form-item label="频道名称" prop="articleChannelName">
        <el-input v-model="articleChannel.articleChannelName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="父频道" prop="parentId">
        <TreeSelect
          v-model="articleChannel.parentId"
          width="100%"
          :options="cateList"
          :props="optionsProps"
          @selected="getParentCateName"
        />
      </el-form-item>
      <el-form-item label="icon" prop="smallIcon">
        <el-upload
          class="logo-uploader"
          :action="$config.uploadPath"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="articleChannel.smallIcon" :src="$config.downloadPath + articleChannel.smallIcon" class="logo">
          <i v-else class="el-icon-plus logo-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="门户展示文章数量">
        <el-input-number v-model="articleChannel.showNumber" :min="0" />
      </el-form-item>
      <el-form-item label="导航栏显示排序">
        <el-input-number v-model="articleChannel.sort" :min="0" />
      </el-form-item>
      <el-form-item label="栏目显示排序" prop="menuSort">
        <el-input-number v-model="articleChannel.menuSort" :min="0" />
      </el-form-item>
      <el-form-item label="app首页显示" prop="isShowApp">
        <el-select v-model="articleChannel.isShowApp" placeholder="请选择">
          <el-option label="显示" :value="1" />
          <el-option label="隐藏" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="显示在首页栏目" prop="isShowMenu">
        <el-select v-model="articleChannel.isShowMenu" placeholder="请选择">
          <el-option label="显示" :value="1" />
          <el-option label="隐藏" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="pc首页菜单栏显示" prop="isShowPc">
        <el-select v-model="articleChannel.isShowPc" placeholder="请选择">
          <el-option label="显示" :value="1" />
          <el-option label="隐藏" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="pc首页一体机显示" prop="isImac">
        <el-select v-model="articleChannel.isImac" placeholder="请选择">
          <el-option label="显示" :value="0" />
          <el-option label="隐藏" :value="1" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('article_cate_form')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('article_cate_form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import TreeSelect from '@/components/tree-select'
import { jsonAssgin } from '@/utils/tools'
import { getSensitiveWord } from '@/api/base'
import { getToken } from '@/utils/auth'

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

    const validatArticleChannelName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入频道名称'))
      } else if (value) {
        validatSensitive(value, callback)
      } else {
        callback()
      }
    }

    return {
      headers: { Authorization: getToken() },
      optionsProps: {
        label: 'articleChannelName',
        children: 'children',
        value: 'id'
      },
      articleChannel: {
        id: '',
        articleChannelName: '',
        smallIcon: '',
        parentId: '',
        showNumber: '',
        sort: '',
        menuSort: '',
        isShowApp: '',
        isShowMenu: '',
        isShowPc: '',
        isImac: ''
      },
      rules: {
        articleChannelName: [{ validator: validatArticleChannelName, trigger: 'blur' }],
        // parentId: [{ required: true, message: '请选择父频道', trigger: 'blur' }],
        isShowApp: [{ required: true, message: '请选择是否在app首页显示', trigger: 'blur' }],
        isShowMenu: [{ required: true, message: '请选择是否显示在首页栏目', trigger: 'blur' }],
        isShowPc: [{ required: true, message: '请选择是否首页菜单栏显示', trigger: 'blur' }],
        isImac: [{ required: true, message: '请选择是否在一体机显示', trigger: 'blur' }]
      },
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(n) {
        this.articleChannel = jsonAssgin(this.articleChannel, n)
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    handleSuccess(res) {
      if (res.code === 0) {
        this.articleChannel.smallIcon = res.data.url
      }
    },
    beforeUpload() {

    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.articleChannel))
          this.$emit('doSubmit', data)
          this.cancelSubmit(name)
        }
      })
    },
    cancelSubmit(name) {
      this.$refs[name].resetFields()
      this.articleChannel.smallIcon = ''
      this.dialogFormVisible = false
    },
    getParentCateName(id) {
      const arr = this.cateList
      const index = arr.findIndex(item => item.id === id)
      this.articleChannel.parentId = index !== -1 && arr[index].parentId ? arr[index].parentId : '-'
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
