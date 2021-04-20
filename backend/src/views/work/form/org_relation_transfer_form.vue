<template>
  <el-dialog
    :title="list.id ? (list.disabled ? '查看 - 组织关系转接' : '审核 - 组织关系转接') : '新增 - 组织关系转接'"
    :visible.sync="dialogFormVisible"
    :show-close="false"
    :close-on-click-modal="false"
    width="500px"
  >
    <el-form
      ref="transferForm"
      :model="list"
      :rules="transferRules"
      label-width="100px"
      class="transferForm"
    >
      <el-form-item label="调动人组织">
        <el-select v-model="list.pastOrgId" :disabled="list.readonly" @change="getUserList">
          <el-option
            v-for="item in orgList"
            :key="item.id"
            :label="item.orgName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="调动人员">
        <el-select v-model="list.userId" :disabled="list.readonly">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.userName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="转入组织">
        <el-select v-model="list.futureOrgId" :disabled="list.readonly">
          <el-option
            v-for="item in orgList"
            :key="item.id"
            :label="item.orgName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="调动原因">
        <el-input v-model="list.content" type="textarea" :rows="4" :readonly="list.readonly" />
      </el-form-item>
      <el-form-item label="附件">
        <div v-if="list.id">
          <div v-if="list.annexUrl.length > 0">
            <div v-for="(item, index) in list.annexUrl" :key="index">
              <a :href="downloadUrl + '?name=' + item">{{ item }}</a>
            </div>
          </div>
          <span v-else>无上传附件</span>
        </div>
        <el-upload
          v-if="list.id === ''"
          :action="$config.uploadPath"
          :disabled="list.readonly"
        >
          <el-button type="primary" size="small">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="审核">
        <el-radio-group v-model="list.status" :disabled="list.disabled">
          <el-radio label="0">待审核</el-radio>
          <el-radio label="1">通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="list.readonly" label="创建时间">
        <el-date-picker
          v-model="list.createTime"
          type="datetime"
          readonly
        />
      </el-form-item>
      <el-form-item v-if="list.readonly" label="更新时间">
        <el-date-picker
          v-model="list.updateTime"
          type="datetime"
          readonly
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel('transferForm')">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('transferForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { queryOrg, queryUser } from '@/api/permission'
import { decrypt } from '@/utils/tools'

export default {
  name: 'OrgRelationTransferForm',
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
      transferRules: {},
      orgList: [],
      userList: [],
      downloadUrl: '/api/common/download/resource'
    }
  },
  watch: {
    value: {
      handler(val) {
        this.list = JSON.parse(JSON.stringify(val))
        if (this.list.annexUrl) {
          this.list.annexUrl = this.list.annexUrl.split(',')
        } else {
          this.list.annexUrl = []
        }
        this.list.createTime = this.$moment(this.list.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        this.list.updateTime = this.$moment(this.list.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        this.getUserList()
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
      queryOrg({}).then(res => {
        if (res.code * 1 === 0) {
          this.orgList = res.data
        }
      })
    },
    getUserList() {
      const params = {
        pageNum: 1,
        pageSize: 9999
      }
      const data = {
        orgId: this.list.status * 1 === 0 || !this.list.status ? this.list.pastOrgId : this.list.futureOrgId
      }
      queryUser(params, data).then(res => {
        if (res.code * 1 === 0) {
          this.userList = res.data.list
          this.userList.forEach(item => {
            item.userName = decrypt(item.userName)
          })
        }
      })
    },
    handleCancel(name) {
      this.dialogFormVisible = false
      this.$refs[name].resetFields()
    },
    handleConfirm(name) {
      if (this.list.status * 1 === 1) {
        this.$confirm('请再次确定是否关系转接？', '确认信息').then(() => {
          this.list.annexUrl = this.list.annexUrl.join()
          const data = JSON.parse(JSON.stringify(this.list))
          this.$emit('doSubmit', data)
          this.handleCancel(name)
        }).catch(() => {})
      } else {
        this.list.annexUrl = this.list.annexUrl.join()
        const data = JSON.parse(JSON.stringify(this.list))
        this.$emit('doSubmit', data)
        this.handleCancel(name)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .transferForm {
    max-height: 500px;
    overflow: hidden;
  }

  .transferForm::-webkit-scrollbar {
    width: 2px;
  }
</style>
