<template>
  <el-dialog
    :title="formData.id ? '编辑 - 会议' : '新增 - 会议'"
    :visible.sync="dialogFormVisible"
    label-width="160px"
    :close-on-click-modal="false"
    :show-close="false"
    top="1vh"
    width="60%"
  >
    <el-form ref="OrgLifeForm" :model="formData" :rules="rules" label-width="140px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="会议主题" prop="title">
            <el-input v-model="formData.title" placeholder="请输入会议主题" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主持人" prop="hostMan">
            <el-input v-model="formData.hostMan" placeholder="请输入主持人" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="会议地点" prop="address">
            <el-input v-model="formData.address" placeholder="请输入会议地点" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主讲人" prop="speaker">
            <el-input v-model="formData.speaker" placeholder="请输入主讲人" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开始时间" prop="conveneTime">
            <el-date-picker
              v-model="formData.conveneTime"
              type="datetime"
              placeholder="请选择开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="09:00:00"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="会议时长(分钟)" prop="times">
            <el-input v-model.trim="formData.times" type="number" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="会议类型" prop="meetingTypeId">
            <el-select v-model="formData.meetingTypeId" placeholder="请选择会议类型">
              <el-option
                v-for="item in meetingTypes"
                :key="item.id"
                :label="item.userTypeName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="会议议题" prop="topics">
            <el-input v-model="formData.topics" type="textarea" rows="2" placeholder="请输入会议议题" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="附件上传" prop="annexUrl">
            <el-upload
              class="upload-demo"
              :action="$config.uploadPath"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="handleSuccess"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="defaultAnnexUrl"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="会议回执">
            <receiptTable v-model="formData.receiptHeader" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="joins-box">
          <el-form-item label="参会人员" prop="participants">
            <el-cascader v-model="orgId" :options="orgTree" :props="cascaderProps" class="joins" @change="getUsers" />
            <el-transfer
              v-model="participants"
              filterable
              filter-placeholder="请输入名字"
              :titles="['可选人员', '选中人员']"
              :props="transferProps"
              :data="transferData"
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('OrgLifeForm')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('OrgLifeForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'
import { getUsersByWhere } from '@/api/base'
import receiptTable from './receipt_table'

export default {
  name: 'OrgLifeForm',
  components: {
    receiptTable
  },
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
      pickerOptions: {
        disabledDate(time) {
          // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          // return time.getTime() > Date.now()//选当前时间之前的时间
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      orgId: '',
      headers: { Authorization: getToken() },
      cascaderProps: {
        checkStrictly: true,
        children: 'children',
        label: 'label',
        value: 'id'
      },
      transferProps: {
        key: 'id',
        label: 'userName'
      },
      transferData: [],
      participants: [],
      defaultAnnexUrl: [],
      removeIndex: 0,
      formData: {
        id: '',
        title: '',
        hostMan: '',
        address: '',
        speaker: '',
        conveneTime: '',
        times: '',
        meetingTypeId: '',
        topics: '',
        imgUrl: '',
        annexUrl: [],
        videoUrl: '',
        participants: [],
        receiptHeader: []
      },
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
        if (tmp.receiptHeader && tmp.receiptHeader.length) {
          tmp.receiptHeader = JSON.parse(tmp.receiptHeader)
        } else {
          tmp.receiptHeader = []
        }
        this.formData = tmp
        this.transferData = tmp.participants
        this.participants = tmp.participants.reduce((res, current) => {
          res.push(current.id)
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
    handleChange(value, direction, movedKeys) {
      if (direction === 'right') {
        const transferData = JSON.parse(JSON.stringify(this.transferData))
        const tmpArr = transferData.filter(item => movedKeys.indexOf(item.id) > -1)
        const participants = JSON.parse(JSON.stringify(this.formData.participants))
        const tmp = participants.concat(tmpArr)
        const temp = new Map()
        this.formData.participants = tmp.filter((item) => !temp.has(item.id) && temp.set(item.id, true))
      } else {
        const tmp = JSON.parse(JSON.stringify(this.formData.participants))
        const tmpKey = JSON.parse(JSON.stringify(this.participants))
        this.formData.participants = tmp.filter(item => tmpKey.indexOf(item.id) > -1)
      }
    },
    handleSuccess(res) {
      if (res.code === 0) {
        const annexUrl = JSON.parse(JSON.stringify(this.formData.annexUrl))
        annexUrl.push(res.data.url)
        this.formData.annexUrl = annexUrl
      }
    },
    handleRemove(file, fileList) {
      const annexUrl = JSON.parse(JSON.stringify(this.formData.annexUrl))
      annexUrl.splice(this.removeIndex, 1)
      this.formData.annexUrl = annexUrl
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      this.removeIndex = fileList.findIndex(v => v.uid === file.uid)
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    getUsers(d) {
      getUsersByWhere({ orgId: d[d.length - 1] }).then(res => {
        if (res.code * 1 === 0) {
          this.transferData = res.data
        }
      })
    },
    cancelSubmit(name) {
      this.transferData = []
      this.participants = []
      this.defaultAnnexUrl = []
      this.removeIndex = 0
      this.formData.receiptHeader = []
      this.dialogFormVisible = false
      this.$refs[name].resetFields()
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          data.participants = data.participants ? JSON.stringify(data.participants) : ''
          data.annexUrl = data.annexUrl ? JSON.stringify(data.annexUrl) : ''
          data.conveneTime = this.$moment(data.conveneTime).valueOf() / 1000
          data.receiptHeader = data.receiptHeader.length ? JSON.stringify(data.receiptHeader) : ''
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
