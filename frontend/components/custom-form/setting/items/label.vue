<template>
  <!--  <el-input type="text" class="label" v-bind="$attrs" v-on="$listeners" v-model="fieldValue"></el-input>-->
  <p class="label">{{ fieldValue }}</p>
</template>

<script>
export default {
  name: 'Label',
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

<style scoped>
  .label {
    word-wrap: break-word;
    table-layout: fixed;
    padding-right: 15px;
    word-break: break-all
  }
</style>
