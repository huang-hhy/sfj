<template>
  <div>
    <navHeader :title="title"></navHeader>
    <van-tabs v-model="active" class="content">
      <van-tab title="未审核">
        未审核
      </van-tab>
      <van-tab title="已审核">
        已审核内容
      </van-tab>
    </van-tabs>
    <button class="apply" @click="apply">点击申请</button>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'

  export default {
    name: "relationship-transfer-list",
    data() {
      return {
        active: 0,
        title: '组织关系转接',
        activeIndex: 0,
        headList: [
          {name: '未审核'},
          {name: '已审核'}
        ]
      }
    },
    methods: {
      apply() {
        this.$router.push({path: '/mobile/profile/relationship-transfer-apply'})
      }
    },
    components: {
      navHeader
    },
  }
</script>

<style scoped lang="less">
  .content {
    margin: 7vh 0;
  }

  .apply {
    width: 100%;
    background: #E43D3D;
    color: #FFFFFF;
    text-align: center;
    height: 6vh;
    line-height: 6vh;
    font-size: 2.2vh;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
