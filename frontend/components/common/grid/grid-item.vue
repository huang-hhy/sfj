<template>
    <div class="grid" :class="['grid-'+(cell<2?3:cell),border?'grid2':'']" :style="{backgroundColor:backgroundColor}">
      <div class='grid-bg'>
        <slot></slot>
      </div>
    </div>
</template>

<script>
    export default {
        name: "grid-item",
        props:{
          cell: {
            type: [Number,String],
            default: 3
          },
          backgroundColor: {
            type: String,
            default: "#fff"
          },
          //是否有点击效果
          hover: {
            type: Boolean,
            default: true
          },
          index: {
            type: Number,
            default: 0
          },
          border: {
            type: Boolean,
            default: false
          }
        }
    }
</script>

<style scoped>
  .grid {
    position: relative;
    padding: 2vw;
    box-sizing: border-box;
    background: #fff;
    float: left;
  }
  .grid-2 {
    width: 50%;
  }

  .grid-3 {
    width: 33.333333333%;
  }

  .grid-4 {
    width: 25%;
    padding: 2vw !important;
  }

  .grid-5 {
    width: 20%;
    padding: 2vw !important;
  }
  .grid-2:nth-of-type(2n)::before {
    width: 0;
    border-right: 0;
  }

  .grid-3:nth-of-type(3n)::before {
    width: 0;
    border-right: 0;
  }

  .grid-4:nth-of-type(4n)::before {
    width: 0;
    border-right: 0;
  }

  .grid-5:nth-of-type(5n)::before {
    width: 0;
    border-right: 0;
  }

  .grid::before {
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;

    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
  }

  .grid::after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .grid2::before {
    border-right: 1px solid #eaeef1;
  }
  .grid2::after{
    border-bottom: 1px solid #eaeef1;
  }
  .grid-bg {
    position: relative;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .item-hover {
    background-color: #f7f7f9 !important;
  }

</style>

<style scoped>

</style>
