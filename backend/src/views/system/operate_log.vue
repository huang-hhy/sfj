<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>操作日志</span>
    </div>
    <div class="list-header">
      <div class="list-header-item">
        <span class="label">操作人员</span>
        <el-input v-model="page.userName" class="w150 content" @change="getList" />
      </div>
      <div class="list-header-item">
        <span class="label">日志来源</span>
        <el-select v-model="page.logSource" class="w100 content" @change="getList">
          <el-option label="全部" value="0" />
        </el-select>
      </div>
      <div class="list-header-item">
        <span class="label">操作时间</span>
        <el-date-picker
          v-model="page.time"
          type="daterange"
          class="content"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          @change="getList"
        />
      </div>
      <el-button type="primary" @click="getList">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
    >
      <el-table-column
        type="index"
        label="编号"
        align="center"
        width="50"
      />
      <el-table-column
        prop="operator"
        label="操作人员"
        min-width="100"
        align="center"
      />
      <el-table-column
        prop="position"
        label="职位"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="regional"
        label="区域分组"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="source"
        label="日志来源"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="business"
        label="操作业务"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="content"
        label="操作内容"
        min-width="180"
        align="center"
      />
      <el-table-column
        prop="createTime"
        label="操作时间"
        min-width="150"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ $moment(scope.row.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
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
  </el-card>
</template>

<script>
import {
  querySysLog
} from '@/api/system'

export default {
  name: 'OperateLog',
  data() {
    return {
      tableData: [
        {
          userName: 'zhangsan',
          mobile: '13602059932',
          name: '张三',
          position: '管理员',
          role: '超级管理员',
          regional: '联通》联通1》联通2》联通3',
          createTime: 1584425874,
          status: '1'
        }
      ],
      page: {
        current: 1,
        limit: 10,
        total: 0,
        time: [],
        userName: '',
        logSource: '0'
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
      const { current: pageNo, limit: pageSize, logSource, userName, time: [beginTime, endTime] } = _this.page
      const data = { pageNo, pageSize, logSource, userName, beginTime, endTime }
      querySysLog(data).then(res => {
        if (res.code === 0) {
          _this.tableData = res.data.records
          _this.page.total = res.data.total * 1
        }
      })
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
