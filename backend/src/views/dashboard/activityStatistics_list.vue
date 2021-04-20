<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>会议活动统计</span>
    </div>
    <div class="list-header">
      <!--      <el-button type="success" class="mr10" @click="add">新增工作指引</el-button>-->
      <div class="list-header-item">
        <span class="label">会议类型</span>
        <el-select v-model="typeIndex" placeholder="请选择分类" class="w200 content" @change="typeChange">
          <el-option label="全部" value="" />
          <el-option v-for="(it,idx) in typeOptions" :key="it.id" :label="it.typeName" :value="idx" />
        </el-select>
      </div>
      <div v-show="targetType*1===3||targetType*1===2" class="list-header-item">
        <span class="label">年份</span>
        <el-date-picker
          v-model="year"
          value-format="yyyy"
          type="year"
          placeholder="选择年"
          @change="yearChange"
        />
      </div>
      <div v-show="targetType*1===1" class="list-header-item">
        <span class="label">月份</span>
        <el-date-picker
          v-model="month"
          value-format="yyyy-M"
          type="month"
          placeholder="选择年"
          ;@change="monthChange"
        />
      </div>
      <div v-show="targetType*1===2" class="list-header-item">
        <span class="label">季度</span>
        <el-select v-model="season" placeholder="请选择" @change="seasonChange">
          <el-option label="第一季度" value="1" />
          <el-option label="第二季度" value="2" />
          <el-option label="第三季度" value="3" />
          <el-option label="第四季度" value="4" />
        </el-select>
      </div>
      <el-button type="primary" class="mr8" @click="getList()">搜索</el-button>
      <el-button type="warning" @click="clear">清空</el-button>
    </div>
    <div class="number-box">
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            <div class="content-head">
              达标组织数量
            </div>
            <div class="count">
              {{ typeof statisticData.dbTotal !== 'undefined' ? statisticData.dbTotal : '-' }}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content ">
            <div class="content-head">
              不达标组织数量
            </div>
            <div class="count">
              {{ typeof statisticData.noDbTotal !== 'undefined' ? statisticData.noDbTotal : '-' }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column label="组织名称" min-width="180" align="center" prop="title" />
      <el-table-column label="会议活动类型" min-width="180" align="center" prop="title" />
      <el-table-column label="会议活动次数" min-width="180" align="center" prop="title" />
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
  getMeetingCateList
} from '@/api/work'
import { statisticMeeting } from '@/api/data-count'

export default {
  name: 'LessonList',
  data() {
    return {
      year: '',
      month: '',
      season: '',
      tableData: [],
      typeOptions: [],
      typeIndex: '',
      targetType: '',
      item: {
        refresh: false,
        id: '',
        enclosure: '',
        content: '',
        title: '',
        workTypeId: ''
      },
      page: {
        current: 1,
        limit: 10,
        total: 0,
        beginTime: '',
        endTime: '',
        meetingTypeId: ''
      },
      statisticData: {},
      typeList: []
    }
  },
  mounted() {
    this.getType()
  },
  methods: {
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        enclosure: '',
        content: '',
        title: '',
        workTypeId: '',
        status: 0
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
      // const {current: pageNum, limit: pageSize} = this.page
      statisticMeeting(this.page).then(res => {
        if (res.code * 1 === 0) {
          this.tableData = res.data.dbOrgList
          this.statisticData = res.data
        }
      })
    },
    getType() {
      getMeetingCateList({ current: 1, limit: 999 }, {}).then(res => {
        if (res.code * 1 === 0) {
          this.typeOptions = res.data.list
        }
      })
    },
    typeChange(val) {
      this.targetType = this.typeOptions[val]['targetType']
      this.page.meetingTypeId = this.typeOptions[val]['id']
      this.year = ''
      this.season = ''
      this.month = ''
      this.page.beginTime = ''
      this.page.endTime = ''
      // targetType 1月 2季 3 年
    },
    seasonChange(val) {
      if (!val) return false
      if (!this.year) {
        this.$message.warning('请先选择年份')
        this.season = ''
        return false
      }
      let time1 = ''
      let time2 = ''
      const year = this.year
      switch (val * 1) {
        case 1:
          time1 = year + '-' + '1'
          time2 = year + '-' + '4'
          break
        case 2:
          time1 = year + '-' + '4'
          time2 = year + '-' + '7'
          break
        case 3:
          time1 = year + '-' + '7'
          time2 = year + '-' + '10'
          break
        case 4:
          time1 = year + '-' + '10'
          time2 = (year * 1 + 1) + '-' + '1'
          break
      }
      this.page.beginTime = this.$moment(time1).unix()
      this.page.endTime = this.$moment(time2).unix()
    },
    monthChange(val) {
      if (!val) return false
      const curMonth = val.split('-')[1]
      const curYear = val.split('-')[0]
      let nextMonth = curMonth * 1 + 1
      let nextYear = curYear
      if (nextMonth >= 13) {
        nextMonth = 1
        nextYear = curYear * 1 + 1
      }
      this.page.beginTime = this.$moment(val).unix()
      this.page.endTime = this.$moment(nextYear + '-' + nextMonth).unix()
    },
    yearChange(val) {
      if (!val) return false
      const nextYear = String(val * 1 + 1)
      if (this.targetType * 1 === 3) {
        this.page.beginTime = this.$moment(val).unix()
        this.page.endTime = this.$moment(nextYear).unix()
      }
    },
    clear() {
      this.year = ''
      this.season = ''
      this.month = ''
      this.page = {
        current: 1,
        limit: 10,
        total: 0,
        beginTime: '',
        endTime: '',
        meetingTypeId: ''
      }
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.number-box {
  cursor: pointer;
  width: 60%;
  margin: 25px auto;

  .content-head {
    color: rgb(140, 140, 140);
    font-size: 18px;
    text-align: center;
  }

  .count {
    font-weight: 600;
    font-size: 22px;
    text-align: center;
    margin: 15px;
  }
}
</style>
