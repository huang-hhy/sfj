<template>
  <div class="xdh-form-range">
    <component
      :is="component"
      v-model="min"
      v-bind="$attrs"
      class="xdh-form-range__min"
      :style="inputStyle"
      :placeholder="minPlaceholder"
      :picker-options="minPickerOptions"
    />
    <span
      class="xdh-form-range__separator"
      :style="separatorStyle"
    >{{ separator }}</span>
    <component
      :is="component"
      v-model="max"
      v-bind="$attrs"
      class="xdh-form-range__max"
      :style="inputStyle"
      :placeholder="maxPlaceholder"
      :picker-options="maxPickerOptions"
    />
  </div>
</template>

<script>
const components = {
  number: 'el-input-number',
  text: 'el-input',
  date: 'el-date-picker',
  time: 'el-time-select',
  timePicker: 'el-time-picker'
}
export default {
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    dataType: {
      type: String,
      default: 'text',
      validator(val) {
        return ['number', 'date', 'time', 'text', 'timePicker'].includes(val)
      }
    },
    minPlaceholder: {
      type: String,
      default: '最小值'
    },
    maxPlaceholder: {
      type: String,
      default: '最大值'
    },
    separator: {
      type: String,
      default: '-'
    },
    separatorWidth: {
      type: [Number, String],
      default: 12
    }
  },
  data() {
    return {
      min: this.value[0],
      max: this.value[1]
    }
  },
  computed: {
    component() {
      return components[this.dataType]
    },
    separatorStyle() {
      return {
        width: `${parseInt(this.separatorWidth)}px`
      }
    },
    inputStyle() {
      return {
        width: `calc(50% - ${parseInt(this.separatorWidth) / 2}px)`
      }
    },
    minPickerOptions() {
      // 如何有定义，按定义有限
      if (this.$attrs.pickerOptions && this.$attrs.pickerOptions.disabledDate) {
        return this.$attrs.pickerOptions
      }
      return {
        ...this.$attrs.pickerOptions,
        disabledDate: date => {
          if (!this.max) return false
          return Date.parse(this.max) < date.getTime()
        }
      }
    },
    maxPickerOptions() {
      // 如何有定义，按定义有限
      if (this.$attrs.pickerOptions && this.$attrs.pickerOptions.disabledDate) {
        return this.$attrs.pickerOptions
      }
      return {
        ...this.$attrs.pickerOptions,
        disabledDate: date => {
          if (!this.min) return false
          return Date.parse(this.min) > date.getTime()
        }
      }
    }
  },
  watch: {
    min(val) {
      this.$emit('input', [val, this.max])
    },
    max(val) {
      this.$emit('input', [this.min, val])
    },
    value(val) {
      this.min = val[0]
      this.max = val[1]
    }
  }
}
</script>
<style lang="scss" scoped>
  .xdh-form-range {
    clear: both;
    display: block;
  }
</style>
