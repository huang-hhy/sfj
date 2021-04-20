<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>发展党员流程列表</span>
    </div>
    <div class="list-content">
      <el-timeline>
        <el-timeline-item
          v-for="(it, index) in listTree"
          :key="index"
          placement="top"
          :index="index"
          :color="it.color"
        >
          <p :class="{timelineName:true,active:it.id===flowId}" @click="getListByOrg(it.id,it.status)">{{ it.label }}</p>
        </el-timeline-item>
      </el-timeline>
      <div class="container">
        <xdh-form :model="model" :fields="fields" :load="load" :footer="footer" submit-text="通过" @submit="handleSubmit" />
      </div>
    </div>
  </el-card>
</template>

<script>
import XdhForm from '@/components/custom-form/form/xdh-form'
import { load } from '@/components/custom-form/utils/dict'
import {
  getStandardizationFlow,
  checkStandardizationFlow
} from '@/api/work'

export default {
  name: 'RecruitingPartyMembersList',
  components: { XdhForm },
  data() {
    return {
      load: load,
      listTree: [],
      processList: [],
      steps: [],
      template: [],
      templateItem: {},
      model: {},
      value: {},
      title: '',
      fields: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      footer: true,
      flowId: '',
      partyStandardizationId: ''
    }
  },
  mounted() {
    this.partyStandardizationId = this.$route.query.id
    this.getStandardizationFlow()
  },
  methods: {
    handleSubmit(e) {
      for (const a in e) {
        if (e.hasOwnProperty(a)) {
          if (typeof e[a] === 'string') {
            e[a] = e[a].replace(/\r\n/g, '<br>').replace(/\n/g, '<br/>')
          }
        }
      }
      this.fields.forEach(item => {
        item.props.value = e[item.prop]
      })
      const data = {}
      data.id = this.flowId
      data.customForm = JSON.stringify(this.fields)
      data.status = '1'
      checkStandardizationFlow(data).then(res => {
        if (res.code === 0) {
          this.getStandardizationFlow()
          this.$message.success('提交成功')
        }
      })
    },
    getStandardizationFlow() {
      const data = { partyStandardizationId: this.partyStandardizationId }
      getStandardizationFlow(data).then(res => {
        if (res.code === 0) {
          this.listTree = []
          const step = res.data.step * 1
          this.processList = res.data.list
          this.processList.forEach((item, index) => {
            let color = '#BEBEBE'
            let status = false
            if (index < step) {
              color = '#4E97FF'
            } else if (index === step) {
              color = '#42B983'
              status = true
            }
            this.listTree.push({ id: item.id, label: item.partyStepName, color, status })
          })
          if (!this.flowId) {
            if (step < this.processList.length) {
              this.getListByOrg(this.processList[step].id, true)
            } else {
              this.getListByOrg(this.processList[0].id)
            }
          } else {
            this.getListByOrg(this.flowId)
          }
        }
      })
    },
    getListByOrg(id, status) {
      const temp = this.processList.filter(_ => _.id === id)[0]
      this.flowId = temp.id
      this.fields = JSON.parse(temp.customForm)
      this.model = {}
      this.fields.forEach(item => {
        this.model[item.prop] = item.props.value
        if (!status) {
          item.props.disabled = true
          this.footer = false
        } else {
          this.footer = true
        }
      })
      for (const a in this.model) {
        if (typeof this.model[a] === 'string') { this.model[a] = this.model[a].replace(/<br>/g, '\r\n').replace(/<br\/>/g, '\n') }
      }
    }
  }
}
</script>

<style scoped>
  .list-content {
    display: flex;
  }
  .container {
    margin-left: 100px;
    width: 80%;
  }
</style>
