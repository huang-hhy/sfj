<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>体检表列表</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增</el-button>
      <div class="list-header-item">
        <span class="label">体检名称</span>
        <el-input v-model="page.name" class="w200 content" placeholder="请输入会议名称" />
      </div>
      <div class="list-header-item">
        <span class="label">体检类型</span>
        <el-select
          v-model="page.type"
          placeholder="请选择体检类型"
          class="w150 content"
        >
          <el-option
            v-for="it in templateType"
            :key="it.value"
            :label="it.label"
            :value="it.value"
          />
        </el-select>
      </div>
      <el-button type="primary" class="mr8" @click="handleSearch">搜索</el-button>
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
        <el-table-column align="center" label="模板标题">
          <template slot-scope="scope">{{ scope.row.templateTitle }}</template>
        </el-table-column>
        <el-table-column align="center" label="开始时间" width="180">
          <template slot-scope="scope">{{ $moment(scope.row.beginTime*1).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column align="center" label="结束时间" width="180">
          <template slot-scope="scope">{{ $moment(scope.row.endTime*1).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column align="center" label="体检类型" width="120">
          <template slot-scope="scope">{{ scope.row.templateType*1===1?'年中体检':'年度体检' }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="edit(scope.row.id)">编辑</el-button>
            <el-popconfirm title="确定删除该文章吗？" @onConfirm="del(scope.row.id)">
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
        :page-size="page.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<script>
import { queryOrgTree } from '@/api/permission'
import {
  partySpiritQueryTemplate,
  partySpiritDeleteTemplate
} from '@/api/partyCheck'

export default {
  name: 'PartyCheckTemplateList',
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
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orgId: ''
      },
      templateType: [
        {
          value: '1',
          label: '年中体检'
        },
        {
          value: '2',
          label: '年度体检'
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
    handleSizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.getList()
    },
    handleCurrentChange(current) {
      this.page.pageNum = current
      this.getList()
    },
    doSubmit(data) {
      console.log(data)
    },
    handleSearch() {
    },
    handleClear() {
      this.getList()
    },
    getList() {
      partySpiritQueryTemplate(this.page).then(res => {
        if (res.code * 1 === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        } else {
          this.$message.error('网络连接失败')
        }
      })
    },
    add() {
      this.$router.push(
        { path: '/partycheck/partycheck_template_form' }
      )
    },
    edit(id) {
      this.$router.push({
        path: '/partycheck/partycheck_template_form',
        query: { id }
      })
    },
    del(id) {
      partySpiritDeleteTemplate(id).then(res => {
        if (res.code * 1 === 0) {
          this.$message.success('操作成功')
          this.getList()
        } else {
          this.$message.error('网络连接失败')
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
