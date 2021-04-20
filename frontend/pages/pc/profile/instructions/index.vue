<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <div style="width: 1050px; margin: 50px auto 20px">
      <mainHeader :content="content"/>
    </div>
    <el-container>
      <el-aside>
        <div class="title">
          <i class="el-icon-location-information" style="font-size: 22px; margin-right: 10px; font-weight: bold"/>
          <span>工作指引</span>
        </div>
        <div v-for="(item, index) in typeList" :key="index" :class="typeId === item.id ? 'activityType' : 'type'"
             @click="changeTypeId(item)">
          <span>{{ item.title }}</span>
        </div>
      </el-aside>
      <el-main>
        <el-tabs v-model="activityTab">
          <el-tab-pane name="first" :label="typeName">
            <div style="min-height: 252px">
              <div v-for="(item, index) in list" :key="index" class="item" @click="handleLook(item)">
                <div class="content">{{ item.title }}</div>
                <div class="time">{{ moment(item.updateTime ? item.updateTime * 1000 : item.createTime *
                  1000).format('YYYY-MM-DD HH:mm:ss') }}
                </div>
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
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <detail v-model="formList"/>
  </div>
</template>

<script>
  import NavBar from "@/components/layout-pc/common/nav-bar";
  import {mapActions} from 'vuex';
  import {getGuideLinesType, getGuidelines} from '@/api/pc'
  import moment from 'moment'
  import detail from "./form/detail"
  import mainHeader from "../../../../components/pc/common/mainHeader";

  export default {
    name: "index",
    components: {
      mainHeader,
      NavBar,
      detail
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 工作指引',
      }
    },
    data() {
      return {
        typeList: [],
        typeId: '',
        typeName: '',
        list: [],
        moment: moment,
        activityTab: 'first',
        page: {
          total: 0,
          pageNum: 1,
          pageSize: 10
        },
        formList: {
          refresh: false
        },
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '工作指引'
        }
      }
    },
    mounted() {
      this.setBaseInfo()
      this.setUserCenter()
      this.getTypeList()
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo',
        setUserCenter: 'user/setUserCenter'
      }),
      getTypeList() {
        getGuideLinesType({}).then(res => {
          if (res.code * 1 === 0) {
            this.typeList = res.data
            this.typeId = this.typeList[0].id
            this.typeName = this.typeList[0].title
            this.getList()
          }
        })
      },
      getList() {
        const params = {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          workTypeId: this.typeId
        }
        getGuidelines(params).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data
            this.page.total = this.list.length
          }
        })
      },
      changeTypeId(item) {
        this.typeId = item.id
        this.typeName = item.title
        this.getList()
      },
      handleLook(item) {
        this.formList = JSON.parse(JSON.stringify(item))
        this.formList.refresh = !this.formList.refresh
      },
      changeCurrent(current) {
        this.page.pageNum = current
        this.getList()
      },
      changeSize(limit) {
        this.page.pageSize = limit
        this.getList()
      }
    }
  }
</script>

<style scoped lang="less">
  .el-container {
    width: 1000px;
    margin: 15px auto;

    ::v-deep .el-aside {
      margin: 60px 0;
      width: 200px !important;

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

    .el-main {
      ::v-deep .el-tabs__item {
        color: #d33a31;
        font-size: 16px;
        line-height: 30px;
      }

      ::v-deep .el-tabs__active-bar {
        background-color: #d33a31;
      }

      .item {
        overflow: hidden;
        line-height: 40px;
        cursor: pointer;
        padding: 0 10px 0 20px;

        .content {
          float: left;
          font-size: 14px;
          color: #1a1a1a;
        }

        .time {
          float: right;
          color: #8c939d;
        }
      }

      .item:hover {
        .content, .time {
          color: #d33a31;
        }
      }

      .el-pagination {
        float: right;
        margin: 20px 0;
      }
    }
  }
</style>
