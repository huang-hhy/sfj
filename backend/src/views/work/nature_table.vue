<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>活动列表</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增</el-button>
      <div class="list-header-item">
        <span class="label">会议名称</span>
        <el-input v-model="name" class="w150 content" placeholder="请输入会议名称" />
      </div>
      <div class="list-header-item">
        <span class="label">会议类型</span>
        <el-select
          v-model="page.type"
          placeholder="请选择会议类型"
          class="w150 content"
        >
          <el-option
            v-for="it in meetingTypes"
            :key="it.id"
            :label="it.name"
            :value="it.id"
          />
        </el-select>
      </div>
      <el-button type="primary" class="mr8" @click="handleSearch">搜索</el-button>
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
      <el-table :data="tableData.slice((page.current-1)*page.limit,page.current*page.limit)" border>
        <el-table-column align="center" width="50" type="index" label="序号" />
        <el-table-column align="center" label="试卷名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column align="center" label="开始时间" width="180">
          <template slot-scope="scope">{{ scope.row.start }}</template>
        </el-table-column>
        <el-table-column align="center" label="结束时间" width="180">
          <template slot-scope="scope">{{ scope.row.end }}</template>
        </el-table-column>
        <el-table-column align="center" label="试卷类型" width="120">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column align="center" label="试卷总分" width="80">
          <template slot-scope="scope">{{ scope.row.total ? scope.row.total : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" label="考试时长" width="100">
          <template slot-scope="scope">{{ scope.row.duration ? scope.row.duration : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" label="考试状态" width="100">
          <template slot-scope="scope">{{ scope.row.state ? '已考' : '未考' }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
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
      title="会议活动"
      :params="params"
      :form-setting="formSetting"
      @doSubmit="doSubmit"
    />
  </el-card>
</template>

<script>
import SuperForm from '@/components/SuperForm'
import data from './json/exam.json'
import { queryOrgTree } from '@/api/permission'

export default {
  name: 'OrgLifeList',
  components: {
    SuperForm
  },
  data() {
    return {
      formSetting: {
        closeOnClickModal: false,
        showClose: false,
        showTop: '8vh',
        formLabelWidth: '100px',
        width: ''
      },
      orgTree: [],
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
        loginName: '',
        userName: '',
        roleId: '',
        status: '',
        orgId: ''
      },
      meetingTypes: [
        {
          value: '1',
          label: '支部党员会议'
        },
        {
          value: '2',
          label: '支部委员会议'
        },
        {
          value: '3',
          label: '党小组会议'
        }
      ],
      item: {
        refresh: false,
        id: ''
      }
    }
  },
  computed: {
    params() {
      const meetingType = this.meetingTypes
      return [
        {
          type: 'text',
          label: '会议主题',
          key: 'title',
          placeholder: '请输入会议标题',
          rules: {
            required: true, message: '会议标题不能为空', trigger: 'blur'
          }
        },
        {
          type: 'text',
          label: '会议地点',
          key: 'address',
          placeholder: '请输入会议地点',
          rules: {
            required: true, message: '会议地点不能为空', trigger: 'blur'
          }
        },
        {
          type: 'datetime',
          label: '开始时间',
          key: 'startTime',
          placeholder: '请选择开始时间',
          rules: {
            required: true, message: '开始时间不能为空', trigger: 'blur'
          }
        },
        {
          type: 'datetime',
          label: '结束时间',
          key: 'endTime',
          placeholder: '请选择结束时间',
          rules: {
            required: true, message: '结束时间不能为空', trigger: 'blur'
          }
        },
        {
          type: 'select',
          label: '活动类型',
          key: 'meetingType',
          placeholder: '请选择活动类型',
          options: meetingType
        },
        {
          type: 'switch',
          label: '二维码签到',
          key: 'qrcodeSign'
        },
        {
          type: 'textarea',
          label: '会议主题',
          key: 'topic',
          rows: 2,
          placeholder: '请输入会议主题',
          rules: {
            required: true, message: '会议主题不能为空', trigger: 'blur'
          }
        },
        {
          type: 'upload',
          label: '附件上传',
          key: 'files'
        }
      ]
    }
  },
  mounted() {
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
    doSubmit(data) {
      console.log(data)
    },
    handleSearch() {
    },
    handleClear() {
      this.getList()
    },
    getList() {
      this.tableData = data.exam
      this.page.total = this.tableData.length * 1
    },
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: ''
      }
    },
    edit(row) {
      const data = JSON.parse(JSON.stringify(row))
      data.refresh = !this.exam.refresh
      this.exam = Object.assign(this.exam, data)
    },
    del() {
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
