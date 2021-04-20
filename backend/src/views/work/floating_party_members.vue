<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>流动党员</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr8" @click="add">新增流入</el-button>
      <el-button type="primary" class="mr8" @click="out">新增流出</el-button>
      <div class="list-header-item">
        <span class="label">名称</span>
        <el-input v-model="page.userName" class="w200 content" placeholder="请输入名称" />
      </div>
      <el-button type="primary" class="mr8" @click="getList()">搜索</el-button>
      <el-button type="danger" @click="clear">清空</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column type="index" label="编号" align="center" width="50" />
      <el-table-column label="姓名" width="180" align="center" prop="userName" />
      <el-table-column label="原组织关系所在地" min-width="180" align="center" prop="currentOrgName">
        <template slot-scope="scope">{{ scope.row.status *1 === 0 ? scope.row.currentOrgName:scope.row.orgName }}</template>
      </el-table-column>
      <el-table-column label="流向党组织" min-width="180" align="center" prop="orgName" />
      <el-table-column label="流动类型" width="180" align="center" prop="status">
        <template slot-scope="scope">{{ scope.row.status *1 === 0 ? '流入':'流出' }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">查看</el-button>
          <!--          <el-popconfirm title="确定删除该分类吗？" @onConfirm="del(scope.row.id)">-->
          <!--            <el-button slot="reference" type="danger" size="mini">删除</el-button>-->
          <!--          </el-popconfirm>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="page-wrap">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        :page-size="page.limit"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <FloatingInForm v-model="InItem" @doSubmit="doSubmit" />
    <FloatingOutForm v-model="OutItem" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import FloatingInForm from './form/floating_in_form'
import FloatingOutForm from './form/floating_out_form'
import { decrypt } from '@/utils/tools'

import {
  getFloatingPartyMembersList,
  getFloatingPartyMembers,
  saveFloatingPartyMembers,
  updateFloatingPartyMembers,
  deleteFloatingPartyMembers
} from '@/api/work'
export default {
  name: 'FloatingPartyMembers',
  components: { FloatingInForm, FloatingOutForm },
  data() {
    return {
      tableData: [],
      InItem: {
        refresh: false,
        id: ''
      },
      OutItem: {
        refresh: false,
        id: ''
      },
      page: {
        current: 1,
        limit: 10,
        total: 0,
        typeName: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    add() {
      this.InItem = {
        refresh: !this.InItem.refresh,
        id: '',
        orgId: '',
        orgName: '',
        currentOrgName: '',
        outflowOrgName: '',
        userId: '',
        flowTime: '',
        content: '',
        status: '0',
        user: {
          userName: '',
          sex: '',
          phone: '',
          usersInfo: {
            nation: '',
            education: '',
            nativePlace: '',
            birthday: '',
            joinPartyTime: '',
            formalTime: '',
            imgUrl: '',
            isTw: ''
          }
        }
      }
    },
    out() {
      this.OutItem = {
        refresh: !this.InItem.refresh,
        id: '',
        orgId: '',
        orgName: '',
        currentOrgName: '',
        outflowOrgName: '',
        userId: '',
        flowTime: '',
        content: '',
        status: '1',
        user: {
          userName: '',
          sex: '',
          phone: '',
          usersInfo: {
            nation: '',
            education: '',
            nativePlace: '',
            birthday: '',
            joinPartyTime: '',
            formalTime: '',
            imgUrl: '',
            isTw: ''
          }
        }
      }
    },
    edit(id) {
      getFloatingPartyMembers(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          if (data.status * 1 === 0) {
            data.refresh = !this.InItem.refresh
            this.InItem = data
          } else {
            data.refresh = !this.OutItem.refresh
            this.OutItem = data
          }
        }
      })
    },
    del(id) {
      deleteFloatingPartyMembers(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    updateStatus(id, status) {
      updateFloatingPartyMembers({ id, status }).then(res => {
        if (res.code === 0) {
          this.$message.success('操作成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doSubmit(data) {
      if (data.id) {
        updateFloatingPartyMembers(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveFloatingPartyMembers(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
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
    getList() {
      const { current: pageNum, limit: pageSize } = this.page
      getFloatingPartyMembersList({ pageNum, pageSize }, { userName: this.page.userName }).then(res => {
        if (res.code === 0) {
          const tmpList = res.data.list
          for (var i in tmpList) {
            tmpList[i].userName = decrypt(tmpList[i].userName)
          }
          this.tableData = tmpList
          this.page.total = res.data.total * 1
        }
      })
    },
    clear() {
      this.page.userName = ''
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
