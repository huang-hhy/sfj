<template>
  <div class="body">
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <main-header :content="content" />
      <div style="margin: 50px 0">
        <span class="warmPrompt">温馨提示： 欢迎各位党员提出对党建工作的意见建议，或者在党务工作中存在的疑惑，困难</span>
        <el-button size="small" type="success" style="margin-left: 50px" @click="handleAdd">新增</el-button>
      </div>
      <el-tabs v-model="tab" @tab-click="getList">
        <el-tab-pane label="我的留言" name="first">
          <el-table
            :data="list"
            :cell-style="{ 'text-align': 'center' }"
            :header-cell-style="{ 'text-align': 'center', 'background-color': '#f5f5f5'}"
            class="table"
          >
            <el-table-column label="留言内容" prop="content"/>
            <el-table-column label="更新时间" prop="updateTime">
              <template slot-scope="scope">
                {{ moment(scope.row.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}
              </template>
            </el-table-column>
            <el-table-column label="回复留言">
              <template slot-scope="scope">
                <div v-if="scope.row.reply">
                  <span v-for="(item, index) in scope.row.reply" :key="index" v-if="index < 6">{{ item }}</span>
                  <span v-if="scope.row.reply.length > 6">……</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleLook(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="公开留言" name="second">
          <el-table
            :data="list"
            :cell-style="{ 'text-align': 'center' }"
            :header-cell-style="{ 'text-align': 'center', 'background-color': '#f5f5f5'}"
            class="table"
          >
            <el-table-column label="留言内容" prop="content"/>
            <el-table-column label="更新时间" prop="updateTime">
              <template slot-scope="scope">
                {{ moment(scope.row.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}
              </template>
            </el-table-column>
            <el-table-column label="回复留言">
              <template slot-scope="scope">
                <div v-if="scope.row.reply">
                  <span v-for="(item, index) in scope.row.reply" :key="index" v-if="index < 6">{{ item }}</span>
                  <span v-if="scope.row.reply.length > 6">……</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleLook(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        :total="page.total"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="changeCurrent"
        @size-change="changeSize"
        class="pagination"
      />
    </el-card>
    <bbsDetails v-model="formList"/>
    <new-bbs v-model="newBbsList" @doSubmit="doSubmit"/>
  </div>
</template>

<script>
  import NavBar from "@/components/layout-pc/common/nav-bar";
  import {mapActions} from 'vuex';
  import {leaveMessageList, leaveMessageSave} from '@/api/pc'
  import moment from 'moment'
  import bbsDetails from './form/detail'
  import mainHeader from "../../../../components/pc/common/mainHeader";
  import NewBbs from "./form/newBbs";

  export default {
    name: "bbs",
    components: {
      NewBbs,
      mainHeader,
      NavBar,
      bbsDetails
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 留言箱',
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
          refresh: false,
          id: ''
        },
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '留言箱'
        },
        newBbsList: {
          id: '',
          refresh: false
        },
        tab: 'first'
      }
    },
    mounted() {
      this.setBaseInfo()
      this.setUserCenter()
      setTimeout(() => {
        this.getList()
      }, 500)
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo',
        setUserCenter: 'user/setUserCenter'
      }),
      getList() {
        const params = {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum
        }
        const data = {
          isPublic: this.tab === 'first' ? '' : '0',
          userId: this.tab === 'first' ? this.$store.state.user.id : ''
        }
        leaveMessageList(params, data).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data.list
            this.page.total = res.data.total * 1
          }
        })
      },
      handleAdd() {
        this.newBbsList = {
          refresh: !this.newBbsList.refresh,
          id: '',
          content: '',
          imgUrl: ''
        }
      },
      handleLook(row) {
        this.formList = JSON.parse(JSON.stringify(row))
        this.formList.refresh = !this.formList.refresh
      },
      doSubmit(d) {
        const data = {
          content: d.content,
          imgUrl: d.imgUrl
        }
        leaveMessageSave(data).then(res => {
          if (res.code * 1 === 0) {
            this.getList()
            this.$message.success('新增留言成功')
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

    .warmPrompt {
      font-size: 16px;
      line-height: 30px;
    }

    ::v-deep .el-tabs__active-bar {
      background: #da3606;
    }

    ::v-deep .el-tabs__item.is-active, ::v-deep .el-tabs__item:hover {
      color: #da3606;
    }

    .table {
      margin: 10px 0 20px;
    }

    .pagination {
      float: right;
      margin: 10px 0 30px;
    }
  }
</style>
