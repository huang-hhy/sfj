<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>账号管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="addUser">新增账号</el-button>
      <!--      <el-upload-->
      <!--        style="display: inline-block"-->
      <!--        class="mr10"-->
      <!--        :action="importExcel()"-->
      <!--        :show-file-list="false"-->
      <!--        :headers="headers"-->
      <!--        :on-success="handleSuccess"-->
      <!--        :before-upload="beforeUpload"-->
      <!--      >-->
      <!--        <el-button type="primary">导入</el-button>-->
      <!--      </el-upload>-->
      <el-button type="primary" @click="importUser()">导入</el-button>

      <el-button type="primary" class="mr10" @click="exportExcel()">导出</el-button>

      <!--      <div class="list-header-item">-->
      <!--        <span class="label">账号</span>-->
      <!--        <el-input v-model="page.loginName" class="w150 content" placeholder="请输入账号" @change="getList" />-->
      <!--      </div>-->
      <div class="list-header-item">
        <span class="label">姓名</span>
        <el-input v-model="page.userName" class="w150 content" placeholder="请输入姓名" @change="getList" />
      </div>
      <!-- <div class="list-header-item">
        <span class="label">角色分组</span>
        <el-select v-model="page.roleId" placeholder="请选角色分组" class="w150 content" @change="getList">
          <el-option v-for="role in roleList" :key="role.id" :label="role.roleName" :value="role.id" />
        </el-select>
      </div> -->
      <div class="list-header-item">
        <span class="label">党内职务</span>
        <el-select v-model="page.roleId" placeholder="请选党内职务" class="w150 content" @change="getList">
          <el-option v-for="role in userType" :key="role.id" :label="role.userTypeName" :value="role.id" />
        </el-select>
      </div>
      <div class="list-header-item">
        <span class="label">状态</span>
        <el-select v-model="page.status" placeholder="请选状态" class="w100 content" @change="getList">
          <el-option label="全部" value="" />
          <el-option label="正常" value="0" />
          <el-option label="停用" value="1" />
        </el-select>
      </div>
      <div class="list-header-item">
        <span class="label">入党月份</span>
        <el-date-picker
          v-model="page.month"
          type="month"
          placeholder="选择月"
        />
      </div>
      <el-button type="primary" class="mr10" @click="getList">搜索</el-button>
    </div>
    <div class="list-content">
      <el-scrollbar class="org_list SideBar-scrollbar">
        <el-tree
          :data="orgTree"
          node-key="id"
          default-expand-all
          :props="defaultProps"
          :expand-on-click-node="false"
          @node-click="getListByOrg"
        />
      </el-scrollbar>
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        border
      >
        <el-table-column
          type="index"
          label="编号"
          align="center"
          width="50"
        />
        <el-table-column
          prop="loginName"
          label="账号"
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="手机"
          min-width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ $plusXing(scope.row.phone, 3, 4) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          min-width="80"
          align="center"
        />
        <el-table-column
          prop="orgName"
          label="所属组织"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.createTime * 1000).format('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-popconfirm
              v-if="scope.row.status *1 === 0 "
              title="确定停用该用户吗？"
              @onConfirm="updateUserStatus(scope.row.id, 1)"
            >
              <el-button slot="reference" type="success" size="mini">正常</el-button>
            </el-popconfirm>
            <el-popconfirm
              v-else
              title="确定启用该用户吗？"
              @onConfirm="updateUserStatus(scope.row.id, 0)"
            >
              <el-button slot="reference" type="warning" size="mini">停用</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="240"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row.id)">修改</el-button>
            <el-button type="warning" size="mini" @click="changePassword(scope.row.id)">修改密码</el-button>
            <el-popconfirm
              title="确定删除该用户吗？"
              @onConfirm="del(scope.row.id)"
            >
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-wrap">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        :page-size="page.limit"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <UserForm
      v-model="userData"
      :user-type="userType"
      :role-list="roleList"
      :options="regionalList"
      @doSubmit="doSubmit"
    />
    <PassForm v-model="passAction" @getList="getList" />
    <OrgImport v-model="selectedOrg" :import-type="importType" :org-tree="orgTree" :get-list="getList" />
  </el-card>
</template>

<script>
import UserForm from './form/user_form'
import PassForm from './form/pass_form'
import OrgImport from './form/org_import'
import {
  queryUser,
  deleteUser,
  changeUserStatus,
  queryOrg,
  queryOrgTree,
  getRoleList,
  saveUser,
  updateUser,
  getUser,
  getUserSelectList
} from '@/api/permission'
import { getToken } from '@/utils/auth'

import { exportUser } from '@/api/base'
import { encrypt, decrypt } from '@/utils/tools'

export default {
  name: 'UserManage',
  components: {
    UserForm,
    PassForm,
    OrgImport
  },
  data() {
    return {
      headers: { Authorization: getToken() },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectedOrg: {
        refresh: false,
        id: ''
      },
      importType: 1,
      tableData: [],
      page: {
        current: 1,
        limit: 10,
        total: 0,
        loginName: '',
        userName: '',
        roleId: '',
        status: '',
        orgId: '',
        month: ''
      },
      regionalAction: {
        refresh: false,
        id: '',
        action: ''
      },
      roleList: [],
      // job:[{id:'0101',roleName:'书记'},{id:'0102',roleName:'副书记'}],
      userData: {
        refresh: false,
        id: '',
        orgId: '',
        orgName: '',
        loginName: '',
        userName: '',
        email: '',
        phone: '',
        sex: '',
        avatar: '',
        password: '',
        password2: '',
        roleIds: [],
        userTypeId: '',
        usersInfo: {
          score: '',
          nation: '',
          education: '',
          nativePlace: '',
          birthday: '',
          profession: '',
          joinPartyTime: '',
          formalTime: '',
          imgUrl: ''
        }
      },
      regionalList: [],
      orgTree: [],
      userType: [],
      passAction: {
        id: '',
        refresh: false
      }
    }
  },
  mounted() {
    this.getOrgTree()
    this.getList()
    this.getRegionalList()
    this.getRoleList()
    this.getUserType()
  },
  methods: {
    getUserType() {
      getUserSelectList({}).then(res => {
        if (res.code === 0) {
          this.userType = res.data
          console.log(this.userType)
        }
      })
    },
    addUser() {
      this.userData = {
        refresh: !this.userData.refresh,
        id: '',
        orgId: '',
        orgName: '',
        loginName: '',
        userName: '',
        email: '',
        phone: '',
        sex: '',
        avatar: '',
        password: '',
        password2: '',
        roleIds: [],
        userTypeId: '',
        usersInfo: {
          score: '',
          nation: '',
          education: '',
          nativePlace: '',
          birthday: '',
          profession: '',
          joinPartyTime: '',
          formalTime: '',
          imgUrl: ''
        }
      }
    },
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList()
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList()
    },
    getListByOrg(org) {
      this.page.orgId = org.id
      this.getList()
    },
    doSubmit(data) {
      data.loginName = data.loginName ? encrypt(data.loginName) : ''
      data.userName = data.userName ? encrypt(data.userName) : ''
      data.password = data.password ? encrypt(data.password) : ''
      data.phone = data.phone ? encrypt(data.phone) : ''
      data.email = data.email ? encrypt(data.email) : ''
      if (data.id) {
        console.log(data)
        updateUser(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveUser(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    getList(userTypeId) {
      // console.log(val)
      const { current: pageNum, limit: pageSize } = this.page
      const where = {
        orgId: this.page.orgId,
        loginName: this.page.loginName ? encrypt(this.page.loginName) : '',
        userName: this.page.userName ? encrypt(this.page.userName) : '',
        roleId: this.page.roleId,
        status: this.page.status,
        month: this.page.month ? this.$moment(this.page.month).unix() : '',
        userTypeId:userTypeId
      }
      queryUser({ pageNum, pageSize }, where).then(res => {
        if (res.code === 0) {
          this.page.total = res.data.total * 1
          var tmpData = res.data.list
          for (var i in tmpData) {
            tmpData[i].loginName = tmpData[i].loginName ? decrypt(tmpData[i].loginName) : ''
            tmpData[i].userName = tmpData[i].userName ? decrypt(tmpData[i].userName) : ''
            tmpData[i].phone = tmpData[i].phone ? decrypt(tmpData[i].phone) : ''
            tmpData[i].email = tmpData[i].email ? decrypt(tmpData[i].email) : ''
          }
          this.tableData = tmpData
        }
      })
    },
    edit(id) {
      getUser(id).then(res => {
        if (res.code === 0) {
          const data = JSON.parse(JSON.stringify(res.data))
          data.refresh = !this.userData.refresh
          data.createTime = data.createTime * 1000
          data.loginName = decrypt(data.loginName)
          data.userName = decrypt(data.userName)
          data.phone = decrypt(data.phone)
          data.email = decrypt(data.email)
          // console.log(data)
          this.userData = data
          // console.log(this.userData)
        }
      })
    },
    del(id) {
      deleteUser(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        }
      })
    },
    stop(row) {
      // 停用某个用户
    },
    getOrgTree() {
      const data = { pageNum: 1, pageSize: 9999 }
      queryOrgTree(data).then(res => {
        if (res.code === 0) {
          this.orgTree = res.data
          // const data = res.data
          // this.orgTree = data
          // this.page.orgId = data.length ? data[0].id : ''
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getRegionalList() {
      const _this = this
      const data = { pageNum: 1, pageSize: 9999 }
      queryOrg(data).then(res => {
        if (res.code === 0) {
          _this.regionalList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getRoleList() {
      const data = { pageNum: 1, pageSize: 9999 }
      getRoleList(data, {}).then(res => {
        if (res.code === 0) {
          this.roleList = res.data.list
        }
      })
    },
    updateUserStatus(id, status) {
      const _this = this
      changeUserStatus({ id, status }).then(res => {
        if (res.code === 0) {
          _this.$message.success(status === 0 ? '启用成功' : '停用成功')
          _this.getList()
        } else {
          _this.$message.error(res.msg)
        }
      })
    },
    changePassword(id) {
      this.passAction = {
        id,
        refresh: !this.passAction.refresh
      }
    },
    importExcel(name) {
      const url = '/api/base/user/importData'
      return url
    },
    handleSuccess(res) {
      if (res.code === 0) {
        this.$message.success('操作成功')
        this.getList()
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeUpload() {

    },
    exportExcel() {
      exportUser({}).then(res => {
        if (res.code === 0) {
          const url = this.$config.exportPath + '/profile/download/' + res.msg
          window.open(url)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    importUser() {
      this.selectedOrg = {
        refresh: !this.selectedOrg.refresh,
        id: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 22px;
  font-weight: bold;
}

.el-button + .el-button {
  margin-left: 0;
}

.list-content {
  display: flex;

  .org_list {
    margin-right: 10px;
    border: 1px solid #dddddd;
    min-width: 200px;
    max-width: 30%;
    max-height: 65vh;
    overflow-y: auto;
  }
}

/deep/ .el-scrollbar__wrap {
  overflow-x: auto;
}
</style>
