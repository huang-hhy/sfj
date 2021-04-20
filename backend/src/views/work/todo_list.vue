<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>待办事项</span>
    </div>
    <div class="list-header">
      <div class="list-header-item">
        <span class="label">类型</span>
        <el-select
          v-model="page.type"
          placeholder="请选择类型"
          class="w150 content"
        >
          <el-option
            v-for="it in meetingTypes"
            :key="it.value"
            :label="it.label"
            :value="it.value"
          />
        </el-select>
      </div>
      <el-button type="primary" class="mr8" @click="getList">搜索</el-button>
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
      <el-table :data="tableData" border>
        <el-table-column align="center" width="50" type="index" label="序号" />
        <el-table-column align="center" label="标题">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column align="center" label="类型" width="120">
          <template slot-scope="scope">{{ scope.row.relationId }}</template>
        </el-table-column>
        <el-table-column align="center" label="是否阅读" width="120">
          <template slot-scope="scope">{{ scope.row.isRead }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
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
    <SuperForm
      v-model="item"
      title="会议活动"
      :params="params"
      :form-setting="formSetting"
      @doSubmit="doSubmit"
    />
  </el-card>
</template>

<script>
import SuperForm from '@/components/SuperForm'
import { queryOrgTree } from '@/api/permission'
import { getCentreList, getCentre, deleteCentre } from '@/api/base'

export default {
  name: 'TodoList',
  components: {
    SuperForm
  },
  data() {
    return {
      formSetting: {
        closeOnClickModal: false,
        showClose: false,
        showTop: '8vh',
        formLabelWidth: '100px',
        width: ''
      },
      orgTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      name: '',
      type: '',
      page: {
        current: 1,
        limit: 10,
        total: 0,
        loginName: '',
        userName: '',
        roleId: '',
        status: '',
        orgId: ''
      },
      meetingTypes: [
        {
          value: '1',
          label: '支部党员会议'
        },
        {
          value: '2',
          label: '支部委员会议'
        },
        {
          value: '3',
          label: '党小组会议'
        }
      ],
      item: {
        refresh: false,
        id: ''
      }
    }
  },
  mounted() {
    this.getOrgTree()
    this.getList()
  },
  methods: {
    getOrgTree() {
      const data = { pageNum: 1, pageSize: 9999 }
      queryOrgTree(data).then(res => {
        if (res.code === 0) {
          this.orgTree = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getListByOrg(org) {
      this.page.orgId = org.id
      this.getList()
    },
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList()
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList()
    },
    doSubmit(data) {
      console.log(data)
    },
    getList() {
      const { current: pageNum, limit: pageSize } = this.page
      getCentreList({ pageNum, pageSize }, { orgId: this.page.orgId, type: this.page.type }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: ''
      }
    },
    edit(row) {
      getCentre(row.id).then(res => {
        if (res.code === 0) {
          console.log(res)
        }
      })
    },
    del(row) {
      deleteCentre(row.id).then(res => {
        if (res.code === 0) {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .limit_rows {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
