<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
        <main-header :content="content" style="margin: 20px 0" />
      <el-table
        :data="list"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align': 'center'}"
        class="table"
      >
        <el-table-column label="标题" prop="title"/>
        <el-table-column label="发布组织" prop="orgName"/>
        <el-table-column label="发布时间">
          <template slot-scope="scope">
            {{ moment(scope.row.publicTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}
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
        @current-change="changeCurrent"
        @size-change="changeSize"
      />
    </el-card>
  </div>
</template>

<script>
  import NavBar from "../../../../components/layout-pc/common/nav-bar";
  import {mapActions} from 'vuex'
  import { getSolicitOpinions } from '@/api/pc'
  import moment from 'moment'
  import mainHeader from "../../../../components/pc/common/mainHeader";

  export default {
    name: "index",
    components: {
      mainHeader,
      NavBar
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - ' + (this.$route.query.functionType * 1 === 1 ? '党员互动' : '意见征集'),
      }
    },
    data() {
      return {
        list: [],
        page: {
          total: 0,
          pageNum: 1,
          pageSize: 10,
          functionType: ''
        },
        moment: moment,
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: ''
        }
      }
    },
    mounted() {
      this.setBaseInfo()
      this.page.functionType = this.$route.query.functionType
      this.content.title = this.$route.query.functionType * 1 === 1 ? '党员互动' : '意见征集'
      this.getList()
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      getList() {
        const params = {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum,
          functionType: this.page.functionType
        }
        getSolicitOpinions(params).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data
            this.page.total = res.data.length
          }
        })
      },
      handleLook(id) {
        this.$router.push({
          path: '/pc/profile/opinion/detail',
          query: {
            id: id,
            functionType: this.page.functionType
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
      margin: 50px 0 30px;
    }

    .el-pagination {
      float: right;
      margin: 10px 0 30px;
    }
  }
</style>
