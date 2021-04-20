<template>
  <div>
    <div class="container">
      {{title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavHeader',
    props: {
      title: {
        type: String,
        default: '首页'
      }
    }
  }
</script>

<style scoped>
  .container {
    height: 7vh;
    line-height: 7vh;
    text-align: center;
    color: #ffffff;
    font-size: 5vw;
    background-color: rgba(13, 158, 236, 1);
    position: relative;
  }
</style>
