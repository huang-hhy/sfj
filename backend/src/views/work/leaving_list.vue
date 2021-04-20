<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>留言列表</span>
    </div>
    <div class="list-header">
      <div class="list-header-item">
        <span class="label">关键词</span>
        <el-input v-model="page.content" class="w150 content" placeholder="请输入关键词" />
      </div>
      <div class="list-header-item">
        <span class="label">是否公开</span>
        <el-select v-model="page.isPublic" placeholder="请选择" @change="getList">
          <el-option label="全部" value="" />
          <el-option label="公开" :value="0" />
          <el-option label="不公开" :value="1" />
        </el-select>
      </div>
      <el-button type="primary" class="mr8" @click="getList">搜索</el-button>
    </div>
    <div class="list-content">
      <el-table :data="tableData.slice((page.current-1)*page.limit,page.current*page.limit)" border>
        <el-table-column align="center" width="50" type="index" label="序号" />
        <el-table-column align="center" label="留言内容">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column align="center" label="留言人" width="180">
          <template slot-scope="scope">{{ scope.row.userName }}</template>
        </el-table-column>
        <el-table-column align="center" label="留言时间" width="180">
          <template slot-scope="scope">{{
            $moment(scope.row.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="100">
          <template slot-scope="scope">{{ scope.row.status * 1 === 1 ? '公开' : ' 未公开' }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
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
    <LeavingForm v-model="item" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import {
  getLeaveMessageList,
  getLeaveMessage,
  updateLeaveMessage,
  deleteLeaveMessage
} from '@/api/work'
import { decrypt } from '@/utils/tools'
import LeavingForm from './form/leaving_form'

export default {
  name: 'LeavingList',
  components: {
    LeavingForm
  },
  data() {
    return {
      tableData: [],
      page: {
        current: 1,
        limit: 10,
        total: 0,
        content: '',
        isPublic: ''
      },
      item: {
        refresh: false,
        id: ''
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
    handleClear() {
      this.getList()
    },
    getList() {
      const { current: pageNum, limit: pageSize } = this.page
      getLeaveMessageList({ pageNum, pageSize }, { content: this.page.content, isPublic: this.page.isPublic }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    doSubmit(data) {
      updateLeaveMessage(data).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    edit(id) {
      getLeaveMessage(id).then(res => {
        if (res.code === 0) {
          const data = JSON.parse(JSON.stringify(res.data))
          data.userName = decrypt(data.userName)
          data.createTime = this.$moment(data.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.item = data
        }
      })
    },
    del(id) {
      deleteLeaveMessage(id).then(res => {
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
    min-width: 200px;
    max-width: 200px;
    border: 1px solid #dddddd;
  }
}
</style>
