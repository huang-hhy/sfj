<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <main-header :content="content" />
      <el-table
        :data="list"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align': 'center', 'background-color': '#f5f5f5'}"
        class="table"
      >
        <el-table-column label="用户名称" prop="userName"/>
        <el-table-column label="标题" prop="title"/>
        <el-table-column label="获取积分" prop="score"/>
        <el-table-column label="更新时间" prop="updateTime">
          <template slot-scope="scope">
            {{ moment(scope.row.updateTime * 1 !== 0 ? scope.row.updateTime * 1000 : scope.row.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}
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
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination"
        @current-change="changeCurrent"
        @size-change="changeSize"
      />
    </el-card>
    <pointDetail v-model="formList"/>
  </div>
</template>

<script>
  import NavBar from "../../../../components/layout-pc/common/nav-bar";
  import {mapActions} from 'vuex';
  import {scoreRecordlist, getScoreRecord} from '@/api/pc'
  import moment from 'moment'
  import {decrypt} from "../../../../libs/tools";
  import pointDetail from './form/detail'
  import mainHeader from "../../../../components/pc/common/mainHeader";

  export default {
    name: "index",
    components: {
      mainHeader,
      NavBar,
      pointDetail
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 积分明细',
      }
    },
    data() {
      return {
        list: [],
        page: {
          total: 0,
          pageSize: 10,
          pageNum: 1
        },
        moment: moment,
        formList: {
          refresh: false
        },
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '积分明细'
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
        const params = {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum
        }
        scoreRecordlist(params, {}).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data.list
            this.page.total = res.data.total * 1
            this.list.forEach(item => {
              item.userName = decrypt(item.userName)
            })
          }
        })
      },
      handleLook(id) {
        getScoreRecord(id).then(res => {
          if (res.code * 1 === 0) {
            this.formList = JSON.parse(JSON.stringify(res.data))
            this.formList.refresh = !this.formList.refresh
          }
        })
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
  .content {
    width: 1050px;
    margin: 20px auto;
    overflow: hidden;

    .table {
      margin: 50px 0 20px;
    }

    .pagination {
      float: right;
      margin: 20px 0;
    }
  }
</style>
