<template>
  <xdh-ckeditor v-model="fieldValue" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import XdhCkeditor from '@/widgets/xdh-ckeditor'

export default {
  components: {
    XdhCkeditor
  },
  props: {
    value: {
      type: String,
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
