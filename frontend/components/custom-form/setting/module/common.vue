<template>
  <div v-if="commonFields.length" class="wrapper">
    <xdh-form size="small" :model="commonModel" :footer="false" label-width="80px" @change="handleChange">
      <xdh-form-item
        v-for="(item, index) in commonFields"
        :key="index"
        v-bind="item"
      />
    </xdh-form>
  </div>
  <div v-else class="wrapper">该组件无通用属性</div>
</template>

<script>
import XdhForm from '@/components/custom-form/form/xdh-form'
import XdhFormItem from '@/components/custom-form/form/xdh-form-item'
import { mapGetters, mapState } from 'vuex'
export default {
  components: {
    XdhForm,
    XdhFormItem
  },
  computed: {
    ...mapState({
      editField: state => state.custom.editField
    }),
    ...mapGetters(['commonFields', 'commonModel'])
  },
  mounted() {
  },
  methods: {
    handleChange(model) {
      const newField = JSON.parse(JSON.stringify({
        ...this.editField,
        ...model
      }))
      if (!newField.depend) {
        delete newField.depend
        delete newField.dependValue
      }
      this.$store.commit('updateField', newField)
    }
  }
}
</script>
