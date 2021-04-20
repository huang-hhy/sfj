<template>
  <el-dialog
    :title="list.title"
    :visible.sync="dialogFormVisible"
    :show-close="false"
    :close-on-click-modal="false"
    width="700px"
  >
    <div class="container">
      <div style="margin: 0 auto 20px; text-align: center">
        <img :src="attachUrl + list.imgUrl">
      </div>
      <p style="text-indent: 2em">{{ list.content }}</p>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="cancel">确 定</el-button>
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
          this.dialogFormVisible = true
        },
        deep: true
      }
    },
    methods: {
      cancel() {
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped>
</style>
