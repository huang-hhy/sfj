<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>区域分类管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="addRegional">新增分类</el-button>
      <div class="list-header-item">
        <span class="label">日期</span>
        <el-date-picker
          v-model="page.time"
          type="daterange"
          class="content"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getList"
        />
      </div>
      <el-input v-model="page.key" class="w200 mr10" placeholder="请输入内容" @change="getList" />
      <el-button type="primary" class="mr10" @click="getList">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{children: 'children'}"
    >
      <el-table-column
        prop="orgName"
        label="分类名称"
        min-width="180"
      />
      <el-table-column
        prop="level"
        label="分类所属"
        min-width="180"
      />
      <el-table-column
        prop="createTime"
        label="添加时间"
        min-width="180"
      >
        <template slot-scope="scope">
          {{ $moment(scope.row.createTime).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="check(scope.row.id)">编辑</el-button>
          <el-popconfirm
            title="确定删除该分类吗？"
            @onConfirm="del(scope.row.id)"
          >
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popconfirm>
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
    <RefionalForm v-model="regionalAction" :options="tableData" @getList="getList" />
  </el-card>
</template>

<script>
import RefionalForm from './form/regional_form'
import {
  deleteOrg,
  queryOrg
} from '@/api/permission'
import {
  listToTree
} from '@/utils/auth'

export default {
  name: 'RegionalClassification',
  components: {
    RefionalForm
  },
  data() {
    return {
      tableData: [],
      page: {
        current: 1,
        limit: 10,
        total: 0,
        time: [],
        key: ''
      },
      regionalAction: {
        refresh: false,
        id: '',
        action: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList()
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList()
    },
    getList() {
      // 获取列表信息
      const _this = this
      const { current: pageNum, limit: pageSize, key: orgName } = _this.page
      const data = { pageNum, pageSize, orgName }
      queryOrg(data).then(res => {
        if (res.code === 0) {
          const nData = res.data.records
          _this.tableData = listToTree(nData, '-1')
          _this.tableData.forEach(item => {
            _this.formatKind(1, item)
          })
          _this.page.total = res.data.total * 1
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    check(id) {
      // 编辑某个区域分类
      this.regionalAction = {
        refresh: !this.regionalAction.refresh,
        id: id,
        action: 'edit'
      }
    },
    del(id) {
      // 删除某个区域分类
      const _this = this
      deleteOrg({ id }).then(res => {
        if (res.code === 0) {
          _this.$message.success('删除成功')
          _this.getList()
        }
      })
    },
    addRegional() {
      this.regionalAction = {
        refresh: !this.regionalAction.refresh,
        id: '',
        action: 'add'
      }
    },
    formatKind(level, kind) {
      const _this = this
      switch (level) {
        case 1:
          kind.level = '一级分类'
          break
        case 2:
          kind.level = '二级分类'
          break
        case 3:
          kind.level = '三级分类'
          break
      }
      if (kind.children) {
        kind.children.forEach(item => {
          _this.formatKind(level + 1, item)
        })
      }
    }
  }
}
</script>

<style scoped>
  .title {
    font-size: 22px;
    font-weight: bold;
  }
</style>
