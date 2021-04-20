<template>
  <component :is="component" v-model="fieldValue" v-bind="bindProps" class="time" v-on="$listeners" />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Date, Array],
      default: ''
    },
    // 是否picker模式
    picker: {
      type: Boolean,
      default: false
    },
    // for time-select
    start: {
      type: String,
      default: '08:30'
    },
    // for time-select
    end: {
      type: String,
      default: '18:00'
    },
    // for time-select
    step: {
      type: String,
      default: ''
    },
    // for time-select
    minTime: {
      type: String,
      default: ''
    },
    // for time-select
    maxTime: {
      type: String,
      default: ''
    },
    // for time-picker
    selectableRange: {
      type: [String, Array],
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
    },
    component() {
      return this.picker ? 'el-time-picker' : 'el-time-select'
    },
    bindProps() {
      const picker = {
        start: this.start,
        end: this.end,
        step: this.step,
        minTime: this.minTime,
        maxTime: this.maxTime,
        selectableRange: this.selectableRange,
        format: this.$attrs.format
      }
      const pickerOptions = {}
      Object.keys(picker).forEach(n => {
        if (picker[n]) {
          pickerOptions[n] = picker[n]
        }
      })
      return {
        pickerOptions: pickerOptions,
        ...this.$attrs
      }
    }
  }
}
</script>
<style scoped>
  .time{
    width:100%
  }
</style>
