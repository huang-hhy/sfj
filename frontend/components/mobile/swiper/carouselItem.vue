<template>
  <div>
    <img :src="item.articleShowImg" alt/>
    <div class="bottom">
      <p>{{item.articleTitle}}</p>
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
    width: 100%;
    height: 25vh;
    position: relative;
  }

  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    opacity: .6;
    background-color: #333333;
    line-height: 3.2vh;
    font-size: 1.8vh;
    color: #fff;
    padding-left: 2.5vw;

    p {
      width: 72%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
