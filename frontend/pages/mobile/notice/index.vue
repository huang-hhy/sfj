<template>
  <div>
    <navHeader :title="title"></navHeader>
    <noticeList></noticeList>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import noticeList from '@/components/mobile/notice/notice-list'

  export default {
    name: "index",
    data() {
      return {
        title: '通知列表',
      }
    },
    components: {
      navHeader,
      noticeList
    }
  }
</script>

<style scoped>

</style>
