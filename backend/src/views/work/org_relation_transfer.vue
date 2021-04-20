<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>组织关系转接</span>
    </div>
    <div class="content">
      <div class="content_header">
        <el-button type="success" class="mr15" @click="handleAdd">新增</el-button>
        <el-cascader
          v-model="cascader.orgName"
          :options="orgList"
          :props="propData"
          :show-all-levels="false"
          placeholder="请选择旧组织"
          class="w200 mr15"
          clearable
          filterable
          @change="changeOrgId"
        />
        <el-cascader
          v-model="cascader.futureOrgName"
          :options="orgList"
          :props="propData"
          :show-all-levels="false"
          placeholder="请选择新组织"
          class="w200 mr15"
          filterable
          @change="changeFutureOrgId"
        />
        <el-input v-model="page.userName" class="w200 mr15" placeholder="请输入调动人名称" @keyup.enter.native="getList" />
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button type="warning" @click="handleClear">重置</el-button>
      </div>
      <el-table
        :data="list"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align': 'center', 'background-color': '#f8f8f8'}"
        border
      >
        <el-table-column label="调动人" prop="userName" />
        <el-table-column label="原组织名称" prop="pastOrgName" />
        <el-table-column label="新组织名称" prop="futureOrgName" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status * 1 === 0 ? 'warning' : 'success'">
              <span>{{ scope.row.status * 1 === 0 ? '待审核' : '已通过' }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">
              <span>{{ scope.row.status * 1 === 0 ? '审核' : '查看' }}</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="page.total"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="changeCurrent"
        @size-change="changeSize"
      />
      <org-relation-transfer-form v-model="formList" @doSubmit="doSubmit" />
    </div>
  </el-card>
</template>

<script>
import { queryOrgTree } from '@/api/permission'
import {
  getOrgRelationTransferList,
  getOrgRelationTransfer,
  saveOrgRelationTransfer,
  updateOrgRelationTransfer
} from '@/api/work'
import { decrypt } from '@/utils/tools'
import OrgRelationTransferForm from '@/views/work/form/org_relation_transfer_form'

export default {
  name: 'OrgRelationTransrerList',
  components: { OrgRelationTransferForm },
  data() {
    return {
      list: [],
      orgList: [],
      propData: {
        'label': 'label',
        'value': 'id',
        'children': 'children',
        checkStrictly: true
      },
      page: {
        pastOrgId: '',
        futureOrgId: '',
        userName: '',
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      cascader: {
        orgName: [],
        futureOrgName: []
      },
      formList: {
        refresh: false,
        id: '',
        readonly: false
      }
    }
  },
  mounted() {
    this.getOrgList()
    this.getList()
  },
  methods: {
    getOrgList() {
      queryOrgTree({}).then(res => {
        if (res.code * 1 === 0) {
          this.orgList = res.data
        }
      })
    },
    getList() {
      const params = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize
      }
      const data = {
        pastOrgId: this.page.pastOrgId,
        futureOrgId: this.page.futureOrgId,
        userName: this.page.userName
      }
      getOrgRelationTransferList(params, data).then(res => {
        if (res.code * 1 === 0) {
          this.page.total = res.data.total * 1
          this.list = res.data.list
          this.list.forEach(item => {
            item.userName = decrypt(item.userName)
          })
        }
      })
    },
    changeOrgId(e) {
      e.forEach((item, index) => {
        if (index === e.length - 1) {
          this.page.pastOrgId = item
        }
      })
    },
    changeFutureOrgId(e) {
      e.forEach((item, index) => {
        if (index === e.length - 1) {
          this.page.futureOrgId = item
        }
      })
    },
    handleClear() {
      this.cascader.orgName = []
      this.cascader.futureOrgName = []
      this.page.pastOrgId = ''
      this.page.futureOrgId = ''
      this.page.userName = ''
      this.getList()
    },
    handleAdd() {
      this.formList = {
        refresh: !this.formList.refresh,
        id: '',
        readonly: false
      }
    },
    handleEdit(id) {
      getOrgRelationTransfer(id).then(res => {
        if (res.code * 1 === 0) {
          this.formList = res.data
          this.formList.refresh = !this.formList.refresh
          this.formList.readonly = true
          this.formList.disabled = this.formList.status * 1 === 1
        }
      })
    },
    doSubmit(d) {
      d.createTime = new Date(d.createTime).getTime() / 1000
      d.updateTime = new Date(d.updateTime).getTime() / 1000
      if (d.id) {
        updateOrgRelationTransfer(d).then(res => {
          if (res.code * 1 === 0) {
            this.getList()
            this.$message.success('审核关系转接成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        const data = {
          pastOrgId: d.pastOrgId,
          futureOrgId: d.futureOrgId,
          userId: d.userId,
          content: d.content,
          annexUrl: d.annexUrl,
          status: d.status
        }
        saveOrgRelationTransfer(data).then(res => {
          if (res.code * 1 === 0) {
            this.getList()
            this.$message.success('新增关系转接成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    changeCurrent(current) {
      this.page.pageNum = current
      this.getList()
    },
    changeSize(limit) {
      this.page.pageSize = limit
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
  .box-card {
    .content {
      overflow: hidden;

      .el-table {
        margin: 20px 0;
      }

      .el-pagination {
        float: right;
      }
    }
  }
</style>
