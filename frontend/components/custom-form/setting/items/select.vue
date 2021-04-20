<template>
  <el-select
    v-model="fieldValue"
    v-bind="$attrs"
    filterable
    clearable
    class="select"
    v-on="$listeners"
    @keyup.native.13.stop
  >
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Boolean, Array],
      default: ''
    },
    options: {
      type: Array,
      default() {
        return []
      }
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
  .select{
    width:100%
  }
</style>
