<template>
  <el-dialog
    :title="'缴费记录'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="true"
    top="15vh"
    class="party-fee"
    append-to-body
  >
    <div class="party-fee-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button type="danger" size="small" @click="exportExcel(paySetting.id)">导出</el-button>

          <el-upload
            style="display: inline-block"
            class="mr10"
            :action="'/api/partyFee/record/importData'"
            :data="{partyFeePayId:paySetting.id}"
            :show-file-list="false"
            :headers="headers"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          >
            <el-button type="danger" size="small">导入</el-button>
          </el-upload>
        </div>
        <div>
          <el-table :data="tableData" border @selection-change="selectRows">
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column align="center" label="缴费人" width="100">
              <template slot-scope="scope">{{ scope.row.userName }}</template>
            </el-table-column>
            <el-table-column align="center" label="组织名称">
              <template slot-scope="scope">{{ scope.row.orgName }}</template>
            </el-table-column>
            <el-table-column align="center" label="党费缴纳基数(元)" width="100">
              <template slot-scope="scope">{{ scope.row.paymentBase }}</template>
            </el-table-column>
            <el-table-column align="center" label="每月年费金额(元)" width="100">
              <template slot-scope="scope">{{ scope.row.payableMoney }}</template>
            </el-table-column>
            <el-table-column align="center" label="缴纳状态" width="100">
              <template slot-scope="scope">{{ scope.row.status * 1 === 0 ? '未缴费' : '已缴纳' }}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
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
        </div>
        <PaymentForm v-model="item" @doSubmit="doSubmit" />
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
import { getUsersByWhere } from '@/api/base'
import {
  batchPartyFeeRecordConfirm,
  getPartyFeeRecordList,
  savePartyFeeRecord,
  updatePartyFeeRecord,
  exportPartyFeeRecord
} from '@/api/work'
import { jsonAssgin } from '@/utils/tools'
import { decrypt } from '@/utils/tools'
import PaymentForm from './payment_form'
import { getToken } from '@/utils/auth'

export default {
  name: 'PayFeePaymentForm',
  components: {
    PaymentForm
  },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      headers: { Authorization: getToken() },
      formSetting: {
        closeOnClickModal: false,
        showClose: false,
        showTop: '15vh',
        formLabelWidth: '100px'
      },
      paySetting: {
        id: '',
        orgId: ''
      },
      page: {
        current: 1,
        limit: 10,
        total: 0
      },
      item: {
        refresh: false,
        id: ''
      },
      userList: [],
      tableData: [],
      selection: [],
      dialogFormVisible: false
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val.id) {
          this.paySetting = jsonAssgin(this.paySetting, val)
          this.getList(this.paySetting.id)
          this.getUsers(this.paySetting.orgId)
        }
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    getUsers(orgId) {
      getUsersByWhere({ orgId }).then(res => {
        if (res.code * 1 === 0) {
          const tmpList = res.data
          this.userList = tmpList.reduce((res, current) => {
            res.push({
              value: current.id,
              label: current.userName
            })
            return res
          }, [])
        }
      })
    },
    selectRows(selection) {
      this.selection = selection.reduce((res, current) => {
        res.push(current.id)
        return res
      }, [])
    },
    batchPay() {
      if (!this.selection.length) {
        this.$message.error('请选择人员')
        return
      }
      const ids = this.selection.join(',')
      batchPartyFeeRecordConfirm(ids).then(res => {
        if (res.code * 1 === 0) {
          this.getList(this.paySetting.id)
          this.$message.success('批量缴纳-操作成功')
        } else {
          this.$message.error('批量缴纳-操作失败')
        }
      })
    },
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        partyFeePayId: this.paySetting.id,
        orgId: this.paySetting.orgId,
        status: '0'
      }
    },
    edit(row) {
      const tmpRow = JSON.parse(JSON.stringify(row))
      this.item = {
        refresh: !this.item.refresh,
        id: tmpRow.id,
        userId: tmpRow.userId,
        payableMoney: tmpRow.payableMoney,
        partyFeePayId: tmpRow.partyFeePayId,
        orgId: this.paySetting.orgId,
        status: tmpRow.status
      }
    },
    del(id) {

    },
    doSubmit(data) {
      if (data.id) {
        updatePartyFeeRecord(data).then(res => {
          if (res.code * 1 === 0) {
            this.getList(this.paySetting.id)
            this.$message.success('编辑成功')
          }
        })
      } else {
        savePartyFeeRecord(data).then(res => {
          if (res.code * 1 === 0) {
            this.getList(this.paySetting.id)
            this.$message.success('添加成功')
          }
        })
      }
    },
    exportExcel(id) {
      exportPartyFeeRecord(id).then(res => {
        if (res.code * 1 === 0) {
          const url = this.$config.exportPath + '/profile/download/' + res.msg
          window.open(url)
        }
      })
    },
    getList(partyFeePayId) {
      const { current: pageNum, limit: pageSize } = this.page
      getPartyFeeRecordList({ pageNum, pageSize }, { partyFeePayId: partyFeePayId }).then(res => {
        if (res.code * 1 === 0) {
          const tmpList = res.data.list
          for (var i in tmpList) {
            tmpList[i].userName = decrypt(tmpList[i].userName)
          }
          this.tableData = tmpList
          this.page.total = res.data.total * 1
        }
      })
    },
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList(this.paySetting.id)
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList(this.paySetting.id)
    },
    cancelSubmit(name) {
      this.selection = []
      this.dialogFormVisible = false
      this.$refs[name].resetFields()
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          this.$emit('doSubmit', data)
          this.dialogFormVisible = false
          this.$refs[name].resetFields()
        }
      })
    },
    handleSuccess(res) {
      if (res.code === 0) {
        this.$message.success('操作成功')
        this.getList(this.paySetting.id)
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeUpload() {

    }
  }
}
</script>

<style lang="less">
.party-fee .el-dialog__body {
  padding: 0;
}

.party-fee-header {
}

.party-fee-content {

}

.super-form .el-dialog__body {
  padding: 20px;
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
