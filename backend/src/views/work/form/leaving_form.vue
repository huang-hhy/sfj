<template>
  <el-dialog
    title="留言详情"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="15vh"
  >
    <el-form ref="LeavingForm" :model="formData" label-width="100px">
      <el-form-item label="留言人">
        <el-input v-model="formData.userName" disabled />
      </el-form-item>
      <el-form-item label="留言时间">
        <el-date-picker
          v-model="formData.createTime"
          type="datetime"
          disabled
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="09:00:00"
        />
      </el-form-item>
      <el-form-item label="留言内容">
        <el-input v-model="formData.content" type="textarea" rows="5" disabled />
      </el-form-item>
      <el-form-item label="留言图片">
        <ul v-for="(item,idx) in defaultList" :key="idx" class="el-upload-list el-upload-list--picture-card" :index="idx">
          <li class="el-upload-list__item is-success">
            <img :src="item.path" class="el-upload-list__item-thumbnail">
          </li>
        </ul>
      </el-form-item>

      <el-form-item label="审核状态">
        <el-switch
          v-model="formData.isPublic"
          active-text="公开"
          inactive-text="非公开"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="0"
          :inactive-value="1"
        />
      </el-form-item>
      <el-form-item label="回复内容">
        <el-input v-model="formData.reply" type="textarea" rows="5" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('LeavingForm')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('LeavingForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
// import { getToken } from '@/utils/auth'

export default {
  name: 'LeavingForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      formData: {
        id: '',
        userName: '',
        content: '',
        createTime: '',
        status: '0',
        isPublic: '',
        imgUrl: '',
        reply: ''
      },
      defaultList: [],
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = jsonAssgin(this.formData, val)
        const imgUrl = this.formData.imgUrl ? JSON.parse(this.formData.imgUrl) : []
        const res = []
        for (var i in imgUrl) {
          res.push({
            name: imgUrl[i],
            path: this.$config.downloadPath + imgUrl[i]
          })
        }
        this.defaultList = res
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    handlePictureCardPreview() {

    },
    handleRemove() {

    },
    cancelSubmit(name) {
      this.dialogFormVisible = false
      this.formData.reply = ''
      this.$refs[name].resetFields()
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          data.createTime = data.createTime ? this.$moment(data.createTime).valueOf() / 1000 : ''
          this.$emit('doSubmit', data)
          this.cancelSubmit(name)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.joins-box .joins {
  width: 100%;
  margin-bottom: 20px;
}

.joins-box .el-transfer-panel__item.el-checkbox {
  display: block !important;
}
</style>
