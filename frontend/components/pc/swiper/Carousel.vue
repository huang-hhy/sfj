<template>
  <div class="carousel">
    <el-carousel>
      <el-carousel-item v-for="(item,index) in carousel" :key="index">
        <CarouselItem :item="item" @click.native="gotoItem(item)"></CarouselItem>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import CarouselItem from './CarouselItem'

  export default {
    name: "Carousel",
    props: {
      carousel: {
        type: Array
      }
    },
    components: {
      CarouselItem
    },
    methods: {
      gotoItem(d) {
        this.$emit('doSubmit', d)
      }
    }
  }
</script>

<style lang="less">
  .carousel {
    width: 350px;
    height: 200px;

    .el-carousel__item {
      width: 350px;
      height: 200px;
    }

    .el-carousel__container {
      width: 350px;
      height: 200px;
    }

    .el-carousel__item:nth-child(n) {
      background-color: #cccccc;
    }

    .el-carousel__indicator--horizontal {
      padding: 0px 4px;
      line-height: 30px;
    }

    .el-carousel__indicators--horizontal {
      left: unset;
      transform: unset;
      right: 0;
      margin-right: 5px;
      line-height: 30px;
      margin-left: 20px;
      white-space: nowrap;
    }

    .el-carousel__button {
      background-color: #fff;
      line-height: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .el-carousel__button :hover {
      background-color: red;
    }
  }
</style>
