<template>
  <el-dialog
    :title="(formData.id ? ('编辑 - ' + title) : ('添加 - ' + title))"
    :visible.sync="dialogFormVisible"
    :width="formSetting.width"
    label-width="120px"
    :close-on-click-modal="formSetting.closeOnClickModal"
    :show-close="formSetting.showClose"
    :top="formSetting.showTop"
    class="super-form"
  >
    <el-form ref="SuperForm" :model="formData" :label-width="formSetting.formLabelWidth">
      <el-form-item
        v-for="(paramItem, index) in params"
        :key="index"
        :label="paramItem.label"
        :prop="paramItem.key"
        :rules="paramItem.rules"
      >
        <el-input v-if="paramItem.type === 'text'" v-model="formData[paramItem.key]" type="text" :placeholder="paramItem.placeholder" />
        <el-input-number v-if="paramItem.type === 'number'" v-model="formData[paramItem.key]" :min="0" :placeholder="paramItem.placeholder" />
        <el-input v-if="paramItem.type === 'textarea'" v-model="formData[paramItem.key]" type="textarea" :rows="paramItem.rows" :placeholder="paramItem.placeholder" />
        <el-select v-if="paramItem.type === 'select'" v-model="formData[paramItem.key]" :placeholder="paramItem.placeholder">
          <el-option
            v-for="item in paramItem.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-radio-group v-if="paramItem.type === 'radio'" v-model="formData[paramItem.key]">
          <el-radio
            v-for="item in paramItem.options"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}
          </el-radio>
        </el-radio-group>
        <el-checkbox-group v-if="paramItem.type === 'checkbox'" v-model="formData[paramItem.key]">
          <el-checkbox
            v-for="item in paramItem.options"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
        <el-date-picker
          v-if="paramItem.type === 'datetime'"
          v-model="formData[paramItem.key]"
          :type="paramItem.format ? paramItem.format: 'datetime' "
          :placeholder="paramItem.placeholder"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="09:00:00"
        />
        <el-switch v-if="paramItem.type === 'switch'" v-model="formData[paramItem.key]" :active-value="paramItem.activeValue" :inactive-value="paramItem.inactiveValue" />
        <el-upload
          v-if="paramItem.type === 'upload'"
          class="logo-uploader"
          :action="$config.uploadPath"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :on-change="changekey(paramItem.key)"
        >
          <img v-if="formData[paramItem.key]" :src="$config.downloadPath + formData[paramItem.key]" class="logo">
          <i v-else class="el-icon-plus logo-uploader-icon" />
        </el-upload>
        <editor-bar v-if="paramItem.type === 'editor'" v-model="formData[paramItem.key]" is-clear:false />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('SuperForm')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('SuperForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import EditorBar from '@/components/WangEditor'
import { getToken } from '@/utils/auth'

export default {
  name: 'SuperForm',
  components: { EditorBar },
  props: {
    title: {
      type: String,
      default: ''
    },
    formSetting: {
      type: Object,
      default: () => {
        return {
          closeOnClickModal: false,
          showClose: false,
          showTop: '8vh',
          formLabelWidth: '80px',
          width: ''
        }
      }
    },
    params: {
      type: Array,
      default() {
        return [
          {
            type: 'text',
            label: '题目',
            key: 'questionTitle',
            placeholder: '请输入题目',
            rules: {
              required: true, message: '题目不能为空', trigger: 'blur'
            }
          },
          {
            type: 'textarea',
            label: '详细内容',
            key: 'content',
            rows: 2,
            placeholder: '请输入详细内容',
            rules: {
              required: true, message: '详细内容不能为空', trigger: 'blur'
            }
          },
          {
            type: 'datetime',
            label: '开始时间',
            format: 'datetime', // month
            key: 'startTime',
            placeholder: '请选择开始时间',
            rules: {
              required: true, message: '开始时间不能为空', trigger: 'blur'
            }
          },
          {
            type: 'datetime',
            label: '结束时间',
            key: 'endTime',
            placeholder: '请选择结束时间',
            rules: {
              required: true, message: '结束时间不能为空', trigger: 'blur'
            }
          },
          {
            type: 'switch',
            label: '二维码签到',
            key: 'qrcodeSign',
            activeValue: '1',
            inactiveValue: '0'
          },
          {
            type: 'select',
            label: '试题类型',
            key: 'mold',
            placeholder: '请选择试卷类型',
            options: [
              {
                value: '1',
                label: '单选题'
              },
              {
                value: '2',
                label: '多选题'
              },
              {
                value: '3',
                label: '问答题'
              }
            ]
          },
          {
            type: 'radio',
            label: '正确答案',
            key: 'answer',
            placeholder: '请选择正确答案',
            options: [
              {
                value: '1',
                label: '爱你'
              },
              {
                value: '2',
                label: '滚'
              },
              {
                value: '3',
                label: '握草'
              }
            ]
          },
          {
            type: 'upload',
            label: '附件上传',
            key: 'files'
          }
        ]
      }
    },
    value: {
      type: Object,
      default: () => {
      }
    },
    rules: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      headers: { Authorization: getToken() },
      uploadKey: '',
      formData: {},
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        const tmpVal = JSON.parse(JSON.stringify(val))
        delete tmpVal.refresh
        this.formData = tmpVal
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  mounted() {
  },
  activated() {
  },
  destroyed() {
  },
  methods: {
    changekey(key) {
      this.uploadKey = key
    },
    handleSuccess(res) {
      if (res.code === 0) {
        this.formData[this.uploadKey] = res.data.url
      }
    },
    beforeUpload() {
    },
    cancelSubmit(name) {
      this.$refs[name].resetFields()
      this.dialogFormVisible = false
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          this.$emit('doSubmit', data)
          this.cancelSubmit(name)
        }
      })
    }
  }
}
</script>

<style type="less" scoped>
  .super-form{
  }
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
