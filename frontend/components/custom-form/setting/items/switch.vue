<template>
  <el-switch v-model="fieldValue" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    fieldValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  mounted() {
  }
}
</script>
