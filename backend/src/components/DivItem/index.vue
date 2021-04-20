<template>
  <div class="item">
    <label
      v-if="label"
      class="label"
      :style="`width:${labelWidth || parentLabelWidth}; text-align: ${labelPosition || parentLabelPosition}`"
    >
      {{ label }}
    </label>
    <div class="content" :style="`margin-left: ${labelWidth || parentLabelWidth}`">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DivItem',
  props: {
    labelWidth: {
      type: String,
      default: ''
    },
    labelPosition: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    parent() {
      return this.$parent
    },
    parentLabelPosition() {
      return this.parent.labelPosition || 'right'
    },
    parentLabelWidth() {
      return this.parent.labelWidth || 'auto'
    }
  }
}
</script>

<style scoped lang="less">
  .item {
    margin-bottom: 22px;
    font-size: 14px;
    color: #606266;
    font-weight: 700;
    position: relative;
    /*float: left;*/

    .label {
      position: absolute;
      padding-right: 12px;
      display: inline-block;
    }
    .content {
      top: 0;
      display: inline-block;
      text-align: left;
    }

    &:after {
      content: "";
      display: block;
      height: 0;
      clear:both;
      visibility: hidden;
    }
  }
</style>
