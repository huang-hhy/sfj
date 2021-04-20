<template>
  <div class="footer-main">
    <div class="item" @click="changeItem('/mobile/home')">
      <img :src='"@/assets/mobile/layout/mobile/home"+(activeItem==="/mobile/home"?"-active":"")+".png"' />
      <span :class='{active: activeItem==="/mobile/home"}'>首页</span>
    </div>
    <div class="item" @click="changeItem('/mobile/study')">
      <img :src='"@/assets/mobile/layout/mobile/study"+(activeItem==="/mobile/study"?"-active":"")+".png"' />
      <span :class='{active: activeItem==="/mobile/study"}'>学习</span>
    </div>
    <div class="item" @click="changeItem('/mobile/branch')">
      <img :src='"@/assets/mobile/layout/mobile/branch"+(activeItem==="/mobile/branch"?"-active":"")+".png"' />
      <span :class='{active: activeItem==="/mobile/branch"}'>支部圈</span>
    </div>
    <div class="item" @click="changeItem('/mobile/profile')">
      <img :src='"@/assets/mobile/layout/mobile/profile"+(activeItem==="/mobile/profile"?"-active":"")+".png"' />
      <span :class='{active: activeItem==="/mobile/profile"}'>个人</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'nav-footer',
    data() {
      return {
        activeItem: 'home'
      }
    },
    mounted() {
      this.activeItem = this.$route.path
    },
    methods: {
      changeItem(item) {
        this.activeItem = item
        let path = '/mobile/home'
        let name = '首页'
        switch (item) {
          case '/mobile/home':
            path = item
            name = '首页'
            break
          case '/mobile/study':
            path = item
            name = '学习'
            break
          case '/mobile/profile':
            path = item
            name = '个人'
            break
          case '/mobile/branch':
            path = item
            name = '支部圈'
            break
          default:
            path = '/mobile/home'
            name = '首页'
        }
        this.$router.push({path: path, query: {name: name}})
      }
    }
  }
</script>

<style scoped lang="less">
  .footer-main {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 7vh;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
    background-color: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        margin-top: .5vh;
        margin-bottom: .2vh;
        width: 3.5vh;
        height: 3.5vh;
      }

      span {
        font-size: 12px;
        color: #999999;
      }

      .active {
        color: #F44436;
      }
    }
  }
</style>
