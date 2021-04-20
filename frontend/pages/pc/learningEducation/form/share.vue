<template>
  <el-dialog
    :title="list.title"
    :visible.sync="dialogFormVisible"
    :show-close="false"
    :close-on-click-modal="false"
    width="700px"
  >
    <el-form
      ref="shareForm"
      :model="list"
      label-width="80px"
    >
      <el-form-item label="分享课程">
        <el-input v-model="list.title" readonly />
      </el-form-item>
      <el-form-item label="分享人">
        <el-input v-model="$store.state.user.userName" readonly />
      </el-form-item>
      <el-form-item>
        <span slot="label" style="display: inline-block; line-height: 20px">
          <span>被分享人</span>
          <p>所在组织</p>
        </span>
        <el-select v-model="list.orgId" @change="getUsersList">
          <el-option
            v-for="item in orgList"
            :key="item.id"
            :label="item.orgName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="被分享人">
        <el-select v-model="list.coverUserId">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.userName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleCancel('shareForm')">取 消</el-button>
      <el-button size="small" type="primary" @click="handleConfirm('shareForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getOrgList, getUserList } from '@/api/pc'

  export default {
    name: "share",
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
        orgList: [],
        userList: []
      }
    },
    watch: {
      value: {
        handler(val) {
          this.list = JSON.parse(JSON.stringify(val))
          this.getUsersList()
          this.dialogFormVisible = true
        },
        deep: true
      }
    },
    mounted() {
      this.getOrgList()
    },
    methods: {
      getOrgList() {
        getOrgList({}).then(res => {
          if (res.code * 1 === 0) {
            this.orgList = res.data
          }
        })
      },
      getUsersList() {
        const data = {
          orgId: this.list.orgId
        }
        getUserList(data).then(res => {
          if (res.code * 1 === 0) {
            this.userList = res.data
          }
        })
      },
      handleCancel(name) {
        this.dialogFormVisible = false
        this.$refs[name].resetFields()
      },
      handleConfirm(name) {
        const data = JSON.parse(JSON.stringify(this.list))
        this.$emit('doSubmit', data)
        this.handleCancel(name)
      }
    }
  }
</script>

<style scoped>

</style>
