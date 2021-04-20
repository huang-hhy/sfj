<template>
  <el-dialog
    :title="formData.id ? '编辑套餐' : '新增套餐'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="8vh"
    @close="cleanCheck"
  >
    <el-form ref="role" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="套餐名称" prop="packName">
        <el-input v-model.trim="formData.packName" placeholder="套餐名称" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.trim="formData.sort" type="number" placeholder="排序" />
      </el-form-item>
      <el-form-item label="套餐权限">
        <el-scrollbar>
          <el-tree
            ref="tree"
            :data="roleTree"
            :props="defaultProps"
            :default-checked-keys="formData.menuIds"
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
  name: 'PackForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    roleList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formData: {
        id: '',
        packName: '',
        menuIds: [],
        sort: 1
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      rules: {
        packName: { required: true, message: '请输入套餐名称', trigger: 'blur' }
      },
      roleTree: [],
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
    roleList: {
      handler(val) {
        this.roleTree = val
      },
      deep: true
    }
  },
  methods: {
    getNode(d, c) {
      this.formData.menuIds = c.checkedKeys
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
      this.$refs.tree.setCheckedKeys([])
    }
  }
}
</script>

<style scoped>
  .el-scrollbar{
    overflow-x: hidden;
    height: 400px;
  }
</style>
