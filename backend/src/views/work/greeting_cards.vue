<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>贺卡列表</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增</el-button>
      <div class="list-header-item">
        <span class="label">关键词</span>
        <el-input v-model="page.title" class="w150 content" placeholder="请输入关键词" />
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
        <el-table-column align="center" label="贺卡标题">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column align="center" label="贺卡内容">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column align="center" label="建立时间" width="180">
          <template slot-scope="scope">{{
            $moment(scope.row.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row.id)">查看</el-button>
            <el-button size="mini" type="success" @click="record(scope.row.id)">党员记录</el-button>
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
    <GreetingCardForm v-model="item" :org-tree="orgTree" @doSubmit="doSubmit" />
    <RecordTable v-model="recordItem" />
  </el-card>
</template>

<script>
import GreetingCardForm from './form/greeting_card_form'
import RecordTable from './form/recordTable'
import { queryOrgTree } from '@/api/permission'
import {
  getGreetingCardsList,
  getGreetingCards,
  saveGreetingCards,
  updateGreetingCards,
  deleteGreetingCards
} from '@/api/work'

export default {
  name: 'GreetingCards',
  components: {
    GreetingCardForm,
    RecordTable
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
      },
      recordItem: {
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
      if (data.id) {
        updateGreetingCards(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveGreetingCards(data).then(res => {
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
      getGreetingCardsList({ pageNum, pageSize }, {
        title: this.page.title,
        orgId: this.page.orgId
      }).then(res => {
        if (res.code * 1 === 0) {
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
        content: '',
        congratulationTypeId: '',
        participants: [],
        pushTime: '',
        imgUrl: ''
      }
    },
    edit(id) {
      getGreetingCards(id).then(res => {
        if (res.code === 0) {
          const data = JSON.parse(JSON.stringify(res.data))
          data.participants = data.participants ? JSON.parse(data.participants) : []
          data.pushTime = this.$moment(data.pushTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.item = data
        }
      })
    },
    del(id) {
      deleteGreetingCards(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    record(id) {
      this.recordItem = {
        id: id,
        refresh: !this.recordItem.refresh
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
