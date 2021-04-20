<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>频道管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增频道</el-button>
      <div class="list-header-item">
        <span class="label">频道名称</span>
        <el-input v-model="page.articleChannelName" class="w200 content" placeholder="请输入频道名称" @change="getList" />
      </div>
      <el-button type="primary" class="mr10" @click="getList">搜索</el-button>
      <el-button type="warning" @click="clear">清空</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
    >
      <el-table-column type="index" label="编号" align="center" width="50" />
      <el-table-column label="名称" min-width="150" align="center" prop="articleChannelName" />
      <el-table-column label="父频道" min-width="100" align="center" prop="parentId">
        <template slot-scope="scope"> {{ getParentCateName(scope.row.parentId) }}</template>
      </el-table-column>
      <el-table-column label="门户展示文章数量" min-width="100" align="center" prop="showNumber" />
      <el-table-column label="导航栏显示排序" min-width="100" align="center" prop="sort" />
      <el-table-column label="栏目显示排序" min-width="100" align="center" prop="menuSort" />
      <el-table-column label="app首页显示" min-width="100" align="center">
        <template slot-scope="scope"> {{ scope.row.isShowApp===0?'隐藏':'显示' }}</template>
      </el-table-column>
      <el-table-column label="显示在首页栏目" min-width="100" align="center">
        <template slot-scope="scope"> {{ scope.row.isShowMenu===0?'隐藏':'显示' }}</template>
      </el-table-column>
      <el-table-column label="pc首页显示在菜单栏" min-width="100" align="center">
        <template slot-scope="scope"> {{ scope.row.isShowPc===0?'隐藏':'显示' }}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="160"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">查看</el-button>
          <el-popconfirm title="确定删除该文章吗？" @onConfirm="del(scope.row.id)">
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
    <ArticleCateForm v-model="item" :cate-list="cateList" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import ArticleCateForm from './form/article_cate_form'
import {
  getArticleCateListTree,
  getArticleCateList,
  getArticleCate,
  saveArticleCate,
  updateArticleCate,
  deleteArticleCate
} from '@/api/article'

export default {
  name: 'ArticleCate',
  components: {
    ArticleCateForm
  },
  data() {
    return {
      tableData: [],
      cateList: [],
      cateListTree: [],
      item: {
        refresh: false,
        id: ''
      },
      page: {
        current: 1,
        limit: 10,
        total: 0,
        articleChannelName: ''
      }
    }
  },
  mounted() {
    this.getList()
    this.getArticleCateList()
    this.getArticleCateListTree()
  },
  methods: {
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        articleChannelName: '',
        smallIcon: '',
        parentId: '',
        showNumber: 5,
        sort: '',
        menuSort: '',
        isShowApp: '',
        isShowMenu: '',
        isShowPc: ''
      }
    },
    edit(id) {
      getArticleCate(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          this.item = data
        }
      })
    },
    del(id) {
      deleteArticleCate(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doSubmit(data) {
      if (data.id) {
        updateArticleCate(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveArticleCate(data).then(res => {
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
      const where = {
        // parentId: this.page.parentId,
        articleChannelName: this.page.articleChannelName
      }
      getArticleCateList({ pageNum, pageSize }, where).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    getArticleCateList() {
      getArticleCateList({ pageNum: 1, pageSize: 10 }, {}).then(res => {
        if (res.code === 0) {
          this.cateList = res.data.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getArticleCateListTree() {
      getArticleCateListTree({}).then(res => {
        if (res.code === 0) {
          this.cateListTree = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getParentCateName(id) {
      const arr = this.cateList
      const index = arr.findIndex(item => item.id === id)
      const articleChannelName = index !== -1 && arr[index].articleChannelName ? arr[index].articleChannelName : '-'
      return articleChannelName
    },
    clear() {
      this.page.articleChannelName = ''
      this.getList()
    }
  }
}
</script>

<style scoped>
  .limit_rows {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
  }
</style>
