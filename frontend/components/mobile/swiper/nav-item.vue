<template>
  <div class="common_slider">
    <img :src="nav.img"/>
    <p>{{nav.name}}</p>
  </div>
</template>

<script>
  export default {
    name: "nav-item",
    props: ['nav']
  }
</script>

<style scoped lang="less">
  .common_slider {
    padding-top: 2vw;
    width: 25vw;
    height: 11vh;
    float: left;

    img {
      width: 8vw;
      height: 10vw;
      display: block;
      margin: 0 auto;
    }

    p {
      color: #333333;
      font-size: 3.5vw;
      display: block;
      text-align: center;
    }
  }
</style>
