<template>
  <div class="menu" v-if="this.menu.length">
    <client-only>
      <Swipe :auto="0">
        <Swipe-item v-for="(item,index) in menu" :key="index">
          <nuxt-link :to="{path:i.path}" v-for="i in item" :key="i.id">
            <div class="common_slider">
              <img :src="i.img"/>
              <p>{{i.name}}</p>
            </div>
          </nuxt-link>
        </Swipe-item>
      </Swipe>
    </client-only>
  </div>
</template>

<script>
  export default {
    name: "NavGroup",
    props: {
      menu: {
        type: Array
      }
    },
    watch: {
      menu: {
        handler(val) {
          console.log(val)
        },
        deep: true
      }
    }
  }
</script>

<style lang="less">
  .menu {
    width: 100%;
    height: 23vh;
    background: #fff;
    margin-bottom: 2vw;
    overflow: hidden;

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
        text-align: center;
      }
    }

    .mint-swipe-indicators {
      position: absolute;
      bottom: 0px;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }

    .mint-swipe-indicator.is-active {
      background: #f00;
    }
  }
</style>
