<template>
  <div>
    <navHeader :title="title"></navHeader>
    <div class="box">
    <integralDetail></integralDetail>
    </div>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import integralDetail from '@/components/mobile/excellence/integral-detail'

  export default {
    name: "detail",
    data() {
      return {
        title: '积分明细',
      }
    },
    components: {
      navHeader,
      integralDetail
    }
  }
</script>

<style scoped lang="less">
.box{
  margin-top: 7vh;
  background-color: #FFFFFF;
}

</style>
