<template>
  <div>
    <navHeader :title="title"></navHeader>
    <div class="box">
    <rankingList></rankingList>
    </div>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import rankingList from '@/components/mobile/excellence/ranking-list'

  export default {
    name: "ranking",
    data() {
      return {
        title: '个人排行榜',
      }
    },
    components: {
      navHeader,
      rankingList
    }
  }
</script>

<style scoped lang="less">
.box{
  margin-top: 7vh;
  background-color: #FFFFFF;
}
</style>
