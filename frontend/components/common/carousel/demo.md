<template>
  <div>
    <carousel :carousel="dataList">
      <template slot-scope="scope">
        <img :src="scope.item.icon" alt/>
        <p>{{scope.item.name}}</p>
      </template>
    </carousel>
  </div>
</template>

<script>
  import carousel from '@/components/common/carousel/carousel'
  export default {
    layout: 'mobile',
    name: "index",
    components: {
      carousel
    },
    data() {
      return {
        dataList: [
          {name: '测试1测试1测试1测试1测试1测试1测试1', icon: require('@/assets/mobile/profile/wode-icon-shequdangxiao.png')},
          {name: '测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试2', icon: require('@/assets/mobile/profile/wode-icon-zaixiankaosi.png')},
          {name: '测试2测试1测试1测试1测试1测试1测试1测试1测试1测试1测试2', icon: require('@/assets/mobile/profile/wode-icon-zaixiankaosi.png')},
          {name: '测试4测试1测试1测试1测试1测试1测试1测试1测试1测试1测试2', icon: require('@/assets/mobile/profile/wode-icon-zaixiankaosi.png')},
          {name: '测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3', icon: require('@/assets/mobile/profile/wode-icon-shiziku.png')}
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  img {
    width: 100%;
    height: 25vh;
    position: relative;
  }
  p {
    position: absolute;
    bottom: 0;
    width: 95%;
    font-weight: bold;
    line-height: 5vh;
    font-size: 2.2vh;
    color: #fff;
    padding-left: 2.5vw;
    padding-bottom: 2.5vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
