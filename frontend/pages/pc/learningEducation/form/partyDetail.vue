<template>
  <el-dialog
    :title="'查看详情 - ' + list.title"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="800px"
  >
    <div class="main">
      <h1 class="title">{{ list.title }}</h1>
      <el-row type="flex" justify="center" class="time">
        <el-col :span="8">创建时间： {{ moment(list.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}}</el-col>
        <el-col :span="8">更新时间： {{ moment(list.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}}</el-col>
      </el-row>
      <div class="content" v-html="list.content"></div>
      <div class="enclosure" v-if="list.enclosure && list.enclosure.length > 0">
        <p class="text">
          <i class="el-icon-document" />
          <span>附件</span>
        </p>
        <div v-for="(item, index) in list.enclosure" :key="index" style="line-height: 30px">
          <a :href="downloadUrl + '?name=' + item.url">{{ item.name }}</a>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "partyDetail",
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
        downloadUrl: '/api/common/download/resource',
      }
    },
    watch: {
      value: {
        handler(val) {
          this.list = JSON.parse(JSON.stringify(val))
          this.list.enclosure = JSON.parse(this.list.enclosure)
          this.dialogFormVisible = true
        },
        deep: true
      }
    },
    methods: {
      handleConfirm() {
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped lang="less">
  .main {
    .title {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      line-height: 60px;
      color: #1a1a1a;
    }

    .time {
      font-size: 12px;
      line-height: 15px;
    }

    .content {
      margin: 20px 0 40px;
    }

    .enclosure {
      margin: 0 30px;
      .text {
        font-size: 16px;
        color: #1a1a1a;
        line-height: 60px;

        i {
          color: #d7000f;
          margin-right: 10px;
          font-size: 20px;
        }
      }
    }
  }
</style>
