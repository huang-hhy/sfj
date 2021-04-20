<template>
  <div class="carousel">
    <el-carousel>
      <el-carousel-item v-for="(item,index) in carousel" :key="index">
        <slot :item="item"></slot>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: "carousel",
    props: {
      carousel: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .carousel {
    width: 100%;
    height: 25vh;

    /deep/ .el-carousel__item {
      width: 100%;
      height: 100%;
    }

    /deep/ .el-carousel__container {
      width: 100%;
      height: 25vh;
    }

    /deep/ .el-carousel__item:nth-child(n) {
      background-color: #cccccc;
    }

    /deep/ .el-carousel__indicator--horizontal {
      padding: 0px 1vw;
      line-height: 3vh;
    }

    /deep/ .el-carousel__indicators--horizontal {
      line-height: 3vh;
      left: unset;
      transform: unset;
      right: 0;
      margin-right: 2vw;
      white-space: nowrap;
    }

    /deep/ .el-carousel__button {
      line-height: 0;
      width: 1.5vw;
      height: 1.5vw;
      border-radius: 50%;
      background-color: #fff;
    }
    /deep/ .el-carousel__indicator.is-active button {
      opacity: 1;
      width: 3vw;
      border-radius: 30%;
      height: 1.5vw;
    }
  }
</style>
