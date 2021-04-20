<template>
  <div>
    <navHeader :title="title"></navHeader>
    <van-tabs v-model="active" class="content">
      <van-tab title="未开始">
        未开始
      </van-tab>
      <van-tab title="进行中">
        进行中
      </van-tab>
      <van-tab title="已结束">
        已结束
      </van-tab>
      <van-tab title="已存档">
        已存档
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'

  export default {
    name: "party-org-life",
    data() {
      return {
        title: this.$route.query.name,
        active: 0
      }
    },
    components: {
      navHeader
    },
  }
</script>

<style scoped lang="less">
  .content{
    margin: 7vh 0;
  }
</style>
