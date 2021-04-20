<template>
  <el-dialog
    title="查看会议详情"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="700px"
  >
    <el-form
      ref="scheduleForm"
      :model="list"
      :rules="rules"
      label-width="80px"
    >
      <el-tabs v-model="activityTab" type="border-card">
        <el-tab-pane label="基本信息" name="first">
          <el-form-item label="会议标题" prop="title">
            <el-input v-model="list.title" readonly/>
          </el-form-item>
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="list.userName" readonly/>
          </el-form-item>
          <el-form-item label="组织名称" prop="orgName">
            <el-input v-model="list.orgName" readonly/>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建时间" prop="createTime">
                <el-date-picker
                  v-model="list.createTime"
                  type="datetime"
                  readonly
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="更新时间" prop="updateTime">
                <el-date-picker
                  v-model="list.updateTime"
                  type="datetime"
                  readonly
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="会议内容" name="second">
          <p class="detailContent">{{ list.content }}</p>
        </el-tab-pane>
        <el-tab-pane label="反馈情况" name="third">
          <el-form-item label="反馈状态" prop="status">
<!--            <el-select v-model="list.state" @change="changeStatus">-->
<!--              <el-option-->
<!--                v-for="item in status"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value"-->
<!--              />-->
<!--            </el-select>-->
            <el-input v-model="list.state" readonly />
          </el-form-item>
          <el-form-item label="反馈内容" prop="feedback">
            <el-input v-model="list.feedback" type="textarea" :rows="4" readonly />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="cancel('scheduleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import moment from 'moment'
  import { decrypt } from '@/libs/tools'
  export default {
    name: "detail",
    props: {
      value: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        list: {},
        rules: {},
        moment: moment,
        activityTab: 'first',
        // status: [
        //   {
        //     label: '未反馈',
        //     value: '0'
        //   }, {
        //     label: '出席',
        //     value: '1'
        //   }, {
        //     label: '请假',
        //     value: '2'
        //   }
        // ]
      }
    },
    watch: {
      value: {
        handler(val) {
          this.activityTab = 'first'
          this.list = JSON.parse(JSON.stringify(val))
          this.list.userName = decrypt(this.list.userName)
          this.list.createTime = this.moment(this.list.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.list.updateTime = this.moment(this.list.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.list.state = this.list.status === '0' ? '未反馈' : (this.list.status === '1' ? '出席' : '请假')
          this.dialogFormVisible = true
        },
        deep: true
      }
    },
    methods: {
      // changeStatus() {
      //   this.list.state = this.list.status
      //   this.$message.warning('该数据不可修改')
      // },
      cancel(name) {
        this.dialogFormVisible = false
        this.$emit('doSubmit')
        this.$refs[name].resetFields()
      }
    }
  }
</script>

<style scoped lang="less">
  .detailContent {
    margin: 20px 0;
    text-indent: 2em;
  }
</style>
