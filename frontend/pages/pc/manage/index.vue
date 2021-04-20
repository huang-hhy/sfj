<template>
  <div>
    <NavBar></NavBar>
    <div class="manage">
      <div class="login">
        <manage></manage>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import manage from '@/components/pc/manage/manage'
  export default {
    name: "index",
    components: {
      NavBar,
      manage
    }
  }
</script>

<style scoped lang="less">
  .manage{
    width: 1000px;
    margin: 0 auto;
    .login{
      width: 30%;
      float: right;
    }
  }

</style>
