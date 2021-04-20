<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>文章管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增文章</el-button>
      <div class="list-header-item">
        <span class="label">文章标题</span>
        <el-input v-model="page.articleTitle" class="w200 content" placeholder="请输入文章名称" />
      </div>
      <div class="list-header-item">
        <span class="label">是否首页展示</span>
        <el-select v-model="page.isShow" placeholder="请选状态" class="w100 content">
          <el-option label="是" value="1" />
          <el-option label="否" value="0" />
        </el-select>
      </div>
      <div class="list-header-item">
        <span class="label">状态</span>
        <el-select v-model="page.status" placeholder="请选状态" class="w100 content">
          <el-option label="全部" value="" />
          <el-option label="正常" value="0" />
          <el-option label="停用" value="1" />
        </el-select>
      </div>
      <el-button type="primary" class="mr8" @click="getList(1)">搜索</el-button>
      <el-button type="warning" @click="clear">清空</el-button>
    </div>
    <div class="list-content">
      <div class="cate_list">
        <el-tree
          :data="cateListTree"
          node-key="id"
          default-expand-all
          :props="defaultProps"
          :expand-on-click-node="false"
          @node-click="getListByCate"
        />
      </div>
      <el-table :data="tableData" style="width: 100%" row-key="id" border>
        <el-table-column type="index" label="编号" align="center" width="50" />
        <el-table-column label="标题" min-width="180" align="center">
          <template slot-scope="scope">
            <p class="limit_rows">{{ scope.row.articleTitle }}</p>
          </template>
        </el-table-column>
        <el-table-column label="频道" min-width="80" align="center">
          <template slot-scope="scope">{{ getCateName(scope.row.articleChannelId) }}</template>
        </el-table-column>
        <el-table-column prop="articleName" label="专属名" min-width="80" align="center" />
        <el-table-column prop="sort" label="显示排序" min-width="50" align="center" />
        <el-table-column label="首页展示" min-width="50" align="center">
          <template slot-scope="scope"> {{ scope.row.isShow===0?'否':'是' }}</template>
        </el-table-column>
        <el-table-column label="状态" min-width="50" align="center">
          <template slot-scope="scope"> {{ scope.row.status==="1"?'停用':'正常' }}</template>
        </el-table-column>
        <el-table-column prop="browseNumber" label="阅读量" min-width="50" align="center" />
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row.id)">查看</el-button>
            <el-popconfirm
              v-if="scope.row.checkStatus * 1 !== 3"
              title="确定发布该文章？"
              @onConfirm="handlePublish(scope.row.id)"
            >
              <el-button slot="reference" type="warning" size="mini">发布</el-button>
            </el-popconfirm>
            <el-popconfirm
              v-if="scope.row.checkStatus * 1 === 3"
              title="确定下架该文章？"
              @onConfirm="handleShelves(scope.row.id)"
            >
              <el-button slot="reference" type="success" size="mini">下架</el-button>
            </el-popconfirm>
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
        :page-size="page.limit"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <ArticleForm v-model="item" :cate-list="cateList" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import ArticleForm from './form/article_form'
import {
  getArticleList,
  getArticle,
  saveArticle,
  updateArticle,
  deleteArticle,
  getArticleCateListTree,
  getArticleCateList,
  articlePulish,
  downArticle
} from '@/api/article'
import { xssParse } from '@/utils/xss'
export default {
  name: 'ArticleManage',
  components: {
    ArticleForm
  },
  data() {
    return {
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      item: {
        refresh: false,
        id: ''
      },
      page: {
        current: 1,
        limit: 10,
        total: 0,
        articleTitle: '',
        articleChannelId: '',
        status: '',
        isShow: ''
      },
      cateListTree: [],
      cateList: []
    }
  },
  mounted() {
    this.getList()
    this.getArticleCateListTree()
    this.getArticleCateList()
  },
  methods: {
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        articleChannelId: '',
        articleTitle: '',
        articleName: '',
        sort: 0,
        isShow: '',
        status: '',
        orgName: '',
        articleInfo: { content: '' },
        browseNumber: 0,
        articleShowImg: ''
      }
    },
    edit(id) {
      getArticle(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          this.item = data
        }
      })
    },
    del(id) {
      deleteArticle(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doSubmit(data) {
      data.articleInfo.content = xssParse(data.articleInfo.content)
      if (data.id) {
        updateArticle(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveArticle(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    handlePublish(id) {
      articlePulish({ id: id }).then(res => {
        if (res.code * 1 === 0) {
          this.$message.success('发布文章成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleShelves(id) {
      downArticle({ id: id }).then(res => {
        if (res.code * 1 === 0) {
          this.$message.success('下架文章成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList()
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList()
    },
    getList(type) {
      const { current: pageNum, limit: pageSize } = this.page
      if (type === 0) {
        this.page.articleTitle = ''
        this.page.status = ''
        this.page.isShow = ''
      } else if (type === 1) {
        this.page.articleChannelId = ''
      }
      const where = {
        articleChannelId: this.page.articleChannelId,
        articleTitle: this.page.articleTitle,
        status: this.page.status,
        isShow: this.page.isShow
      }
      getArticleList({ pageNum, pageSize }, where).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
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
    getArticleCateList() {
      getArticleCateList({ pageNum: 1, pageSize: 30 }, {}).then(res => {
        if (res.code === 0) {
          this.cateList = res.data.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getCateName(id) {
      const arr = this.cateList
      const index = arr.findIndex(item => item.id === id)
      const articleChannelName = index !== -1 && arr[index].articleChannelName ? arr[index].articleChannelName : ''
      return articleChannelName
    },
    getListByCate(article) {
      // console.log(article)
      this.page.articleChannelId = article.id
      this.getList(0)
    },
    clear() {
      this.page.articleTitle = ''
      this.page.articleChannelId = ''
      this.page.status = ''
      this.page.isShow = ''
      this.getList()
    }
  }
}
</script>

<style lang="less">
  .limit_rows {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  body .el-table th.gutter {
    display: table-cell !important
  }

  .list-content {
    display: flex;

    .cate_list {
      margin-right: 10px;
      min-width: 200px;
      max-width: 200px;
      border: 1px solid #dddddd;
    }

  }
</style>
