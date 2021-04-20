<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>体检表列表</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增</el-button>
      <div class="list-header-item">
        <span class="label">体检项目</span>
        <el-input v-model="page.name" class="w200 content" placeholder="请输入体检项目名称" />
      </div>
      <el-button type="primary" class="mr8" @click="handleSearch">搜索</el-button>
      <el-button type="danger" class="mr8" @click="handleClear">清空</el-button>
    </div>
    <div class="list-content">
      <el-table :data="tableData" border>
        <el-table-column align="center" width="50" type="index" label="序号" />
        <el-table-column align="center" label="项目名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column align="center" label="项目分数" width="180">
          <template slot-scope="scope">{{ scope.row.score }}</template>
        </el-table-column>
        <el-table-column align="center" label="项目类型" width="180">
          <template slot-scope="scope">{{ topicTypeName(scope.row.topicType) }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="edit(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除该文章吗？" @onConfirm="del(scope.row.id)">
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
        :page-size="page.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <SuperForm
      v-model="item"
      title="体检项目"
      :params="params"
      :form-setting="formSetting"
      @doSubmit="doSubmit"
    />
  </el-card>
</template>

<script>
import SuperForm from '@/components/SuperForm'
import {
  partySpiritClassificationQuery,
  partySpiritClassificationSave,
  partySpiritClassificationUpdate,
  partySpiritClassificationGet,
  partySpiritClassificationDelete
} from '@/api/partyCheck'
export default {
  name: 'PartyCheckTemplateList',
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      name: '',
      type: '',
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        name: ''
      },
      item: {
        refresh: false,
        id: ''
      },
      topicType: [
        {
          value: '1',
          label: '基本项'
        },
        {
          value: '2',
          label: '一票否决项'
        },
        {
          value: '3',
          label: '加分项'
        }
      ]
    }
  },
  computed: {
    params() {
      const topicType = this.topicType
      return [
        {
          type: 'text',
          label: '项目名称',
          key: 'name',
          placeholder: '请输入项目名称',
          rules: {
            required: true, message: '项目名称不能为空', trigger: 'blur'
          }
        },
        {
          type: 'select',
          label: '项目类型',
          key: 'topicType',
          placeholder: '请选择项目类型',
          options: topicType,
          rules: {
            required: true, message: '项目类型不能为空', trigger: 'blur'
          }
        },
        {
          type: 'number',
          label: '项目分数',
          key: 'score',
          placeholder: '请输入项目分数',
          rules: {
            required: true, message: '项目分数不能为空', trigger: 'blur'
          }
        },
        {
          type: 'textarea',
          label: '项目描述',
          key: 'remark',
          rows: 2,
          placeholder: '请输入项目描述',
          rules: {
            required: true, message: '项目描述不能为空', trigger: 'blur'
          }
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    topicTypeName(val) {
      let name = ''
      switch (val * 1) {
        case 1:
          name = '基本项'
          break
        case 2:
          name = '一票否决项'
          break
        case 3:
          name = '加分项'
          break
      }
      return name
    },
    handleSizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.getList()
    },
    handleCurrentChange(pageNum) {
      this.page.pageNum = pageNum
      this.getList()
    },
    doSubmit(data) {
      console.log(data)
      if (data.id) { // 编辑
        partySpiritClassificationUpdate(data).then(res => {
          if (res.code * 1 === 0) {
            this.$message.success('操作成功')
            this.getList()
          } else {
            this.$message.error('网络连接失败')
          }
        })
      } else { // 添加
        partySpiritClassificationSave(data).then(res => {
          if (res.code * 1 === 0) {
            this.$message.success('操作成功')
            this.getList()
          } else {
            this.$message.error('网络连接失败')
          }
        })
      }
    },
    handleSearch() {
      this.getList()
    },
    handleClear() {
      this.page.name = ''
      this.getList()
    },
    getList() {
      // this.tableData = []
      partySpiritClassificationQuery(this.page).then(res => {
        if (res.code * 1 === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        } else {
          this.$message.error('网络连接失败')
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
      const id = data.id
      this.item.id = id
      partySpiritClassificationGet(id).then(res => {
        if (res.code * 1 === 0) {
          if (typeof res.data.topicType === 'number') {
            res.data.topicType = res.data.topicType.toString()
          }
          this.item = res.data
        }
      })
    },
    del(id) {
      partySpiritClassificationDelete(id).then(res => {
        if (res.code * 1 === 0) {
          this.$message.success('操作成功')
          this.getList()
        } else {
          this.$message.error('网络连接失败')
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
    min-width: 200px;
    max-width: 200px;
    border: 1px solid #dddddd;
  }
}
</style>
