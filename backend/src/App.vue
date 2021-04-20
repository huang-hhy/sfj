<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'

}
</script>
<style lang="less">
  .list-header {
    margin-bottom: 10px;
    line-height: 2.5em;

    & > .list-header-item {
      display: inline-block;

      & > .label, & > .content {
        margin-right: 10px;
      }
    }
  }

  .mr10 {
    margin-right: 10px;
  }

  .mr15 {
    margin-right: 15px;
  }

  .ml10 {
    margin-left: 10px;
  }

  .ml15 {
    margin-left: 15px;
  }

  .w100 {
    width: 100px;
  }

  .w150 {
    width: 150px;
  }

  .w200 {
    width: 200px;
  }

  .w240 {
    width: 240px;
  }
  .page-wrap {
    text-align: right;
    margin-top: 10px;
  }

  .left-align-number {
    .el-input__inner {
      text-align: left;
    }
  }

  .el-dialog__header {
    border-bottom: 1px solid #e6ebf5;
  }
  .el-popover{
    width: 30%!important;
  }
</style>
