<template>
  <div class="header-main">
    <div class="back" @click="back" v-if="isBack">
      <img src="@/assets/mobile/layout/back.png" alt=""/>
    </div>
    <div class="title">
      {{title}}
    </div>
    <div class="more">
      <img src="@/assets/mobile/layout/more.png" alt=""/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavHeader',
    data() {
      return {
        isBack: true
      }
    },
    props: {
      title: {
        type: String,
        default: '智慧党建'
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    },
    mounted() {
      if (this.$route.path === '/mobile/home' || this.$route.path === '/mobile/study' || this.$route.path === '/mobile/profile') {
        this.isBack = false
      }
    }
  }
</script>

<style scoped lang="less">
  .header-main {
    width: 100%;
    height: 7vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    font-size: 5vw;
    background-color: #F44436;
    //position: relative;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    .back {
      align-items: center;
      justify-content: center;

      img {
        width: 7vw;
        height: 7vw;
      }

      display: flex;
      margin-left: 10px;
    }

    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .more {
      margin-right: 10px;
      line-height: 100%;
      position: absolute;
      right: 0;
    }
  }
</style>
