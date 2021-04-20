<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <main-header :content="content" style="margin-bottom: 30px" />
      <el-table
        :data="list"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align': 'center', 'background-color': '#f8f8f8'}"
        class="table"
      >
        <el-table-column label="贺卡标题" prop="title"/>
        <el-table-column label="贺卡图片" prop="imgUrl">
          <template slot-scope="scope">
            <img :src="attachUrl + scope.row.imgUrl" style="height: 50px">
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="pushTime" min-width="100">
          <template slot-scope="scope">
            {{ moment(scope.row.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleLook(scope.row)">查看</el-button>
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
    <cardDetail v-model="formList" />
  </div>
</template>

<script>
  import NavBar from "@/components/layout-pc/common/nav-bar";
  import {mapActions} from 'vuex'
  import { getCongratulation } from '@/api/pc'
  import config from '@/config'
  import moment from 'moment'
  import cardDetail from './form/detail'
  import mainHeader from "../../../../components/pc/common/mainHeader";

  export default {
    name: "birthdayCard",
    components: {
      mainHeader,
      NavBar,
      cardDetail
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 生日贺卡',
      }
    },
    data() {
      return {
        list: [],
        page: {
          total: 0,
          pageNum: 1,
          pageSize: 10
        },
        attachUrl: config.attachUrl,
        moment: moment,
        formList: {
          refresh: false
        },
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '政治生日'
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
        getCongratulation(params).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data
            this.page.total = this.list.length
          }
        })
      },
      handleLook(row) {
        this.formList = JSON.parse(JSON.stringify(row))
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

<style lang="less">
  .content {
    .el-radio-button__inner:hover {
      color: #e33a3c;
    }

    .el-input__inner:focus {
      border: #e33a3c 1px solid;
    }
  }
</style>
<style scoped lang="less">
  .content {
    width: 1050px;
    margin: 20px auto;
    overflow: hidden;

    .el-input {
      width: 240px;
      margin-left: 50px;
    }

    .el-button {
      background: #e33a3c;
      color: #FFFFFF;
      border: #e33a3c 1px solid;
    }

    .el-button:hover {
      background: #d0181a;
    }

    .table {
      margin: 50px 0 30px;
    }

    .pagination {
      float: right;
      margin: 30px 0;
    }
  }
</style>
