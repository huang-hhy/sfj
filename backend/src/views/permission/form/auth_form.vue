<template>
  <el-dialog
    :title="formData.id ? '编辑权限' : '新增权限'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="10vh"
  >
    <el-form ref="auth" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="父级权限" prop="parentId">
        <TreeSelect
          v-model="formData.parentId"
          width="100%"
          :options="options"
          :props="optionsProps"
        />
      </el-form-item>
      <el-form-item label="权限名称" prop="menuName">
        <el-input v-model.trim="formData.menuName" />
      </el-form-item>
      <el-form-item label="path" prop="path">
        <el-input v-model.trim="formData.path" />
      </el-form-item>
      <el-form-item label="perms" prop="perms">
        <el-input v-model.trim="formData.perms" />
      </el-form-item>
      <el-form-item label="菜单类型" prop="menuType">
        <el-select v-model="formData.menuType" placeholder="请选择">
          <el-option label="目录" value="M" />
          <el-option label="菜单" value="C" />
          <el-option label="按钮" value="F" />
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.trim="formData.sort" type="number" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('auth')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('auth')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import TreeSelect from '@/components/tree-select'
import { jsonAssgin } from '@/utils/tools'

export default {
  name: 'AuthForm',
  components: { TreeSelect },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formData: {
        id: '',
        parentId: '',
        menuName: '',
        sort: 1,
        path: '',
        perms: '',
        menuType: ''
      },
      rules: {
        menuName: { required: true, message: '请选择菜单名称', trigger: 'blur' },
        path: { required: true, message: '请选择菜单名称', trigger: 'blur' },
        menuType: { required: true, message: '请选择菜单类型', trigger: 'change' }
      },
      dialogFormVisible: false,
      optionsProps: {
        label: 'label',
        children: 'children',
        value: 'id'
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = jsonAssgin(this.formData, val)
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    cancelSubmit(name) {
      this.dialogFormVisible = false
      this.$refs[name].resetFields()
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

<style scoped>

</style>
