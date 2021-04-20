<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px" :close-on-click-modal="false">
    <div class="container">
      <xdh-form :model="model" :fields="fields" :load="load" :footer="footer" @submit="handleSubmit" />
    </div>
  </el-dialog>
</template>

<script>
import XdhForm from '@/components/custom-form/form/xdh-form'
import { load } from '@/components/custom-form/utils/dict'

export default {
  name: 'SuperForm',
  components: {
    XdhForm
  },
  props: {
    footer: {
      type: Boolean
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: () => {
      }
    },
    fields: {
      type: Array,
      default: () => []
    },
    model: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      load: load
    }
  },
  watch: {
    value: {
      handler(val) {
        this.dialogFormVisible = !!val.time
      },
      deep: true
    }
  },
  methods: {
    handleSubmit(model) {
      const submit = { fields: this.fields, model: model }
      this.$emit('submit', submit)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 0 20px;
    max-height: 400px;
    overflow-y: auto
  }
</style>
