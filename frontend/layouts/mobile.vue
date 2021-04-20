<template>
<!--  用于主页的布局-->
  <div class="container">
    <nav-header class="header"/>
    <nuxt class="main"/>
    <nav-footer class="footer"/>
  </div>
</template>

<script>
import NavHeader from '@/components/mobile/layout/nav-header'
import NavFooter from '@/components/mobile/layout/nav-footer'
export default {
  name: 'layout',
  components: {
    NavHeader,
    NavFooter
  }
}
</script>

<style scoped lang="less">
  .container {
    height: 100vh;
    position: relative;

    .header {
    /*  position: absolute;
      top: 0;
      left: 0;*/
    }

    .main {
      position: absolute;
      top: 7vh;
      left: 0;
      //overflow-y: scroll;
      height: 86vh;
      width: 100vw;
      background-color: #EBEBEB;;
    }

    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
</style>
