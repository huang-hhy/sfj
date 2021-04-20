<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>轮播图管理</span>
    </div>
    <div class="list-header">
      <el-button v-if="tableData.length>=0&&tableData.length<2" type="success" class="mr10" @click="add">新增轮播图
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column type="index" label="编号" align="center" width="50" />
      <el-table-column label="图片" min-width="120" align="center">
        <template slot-scope="scope">
          <img :src="$config.downloadPath + scope.row.showImg" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="channelName" label="关联频道" min-width="150" align="center" />
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">查看</el-button>
          <el-popconfirm title="确定删除该轮播图吗？" @onConfirm="del(scope.row.id)">
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
    <RotationForm v-model="item" :cate-list="cateList" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import { getToken } from '../../utils/auth'
import RotationForm from './form/rotation_form'
import {
  getRotationList,
  getRotation,
  saveRotation,
  updateRotation,
  deleteRotation, getArticleCateList
} from '@/api/article'

export default {
  name: 'RotationManage',
  components: {
    RotationForm
  },
  data() {
    return {
      headers: { Authorization: getToken() },
      tableData: [],
      cateList: [],
      item: {
        refresh: false,
        id: ''
      },
      page: {
        current: 1,
        limit: 10,
        total: 0,
        path: ''
      }
    }
  },
  mounted() {
    this.getList()
    this.getArticleCateList()
  },
  methods: {
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        showImg: ''
      }
    },
    edit(id) {
      getRotation(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          this.item = data
        }
      })
    },
    del(id) {
      deleteRotation(id).then(res => {
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
        updateRotation(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveRotation(data).then(res => {
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
      getRotationList({ pageNum, pageSize }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
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
    }
  }
}
</script>

<style lang="less">
img {
  width: 50px;
  height: 50px;
}
</style>
