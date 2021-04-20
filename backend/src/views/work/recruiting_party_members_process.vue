<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>发展党员流程</span>
    </div>
    <div class="list-header">
      <el-button type="success" class="mr10" @click="add">新增节点</el-button>
    </div>
    <el-timeline>
      <el-timeline-item v-for="(it, index) in steps" :key="index" :timestamp="it.stepName" placement="top" :index="index">
        <el-card class="step-item">
          <i class="el-icon-delete" @click="del(it.id)" />
          <h4>{{ it.stepName }} <a class="edit-btn" @click="editTemplate(it.id)">编辑模板</a></h4>
          <p>{{ it.remark }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <SuperForm
      v-model="item"
      title="发展流程节点"
      :params="params"
      :form-setting="formSetting"
      @doSubmit="doSubmit"
    />
  </el-card>
</template>

<script>
import SuperForm from '@/components/SuperForm'
import {
  getStandardizationOptionSelect,
  getStandardizationStepList,
  getStandardizationStep,
  saveStandardizationStep,
  updateStandardizationStep,
  deleteStandardizationStep,
  getStandardizationForm
} from '@/api/work'
export default {
  name: 'RecruitingPartyMembersProcess',
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
      steps: [],
      template: [],
      templateItem: {},
      item: {
        refresh: false,
        id: ''
      }
    }
  },
  computed: {
    params() {
      const template = this.template
      return [
        {
          type: 'text',
          label: '节点名称',
          key: 'stepName',
          placeholder: '请输入节点名称',
          rules: {
            required: true, message: '节点名称不能为空', trigger: 'blur'
          }
        },
        {
          type: 'select',
          label: '节点类型',
          key: 'partyStepTemplateId',
          placeholder: '请选节点类型',
          options: template,
          rules: {
            required: true, message: '节点类型不能为空', trigger: 'blur'
          }
        },
        {
          type: 'radio',
          label: '是否需要填写',
          key: 'isUserWrite',
          options: [
            {
              value: '0',
              label: '否'
            },
            {
              value: '1',
              label: '是'
            }
          ]
        },
        {
          type: 'textarea',
          label: '备注',
          key: 'remark',
          placeholder: ''
        }
      ]
    }
  },
  mounted() {
    this.getTemplate()
    this.getList()
  },
  methods: {
    editTemplate(id) {
      getStandardizationForm(id).then(res => {
        if (res.code * 1 === 0) {
          let type = 1
          if (res.data) {
            this.templateItem = res.data
            const fields = JSON.parse(this.templateItem.customForm)
            this.$store.commit('setFields', fields)
            type = 2
          } else {
            this.templateItem = {}
            this.$store.commit('setFields', [])
          }
          this.$router.push({ path: '/work/custom?id=' + id + '&type=' + type })
        }
      })
    },
    add() {
      this.item = {
        refresh: !this.item.refresh,
        id: '',
        stepName: '',
        partyStepTemplateId: '',
        isUserWrite: '0',
        remark: ''
      }
    },
    edit(id) {
      getStandardizationStep(id).then(res => {
        if (res.code === 0) {
          const data = res.data
          data.refresh = !this.item.refresh
          this.item = data
        }
      })
    },
    del(id) {
      this.$confirm('确认关闭？').then(() => {
        deleteStandardizationStep(id).then(res => {
          if (res.code === 0) {
            this.$message.success('删除成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {})
    },
    updateStatus(id, status) {
      updateStandardizationStep({ id, status }).then(res => {
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
        updateStandardizationStep(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        saveStandardizationStep(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    getTemplate() {
      getStandardizationOptionSelect().then(res => {
        if (res.code * 1 === 0) {
          this.template = res.data.reduce((res, current) => {
            res.push({
              value: current.id,
              label: current.title
            })
            return res
          }, [])
        }
      })
    },
    getList() {
      getStandardizationStepList({ pageNum: 1, pageSize: 99999 }, {}).then(res => {
        if (res.code === 0) {
          this.steps = res.data.list
        }
      })
    }
  }
}
</script>

<style scoped>
  .step-item{
    position: relative;
  }
  .step-item .el-icon-delete {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .edit-btn {
    float: right;
    color: #4A9FF9;
  }
</style>
