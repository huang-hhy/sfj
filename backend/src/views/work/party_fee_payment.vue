<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>党费缴纳</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增</el-button>
      <div class="list-header-item">
        <span class="label">组织</span>
        <el-select
          v-model="page.orgId"
          placeholder="请选择组织"
          class="w150 content"
        >
          <el-option label="全部" value="" />
          <el-option
            v-for="it in orgList"
            :key="it.value"
            :label="it.label"
            :value="it.value"
          />
        </el-select>
      </div>
      <span class="label">月份</span>
      <el-date-picker
            v-model="enableTime"
            type="month"
            value-format="timestamp"
            @change="seleceMonth"
            placeholder="选择月">
      </el-date-picker>
      <el-button type="primary" class="mr8" @click="getList()">搜索</el-button>
      <el-button type="success" class="mr8" @click="noRead()">查看当月缴费记录</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column type="index" label="编号" align="center" width="50" />
      <el-table-column label="组织名称" min-width="180" align="center" prop="orgName" />
      <el-table-column align="center" label="缴纳生效时间" width="200">
        <template slot-scope="scope">{{ $moment(scope.row.enableTime *1000).format('YYYY-MM') }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)">缴纳记录</el-button>
          <el-popconfirm title="确定删除该分类吗？" @onConfirm="del(scope.row.id)">
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-wrap">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        :page-size="page.limit"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <SuperForm
      v-model="item"
      title="党费缴纳"
      :params="params"
      :form-setting="formSetting"
      @doSubmit="doSubmit"
    />
    <PartyFeePaymentForm v-model="logItem" />
    <noReadTable v-model="noReadTableItem" />
  </el-card>
</template>

<script>
import SuperForm from '@/components/SuperForm'
import PartyFeePaymentForm from './form/party_fee_payment_form'
import noReadTable from './table/no_read_table'

import { queryOrg } from '@/api/permission'
import {
  getPartyFeeList,
  savePartyFee,
  deletePartyFee
} from '@/api/work'
export default {
  name: 'PartyFeePayment',
  components: { SuperForm, PartyFeePaymentForm, noReadTable },
  data() {
    return {
      enableTime:'',
      formSetting: {
        closeOnClickModal: false,
        showClose: false,
        showTop: '15vh',
        formLabelWidth: '100px',
        width: '40%'
      },
      tableData: [],
      orgList: [],
      item: {
        refresh: false,
        id: ''
      },
      logItem: {
        refresh: false,
        id: ''
      },
      page: {
        current: 1,
        limit: 10,
        total: 0,
        orgId: ''
      },
      noReadTableItem: {
        refresh: false
      }
    }
  },
  computed: {
    params() {
      return [
        {
          type: 'select',
          label: '缴费组织',
          key: 'orgId',
          placeholder: '请输选择缴费组织',
          options: this.orgList,
          rules: {
            required: true, message: '缴费组织不能为空', trigger: 'blur'
          }
        },
        {
          type: 'datetime',
          label: '生效时间',
          format: 'month', // month
          key: 'enableTime',
          placeholder: '请选择生效时间',
          rules: {
            required: true, message: '请选择生效时间', trigger: 'blur'
          }
        }
      ]
    }
  },
  mounted() {
    this.getOrgList()
    this.getList()
  },
  methods: {
    seleceMonth(){
      console.log(this.enableTime)
    },
    getOrgList() {
      queryOrg({}).then(res => {
        if (res.code * 1 === 0) {
          const data = res.data
          this.orgList = data.reduce((res, current) => {
            res.push({
              value: current.id,
              label: current.orgName
            })
            return res
          }, [])
        }
      })
    },
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: ''
      }
    },
    edit(row) {
      const data = JSON.parse(JSON.stringify(row))
      data.refresh = !this.logItem.refresh
      this.logItem = data
    },
    del(id) {
      deletePartyFee(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doSubmit(data) {
      data.enableTime = this.$moment(data.enableTime).valueOf() / 1000
      savePartyFee(data).then(res => {
        if (res.code === 0) {
          this.$message.success('添加成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList()
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList()
    },
    getList() {
      const enableTime=this.$moment(this.enableTime).valueOf() / 1000
      const { current: pageNum, limit: pageSize } = this.page
      getPartyFeeList({ pageNum, pageSize }, { orgId: this.page.orgId, enableTime:enableTime }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    noRead() {
      this.noReadTableItem = {
        refresh: !this.noReadTableItem.refresh
      }
    }
  }
}
</script>

<style scoped>

</style>
