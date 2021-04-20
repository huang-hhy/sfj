<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <div class="header">
        <main-header :content="content" style="display: inline-block" />
        <el-button type="success" size="small" @click="handleAdd" style="margin-left: 30px">新增</el-button>
      </div>
      <el-table
        :data="list"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align': 'center', 'background-color': '#f5f5f5'}"
        class="table"
      >
        <el-table-column label="调动人名称" prop="userName" />
        <el-table-column label="转出党（工）委" prop="pastOrgName" />
        <el-table-column label="接收党（工）委" prop="futureOrgName" />
        <el-table-column label="申请时间" prop="createTime" min-width="100">
          <template slot-scope="scope">
            {{ moment(scope.row.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="申请状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status * 1 === 0" type="warning">待审核</el-tag>
            <el-tag v-if="scope.row.status * 1 === 1" type="success">已通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime" min-width="100">
          <template slot-scope="scope">
            {{ moment(scope.row.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">{{ scope.row.status * 1 === 0 ? '修改' : '查看' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="page.total"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination"
        @current-change="currentChange"
        @size-change="sizeChange"
      />
    </el-card>
    <transfer-form v-model="formList" @doSubmit="doSubmit" />
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import { relationTransferList, relationTransferSave, getrelationTransfer, relationTransferModify } from '@/api/pc'
  import moment from 'moment'
  import TransferForm from "./form/transferForm";
  import {decrypt} from "../../../../libs/tools";
  import mainHeader from "../../../../components/pc/common/mainHeader";

  export default {
    name: "index",
    components: {
      mainHeader,
      TransferForm,
      NavBar
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 关系转接',
      }
    },
    data() {
      return {
        list: [],
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        moment: moment,
        formList: {
          refresh: false,
          id: '',
          futureOrgId: '',
          content: '',
          annexUrl: ''
        },
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '关系转接'
        }
      }
    },
    mounted() {
      this.setBaseInfo()
      this.setUserCenter()
      this.getList()
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
        relationTransferList(params, {}).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data.list
            this.page.total = res.data.total * 1
            this.list.forEach(item => {
              item.userName = decrypt(item.userName)
            })
          }
        })
      },
      handleAdd() {
        this.formList = {
          refresh: !this.formList.refresh,
          id: '',
          futureOrgId: '',
          content: '',
          annexUrl: ''
        }
      },
      handleEdit(id) {
        getrelationTransfer(id).then(res => {
          if (res.code * 1 === 0) {
            this.formList = JSON.parse(JSON.stringify(res.data))
            this.formList.annexUrl = this.formList.annexUrl === ' ' ? '' : this.formList.annexUrl
            this.formList.refresh  = !this.formList.refresh
            this.formList.readonly = this.formList.status * 1 === 1
          }
        })
      },
      doSubmit(d) {
        const data = {
          futureOrgId: d.futureOrgId,
          content: d.content,
          annexUrl: d.annexUrl
        }
        if (d.id) {
          relationTransferModify(d).then(res => {
            if (res.code * 1 === 0) {
              this.$message.success('修改成功')
              this.getList()
            }
          })
        } else {
          relationTransferSave(data).then(res => {
            if (res.code * 1 === 0) {
              this.$message.success('申请关系转接成功')
              this.getList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      },
      currentChange(current) {
        this.page.pageNum = current
        this.getList()
      },
      sizeChange(limit) {
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

    .header {
      margin: 20px 0;
      font-size: 16px;

      span {
        margin-right: 10px;
      }

      .profile, .item {
        cursor: pointer;
        color: #1a1a1a;
      }

      .profile:hover {
        color: #2d8cf0;
      }
    }

    .table {
      margin: 40px 0 20px;
    }

    .pagination {
      float: right;
      margin: 10px 0 30px;
    }
  }
</style>
