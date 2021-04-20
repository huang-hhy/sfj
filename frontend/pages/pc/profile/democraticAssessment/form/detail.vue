<template>
  <div>
    <el-dialog
      :title="list.title"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      :close-on-click-modal="false"
      width="700px"
    >
      <div class="main">
        <div class="content" v-html="list.content"></div>
        <div class="participants">
          <p>以下为参选人，如评定不合格则需填写理由</p>
          <div v-for="(item, index) in list.participants" :key="index">
            <span :class="index !== 0 ? 'name' : 'firstName'">{{ item.userName }}</span>
            <el-radio-group v-model="result[index]" :disabled="list.disabled">
              <el-radio label="0">优秀</el-radio>
              <el-radio label="1">合格</el-radio>
              <el-radio label="2">不合格</el-radio>
            </el-radio-group>
            <el-input type="textarea" v-if="result[index] * 1 === 2" :readonly="list.disabled" v-model="reason[index]" placeholder="请填写不合格的理由" />
          </div>
        </div>
        <div class="msg">
          <p>测评分类： {{ list.typeName }}</p>
          <span>测评开始时间： {{ moment(list.startTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          <span>测评结束时间： {{ moment(list.endTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          <span>测评创建时间： {{ moment(list.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          <span>测评更新时间： {{ moment(list.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCancel">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "detail",
    props: {
      value: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        list: {},
        moment: moment,
        result: [],
        reason: []
      }
    },
    watch: {
      value: {
        handler(val) {
          this.list = JSON.parse(JSON.stringify(val))
          this.dialogFormVisible = true
          if (this.list.disabled) {
            this.list.participants.forEach(item => {
              this.result.push(item.result + '')
              this.reason.push(item.reason)
            })
          } else {
            this.result = []
            this.reason = []
          }
        },
        deep: true
      }
    },
    methods: {
      handleLook(row) {
        this.list.record = row.userIdList
        this.dialogFormVisible = true
      },
      handleCancel() {
        this.dialogFormVisible = false
      },
      handleConfirm() {
        if (!this.list.disabled) {
          let data = []
          this.list.participants.forEach((item, index) => {
            data.push({
              democraticAppraisalId: this.list.id,
              userId: item.id,
              commentatorId: this.list.commentatorId,
              result: this.result[index],
              reason: this.reason[index]
            })
          })
          data = JSON.parse(JSON.stringify(data))
          this.$emit('doSubmit', data)
        }
        this.handleCancel()
      }
    }
  }
</script>

<style scoped lang="less">
  .main {
    max-height: 500px;
    overflow: auto;
    .content {
      font-size: 16px;
      text-indent: 2em;
      line-height: 30px;
    }

    .participants {
      margin: 20px 0 10px;
      line-height: 30px;
      padding: 0 20px;

      .firstName {
        display: inline-block;
        margin-top: 10px;
      }

      .name {
        display: inline-block;
        margin-top: 30px;
      }
      .el-radio-group {
        margin: 10px 30px;
      }
    }

    .msg {
      margin: 50px 0 20px;
      padding: 0 20px;
      line-height: 30px;
      span {
        display: inline-block;
        width: 48%;
      }
    }
  }

</style>
