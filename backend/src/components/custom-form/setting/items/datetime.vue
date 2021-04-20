<template>
  <el-date-picker v-model="fieldValue" v-bind="$attrs" type="datetime" class="date" v-on="$listeners" />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Array, Date],
      default: ''
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
  }
}
</script>
<style scoped>
.date{
  width: 100%;
}
</style>
