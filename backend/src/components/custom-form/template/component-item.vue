<template>
  <div class="box">
    <span>{{ data.title }}</span>
    <span class="svg-container">
      <svg-icon :icon-class="data.icon" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
  .box {
    background: #c6e2ff;
    width: 120px;
    height: 40px;
    padding: 0 15px;
    line-height: 40px;
    border: 1px solid #bebebe;
    font-size: 13px;
    cursor: move;
    display: flex;

    span {
      display: inline-block;
      width: 100px;
    }

    .svg-container {
      padding-left: 10px;
      color: #c6e2ff;
      vertical-align: middle;
      width: 25px;
      display: inline-block;
    }
  }
</style>
