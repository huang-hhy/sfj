<template>
  <div class="main_carousel">
    <img :src="carousel.img" alt="">
    <p class="content1" :style="{color:carousel.color}">{{carousel.content1}}</p>
    <h2 class="title" :style="{color:carousel.color}">{{carousel.name}}</h2>
    <p class="content2" :style="{color:carousel.color}">{{carousel.content2}}</p>
    <div class="btn">
      <button @click="goto(2)">功能模块</button>
      <button @click="goto(3)">组织模块</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mainCarousel",
    props: {
      carousel: {
        type: Object
      }
    },
    methods:{
      goto(index){
        this.$emit('goto', index)
      }
    }
  }
</script>

<style scoped lang="less">
  .main_carousel {
    position: relative;
    text-align: center;
    color: #ffffff;
    width: 100%;
    height: 100%;
    text-align: center;
    img {
      /*position: absolute;*/
      width: 100%;
      height: 100%;
    }
    .title {
      width: 1000px;
      position: absolute;
      color: #000000;
      font-weight: bold;
      top: 46%;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 100px;
      font-size: 48px;
      letter-spacing: 4px;
      margin-bottom: 20px;
    }

    .content1 {
      width: 700px;
      position: absolute;
      top: 38%;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 36px;
      font-size: 20px;
      /*padding: 0 20px;*/
      letter-spacing: 2px;
      color: #000000;
    }
    .content2 {
      width: 700px;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 32px;
      font-size: 20px;
      /*padding: 0 20px;*/
      letter-spacing: 2px;
      color: #000000;
    }
    .btn{
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
      button{
        background: #4E9BE0;
        width: 200px;
        height: 56px;
        line-height: 40px;
        border: 1px solid #ffffff;
        color: #ffffff;
        margin:0 10px;
        font-size: 18px;
        border-radius: 5px;
        cursor: pointer;
      }
      button:nth-child(1):hover{
        background: #3887CE;
      }
      button:nth-child(2):hover{
        background: #4E9BDF;
      }
      button:nth-child(2){
        background: transparent;
        border: 1px solid #3399FF;
      }

    }

  }
</style>
