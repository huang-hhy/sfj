<template>
  <el-rate v-model="fieldValue" v-bind="$attrs" class="rate" v-on="$listeners" />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 3
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
  .rate{
    margin-top:12px
  }
</style>
