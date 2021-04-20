<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>测评列表</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增</el-button>
      <div class="list-header-item">
        <span class="label">测评标题</span>
        <el-input v-model="page.title" class="w150 content" placeholder="请输入测评标题" />
      </div>
      <div class="list-header-item">
        <span class="label">测评类型</span>
        <el-select
          v-model="page.type"
          placeholder="请选择测评类型"
          class="w150 content"
        >
          <el-option
            v-for="it in optionsTypes"
            :key="it.id"
            :label="it.typeName"
            :value="it.id"
          />
        </el-select>
      </div>
      <el-button type="primary" class="mr8" @click="getList">搜索</el-button>
      <el-button type="danger" class="mr8" @click="handleClear">清空</el-button>
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
        <el-table-column align="center" label="开始时间" width="180">
          <template slot-scope="scope">{{
            $moment(scope.row.startTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="结束时间" width="180">
          <template slot-scope="scope">{{ $moment(scope.row.endTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
        <!--        <el-table-column align="center" label="状态" width="100">-->
        <!--          <template slot-scope="scope">{{ scope.row.status *1 === 0 ? '未开始':'已结束' }}</template>-->
        <!--        </el-table-column>-->
        <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="primary" @click="check(scope.row.id)">查看</el-button>

            <el-popconfirm
              title="确定删除吗？"
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
    <DemocraticForm v-model="item" :options-types="optionsTypes" :org-tree="orgTree" @doSubmit="doSubmit" />
    <DemocraticTable v-model="democraticItem" />
  </el-card>
</template>

<script>
import DemocraticForm from './form/democratic_form'
import DemocraticTable from './table/democraticTable'
import { queryOrgTree } from '@/api/permission'
import {
  getDemocraticList,
  getDemocratic,
  saveDemocratic,
  updateDemocratic,
  deleteDemocratic,
  getDemocraticCateSelect
} from '@/api/work'

export default {
  name: 'DemocraticList',
  components: {
    DemocraticForm,
    DemocraticTable
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
      optionsTypes: [],
      type: '',
      page: {
        current: 1,
        limit: 10,
        total: 0,
        title: '',
        orgId: ''
      },
      item: {
        refresh: false,
        id: ''
      },
      democraticItem: {
        refresh: false,
        id: ''
      }
    }
  },
  mounted() {
    this.getTypes()
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
    getTypes() {
      getDemocraticCateSelect().then(res => {
        if (res.code * 1 === 0) {
          this.optionsTypes = res.data
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
      if (data.id) {
        updateDemocratic(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveDemocratic(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    handleClear() {
      this.getList()
    },
    getList() {
      const { current: pageNum, limit: pageSize } = this.page
      getDemocraticList({ pageNum, pageSize }, { title: this.page.title, orgId: this.page.orgId }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        title: '',
        democraticAppraisalTypeId: '',
        content: '',
        participants: [],
        chooseNum: '',
        isDay: '',
        startTime: '',
        endTime: '',
        orgIds: ''
      }
    },
    edit(id) {
      getDemocratic(id).then(res => {
        if (res.code === 0) {
          const data = JSON.parse(JSON.stringify(res.data))
          data.participants = data.participants ? JSON.parse(data.participants) : []
          data.orgIds = data.orgIds.split(',')
          data.startTime = this.$moment(data.startTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          data.endTime = this.$moment(data.endTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.item = data
        }
      })
    },
    del(id) {
      deleteDemocratic(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    check(id) {
      this.democraticItem = {
        refresh: !this.democraticItem.refresh,
        id: id
      }
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
