<template>
  <div class="wrapper">
    <xdh-form size="small" :model="extendModel" :footer="false" label-width="120px" @change="handleChange">
      <xdh-form-item
        v-for="(item, index) in extendFields"
        :key="index"
        v-bind="item"
      />
    </xdh-form>
  </div>
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
    ...mapGetters(['extendFields', 'extendModel'])
  },
  methods: {
    handleChange(props) {
      const newField = JSON.parse(JSON.stringify({
        ...this.editField,
        props: { ...props }
      }))
      this.$store.commit('updateField', newField)
    }
  }
}
</script>

<style scoped>

</style>
