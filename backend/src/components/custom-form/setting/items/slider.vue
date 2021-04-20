<template>
  <el-slider v-model="fieldValue" v-bind="$attrs" class="slider" v-on="$listeners" />
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, Array],
      default: 0
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
  .slider{
    margin-top:22px
  }
</style>
