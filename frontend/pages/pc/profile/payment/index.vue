<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title"></NavBar>
    <el-card class="content">
      <main-header :content="content" style="margin: 20px 0"/>
      <el-table
        :data="list"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align': 'center', 'background-color': '#f5f5f5'}"
        class="table"
      >
        <el-table-column label="缴费人" prop="userName" />
        <el-table-column label="所属组织" prop="orgName" />
        <el-table-column label="应缴费用（元）" prop="payableMoney" />
        <el-table-column label="更新时间" prop="updateTime">
          <template slot-scope="scope">
            {{ moment(scope.row.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status * 1 === 0" type="warning">未缴纳</el-tag>
            <el-tag v-if="scope.row.status * 1 === 1" type="success">已缴纳</el-tag>
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
        @size-change="changeSize"
        @current-change="changeCurrent"
      />
    </el-card>
    <paymentDetail v-model="formList" />
  </div>
</template>

<script>
  import NavBar from "../../../../components/layout-pc/common/nav-bar";
  import {mapActions} from 'vuex';
  import moment from 'moment'
  import { partyFeeRecordlist } from '@/api/pc'
  import {decrypt} from "../../../../libs/tools";
  import paymentDetail from './form/detail'
  import mainHeader from "../../../../components/pc/common/mainHeader";

  export default {
    name: "index",
    components: {
      mainHeader,
      NavBar,
      paymentDetail
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 党费缴纳',
      }
    },
    data() {
      return {
        list: [],
        page: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        moment: moment,
        formList: {
          refresh: false
        },
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '党费缴纳'
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
        partyFeeRecordlist(params, {}).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data.list
            this.page.total = res.data.total * 1
            this.list.forEach(item => {
              item.userName = decrypt(item.userName)
            })
          }
        })
      },
      handleLook(row) {
        this.formList = JSON.parse(JSON.stringify(row))
        this.formList.refresh = !this.formList.refresh
      },
      changeSize(limit) {
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

    .table {
      margin: 50px 0 20px;
    }

    .pagination {
      float: right;
      margin: 10px 0 20px;
    }
  }
</style>
