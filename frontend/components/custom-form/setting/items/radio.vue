<template>
  <el-radio-group v-model="fieldValue" v-bind="$attrs" v-on="$listeners">
    <component
      :is="component"
      v-for="(item,index) in options"
      :key="index"
      :label="item.value"
    >{{ item.label }}
    </component>
  </el-radio-group>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否按钮模式
    button: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    component() {
      return this.button ? 'el-radio-button' : 'el-radio'
    },
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
