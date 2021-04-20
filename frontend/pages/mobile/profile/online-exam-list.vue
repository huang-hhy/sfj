<template>
  <div>
    <navHeader :title="title"></navHeader>
    <van-tabs v-model="active" class="content">
      <van-tab title="未考">
        未考
      </van-tab>
      <van-tab title="已考">
        已考
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'

  export default {
    name: "online-exam-list",
    data() {
      return {
        title: '在线考试',
        active: 0,
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
