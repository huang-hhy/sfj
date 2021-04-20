<template>
  <el-dialog
    title="查看积分详情"
    :visible.sync="dialogFormVisible"
    :show-close="false"
    :close-on-click-modal="false"
    width="500px"
  >
    <el-form
      ref="pointForm"
      :model="list"
      :rules="pointRules"
      label-width="80px"
    >
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="list.userName" readonly/>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="list.title" readonly/>
      </el-form-item>
      <el-form-item label="获取积分" prop="score">
        <el-input-number v-model="list.score" disabled/>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="list.createTime"
          type="datetime"
          readonly
        />
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-date-picker
          v-model="list.updateTime"
          type="datetime"
          readonly
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="handleCancel('pointForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import moment from 'moment'
  import {decrypt} from "../../../../../libs/tools";

  export default {
    name: "detail",
    props: {
      value: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        list: {},
        moment: moment,
        pointRules: {}
      }
    },
    watch: {
      value: {
        handler(val) {
          this.list = JSON.parse(JSON.stringify(val))
          this.list.userName = decrypt(this.list.userName)
          this.list.createTime = this.moment(this.list.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.list.updateTime = this.moment(this.list.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.dialogFormVisible = true
        },
        deep: true
      }
    },
    methods: {
      handleCancel(name) {
        this.dialogFormVisible = false
        this.$refs[name].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
