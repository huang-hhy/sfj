<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <mainHeader :content="content" />
      <div style="margin: 30px 0">
        <el-radio-group v-model="page.status" :fill="'#e33a3c'" :text-color="'#fff'" @change="getList">
          <el-radio-button label="1">已评</el-radio-button>
          <el-radio-button label="0">未评</el-radio-button>
        </el-radio-group>
      </div>
      <div v-for="(item, index) in list" :key="index" class="main">
        <div class="header">
          <span class="type">民主评议</span>
          <i class="el-icon-info"/>
          <span class="title">{{ item.title }}</span>
          <el-tag size="small" :type="page.status * 1 === 0 ? 'info' : 'success'" :hit="false">
            {{ page.status * 1 === 0 ? '未评' : '已评' }}
          </el-tag>
          <span class="detail" @click="handleLook(item)">查看详情</span>
        </div>
        <div class="content">
            <span class="item">
              <span class="icon"/>
              <span class="text">开始时间： {{ moment(item.startTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
            </span>
          <span class="item">
              <span class="icon"/>
              <span class="text">结束时间： {{ moment(item.endTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
            </span>
          <span class="item">
              <span class="icon"/>
              <span class="text">参选人数： {{ item.participants.length }} 人</span>
            </span>
          <span class="item">
              <span class="icon"/>
              <span class="text">创建时间: {{ moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
            </span>
          <span class="item">
              <span class="icon"/>
              <span class="text">更新时间: {{ moment(item.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
            </span>
          <span class="item">
              <span class="icon"/>
              <span class="text">评议分类： {{ item.typeName }}</span>
          </span>
        </div>
      </div>
      <el-pagination
        :total="page.total"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="changeCurrent"
        @size-change="changeSize"
      />
    </el-card>
    <detail v-model="formList" @doSubmit="doSubmit"/>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import {getDemocraticAppraisalList, getDemocraticAppraisalRecordList, saveDemocraticAppraisalRecord} from '@/api/pc'
  import moment from 'moment'
  import detail from './form/detail'
  import Vue from 'vue'
  import mainHeader from "../../../components/pc/common/mainHeader";

  export default {
    name: "appraisalDemocratic",
    components: {
      mainHeader,
      NavBar,
      detail
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 民主评议',
      }
    },
    data() {
      return {
        list: [],
        page: {
          status: '1',
          total: 0,
          pageNum: 1,
          pageSize: 10
        },
        moment: moment,
        formList: {
          refresh: false
        },
        content: {
          sort: '2',
          name: '党务管理',
          url: '/pc/partyManagement',
          title: '民主评议'
        }
      }
    },
    mounted() {
      this.setBaseInfo()
      this.getList()
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      getRecordList() {
        this.list = []
        getDemocraticAppraisalRecordList({}).then(res => {
          if (res.code * 1 === 0) {
            const temp = res.data
            temp.forEach((item, index) => {
              item.democraticAppraisal.participants = JSON.parse(item.democraticAppraisal.participants)
              item.democraticAppraisal.participants.forEach(i => {
                item.democraticAppraisalRecord.forEach(j => {
                  if (i.id === j.userId) {
                    Vue.set(i, 'result', j.result)
                    Vue.set(i, 'reason', j.reason)
                  }
                })
              })
              this.list.push(item.democraticAppraisal)
            })
          }
        })
      },
      getList() {
        if (this.page.status * 1 === 0) {
          this.list = []
          const params = {
            pageSize: this.page.pageSize,
            pageNum: this.page.pageNum,
            time: parseInt(new Date().getTime() / 1000)
          }
          getDemocraticAppraisalList(params).then(res => {
            if (res.code * 1 === 0) {
              this.list = res.data
              this.list.forEach(item => {
                item.participants = JSON.parse(item.participants)
                item.participants.forEach(i => {
                  Vue.set(i, 'result', '')
                  Vue.set(i, 'reason', '')
                })
              })
              this.page.total = this.list.length
            }
          })
        } else {
          this.getRecordList()
        }
      },
      handleLook(d) {
        if (this.page.status * 1 === 0) {
          this.formList = JSON.parse(JSON.stringify(d))
          this.formList.disabled = false
          this.formList.refresh = !this.formList.refresh
        } else if (this.page.status * 1 === 1) {
          this.formList = JSON.parse(JSON.stringify(d))
          this.formList.disabled = true
          this.formList.refresh = !this.formList.refresh
        }
      },
      doSubmit(d) {
        saveDemocraticAppraisalRecord(d).then(res => {
          if (res.code * 1 === 0) {
            this.getRecordList()
            this.$message.success('评议成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      changeCurrent(current) {
        this.page.pageNum = current
        this.getRecordList()
      },
      changeSize(limit) {
        this.page.pageSize = limit
        this.getRecordList()
      }
    }
  }
</script>

<style lang="less">
  .content {
    .el-radio-button__inner:hover {
      color: #e33a3c;
    }
  }
</style>

<style scoped lang="less">
  .content {
    width: 1050px;
    margin: 20px auto;
    padding: 20px 0 0;

    .main {
      margin: 50px 0;

      .header {
        .type {
          cursor: pointer;
          color: #fff;
          line-height: 32px;
          display: inline-block;
          font-size: 14px;
          padding: 0 15px;
          background: url("~assets/pc/exam/exam.png") no-repeat;
        }

        i {
          vertical-align: middle;
          font-size: 34px;
          color: #e33a3c;
          line-height: 30px;
          margin-left: -10px;
          cursor: pointer;
        }

        .title {
          margin: 0 5px;
          font-size: 14px;
          vertical-align: middle;
          line-height: 35px;
          color: #8e8f92;
        }

        .detail {
          float: right;
          border: #e33a3c 1px solid;
          color: #e33a3c;
          border-radius: 3px;
          font-size: 14px;
          padding: 5px 10px;
          cursor: pointer;
        }

        .detail:hover {
          background: #e33a3c;
          color: #FFFFFF;
        }
      }

      .content {
        border: #f4f4f4 1px solid;
        margin: 15px auto;
        background: #f8f8f8;
        padding: 0 28px;

        .item {
          width: 30%;
          margin: 10px;
          display: inline-block;

          .icon {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #e8e8e8;
            margin-right: 8px;
          }

          .text {
            line-height: 30px;
          }
        }
      }
    }

    .el-pagination {
      float: right;
      margin: 20px 0;
    }
  }
</style>
