<template>
  <el-collapse v-if="editField" v-model="active" class="setting-panel" accordion>
    <el-collapse-item title="通用属性" name="common">
      <common />
    </el-collapse-item>
    <el-collapse-item title="扩展属性" name="props">
      <extend />
    </el-collapse-item>
    <el-collapse-item title="校验设置" name="rules">
      <rules />
    </el-collapse-item>
    <el-collapse-item title="选项数据" name="options">
      <options />
    </el-collapse-item>
  </el-collapse>
</template>

<script>

import Common from './../setting/module/common'
import Extend from './../setting/module/extend'
import Rules from './../setting/module/rules'
import Options from './../setting/module/options'
import { mapState } from 'vuex'

export default {
  components: {
    Common,
    Extend,
    Rules,
    Options
  },
  data() {
    return {
      active: 'common'
    }
  },
  computed: {
    // ...mapState(['editField'])
    ...mapState({
      editField: state => state.custom.editField
    })
  }

}
</script>

<style scoped lang="scss">
  .setting-panel {
    /deep/ {
      .el-collapse-item__header {
        padding-left: 10px;
        background-color: #d9ecff;
        color: #303133;
        cursor: pointer;
        border-bottom: 1px solid #ecf5ff;
      }
    }
  }
  .setting-panel {
    /deep/ {
      .el-collapse-item__wrap {
        background-color: #ecf5ff;
        overflow: hidden;
        border-bottom: 1px solid #ecf5ff;
      }
    }
  }
  .wrapper {
    padding: 10px 10px 0 10px;
  }

</style>
