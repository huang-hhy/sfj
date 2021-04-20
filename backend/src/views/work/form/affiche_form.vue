<template>
  <el-dialog
    :title="formData.id ? '编辑 - 通知公告' : '新增 - 通知公告'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="15vh"
  >
    <el-form ref="AfficheForm" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" :readonly="formData.id !==''" />
      </el-form-item>
      <el-form-item label="推送组织" prop="receiveOrgIds">
        <el-select v-model="formData.receiveOrgIds" multiple placeholder="请选择" style="width: 100%;" :disabled="formData.id !==''">
          <el-option
            v-for="item in selectData"
            :key="item.id"
            :label="item.orgName"
            :value="item.id"
          />
        </el-select>
        <!--        <el-cascader-->
        <!--          v-model="formData.receiveOrgIds"-->
        <!--          :options="orgTree"-->
        <!--          :props="OrgIdsProps"-->
        <!--          :show-all-levels="false"-->
        <!--          style="width: 100%;"-->
        <!--          @change="getOrgIds"-->
        <!--        />-->
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="formData.content" type="textarea" :rows="2" placeholder="请输入内容" :readonly="formData.id !==''" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('AfficheForm')">取 消</el-button>
      <el-button v-if="!formData.id" type="primary" @click="handleSubmit('AfficheForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'
import { queryOrg } from '@/api/permission'

export default {
  name: 'AfficheForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      orgId: '',
      headers: { Authorization: getToken() },
      OrgIdsProps: {
        multiple: true,
        checkStrictly: true,
        children: 'children',
        label: 'label',
        value: 'id'
      },
      formData: {
        id: '',
        title: '',
        receiveOrgIds: [],
        content: ''
      },
      rules: {
        title: { required: true, message: '标题不能为空', trigger: 'blur' },
        content: { required: true, message: '内容不能为空', trigger: 'blur' }
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
        this.getOrg()
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
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
          data.receiveOrgIds = data.receiveOrgIds.join(',')
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
