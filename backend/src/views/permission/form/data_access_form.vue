<template>
  <el-dialog
    title="编辑数据访问权限"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="8vh"
    @close="cleanCheck"
  >
    <el-form ref="role" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="数据范围" prop="dataScope">
        <el-radio-group v-model="formData.dataScope">
          <el-radio v-for="item in scopeList" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formData.dataScope === '2'" label="数据访问权限">
        <el-scrollbar>
          <el-tree
            ref="tree"
            :data="orgTree"
            :props="defaultProps"
            :default-checked-keys="formData.orgIds"
            show-checkbox
            check-strictly
            default-expand-all
            :expand-on-click-node="false"
            node-key="id"
            class="permission-tree"
            @check="getNode"
          />
        </el-scrollbar>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('role')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('role')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jsonAssgin } from '@/utils/tools'

export default {
  name: 'DataAccessForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    orgList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      scopeList: [
        { id: '1', name: '全部数据权限' },
        { id: '2', name: '自定数据权限' },
        { id: '3', name: '本组织数据权限' },
        { id: '4', name: '本组织及以下数据权限' }
        // { id: '5', name: '仅本人数据权限' }
      ],
      formData: {
        id: '',
        dataScope: '',
        orgIds: []
      },
      defaultProps: {
        label: 'label',
        children: 'children',
        value: 'id'
      },
      rules: {
        dataScope: { required: true, message: '请选择数据范围', trigger: 'blur' }
      },
      orgTree: [],
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = jsonAssgin(this.formData, val)
        this.dialogFormVisible = true
      },
      deep: true
    },
    orgList: {
      handler(val) {
        this.orgTree = val
      },
      deep: true
    }
  },
  methods: {
    getNode(d, c) {
      this.formData.orgIds = c.checkedKeys
    },
    cancelSubmit(name) {
      this.cleanCheck()
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
    },
    cleanCheck() {
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys([])
      }
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
