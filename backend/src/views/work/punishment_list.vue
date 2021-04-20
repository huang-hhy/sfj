<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>惩罚列表</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增</el-button>
      <div class="list-header-item">
        <span class="label">关键词</span>
        <el-input v-model="page.title" class="w150 content" placeholder="请输入关键词" />
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
        <el-table-column align="center" label="惩罚标题">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column align="center" label="描述">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column align="center" label="所属组织" width="200">
          <template slot-scope="scope">{{ scope.row.orgName }}</template>
        </el-table-column>
        <el-table-column align="center" label="获得时间" width="150">
          <template slot-scope="scope">{{ $moment(scope.row.grantTime * 1000).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
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
    <RewardPunishmentForm v-model="item" :org-tree="orgTree" title="奖励" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import RewardPunishmentForm from './form/reward_punishment_form'
import { queryOrgTree } from '@/api/permission'
import {
  getRewardPunishmentList,
  getRewardPunishment,
  saveRewardPunishment,
  updateRewardPunishment,
  deleteRewardPunishment
} from '@/api/work'

export default {
  name: 'RewardList',
  components: {
    RewardPunishmentForm
  },
  data() {
    return {
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
        title: '',
        orgId: ''
      },
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
    handleClear() {
      this.getList()
    },
    doSubmit(data) {
      if (data.id) {
        updateRewardPunishment(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveRewardPunishment(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    getList() {
      const { current: pageNum, limit: pageSize } = this.page
      const where = {
        rewardPunishmentType: '3,4'
      }
      getRewardPunishmentList({ pageNum, pageSize }, where).then(res => {
        if (res.code * 1 === 0) {
          if (res.code === 0) {
            this.tableData = res.data.list
            this.page.total = res.data.total * 1
          }
        }
      })
    },
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        title: '',
        grantTime: '',
        content: '',
        participants: [],
        rewardPunishmentType: '',
        score: '',
        imgUrl: []
      }
    },
    edit(id) {
      getRewardPunishment(id).then(res => {
        if (res.code === 0) {
          const data = JSON.parse(JSON.stringify(res.data))
          data.imgUrl = data.imgUrl ? JSON.parse(data.imgUrl) : []
          data.participants = data.participants ? JSON.parse(data.participants) : []
          data.grantTime = this.$moment(data.grantTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.item = data
        }
      })
    },
    del(id) {
      deleteRewardPunishment(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
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
