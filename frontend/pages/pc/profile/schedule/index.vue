<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <div class="header">
        <div style="display: inline-block; line-height: 40px">
          <mainHeader :content="content"/>
        </div>
        <el-input v-model="page.title" @keyup.enter.native="getList"/>
        <el-button @click="getList">查询</el-button>
      </div>
      <el-table
        :data="list"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align': 'center', 'background-color': '#f5f5f5'}"
        class="table"
      >
        <el-table-column label="会议标题">
          <template slot-scope="scope">
            <el-badge
              v-if="scope.row.isRead * 1 === 0"
              value="未读"
              style="margin-top: 10px;"
            >
              <span>{{ scope.row.title }}</span>
            </el-badge>
            <span v-else>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名称" prop="userName"/>
        <el-table-column label="组织名称" prop="orgName"/>
        <el-table-column label="会议内容" prop="content"/>
        <el-table-column label="更新时间" prop="updateTime">
          <template slot-scope="scope">
            {{ moment(scope.row.updateTime * 1 === 0 ? scope.row.createTime * 1000 : scope.row.updateTime *
            1000).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleLook(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination"
        @size-change="changeSizes"
        @current-change="changeCurrent"
      />
    </el-card>
    <detail v-model="formList" @doSubmit="getList"/>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {noticeCenterList, getNoticeCenter} from '@/api/pc'
  import {mapActions} from 'vuex'
  import moment from 'moment'
  import detail from './form/detail'
  import {decrypt} from '@/libs/tools'
  // import PageHeader from "../../../../components/pc/profile/common/pageHeader";
  import mainHeader from "../../../../components/pc/common/mainHeader";

  export default {
    name: "schedule",
    components: {
      // PageHeader,
      mainHeader,
      NavBar,
      detail
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 待办事项',
      }
    },
    data() {
      return {
        list: [],
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0,
          title: ''
        },
        moment: moment,
        formList: {
          refresh: false
        },
        content: {
          // title: '待办事项'
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '待办事项'
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
      getList() {
        const where = {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum
        }
        const data = {
          title: this.page.title
        }
        noticeCenterList(where, data).then(res => {
          if (res.code * 1 === 0) {
            this.page.total = res.data.total * 1
            this.list = res.data.list
            this.list.forEach(item => {
              item.userName = decrypt(item.userName)
            })
          }
        })
      },
      handleLook(id) {
        getNoticeCenter(id).then(res => {
          if (res.code * 1 === 0) {
            this.formList = res.data
            this.formList.refresh = !this.formList.refresh
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

<style scoped lang="less">
  .content {
    width: 1050px;
    margin: 20px auto;
    overflow: hidden;

    .header {
      margin: 20px 0;
      .el-input {
        width: 240px;
        margin: 0 15px 0 60px;
      }

      ::v-deep .el-input__inner:focus {
        border: #e33a3c 1px solid;
      }

      .el-button {
        background: #e33a3c;
        color: #FFFFFF;
        border: #e33a3c 1px solid;
      }

      .el-button:hover {
        background: #d0181a;
      }
    }

    .table {
      margin: 40px 0;
    }

    .pagination {
      float: right;
      margin-bottom: 20px;
    }
  }
</style>
