<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>通告列表</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增</el-button>
      <div class="list-header-item">
        <span class="label">通告标题</span>
        <el-input v-model="page.title" class="w150 content" placeholder="请输入公告标题" />
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
        <el-table-column align="center" label="公告标题">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column align="center" label="内容">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column align="center" label="推送时间" width="180">
          <template slot-scope="scope">{{
            $moment(scope.row.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row.id)">查看</el-button>
            <el-button size="mini" type="success" @click="afficheLog(scope.row.id)">已读/未读</el-button>
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
    <AfficheForm v-model="item" @doSubmit="doSubmit" />
    <AfficheLogTable v-model="afficheData" />
  </el-card>
</template>

<script>
import AfficheForm from './form/affiche_form'
import AfficheLogTable from './form/afficheLogTable'
import { queryOrgTree } from '@/api/permission'
import {
  getAfficheList,
  getAffiche,
  saveAffiche,
  updateAffiche,
  deleteAffiche
} from '@/api/work'

export default {
  name: 'AfficheList',
  components: {
    AfficheForm,
    AfficheLogTable
  },
  data() {
    return {
      formSetting: {
        closeOnClickModal: false,
        showClose: false,
        showTop: '15vh',
        formLabelWidth: '100px',
        width: '40%'
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
        title: '',
        orgId: ''
      },
      item: {
        refresh: false,
        id: ''
      },
      afficheData: {
        refresh: false,
        id: ''
      }
    }
  },
  computed: {
    params() {
      const meetingType = this.meetingTypes
      return [
        {
          type: 'text',
          label: '标题',
          key: 'title',
          placeholder: '请输入标题',
          rules: {
            required: true, message: '标题不能为空', trigger: 'blur'
          }
        },
        {
          type: 'select',
          label: '推送组织',
          key: 'receiveOrgIds',
          placeholder: '请选择活动类型',
          options: meetingType
        },
        {
          type: 'textarea',
          label: '内容',
          key: 'content',
          rows: 2,
          placeholder: '请输入内容',
          rules: {
            required: true, message: '内容不能为空', trigger: 'blur'
          }
        }
      ]
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
        updateAffiche(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveAffiche(data).then(res => {
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
      getAfficheList({ pageNum, pageSize }, { title: this.page.title, orgId: this.page.orgId }).then(res => {
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
        receiveOrgIds: [],
        content: ''
      }
    },
    edit(id) {
      getAffiche(id).then(res => {
        if (res.code === 0) {
          const data = JSON.parse(JSON.stringify(res.data))
          data.receiveOrgIds = data.receiveOrgIds.split(',')
          this.item = data
        }
      })
    },
    afficheLog(id) {
      this.afficheData = {
        refresh: !this.afficheData.refresh,
        id: id
      }
    },
    del(id) {
      deleteAffiche(id).then(res => {
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
