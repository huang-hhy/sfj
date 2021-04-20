<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <div class="partyManagement">
      <div class="review" v-if="reviewList && reviewList !== {}">
        <mainHeader :content="content"/>
        <div class="header">
          <span class="type">民主评议</span>
          <i class="el-icon-info"/>
          <span class="title">{{ reviewList.title }}</span>
          <el-tag size="small" :type="reviewList.type * 1 === 0 ? 'info' : 'success'" :hit="false">
            {{ reviewList.type * 1 === 0 ? '未评' : '已评' }}
          </el-tag>
          <span class="detail" @click="handleLook">查看详情</span>
        </div>
        <div class="content">
            <span class="item">
              <span class="icon"/>
              <span class="text">开始时间： {{ moment(reviewList.startTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
            </span>
          <span class="item">
              <span class="icon"/>
              <span class="text">结束时间： {{ moment(reviewList.endTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
            </span>
          <span class="item">
              <span class="icon"/>
                <span class="text">参选人数： {{ reviewList.turnout }} 人</span>
            </span>
          <span class="item">
              <span class="icon"/>
              <span class="text">创建时间: {{ moment(reviewList.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
            </span>
          <span class="item">
              <span class="icon"/>
              <span class="text">更新时间: {{ moment(reviewList.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
            </span>
          <span class="item">
              <span class="icon"/>
              <span class="text">评议分类： {{ reviewList.typeName }}</span>
          </span>
        </div>
      </div>
      <div class="meetingReview" v-if="meetingList && meetingList.length > 0">
        <div class="meeting" v-for="(item, index) in meetingList" :key="index">
          <div class="header">
            <div class="headerL">
              <img src="@/assets/pc/home/left1.png">
              <span class="title" v-for="(item2, index2) in item.typeName" :key="index2">{{ item2 }}</span>
              <img src="@/assets/pc/home/right1.png">
            </div>
            <div class="headerR" @click="gotoMore(item)">
              <span>更多</span>
              <i class="el-icon-d-arrow-right" />
            </div>
          </div>
          <ul class="meetingList">
            <li v-for="(item3, index3) in item.list" :key="index3" v-if="index3 < 5" @click="gotoDetail(item3)">
              <img src="@/assets/image/point.png">
              <span>{{ item3.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <detail v-model="formList" @doSubmit="doSubmit"/>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import mainHeader from "../../../components/pc/common/mainHeader"
  import {getDemocraticAppraisalList, getDemocraticAppraisalRecordList, getMeetingType, getMeetingList, saveDemocraticAppraisalRecord} from '@/api/pc'
  import Vue from "vue"
  import moment from 'moment'
  import detail from './form/detail'
  import {encrypt} from "../../../libs/tools";

  export default {
    name: "index",
    middleware: 'pcUserAuth',
    components: {
      detail,
      mainHeader,
      NavBar
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 党务管理',
      }
    },
    data() {
      return {
        content: {
          sort: '0',
          title: '民主评议',
          url: '/pc/partyManagement/appraisalDemocratic',
          name: '党务管理'
        },
        reviewList: {},
        moment: moment,
        meetingList: [],
        formList: {
          refresh: false
        }
      }
    },
    mounted() {
      this.setBaseInfo()
      this.getReviewList()
      this.getMeetingList()
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      getReviewList() {
        const params = {
          pageNum: 1,
          pageSize: 9999,
          time: parseInt(new Date().getTime() / 1000)
        }
        let temp1 = []
        let type = ''
        getDemocraticAppraisalList(params).then(res => {
          if (res.code * 1 === 0) {
            temp1 = res.data
            type = res.data.length > 0 ? '0' : '1'
            if (res.data.length > 0) {
              this.reviewList = temp1[0]
              this.reviewList.participants = JSON.parse(this.reviewList.participants)
              this.reviewList.participants.forEach(item => {
                Vue.set(item, 'result', '')
                Vue.set(item, 'reason', '')
              })
              Vue.set(this.reviewList, 'type', type)
              Vue.set(this.reviewList, 'turnout', this.reviewList.participants.length)
            } else {
              getDemocraticAppraisalRecordList({}).then(res => {
                if (res.code * 1 === 0) {
                  const temp = res.data
                  temp.forEach((item, index) => {
                    if (index === 0) {
                      item.democraticAppraisal.participants = JSON.parse(item.democraticAppraisal.participants)
                      item.democraticAppraisal.participants.forEach(i => {
                        item.democraticAppraisalRecord.forEach(j => {
                          if (i.id === j.userId) {
                            Vue.set(i, 'result', j.result)
                            Vue.set(i, 'reason', j.reason)
                          }
                        })
                      })
                      this.reviewList = item.democraticAppraisal
                      Vue.set(this.reviewList, 'type', type)
                      Vue.set(this.reviewList, 'turnout', this.reviewList.participants.length)
                    }
                  })
                }
              })
            }
          }
        })
      },
      getMeetingList() {
        getMeetingType({}, {}).then(res => {
          if (res.code * 1 === 0) {
            const temp = res.data
            temp.forEach(item => {
              if (item.typeName === '三会一课' || item.typeName === '党务公开' || item.typeName === '主题党日') {
                getMeetingList({}, {meetingTypeId: item.id}).then(res => {
                  if (res.code * 1 === 0) {
                    const temp2 = {}
                    Vue.set(temp2, 'list', res.data.list)
                    Vue.set(temp2, 'typeName', item.typeName)
                    Vue.set(temp2, 'typeId', item.id)
                    this.meetingList.push(temp2)
                  }
                })
              }
            })
          }
        })
      },
      handleLook() {
        if (this.reviewList.type * 1 === 0) {
          this.formList = JSON.parse(JSON.stringify(this.reviewList))
          this.formList.disabled = false
          this.formList.refresh = !this.formList.refresh
        } else if (this.reviewList.type * 1 === 1) {
          this.formList = JSON.parse(JSON.stringify(this.reviewList))
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
      gotoMore(item) {
        let params = {
          meetingTypeId: item.typeId
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: '/pc/partyManagement/meeting',
          query: {
            name: '党务管理',
            params: params
          }
        })
      },
      gotoDetail(item) {
        let params = {
          id: item.id + '',
          meetingTypeId: item.meetingTypeId
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: '/pc/partyManagement/meetingDetail',
          query: {
            name: '党务管理',
            params: params
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .partyManagement {
    width: 1000px;
    margin: 20px auto;

    .review {
      margin: 50px 0;
      overflow: hidden;

      .header {
        margin-top: 20px;
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
          line-height: 34px;
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

    .meetingReview {
      .meeting {
        width: calc(33.33% - 40px);
        margin: 0 20px;
        float: left;

        .header {
          line-height: 30px;
          margin: 10px 0;
          overflow: hidden;

          .headerL {
            float: left;

            img {
            height: 28px;
            margin-top: -6px;
          }

            .title {
              background-color: #DC0909;
              color: #ffffff;
              padding: 5px;
              margin: 0 5px;
            }
          }

          .headerR {
            float: right;
            color: #8e8f92;
            cursor: pointer;

            i {
              margin-left: 5px;
            }
          }

          .headerR:hover {
            color: #DC0909;
          }

        }

        .meetingList {
          margin: 20px 0;
          font-size: 14px;
          line-height: 30px;
          cursor: pointer;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          overflow: hidden;
        }

        .meetingList:hover {
          color: #DC0909;
        }
      }
    }
  }
</style>
