<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>工作指引管理</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增工作指引</el-button>
      <!--      <div class="list-header-item">-->
      <!--        <span class="label">工作指引</span>-->
      <!--        <el-select v-model="page.studyTypeId" placeholder="请选择分类" class="w200 content" @change="getList">-->
      <!--          <el-option label="全部" value=""/>-->
      <!--          <el-option v-for="it in typeOptions" :key="it.id" :label="it.typeName" :value="it.id"/>-->
      <!--        </el-select>-->
      <!--      </div>-->
      <div class="list-header-item">
        <span class="label">工作指引</span>
        <el-input v-model="page.title" class="w200 content" placeholder="请输入工作指引标题" />
      </div>
      <el-button type="primary" class="mr8" @click="getList()">搜索</el-button>
      <el-button type="warning" @click="clear">清空</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column type="index" label="编号" align="center" width="50" />
      <el-table-column label="标题" min-width="180" align="center" prop="title" />
      <el-table-column label="类型" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{ getWorkTypeById(scope.row.workTypeId) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-popconfirm
            v-if="scope.row.status *1 === 0"
            title="确定停用该工作指引吗？"
            @onConfirm="updateStatus(scope.row.id, 1)"
          >
            <el-button slot="reference" type="success" :disabled="scope.row.id === '1'" size="mini">正常</el-button>
          </el-popconfirm>
          <el-popconfirm
            v-else
            title="确定启用工作指引吗？"
            @onConfirm="updateStatus(scope.row.id, 0)"
          >
            <el-button slot="reference" type="warning" :disabled="scope.row.id === '1'" size="mini">停用</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">查看</el-button>
          <el-popconfirm title="确定删除该数据吗？" @onConfirm="del(scope.row.id)">
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
    <!--    <SuperForm-->
    <!--      v-model="item"-->
    <!--      title="工作指引"-->
    <!--      :params="params"-->
    <!--      :form-setting="formSetting"-->
    <!--      @doSubmit="doSubmit"-->
    <!--    />-->
    <GuidenlinesForm v-model="item" :type-list="typeList" @doSubmit="doSubmit" />
  </el-card>
</template>

<script>
import {
  guidelinesList,
  guidelinesAdd,
  guidelinesEdit,
  deleteGuidelines,
  getGuidelines,
  guidelinesTypeList
} from '@/api/study'
import GuidenlinesForm from '@/views/study/form/guidelines_form'

export default {
  name: 'LessonList',
  components: { GuidenlinesForm },
  data() {
    return {
      tableData: [],
      typeOptions: [],
      item: {
        refresh: false,
        id: '',
        enclosure: '',
        content: '',
        title: '',
        workTypeId: ''
      },
      page: {
        current: 1,
        limit: 10,
        total: 0,
        title: '',
        studyTypeId: ''
      },
      typeList: []
    }
  },
  mounted() {
    this.getList()
    this.getType()
  },
  methods: {
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        enclosure: '',
        content: '',
        title: '',
        workTypeId: '',
        status: 0
      }
    },
    edit(id) {
      getGuidelines(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          this.item = Object.assign(this.item, data)
        }
      })
    },
    del(id) {
      deleteGuidelines(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    updateStatus(id, status) {
      guidelinesEdit({ id, status }).then(res => {
        if (res.code * 1 === 0) {
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doSubmit(data) {
      if (data.id) {
        guidelinesEdit(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        guidelinesAdd(data).then(res => {
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
      guidelinesList({ pageNum, pageSize }, { title: this.page.title }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.page.total = res.data.total * 1
        }
      })
    },
    getType() {
      guidelinesTypeList({ current: 1, limit: 999 }, {}).then(res => {
        if (res.code * 1 === 0) {
          this.typeList = res.data.list.reduce((res, current) => {
            res.push({
              value: current.id,
              label: current.title
            })
            return res
          }, [])
        }
      })
    },
    getWorkTypeById(id) {
      for (let i = 0; i < this.typeList.length; i++) {
        if (this.typeList[i].value === id) {
          return this.typeList[i].label
        }
      }
    },
    clear() {
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
