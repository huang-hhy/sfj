<template>
  <div class="study">
    <ul class="study_list">
      <li class="study_li" v-for="(item,index) in bookList" :key="index">
        <img :src="item.img" alt="">
        <p class="name">{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "study",
    data() {
      return {
        bookList: [{id: 1, img: require('@/assets/mobile/study/book1.png'), name: '学习小手册'}, {
          id: 2,
          img: require('@/assets/mobile/study/book2.png'),
          name: '智慧中国2'
        }, {
          id: 3,
          img: require('@/assets/mobile/study/book2.png'),
          name: '智慧中国3'
        }, {
          id: 4,
          img: require('@/assets/mobile/study/book2.png'),
          name: '智慧中国4'
        }, {
          id: 5,
          img: require('@/assets/mobile/study/add.png')
        }]
      }
    }
  }
</script>

<style scoped lang="less">
  .study {
    padding: 5vw;

    .study_list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      text-align: left;

      .study_li {
        width: 30%;

        img {
          width: 100%;
          height: 20vh;
          box-shadow: 2px 2px 2px #aaaaaa;
        }

        p {
          text-align: center;
          font-size: 2vh;
          line-height: 5vh;
          color: #424242;
        }
      }
    }

    .study_list:after {
      content: '';
      width: 30%;
    }
  }
</style>
