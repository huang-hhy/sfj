<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title"/>
    <el-card class="content">
      <mainHeader :content="content" style="margin: 20px 0" />
      <el-table
        :data="list"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align': 'center', 'background-color': '#f8f8f8'}"
        class="table"
        >
        <el-table-column label="标准化流程节点" prop="flowId" />
        <el-table-column label="发展党员流程名称" prop="partyStepName" />
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{ moment(scope.row.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">
            {{ moment(scope.row.updateTime * 1000 === 0 ? scope.row.createTime * 1000 : scope.row.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}
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
    <flowForm v-model="formList" @doSubmit="doSubmit" />
  </div>
</template>

<script>
  import NavBar from "@/components/layout-pc/common/nav-bar";
  import {mapActions} from 'vuex'
  import { getpartyStandarizationFlow, partyFlowDetail, partyFlowSava } from '@/api/pc'
  import moment from 'moment'
  import flowForm from './form/detail'
  import mainHeader from "../../../../components/pc/common/mainHeader";

  export default {
    name: "index",
    components: {
      mainHeader,
      NavBar,
      flowForm
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 入党流程',
        meta: [
          {
            hid: this.$store.state.app.title,
            name: this.$store.state.app.title,
            content: this.$store.state.app.title
          }
        ]
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
          refresh: false
        },
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '入党流程'
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
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize
        }
        getpartyStandarizationFlow(params).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data.list
            this.page.total = res.data.list.length
            this.list.forEach(item => {
              item.customForm = JSON.parse(item.customForm)
            })
          }
        })
      },
      handleLook(id) {
        partyFlowDetail(id).then(res => {
          if (res.code * 1 === 0) {
            this.formList = res.data
            this.formList.refresh = !this.formList.refresh
          }
        })
      },
      doSubmit(d) {
        d.customForm = JSON.stringify(d.customForm)
        const data = {
          id: d.id,
          customForm: d.customForm
        }
        partyFlowSava(data).then(res => {
          if (res.code * 1 === 0) {
            this.getList()
            this.$message.success('修改成功')
          } else {
            this.$message.error(res.msg)
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

    .table {
      margin: 50px 0 30px;
    }

    .pagination {
      float: right;
      margin: 10px 0 30px;
    }
  }
</style>
