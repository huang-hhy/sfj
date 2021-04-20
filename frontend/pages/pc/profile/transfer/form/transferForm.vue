<template>
  <el-dialog
    :title="list.id ? '查看关系转接' : '新增关系转接'"
    :visible.sync="dialogFormVisible"
    :show-close="false"
    :close-on-click-modal="false"
    width="700px"
  >
    <el-form
      ref="transferForm"
      :model="list"
      :rules="transferRules"
      label-width="110px"
      class="content"
    >
      <el-form-item label="申请人">
        <el-input v-model="$store.state.user.userName" readonly/>
      </el-form-item>
      <el-form-item label="转出党(工）委">
        <el-input v-if="list.id" v-model="list.pastOrgName" readonly />
        <el-input v-else v-model="$store.state.user.orgName" readonly/>
      </el-form-item>
      <el-form-item prop="futureOrgName">
        <span slot="label" style="line-height: 20px; display: inline-block; ">
          <span>接收党</span>
          <p>（工）委</p>
        </span>
        <el-select v-model="list.futureOrgId" clearable filterable>
          <el-option
            v-for="item in orgList"
            :key="item.id"
            :label="item.orgName"
            :value="item.id"
            :readonly="list.readonly"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="转接原因">
        <el-input v-model="list.content" type="textarea" :rows="4" :readonly="list.readonly"/>
      </el-form-item>
      <el-form-item v-if="list.id" label="已上传附件">
        <div v-if="list.annexUrl.length > 0">
          <span v-for="(item, index) in list.annexUrl" :key="index" class="images" @mouseleave="hiddenDiv(index)" @mouseenter="showDiv(index)">
          <img :src="attacheUrl + item"/>
          <div v-show="annexList[index]" class="imgDiv">
            <i class="el-icon-zoom-in" style="margin-right: 8px;" />
            <i class="el-icon-delete" @click="deleteAnnexUrl(index)" />
          </div>
        </span>
        </div>
        <span v-else>暂无上传附件</span>
      </el-form-item>
      <el-form-item label="附件" prop="annexUrl">
        <el-upload
          :action="uploadPath"
          list-type="picture-card"
          :http-request="handleUpload"
          class="uploadImg"
          :disabled="list.readonly"
        >
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel('transferForm')">取 消</el-button>
      <el-button size="small" type="primary" @click="confirm('transferForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getOrgList, uploadFile} from '@/api/pc'
  import config from '@/config'
  import Vue from 'vue'

  export default {
    name: "transferForm",
    props: {
      value: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        list: {},
        dialogFormVisible: false,
        transferRules: {
          futureOrgName: [{ required: true, message: '请选择接收的党（工）委', trigger: 'change' }]
        },
        orgList: [],
        uploadPath: '/api/common/upload',
        attacheUrl: config.attachUrl,
        annexList: [],
        annexFiles: []
      }
    },
    mounted() {
      this.getList()
    },
    watch: {
      value: {
        handler(val) {
          this.list = JSON.parse(JSON.stringify(val))
          if (this.list.annexUrl) {
            this.list.annexUrl = this.list.annexUrl.split(',')
            this.list.annexUrl.forEach(item => {
              this.annexList.push(false)
            })
          } else {
            this.list.annexUrl = []
          }
          this.dialogFormVisible = true
        },
        deep: true
      }
    },
    methods: {
      getList() {
        getOrgList({}).then(res => {
          if (res.code * 1 === 0) {
            this.orgList = res.data
          }
        })
      },
      handleUpload(res) {
        let fd = new FormData
        fd.append('file', res.file)
        uploadFile(fd).then(res => {
          if (res.code * 1 === 0) {
            const annex = res.data.url
            this.annexFiles.push(annex)
          }
        })
      },
      hiddenDiv(index) {
        Vue.set(this.annexList, index, false)
      },
      showDiv(index) {
        Vue.set(this.annexList, index, true)
      },
      deleteAnnexUrl(index) {
        if (this.list.readonly) {
          this.$message.warning('审核已通过，不可删除')
        } else {
          this.list.annexUrl.splice(index, 1)
          console.log(this.list.annexUrl)
          this.$message.success('删除附件成功，点击确定即可保存修改')
        }
      },
      cancel(name) {
        this.dialogFormVisible = false
        this.$refs[name].resetFields()
      },
      confirm(name) {
        if (this.annexFiles) {
          this.annexFiles.forEach(item => {
            this.list.annexUrl.push(item)
          })
        }
        if (this.list.annexUrl && this.list.annexUrl.length > 0) {
          this.list.annexUrl = this.list.annexUrl.join()
        } else {
          Vue.delete(this.list, 'annexUrl')
          Vue.set(this.list, 'annexUrl', ' ')
        }
        if (!this.list.readonly) {
          if (this.list.futureOrgId) {
            this.$emit('doSubmit', this.list)
            this.cancel(name)
          } else {
            this.$message.error('请选择接收党（工）委')
          }
        } else {
          this.cancel(name)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    max-height: 500px;
    overflow: auto;

    .images {
      margin: 10px 20px 10px 0;
      display: inline-block;
      position: relative;

      img {
        width: 150px;
        height: 150px;
        border-radius: 8px;
      }

      .imgDiv {
        width: 150px;
        height: 150px;
        border-radius: 8px;
        background-color: rgba(173, 169, 169, 0.6);
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 35px;

        i {
          color: #FFFFFF;
          font-size: 30px;
          line-height: 150px;
          cursor: pointer;
        }
      }
    }

    .uploadImg {
      width: 150px;
      height: 150px;
      display: inline;
    }
  }

  .content::-webkit-scrollbar {
    width: 2px;
  }
</style>
