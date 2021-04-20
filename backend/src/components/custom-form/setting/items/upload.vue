<template>
  <div>
    <el-upload
      v-model="fieldValue"
      class="logo-uploader"
      multiple
      v-bind="$attrs"
      :action="$config.uploadPath"
      :show-file-list="false"
      :headers="headers"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      v-on="$listeners"
    >
      <el-button icon="ios-cloud-upload-outline" size="mini">上传文件</el-button>
    </el-upload>
    <div class="list" style="margin-top: 10px">
      <div v-for="(item, index) in fieldValue" :key="index">
        <div v-if="item">
          <a :href="downloadUrl + '?name=' + item">{{ item }}</a>
          <span v-if="fieldValue.length>0&&!disabled" class="deleteIcon" @click="removeAttachment(index)">x</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '../../../../utils/auth'

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
      headers: { Authorization: getToken() },
      attachment: [],
      header: {},
      downloadUrl: '/api/common/download/resource',
      uploadUrl: ''
    }
  },
  computed: {
    fieldValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    disabled: {
      get() {
        return this.$attrs.disabled
      }
    }
  },
  mounted() {
    this.attachment = this.fieldValue
  },
  beforeDestroy() {
    this.attachment = []
  },
  methods: {
    beforeUpload() {

    },
    handleSuccess(res) {
      console.log(this.$config.downloadPath)
      if (res.code === 0) {
        this.attachment.push(res.data.url)
        this.fieldValue = this.attachment
        console.log(this.fieldValue)
      }
    },
    removeAttachment(index) {
      this.attachment.splice(index, 1)
      this.fieldValue = this.attachment
    }
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

  .deleteIcon {
    margin-left: 10px;
    display: inline-block;
    height: 20px;
    width: 20px;
    line-height: 20px;
    background: red;
    color: #fff;
    border-radius: 100%;
    cursor: pointer;
    text-align: center;
  }
</style>
