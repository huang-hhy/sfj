<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <main-header :content="content" style="margin: 20px 0" />
      <el-container>
        <el-aside>
          <div class="title">
            <i class="el-icon-location-information" style="font-size: 22px; margin-right: 10px; font-weight: bold" />
            <span>组织生活</span>
          </div>
          <div v-for="item in meetingType" :key="item.id" :class="item.id === page.meetingTypeId ? 'activityType' : 'type'" @click="changeType(item.id)">
            <img :src="attachUrl + item.icon" style="height: 15px">
            <span>{{ item.typeName }}</span>
          </div>
        </el-aside>
        <el-container>
          <el-header class="header">
            <el-radio-group v-model="page.status" @change="getList" :fill="'#e33a3c'" :text-color="'#ffffff'">
              <el-radio-button label="0">未开始</el-radio-button>
              <el-radio-button label="1">进行中</el-radio-button>
              <el-radio-button label="2">已结束</el-radio-button>
              <el-radio-button label="3">已归档</el-radio-button>
            </el-radio-group>
          </el-header>
          <el-main class="main">
            <el-card v-for="(item, index) in  list" :key="index" class="content">
              <div @click="handleLook(item)">
                <div>
                  <el-badge
                    v-if="item.isRead * 1 === 0"
                    value="未读"
                  >
                    <p class="title">{{ item.title }}</p>
                  </el-badge>
                  <p v-else class="title">{{ item.title }}</p>
                </div>
                <el-tag :type="item.isQrcode * 1 === 1 ? 'warning' : 'info'">{{ item.isQrcode * 1 === 1 ? '需二维码签到' : '无需二维码签到' }}</el-tag>
                <p>会议主题： {{ item.topics }}</p>
                <p>会议类型： {{ item.typeName }}</p>
                <p>会议地址： {{ item.address }}</p>
                <p>召开时间： {{ moment(item.conveneTime * 1000).format('YYYY-MM-DD HH:mm:ss' )}}</p>
                <p>会议时长： {{ item.times }} 分钟</p>
              </div>

            </el-card>
          </el-main>
        </el-container>
      </el-container>
      <el-pagination
        :total="page.total"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination"
        @size-change="changeSizes"
        @current-change="changeCurrent"
      />
    </el-card>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import { getMeetingType, getMeetingList } from '@/api/pc'
  import config from '@/config'
  import Video from "../../../mobile/study/studyDetail";
  import moment from 'moment'
  import mainHeader from "../../../../components/pc/common/mainHeader";
  import {encrypt} from "../../../../libs/tools";

  export default {
    name: "Life",
    components: {
      mainHeader,
      Video,
      NavBar
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 组织生活',
      }
    },
    data() {
      return {
        list: [],
        meetingType: [],
        page: {
          total: 0,
          pageSize: 10,
          pageNum: 1,
          meetingTypeId: '',
          status: '0'
        },
        attachUrl: config.attachUrl,
        moment: moment,
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '组织生活'
        }
      }
    },
    mounted() {
      this.setBaseInfo()
      this.getType()
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      getType() {
        getMeetingType({pageNum: 1, pageSize: 9999}, {}).then(res => {
          if (res.code * 1 === 0) {
            this.meetingType = res.data
            this.page.meetingTypeId = this.meetingType[0].id
            this.getList()
          }
        })
      },
      getList() {
        const params = {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize
        }
        const data = {
          meetingTypeId: this.page.meetingTypeId,
          status: this.page.status
        }
        getMeetingList(params, data).then(res => {
          if (res.code * 1 === 0) {
            this.page.total = res.data.total * 1
            this.list = res.data.list
          }
        })
      },
      changeType(id) {
        this.page.meetingTypeId = id
        this.getList()
      },
      handleLook(item) {
        let params = {
          id: item.id + '',
          meetingTypeId: this.page.meetingTypeId
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: '/pc/profile/organization/detail',
          query: {
            name: '个人中心',
            params: params
          }
        })
      },
      changeSizes(limit) {
        this.page.pageSize = limit
        this.getList()
      },
      changeCurrent(current) {
        this.page.pageNum = current
        this.getList()
      }
    }
  }
</script>

<style lang="less">
  .el-radio-button__inner:hover {
    color: #e33a3c;
  }
</style>
<style scoped lang="less">
  .content {
    width: 1050px;
    margin: 20px auto;

    .el-container {
      ::v-deep .el-aside {
        margin: 60px 0;
        width: 260px !important;

        .title {
          line-height: 60px;
          font-size: 18px;
          padding-left: 20px;
          cursor: pointer;
          border: #e3e0e0 1px solid;
          color: #d33a31;
          font-weight: bold;
        }

        .activityType, .type:hover {
          background-color: #eeeeee;
          font-size: 16px;
          padding-left: 20px;
          line-height: 50px;
          color: #d33a31;
          border-bottom: #e3e0e0 1px solid;
          border-left: #e3e0e0 1px solid;
          border-right: #e3e0e0 1px solid;
        }

        .type {
          line-height: 50px;
          font-size: 16px;
          color: #1a1a1a;
          padding-left: 20px;
          cursor: pointer;
          border-bottom: #e3e0e0 1px solid;
          border-left: #e3e0e0 1px solid;
          border-right: #e3e0e0 1px solid;
        }
      }

      .main {
        margin-top: -30px;

        .content {
          width: calc(48% - 20px);
          display: inline-block;
          margin: 10px;
          line-height: 30px;
          height: 260px;
          cursor: pointer;

          .title {
            font-size: 18px;
            color: #1a1a1a;
            margin-bottom: 10px;
          }
        }

        .content:hover {
          box-shadow: #cecdcd 1px 1px;
        }
      }
    }

    .pagination {
      float: right;
      margin: 20px;
    }
  }
</style>
