<template>
  <el-dialog
    :title="(rotation.id ? '编辑轮播图' : '新增轮播图')"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="8vh"
  >
    <el-form ref="rotation_form" :model="rotation" :rules="rules" label-width="80px">
      <!--      <el-form-item label="路径" prop="path">-->
      <!--        <el-input v-model="rotation.path" placeholder="请输入轮播图标题"/>-->
      <!--      </el-form-item>-->
      <el-form-item label="频道" prop="channelId">
        <TreeSelect
          v-model="rotation.channelId"
          width="100%"
          :options="cateList"
          :props="optionsProps"
          @selected="getCateName"
        />
      </el-form-item>
      <el-form-item label="尺寸" prop="bannerSize">
        <el-select v-model="rotation.bannerSize" disabled>
          <!-- <el-option
            :label="'1000*85'"
            :value="'1000*85'"
          /> -->
          <el-option
            :label="'1000*140'"
            :value="'1000*140'"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="logo" prop="showImg">
        <el-upload
          class="logo-uploader"
          :action="$config.uploadPath"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="rotation.showImg" :src="$config.downloadPath + rotation.showImg" class="logo">
          <i v-else class="el-icon-plus logo-uploader-icon" />
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('rotation_form')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('rotation_form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'
import TreeSelect from '@/components/tree-select'

export default {
  name: 'RotationForm',
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
    return {
      headers: { Authorization: getToken() },
      rotation: {
        id: '',
        showImg: '',
        channelId: '',
        channelName: '',
        bannerSize: ''
      },
      optionsProps: {
        label: 'articleChannelName',
        children: 'children',
        value: 'id'
      },
      rules: {
        showImg: [{ required: true, message: '请添加轮播图展示图', trigger: 'blur' }],
        bannerSize: [{ required: true, message: '请填写轮播图尺寸', trigger: 'blur' }]
      },
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(n) {
        this.rotation = jsonAssgin(this.rotation, n)
        console.log(this.rotation)
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    handleSuccess(res) {
      if (res.code === 0) {
        this.rotation.showImg = res.data.url
      }
    },
    beforeUpload() {

    },
    getCateName(id) {
      const arr = this.cateList
      const index = arr.findIndex(item => item.id === id)
      this.rotation.channelName = index !== -1 && arr[index].articleChannelName ? arr[index].articleChannelName : ''
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.rotation))
          this.$emit('doSubmit', data)
          this.cancelSubmit(name)
        }
      })
    },
    cancelSubmit(name) {
      this.$refs[name].resetFields()
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
