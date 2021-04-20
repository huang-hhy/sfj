<template>
  <el-dialog
    :title="(regional.id ? (value.action === 'check'? '查看' : '编辑') : '新增') + '分类'"
    :visible.sync="dialogFormVisible"
    label-width="80px"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <el-form ref="regional" :model="regional" :rules="rules" label-width="80px">
      <el-form-item label="分类名称" prop="orgName">
        <el-input v-model="regional.orgName" :readonly="value.action === 'check'" />
      </el-form-item>
      <el-form-item label="父级区域" prop="parentId">
        <TreeSelect
          v-model="regional.parentId"
          width="100%"
          :options="options"
          :props="optionsProps"
          :disabled="value.action === 'check'"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('regional')">取 消</el-button>
      <el-button v-if="value.action !== 'check'" type="primary" @click="handleSubmit('regional')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  saveOrg,
  updateOrg,
  getOrg,
  queryOrg
} from '@/api/permission'
import TreeSelect from '@/components/tree-select'

export default {
  name: 'RegionalForm',
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
      regional: {
        parentId: '',
        orgName: ''
      },
      rules: {
        orgName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      regionalList: [],
      optionsProps: {
        label: 'orgName',
        children: 'children',
        value: 'id'
      }
    }
  },
  watch: {
    value: {
      handler(n) {
        if (n.id) {
          // 获取对应的区域分类
          this.getOrg(n.id)
        } else {
          this.regional = {
            parentId: '',
            orgName: ''
          }
        }
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    cancelSubmit(name) {
      this.$refs[name].resetFields()
      this.dialogFormVisible = false
    },
    handleSubmit(name) {
      const _this = this
      _this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(_this.regional))
          console.log(data)
          if (data.id) {
            _this.updateOrg(data, name)
          } else {
            _this.saveOrg(data, name)
          }
        }
      })
    },
    getOrg(id) {
      const _this = this
      getOrg({ id }).then(res => {
        if (res.code === 0) {
          _this.regional = res.data
        }
      })
    },
    updateOrg(data, name) {
      const _this = this
      updateOrg(data).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          _this.$emit('getList')
          _this.cancelSubmit(name)
        } else {
          _this.$message.error(res.msg)
        }
      })
    },
    saveOrg(data, name) {
      const _this = this
      saveOrg(data).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          _this.dialogFormVisible = false
          _this.$refs[name].resetFields()
          _this.$emit('getList')
        } else {
          _this.$message.error(res.msg)
        }
      })
    },
    getList() {
      // 获取列表信息
      const _this = this
      const data = { pageNum: 1, pageSize: 9999 }
      queryOrg(data).then(res => {
        if (res.code === 0) {
          _this.regionalList = res.data.records
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
