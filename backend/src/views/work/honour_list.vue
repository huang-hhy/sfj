<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>组织荣耀</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增</el-button>
      <div class="list-header-item">
        <span class="label">荣誉名称</span>
        <el-input v-model="page.title" class="w150 content" placeholder="请输入荣誉名称" />
      </div>
      <el-button type="primary" class="mr8" @click="getList">搜索</el-button>
      <el-button type="danger" class="mr8" @click="handleClear">清空</el-button>
    </div>
    <div class="list-content">
      <el-scrollbar class="org_list SideBar-scrollbar">
        <el-tree
          :data="orgTree"
          node-key="id"
          default-expand-all
          :props="defaultProps"
          :expand-on-click-node="false"
          @node-click="getListByOrg"
        />
      </el-scrollbar>
      <el-table :data="tableData" border>
        <el-table-column align="center" width="50" type="index" label="序号" />
        <el-table-column align="center" label="荣耀标题">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column align="center" label="所获组织" width="200">
          <template slot-scope="scope">{{ scope.row.orgName }}</template>
        </el-table-column>
        <el-table-column align="center" label="获得时间" width="200">
          <template slot-scope="scope">{{
            $moment(scope.row.awardsTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @onConfirm="del(scope.row.id)">
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      title="组织荣誉"
      :params="params"
      :form-setting="formSetting"
      @doSubmit="doSubmit"
    />
  </el-card>
</template>

<script>
import SuperForm from '@/components/SuperForm'
import { queryOrgTree } from '@/api/permission'
import { queryOrg } from '@/api/permission'
import {
  getOrganizationaHonorList,
  getOrganizationaHonor,
  saveOrganizationaHonor,
  updateOrganizationaHonor,
  deleteOrganizationaHonor
} from '@/api/work'

export default {
  name: 'HonourList',
  components: {
    SuperForm
  },
  data() {
    return {
      formSetting: {
        closeOnClickModal: false,
        showClose: false,
        showTop: '15vh',
        formLabelWidth: '100px',
        width: '40%'
      },
      orgTree: [],
      orgList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      name: '',
      type: '',
      page: {
        current: 1,
        limit: 10,
        total: 0,
        title: '',
        orgId: ''
      },
      item: {
        refresh: false,
        id: ''
      }
    }
  },
  computed: {
    params() {
      return [
        {
          type: 'text',
          label: '荣誉名称',
          key: 'title',
          placeholder: '请输入荣誉名称',
          rules: {
            required: true, message: '荣誉名称不能为空', trigger: 'blur'
          }
        },
        {
          type: 'select',
          label: '获得组织',
          key: 'orgId',
          placeholder: '请选择获得组织',
          options: this.orgList,
          rules: {
            required: true, message: '获得组织不能为空', trigger: 'blur'
          }
        },
        {
          type: 'datetime',
          label: '颁发时间',
          key: 'awardsTime',
          placeholder: '请选择颁发时间',
          rules: {
            required: true, message: '颁发时间不能为空', trigger: 'blur'
          }
        },
        {
          type: 'textarea',
          label: '荣誉说明',
          key: 'content',
          rows: 2,
          placeholder: '请输入荣誉说明',
          rules: {
            required: true, message: '荣誉说明不能为空', trigger: 'blur'
          }
        }
      ]
    }
  },
  mounted() {
    this.getOrgList()
    this.getOrgTree()
    this.getList()
  },
  methods: {
    getOrgTree() {
      const data = { pageNum: 1, pageSize: 9999 }
      queryOrgTree(data).then(res => {
        if (res.code === 0) {
          this.orgTree = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
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
    getListByOrg(org) {
      this.page.orgId = org.id
      this.getList()
    },
    handleSizeChange(limit) {
      this.page.limit = limit
      this.getList()
    },
    handleCurrentChange(current) {
      this.page.current = current
      this.getList()
    },
    handleClear() {
      this.page.title = ''
      this.getList()
    },
    doSubmit(data) {
      data.awardsTime = this.$moment(data.awardsTime).valueOf() / 1000
      if (data.id) {
        updateOrganizationaHonor(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveOrganizationaHonor(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    getList() {
      const { current: pageNum, limit: pageSize } = this.page
      getOrganizationaHonorList({ pageNum, pageSize }, { title: this.page.title }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        title: '',
        content: '',
        annexUrl: '',
        awardsTime: '',
        orgId: ''
      }
    },
    edit(id) {
      getOrganizationaHonor(id).then(res => {
        if (res.code === 0) {
          const data = JSON.parse(JSON.stringify(res.data))
          data.awardsTime = this.$moment(data.awardsTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.item = data
        }
      })
    },
    del(id) {
      deleteOrganizationaHonor(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.limit_rows {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.list-content {
  display: flex;

  .org_list {
    margin-right: 10px;
    border: 1px solid #dddddd;
    min-width: 200px;
    max-width: 30%;
    max-height: 65vh;
    overflow-y: auto;
  }
}

/deep/ .el-scrollbar__wrap {
  overflow-x: auto;
}
</style>
