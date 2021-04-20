<template>
  <el-dialog
    title="体检发布"
    :visible.sync="dialogFormVisible"
    width="70%"
    center
    label-width="120px"
    :close-on-click-modal="false"
  >
    <el-form ref="publishForm" :model="publishObj" :rules="publishRules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="发布类型" prop="type">
        <el-select v-model="publishObj.publishType" placeholder="请选择发布类型" @change="publishTypeChange">
          <el-option label="按角色发布" value="0" />
          <el-option label="按组织类型发布" value="1" />
          <el-option label="指定人员发布" value="2" />
        </el-select>
      </el-form-item>
      <div v-if="publishObj.publishType==='0'" class="publish-area">
        <el-form-item label="选择角色" prop="releaseRole">
          <el-select v-model="publishObj.releaseRole" style="width: 100%" multiple placeholder="请选择">
            <el-option v-for="(item,index) in roleData" :key="index" :label="item.roleName" :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div v-if="publishObj.publishType==='1'" class="publish-area">
        <el-form-item label="选择组织类型" prop="releaseOrg">
          <el-select v-model="publishObj.releaseOrg" style="width: 100%" multiple placeholder="请选择">
            <el-option v-for="(item,index) in orgTypeArr" :key="index" :label="item.orgTypeName" :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div v-else-if="publishObj.publishType==='2'" class="publish-area">
        <el-form-item label="选择组织" prop="releaseUser">
          <el-cascader
            v-model="curOrg"
            :options="orgArr"
            :props="{value: 'id'}"
            @change="orgChange"
          />
        </el-form-item>
        <el-transfer
          v-model="publishObj.releaseUser"
          filterable
          filter-placeholder="请输入名字"
          :titles="['请选择发布对象', '已选择发布对象']"
          :data="memberData"
          :props="{ key: 'id',label: 'userName'}"
        />
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirmPublish()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoleList, getOrgTypeList } from '@/api/permission'
import { getUsersByWhere } from '@/api/base'

export default {
  name: 'PublishForm',
  props: {
    value: {
      type: Boolean,
      default: () => {
      }
    },
    orgArr: {
      type: Array,
      default: () => {
      }
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      publishObj: {
        publishType: '0',
        releaseUser: [],
        releaseOrg: [],
        releaseRole: []

      },
      roleData: [],
      curOrg: '',
      memberData: [],
      releaseUser: [],
      publishRules: {},
      orgTypeArr: []

    }
  },
  watch: {
    value: {
      handler(val) {
        this.dialogFormVisible = val
      },
      deep: true
    }
  },
  mounted() {
    this.getRoleList()
    this.getOrgTypeList()
  },
  methods: {
    close() {
      this.$emit('publishFormClose', false)
    },
    orgChange(val) {
      const orgId = val[val.length - 1]
      this.publishObj.releaseUser = []
      getUsersByWhere({ orgId }).then(res => {
        if (res.code * 1 === 0) {
          this.memberData = res.data
        }
      })
    },
    publishTypeChange(val) {
      switch (val * 1) {
        case 0:
          this.publishObj.releaseOrg = []
          this.publishObj.releaseUser = []
          break
        case 1:
          this.publishObj.releaseRole = []
          this.publishObj.releaseUser = []
          break
        case 2:
          this.publishObj.releaseOrg = []
          this.publishObj.releaseRole = []
          break
      }
    },
    getOrgTypeList() {
      getOrgTypeList({}, {}).then(res => {
        if (res.code * 1 === 0) {
          this.orgTypeArr = res.data.list
        }
      })
    },
    getRoleList() {
      getRoleList({ pageNum: 1, pageSize: 999 }, { roleName: '' }).then(res => {
        if (res.code * 1 === 0) {
          this.roleData = res.data.list
        }
      })
    },
    confirmPublish() {
      const publishObj = JSON.parse(JSON.stringify(this.publishObj))
      publishObj.releaseRole = publishObj.releaseRole.join(',')
      publishObj.releaseOrg = publishObj.releaseOrg.join(',')
      publishObj.releaseUser = publishObj.releaseUser.join(',')
      this.$emit('publishSubmit', publishObj)
      this.close()
    }
  }
}
</script>

<style scoped>
.publish-area {
  margin-left: 5%;
}

.el-cascader {
  width: 80%;
}

.el-transfer {
  margin-left: 15%;
}
</style>
