<template>
  <div class="carousel">
    <el-carousel>
      <el-carousel-item v-for="(item,index) in carousel" :key="index">
        <carouselItem :item="item"></carouselItem>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import carouselItem from './carouselItem'

  export default {
    name: "Carousel",
    props: {
      carousel: {
        type: Array
      }
    },
    components: {
      carouselItem
    }
  }
</script>

<style lang="less">
  .carousel {
    width: 100%;
    height: 25vh;

    .el-carousel__item {
      width: 100%;
      height: 100%;
    }

    .el-carousel__container {
      width: 100%;
      height: 25vh;
    }

    .el-carousel__item:nth-child(n) {
      background-color: #cccccc;
    }

    .el-carousel__indicator--horizontal {
      padding: 0px 1vw;
      line-height: 3vh;
    }

    .el-carousel__indicators--horizontal {
      line-height: 3vh;
      left: unset;
      transform: unset;
      right: 0;
      margin-right: 2vw;
      white-space: nowrap;
    }

    .el-carousel__button {
      line-height: 0;
      width: 1.8vw;
      height: 1.8vw;
      border-radius: 50%;
      background-color: #fff;
    }

    .el-carousel__button :hover {
      background-color: red;
    }
  }
</style>
