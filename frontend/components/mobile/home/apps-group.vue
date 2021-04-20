<template>
  <div class="app-container">
    <div class="inform">
      <img src="@/assets/mobile/home/inform.png" alt=""/>
      <transition name="slide" v-if="noticeShow.val">
        <span :key="noticeShow.id">{{noticeShow.val.noticeContent}}</span>
      </transition>
    </div>
    <div class="app-group">
      <div class="app-item" v-for="(item,index) in menu" :key="index">
        <nuxt-link :to="{path:item.path,query:{id:item.id, name:item.articleChannelName}}">
          <img :src="item.smallIcon"/>
          <p>{{item.articleChannelName}}</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      menu: {
        type: Array
      },
      notice: {
        type: Array
      }
    },
    data() {
      return {
        number: 0
      }
    },
    mounted() {
      this.startMove()
    },
    computed: {
      noticeShow() {
        return {
          id: this.number,
          val: this.notice[this.number]
        }
      }
    },
    methods: {
      goto(path) {
        this.$router.push(path)
      },
      startMove() {
        let timer = setTimeout(() => {
          if (this.number === 9) {
            this.number = 0;
          } else {
            this.number += 1;
          }
          this.startMove();
        }, 5000);
      }
    }
  }
</script>

<style scoped lang="less">
  .app-container {
    background-color: #ffffff;
    width: 100vw;
    margin-bottom: 2vw;
  }

  .inform {
    height: 6vh;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(222, 222, 222, 0.5);
    margin: 0 5vw;
    position: relative;
    text-align: center;
    img {
      height: 2.5vh;
    }

    span {
      position: absolute;
      left: 10vw;
      bottom: 2.6vw;
      font-size: 1.8vh;
      width: 80vw;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #666666;
    }
    .slide-enter-active, .slide-leave-active {
      transition: all 0.5s linear;
    }
    .slide-enter {
      transform: translateY(20px) scale(1);
      opacity: 1;
    }
    .slide-leave-to {
      transform: translateY(-20px) scale(0.8);
      opacity: 0;
    }
  }
  .app-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }

  .app-item {
    width: 25%;
    padding: 2vw 0;
    margin: 0 auto;
    text-align: center;
    img {
      width: auto;
      height: 10vw;
      margin-bottom: 3px;
    }
    p {
      color: #333333;
      font-size: 3.5vw;
    }
  }

  .app-group {
    .app-item {
      width: -webkit-calc(100% / 4);
      width: calc(100% / 4);
    }
  }

  .app-group:after {
    content: ' ';
    flex: auto;
  }
</style>
