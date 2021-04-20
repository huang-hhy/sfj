<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>意见征集列表</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr15" @click="handleAdd">新增</el-button>
      <el-button type="danger" class="mr15" @click="brachDelete">批量删除</el-button>
      <span class="ml15 mr15">关键词</span>
      <el-input v-model="page.title" class="w240 mr15" placeholder="请输入标题关键词" />
      <el-button type="primary" class="ml15" @click="getList">查询</el-button>
      <el-button type="warning" class="ml15" @click="handleClear">重置</el-button>
    </div>
    <el-table
      :data="list"
      :cell-style="{'text-align': 'center'}"
      :header-cell-style="{'text-align': 'center', 'background-color': '#f8f8f8'}"
      @selection-change="changeSelect"
    >
      <el-table-column type="selection" width="100" />
      <el-table-column label="征集标题" prop="title" />
      <el-table-column label="征集组织" prop="orgName" />
      <el-table-column label="发布时间">
        <template slot-scope="scope">
          {{ $moment(scope.row.publicTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="warning" class="mr10" @click="handleLook(scope.row.id)">查看评论</el-button>
          <el-popconfirm
            title="确认删除此意见征集？"
            @onConfirm="handleDelete(scope.row.id)"
          >
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popconfirm>
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
    <optionForm v-model="formList" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import { solicitOpinionsList, saveSolicitOpinions, getSolicitOpinion, updateSolicitOpinion, deleteSolicitOpinions } from '@/api/work'
import optionForm from './form/opinionForm'

export default {
  name: 'LeavingList',
  components: {
    optionForm
  },
  data() {
    return {
      list: [],
      orgList: [],
      page: {
        total: 0,
        pageSize: 10,
        pageNum: 1,
        title: ''
      },
      formList: {
        refresh: false,
        id: ''
      },
      selected: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize
      }
      const data = {
        functionType: '0',
        title: this.page.title
      }
      solicitOpinionsList(params, data).then(res => {
        if (res.code * 1 === 0) {
          this.list = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    handleAdd() {
      this.formList = {
        refresh: !this.formList.refresh,
        id: ''
      }
    },
    handleEdit(id) {
      getSolicitOpinion({ id: id }).then(res => {
        if (res.code * 1 === 0) {
          this.formList = JSON.parse(JSON.stringify(res.data))
          this.formList.publicTime = this.$moment(this.formList.publicTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.formList.dialog = '1'
          this.formList.refresh = !this.formList.refresh
        }
      })
    },
    handleLook(id) {
      this.$router.push({
        path: 'opinions-repository',
        query: {
          id: id
        }
      })
    },
    doSubmit(d) {
      if (d.id) {
        updateSolicitOpinion(d).then(res => {
          if (res.code * 1 === 0) {
            this.getList()
            this.$message.success('修改意见征集成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveSolicitOpinions(d).then(res => {
          if (res.code * 1 === 0) {
            this.getList()
            this.$message.success('添加意见征集成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    handleClear() {
      this.page.title = ''
      this.getList()
    },
    handleDelete(id) {
      deleteSolicitOpinions({ ids: id }).then(res => {
        if (res.code * 1 === 0) {
          this.getList()
          this.$message.success('删除成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeSelect(e) {
      this.selected = []
      e.forEach(item => {
        this.selected.push(item.id)
      })
    },
    brachDelete() {
      this.selected.forEach((item, index) => {
        deleteSolicitOpinions({ ids: item }).then(res => {
          if (index === this.selected.length - 1) {
            if (res.code * 1 === 0) {
              this.getList()
              this.$message.success('删除成功')
            } else {
              this.$message.error(res.msg)
            }
          }
        })
      })
    },
    changeCurrent(current) {
      this.page.pageSize = current
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
    overflow: hidden;
    .el-table {
      margin: 50px 0 30px;
    }

    .el-pagination {
      float: right;
      margin: 10px 0 30px;
    }
  }
</style>
