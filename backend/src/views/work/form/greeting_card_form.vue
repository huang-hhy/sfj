<template>
  <el-dialog
    :title="formData.id ? '编辑 - 贺卡' : '新增 - 贺卡'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="5vh"
  >
    <el-form ref="GreetingCardForm" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="主题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" :readonly="formData.id !==''" />
      </el-form-item>
      <el-form-item label="贺卡类型" prop="congratulationTypeId">
        <el-select v-model="formData.congratulationTypeId" placeholder="请选择会议类型">
          <el-option
            v-for="item in optionsTypes"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="主题图片" prop="pic">
        <el-upload
          class="logo-uploader"
          :action="$config.uploadPath"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="formData.imgUrl" :src="$config.downloadPath + formData.imgUrl" class="logo">
          <i v-else class="el-icon-plus logo-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="formData.content" type="textarea" :rows="2" placeholder="请输入内容" :readonly="formData.id !==''" />
      </el-form-item>
      <!--      <el-form-item label="推送时间" prop="pushTime">-->
      <!--        <el-date-picker-->
      <!--          v-model="formData.pushTime"-->
      <!--          type="datetime"-->
      <!--          placeholder="请选择推送时间"-->
      <!--          value-format="yyyy-MM-dd HH:mm:ss"-->
      <!--          default-time="09:00:00"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="推送人员" prop="member" class="joins-box">-->
      <!--        <el-cascader v-model="orgId" :options="orgTree" :props="cascaderProps" class="joins" @change="getUsers" />-->
      <!--        <el-transfer-->
      <!--          v-model="participants"-->
      <!--          filterable-->
      <!--          filter-placeholder="请输入名字"-->
      <!--          :titles="['可选人员', '选中人员']"-->
      <!--          :props="transferProps"-->
      <!--          :data="transferData"-->
      <!--          @change="handleChange"-->
      <!--        />-->
      <!--      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('GreetingCardForm')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('GreetingCardForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'
import { getUsersByWhere } from '@/api/base'
import { getGreetingCardsCateSelect } from '@/api/work'

export default {
  name: 'GreetingCardForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
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
      optionsTypes: [],
      transferData: [],
      participants: [],
      formData: {
        id: '',
        title: '',
        content: '',
        congratulationTypeId: '',
        participants: [],
        pushTime: '',
        imgUrl: []
      },
      rules: {
        title: { required: true, message: '标题不能为空', trigger: 'blur' },
        content: { required: true, message: '内容不能为空', trigger: 'blur' }
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
        this.getOptionsTypes()
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
        this.formData.imgUrl = res.data.url
      }
    },
    beforeUpload() {

    },
    getOptionsTypes() {
      getGreetingCardsCateSelect().then(res => {
        if (res.code * 1 === 0) {
          this.optionsTypes = res.data
        }
      })
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
          data.pushTime = this.$moment(data.pushTime).valueOf() / 1000
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
