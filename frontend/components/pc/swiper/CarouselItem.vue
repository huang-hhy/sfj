<template>
  <div>
    <img :src="item.image" alt/>
    <div class="bottom">
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CarouselItem",
    props: {
      item: {
        type: Object
      }
    }
  }
</script>

<style scoped lang="less">
  img {
    width: 350px;
    height: 200px;
    position: relative;
  }

  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    opacity: .6;
    background-color: #333333;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    padding-left: 8px;

    p {
      width: 72%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
