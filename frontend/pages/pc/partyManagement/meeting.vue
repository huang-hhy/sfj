<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <mainHeader :content="content" />
      <el-container>
        <el-aside>
          <div class="title">
            <i class="el-icon-location-information" style="font-size: 22px; margin-right: 10px; font-weight: bold" />
            <span>组织生活</span>
          </div>
          <div v-for="item in meetingType" :key="item.id" :class="item.id === page.meetingTypeId ? 'activityType' : 'type'" @click="changeType(item.id)">
            <img :src="attachUrl + item.icon" style="width: 20px;">
            <span>{{ item.typeName }}</span>
          </div>
        </el-aside>
        <el-container>
          <el-header class="header">
            <el-radio-group v-model="page.status" @change="getList" :fill="'#335C88'" :text-color="'#ffffff'">
              <el-radio-button label="0">未开始</el-radio-button>
              <el-radio-button label="1">进行中</el-radio-button>
              <el-radio-button label="2">已结束</el-radio-button>
              <el-radio-button label="3">已归档</el-radio-button>
            </el-radio-group>
          </el-header>
          <el-main class="main">
            <div v-for="(item, index) in list" :key="index" class="content">
              <div class="main_video">
                <video height="150px" :src="attachUrl + item.videoUrl" controls="controls" />
              </div>
              <div class="main_content">
                <el-badge
                  v-if="item.isRead * 1 === 0"
                  value="未读"
                >
                  <p class="title">{{ item.title }}</p>
                </el-badge>
                <p v-else class="title">{{ item.title }}</p>
                <p class="item">召开时间： {{ moment(item.conveneTime * 1000).format('YYYY-MM-DD HH:mm:ss')}}</p>
                <el-row class="item_content">
                  <el-col :span="12">
                    <span>会议地点： {{ item.address }}</span>
                  </el-col>
                  <el-col :span="12">
                    <span>会议议题： {{ item.topics }}</span>
                  </el-col>
                </el-row>
                <el-button round class="item_button" size="small" @click="goDetail(item)">查看详情</el-button>
              </div>
            </div>
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
  import moment from 'moment'
  import mainHeader from "@/components/pc/common/mainHeader";
  import {decrypt, encrypt} from "../../../libs/tools";

  export default {
    name: "meeting",
    components: {
      mainHeader,
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
          name: '党务管理',
          url: '/pc/partyManagement',
          title: '组织生活'
        }
      }
    },
    mounted() {
      this.setBaseInfo()
      this.getData(this.$route.query.params)
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      getData(data) {
        data = JSON.parse(decrypt(data))
        this.page.meetingTypeId = data.meetingTypeId
        this.getType()
      },
      getType() {
        getMeetingType({pageNum: 1, pageSize: 9999}, {}).then(res => {
          if (res.code * 1 === 0) {
            this.meetingType = res.data
            this.page.meetingTypeId = this.page.meetingTypeId ? this.page.meetingTypeId : this.meetingType[0].id
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
      goDetail(item) {
        let params = {
          id: item.id + '',
          meetingTypeId: this.page.meetingTypeId
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: '/pc/partyManagement/meetingDetail',
          query: {
            name: '党务管理',
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
    color: #335C88;
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
          color: #335C88;
          font-weight: bold;
        }

        .activityType, .type:hover {
          background-color: #eeeeee;
          font-size: 16px;
          padding-left: 20px;
          line-height: 50px;
          color: #335C88;
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
        margin-top: -40px;

        .content {
          overflow: hidden;
          width: 650px;

          .main_video {
            float: left;
          }

          .main_content {
            float: left;
            margin: 10px 0 0 20px;
            width: 300px;

            .title {
              font-size: 18px;
              font-weight: bold;
              color: #1a1a1a;
              margin-bottom: 20px;
            }

            .item {
              margin: 10px 0;
            }

            .item_button {
              background-color: #FFFFFF;
              color: #335C88;
              border: #335C88 1px solid;
              margin: 20px 80px;
            }

            .item_button:hover {
              background-color: #335C88;
              color: #FFFFFF;
            }
          }
        }
      }
    }

    .pagination {
      float: right;
      margin: 20px;
    }
  }
</style>
