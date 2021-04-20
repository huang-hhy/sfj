<template>
  <el-dialog
    title="查看留言详情"
    :visible.sync="dialogFormVisible"
    :show-close="false"
    :close-on-click-modal="false"
    width="700px"
  >
    <el-form
      v-model="list"
      ref="bbsDetail"
      label-width="100px"
      label-position="left"
      class="bbsDetail"
    >
      <el-form-item label="留言人">
        <span>{{ list.userName }}</span>
      </el-form-item>
      <el-form-item label="留言内容">
        <span>{{ list.content }}</span>
      </el-form-item>
      <el-form-item label="附件图片">
        <div v-if="list.imgUrl && list.imgUrl.length > 0">
            <span v-for="(item, index) in list.imgUrl" :key="index"
                  style="margin-right: 30px">
            <img :src="attachUrl + item" style="width: 100px; height: 100px">
          </span>
        </div>
        <span v-else>无上传附件</span>
      </el-form-item>
      <el-form-item label="留言回复">
        <span v-if="list.reply">{{ list.reply }}</span>
        <span v-else>暂无回复留言</span>
      </el-form-item>
      <el-form-item label="所属组织">
        <span>{{ list.orgName }}</span>
      </el-form-item>
      <el-form-item label="创建时间">
        <span>{{ moment(list.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </el-form-item>
      <el-form-item label="更新时间">
        <span>{{ moment(list.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="handleCancel('detailBbs')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import config from '@/config'
  import moment from 'moment'

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
        attachUrl: config.attachUrl,
        moment: moment
      }
    },
    watch: {
      value: {
        handler(val) {
          this.list = JSON.parse(JSON.stringify(val))
          this.list.imgUrl = this.list.imgUrl.replace('[', '').replace(']', '').replaceAll('"', '')
          this.list.imgUrl = this.list.imgUrl ? this.list.imgUrl.split(',') : []
          this.dialogFormVisible = true
        },
        deep: true
      }
    },
    methods: {
      handleCancel() {
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped lang="less">
  .bbsDetail {
    max-height: 500px;
    overflow: auto;
    padding: 0 30px;
  }

  .bbsDetail::-webkit-scrollbar {
    width: 2px;
  }
</style>
