<template>
  <div>
    <grid>
      <gridItem :cell="4" :backgroundColor="'#ffffff'" v-for="(item,index) in dataList" :key="index">
        <img src="@/assets/mobile/profile/wode-icon-shequdangxiao.png" alt="">
        <p>{{item.name}}</p>
      </gridItem>
    </grid>
  </div>
</template>

<script>
  import grid from '@/components/common/grid/grid'
  import gridItem from '@/components/common/grid/grid-item'
  export default {
    layout: 'mobile',
    name: "index",
    components:{
      grid,
      gridItem
    },
    data(){
      return{
        dataList: [{
          icon: "people",
          name: "我审批的",
          size: 28,
          color: '#FFFFFF'
        }, {
          icon: "feedback",
          name: "我发起的",
          size: 28,
          color: '#FFFFFF'
        }, {
          icon: "send",
          name: '抄送我的',
          size: 28,
          color: '#FFFFFF'
        },{
          icon: "people",
          name: "我审批的",
          size: 28,
          color: '#FFFFFF'
        }, {
          icon: "feedback",
          name: "我发起的",
          size: 28,
          color: '#FFFFFF'
        }, {
          icon: "send",
          name: '抄送我的',
          size: 28,
          color: '#FFFFFF'
        }, {
          icon: "feedback",
          name: "我发起的",
          size: 28,
          color: '#FFFFFF'
        }, {
          icon: "send",
          name: '抄送我的',
          size: 28,
          color: '#FFFFFF'
        }],
      }
    }
  }
</script>

<style scoped>
  img{
    display: block;
    width: 8vw;
    height: 8vw;
    margin: 0 auto;
    text-align: center;
    vertical-align: middle;
  }
  p{
    display: block;
    text-align: center;
    font-weight: 400;
    color: #000000;
    font-size: 2vh;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 1vw;
  }
</style>
