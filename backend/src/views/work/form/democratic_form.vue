<template>
  <el-dialog
    :title="formData.id ? '编辑 - 测评' : '新增 - 测评'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="15vh"
    width="50%"
  >
    <el-form ref="DemocraticForm" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="主题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="描述" prop="content">
        <el-input v-model="formData.content" type="textarea" :rows="2" placeholder="请输入内容" />
      </el-form-item>
      <!-- <el-form-item v-if="formData.id" label="评议次数" prop="times">
        <el-input-number v-model="formData.times" :min="1" />
      </el-form-item> -->
      <el-form-item label="参选人" prop="participants" class="joins-box">
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
      <el-row>
        <el-col :span="8">
          <el-form-item label="测评类型" prop="democraticAppraisalTypeId">
            <el-select v-model="formData.democraticAppraisalTypeId" placeholder="请选择类型">
              <el-option
                v-for="item in optionsTypes"
                :key="item.id"
                :label="item.typeName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="可选项数" prop="chooseNum">-->
        <!--            <el-input v-model="formData.chooseNum" type="number" />-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="每日可投" prop="isDay">-->
        <!--            <el-switch v-model="formData.isDay" active-value="1" inactive-value="0" />-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <el-col :span="12">
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="formData.startTime"
              type="datetime"
              placeholder="请选择开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="09:00:00"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="formData.endTime"
              type="datetime"
              placeholder="请选择结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="09:00:00"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="参与组织" prop="orgIds">
        <el-select v-model="formData.orgIds" multiple placeholder="请选择" style="width: 100%;">
          <el-option
            v-for="item in selectData"
            :key="item.id"
            :label="item.orgName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('DemocraticForm')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('DemocraticForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'
import { getUsersByWhere } from '@/api/base'
import { queryOrg } from '@/api/permission'
export default {
  name: 'DemocraticForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    orgTree: {
      type: Array,
      default: () => []
    },
    optionsTypes: {
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
      formData: {
        id: '',
        title: '',
        democraticAppraisalTypeId: '',
        content: '',
        participants: [],
        chooseNum: '',
        startTime: '',
        endTime: '',
        orgIds: '',
        times: 0
      },
      rules: {
        title: { required: true, message: '标题不能为空', trigger: 'blur' },
        content: { required: true, message: '内容不能为空', trigger: 'blur' },
        times: { required: true, message: '限制次数不能为空', trigger: 'blur' }
      },
      selectData: [],
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
        this.getOrg()
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
        this.formData.pic = res.data.url
      }
    },
    beforeUpload() {

    },
    getUsers(d) {
      getUsersByWhere({ orgId: d[d.length - 1] }).then(res => {
        if (res.code * 1 === 0) {
          this.transferData = res.data
        }
      })
    },
    getOrg() {
      queryOrg({}).then(res => {
        if (res.code * 1 === 0) {
          this.selectData = res.data
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
          data.participants = data.participants.length > 0 ? JSON.stringify(data.participants) : ''
          data.orgIds = data.orgIds.length > 0 ? data.orgIds.join(',') : ''
          data.startTime = this.$moment(data.startTime).valueOf() / 1000
          data.endTime = this.$moment(data.endTime).valueOf() / 1000
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
