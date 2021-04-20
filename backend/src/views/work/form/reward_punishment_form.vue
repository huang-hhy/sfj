<template>
  <el-dialog
    :title="formData.id ? '编辑 - ' + title : '新增 - ' + title"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="1vh"
  >
    <el-form ref="RewardPunishmentForm" :model="formData" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item :label="title+'名称'" prop="title">
            <el-input v-model="formData.title" :placeholder="'请输入'+title+'名称'" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="title+'时间'" prop="president">
            <el-date-picker
              v-model="formData.grantTime"
              type="datetime"
              :placeholder="'请选择'+title+'时间'"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="09:00:00"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="title+'积分'" prop="speaker">
            <el-input v-model="formData.score" :placeholder="'请输入'+title+'积分'" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="title+'类别'" prop="address">
            <el-select v-model="formData.rewardPunishmentType" :placeholder="'请选择'+title+'类型'">
              <el-option v-if="title==='奖励'" label="个人荣誉" value="1" />
              <el-option v-if="title==='奖励'" label="集体荣誉" value="2" />
              <el-option v-if="title==='惩罚'" label="个人惩罚" value="3" />
              <el-option v-if="title==='惩罚'" label="集体惩罚" value="4" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="title+'说明'" prop="topic">
            <el-input v-model="formData.content" type="textarea" rows="2" :placeholder="'请输入'+title+'说明'" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="附件图片" prop="attach">
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
              :file-list="defaultImgUrl"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="joins-box">
          <el-form-item :label="title+'人员'" prop="member">
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
      <el-button @click="cancelSubmit('RewardPunishmentForm')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('RewardPunishmentForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'
import { getUsersByWhere } from '@/api/base'

export default {
  name: 'RewardPunishmentForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    title: {
      type: String,
      default: ''
    },
    orgTree: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
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
      defaultImgUrl: '',
      removeIndex: 0,
      formData: {
        id: '',
        title: '',
        grantTime: '',
        content: '',
        participants: '',
        rewardPunishmentType: '',
        score: '',
        imgUrl: []
      },
      rules: {
        title: { required: true, message: '标题不能为空', trigger: 'blur' }
      },
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        const tmp = jsonAssgin(this.formData, val)
        this.formData = tmp
        this.transferData = tmp.participants
        this.participants = tmp.participants.reduce((res, current) => {
          res.push(current.id)
          return res
        }, [])
        this.defaultImgUrl = tmp.imgUrl.reduce((res, current) => {
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
        const imgUrl = JSON.parse(JSON.stringify(this.formData.imgUrl))
        imgUrl.push(res.data.url)
        this.formData.imgUrl = imgUrl
      }
    },
    handleRemove(file, fileList) {
      const imgUrl = JSON.parse(JSON.stringify(this.formData.imgUrl))
      imgUrl.splice(this.removeIndex, 1)
      this.formData.imgUrl = imgUrl
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
      this.dialogFormVisible = false
      this.$refs[name].resetFields()
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          data.participants = data.participants ? JSON.stringify(data.participants) : ''
          data.grantTime = this.$moment(data.grantTime).valueOf() / 1000
          data.imgUrl = data.imgUrl ? JSON.stringify(data.imgUrl) : ''
          this.$emit('doSubmit', data)
          this.dialogFormVisible = false
          this.$refs[name].resetFields()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .joins-box .joins {
    width:100%;
    margin-bottom: 20px;
  }
  .joins-box .el-transfer-panel__item.el-checkbox {
    display: block !important;
  }
</style>
