<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <main-header :content="content" style="margin: 20px 0" />
      <el-table
        :data="list"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align': 'center', 'background-color': '#f5f5f5'}"
        class="table"
        >
        <el-table-column label="公告标题" prop="title" />
        <el-table-column label="发布人" prop="userName" />
        <el-table-column label="发布组织" prop="orgName" min-width="100" />
        <el-table-column label="接收组织" prop="receiveOrgNames" min-width="100">
          <template slot-scope="scope">
            <p v-for="(item, index) in scope.row.receiveOrgNames" :key="index">{{ item }}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status * 1 === 0" type="success" size="mini" disabled>正常</el-button>
            <el-button v-else type="warning" size="mini" disabled>关闭</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleLook(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  import { afficheList, getAfficheLog } from '@/api/pc'
  import {mapActions} from 'vuex'
  import {decrypt, encrypt} from "../../../../libs/tools"
  import mainHeader from "../../../../components/pc/common/mainHeader";

  export default {
        name: "index",
      components:{
        mainHeader,
        NavBar
      },
      data() {
        return {
          list: [],
          page: {
            pageSize: 10,
            pageNum: 1,
            total: 0
          },
          content: {
            sort: '2',
            name: '个人中心',
            url: '/pc/profile',
            title: '通知公告'
          }
        }
      },
      head() {
        return {
          title: this.$store.state.app.title + ' - 通知公告',
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
          afficheList(where, {}).then(res => {
            if (res.code * 1 === 0) {
              this.page.total = res.data.total * 1
              this.list = res.data.list
              this.list.forEach(item => {
                item.userName = decrypt(item.userName)
                item.receiveOrgNames = item.receiveOrgNames.split(',')
              })
            }
          })
        },
        handleLook(id) {
          getAfficheLog({ afficheId: id }).then(res => {
            if (res.code * 1 === 0) {
              let params = {
                id: id
              }
              params = encrypt(JSON.stringify(params))
              this.$router.push({
                path: '/pc/profile/notice/detail',
                query: {
                  name: '个人中心',
                  params: params
                }
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        changeCurrent(current) {
          this.page.pageNum = current
          this.getList()
        },
        changeSizes(limit) {
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
      margin: 40px 0;
    }

    .pagination {
      float: right;
      margin-bottom: 20px;
    }
  }
</style>
