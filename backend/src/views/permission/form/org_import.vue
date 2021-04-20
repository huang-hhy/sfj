<template>
  <el-dialog
    title="请选择导入的组织"
    :visible.sync="orgImportFlag"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="8vh"
  >
    <el-form ref="importOrg" :model="selectedOrg" :rules="rules" label-width="80px">
      <el-form-item label="组织" prop="org">
        <el-cascader
          v-model="selectedOrg.id"
          :options="orgTree"
          :props="{checkStrictly:true, label: 'label', value: 'id'}"
          @change="cascaderChange"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('importOrg')">取 消</el-button>
      <el-upload
        style="display: inline-block"
        class="mr10"
        :action="importType*1===0?importOrgUrl:importUserUrl"
        :data="{orgId:selectedOrg.orgId}"
        :show-file-list="false"
        :headers="headers"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :disabled="!selectedOrg.orgId.length>0"
      >
        <el-button type="primary" :disabled="!selectedOrg.orgId.length>0">导入</el-button>
      </el-upload>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'
import { getToken } from '@/utils/auth'

export default {
  name: 'OrgTypeForm',
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
    getList: {
      type: Function,
      default: null
    },
    importType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      headers: { Authorization: getToken() },
      selectedOrg: {
        id: '',
        orgId: ''
      },
      importUserUrl: '/api/base/user/importData',
      importOrgUrl: '/api/base/org/importData',
      rules: {
        importOrgName: { required: true, message: '请选择组织', trigger: 'blur' }
      },
      orgImportFlag: false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.selectedOrg = jsonAssgin(this.selectedOrg, val)
        this.orgImportFlag = true
      },
      deep: true
    }
  },
  methods: {
    cancelSubmit(name) {
      this.$refs[name].resetFields()
      this.orgImportFlag = false
    },
    handleSuccess(res) {
      if (res.code === 0) {
        this.$message.success('操作成功')
        this.cancelSubmit('importOrg')
        this.getList()
      } else {
        this.$message.error(res.msg)
      }
      this.selectedOrg.orgId = ''
    },
    beforeUpload() {

    },
    cascaderChange(val) {
      // this.selectedOrg.orgId = val[val.length - 1]
      this.$set(this.selectedOrg, 'orgId', val[val.length - 1])
      console.log(this.selectedOrg)
    }
  }
}
</script>

<style scoped>
.el-scrollbar {
  overflow-x: hidden;
  height: 400px;
}
</style>
