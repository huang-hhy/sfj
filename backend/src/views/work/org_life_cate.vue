<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>会议活动分类</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增分类</el-button>
      <div class="list-header-item">
        <span class="label">分类名称</span>
        <el-input v-model="page.typeName" class="w200 content" placeholder="请输入分类名称" />
      </div>
      <el-button type="primary" class="mr8" @click="getList()">搜索</el-button>
      <el-button type="danger" @click="clear">清空</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column type="index" label="编号" align="center" width="50" />
      <el-table-column label="分类名称" min-width="180" align="center" prop="typeName" />
      <el-table-column label="类型" min-width="180" align="center" prop="distinguish">
        <template slot-scope="scope">
          <span>{{ scope.row.distinguish * 1 === 0 ? '会议' : '活动' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-popconfirm
            v-if="scope.row.status *1 === 0"
            title="确定停用该公告吗？"
            @onConfirm="updateStatus(scope.row.id, 1)"
          >
            <el-button slot="reference" type="success" :disabled="scope.row.id === '1'" size="mini">正常</el-button>
          </el-popconfirm>
          <el-popconfirm
            v-else
            title="确定启用该公告吗？"
            @onConfirm="updateStatus(scope.row.id, 0)"
          >
            <el-button slot="reference" type="warning" :disabled="scope.row.id === '1'" size="mini">停用</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
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
      title="会议活动分类"
      :params="params"
      :form-setting="formSetting"
      @doSubmit="doSubmit"
    />
  </el-card>
</template>

<script>
import SuperForm from '@/components/SuperForm'
import {
  getMeetingCateList,
  getMeetingCate,
  saveMeetingCate,
  updateMeetingCate,
  deleteMeetingCate
} from '@/api/work'

export default {
  name: 'OrgLifeCate',
  components: { SuperForm },
  data() {
    return {
      formSetting: {
        closeOnClickModal: false,
        showClose: false,
        showTop: '15vh',
        formLabelWidth: '100px',
        width: '40%'
      },
      tableData: [],
      item: {
        refresh: false,
        id: ''
      },
      page: {
        current: 1,
        limit: 10,
        total: 0,
        typeName: '',
        reachTimes: 0
      }
    }
  },
  computed: {
    params() {
      return [
        {
          type: 'text',
          label: '分类名称',
          key: 'typeName',
          placeholder: '请输入分类名称',
          rules: {
            required: true, message: '分类名称不能为空', trigger: 'blur'
          }
        },
        {
          type: 'select',
          label: '达标类型',
          key: 'targetType',
          placeholder: '请选择达标类型',
          options: [
            {
              value: 1,
              label: '月'
            },
            {
              value: 2,
              label: '季'
            },
            {
              value: 3,
              label: '年'
            }
          ],
          // rules: {
          //   required: true, message: '达标类型不能为空', trigger: 'blur'
          // }
        },
        {
          type: 'number',
          label: '达标次数',
          key: 'targetTimes',
          // rules: {
          //   required: true, message: '达标次数不能为空', trigger: 'blur'
          // }
        },
        {
          type: 'select',
          label: '达标类型',
          key: 'distinguish',
          placeholder: '请选择达标类型',
          options: [
            {
              value: 0,
              label: '会议'
            },
            {
              value: 1,
              label: '活动'
            }
          ],
          rules: {
            required: true, message: '达标类型不能为空', trigger: 'blur'
          }
        },
        {
          type: 'upload',
          label: 'icon',
          key: 'icon'
        },
        {
          type: 'switch',
          label: '是否PC显示',
          key: 'isShowPc',
          activeValue: '1',
          inactiveValue: '0'
        },
        {
          type: 'switch',
          label: '是否App显示',
          key: 'isShowXcx',
          activeValue: '1',
          inactiveValue: '0'
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        typeName: '',
        icon: ''
      }
    },
    edit(id) {
      getMeetingCate(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          data.icon = data.icon ? data.icon : ''
          this.item = data
        }
      })
    },
    del(id) {
      deleteMeetingCate(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    updateStatus(id, status) {
      updateMeetingCate({ id, status }).then(res => {
        if (res.code === 0) {
          this.$message.success('操作成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doSubmit(data) {
      if (data.id) {
        updateMeetingCate(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveMeetingCate(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
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
      const { current: pageNum, limit: pageSize } = this.page
      getMeetingCateList({ pageNum, pageSize }, { typeName: this.page.typeName }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    clear() {
      this.page.typeName = ''
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
