<template>
  <div>
    <navHeader :title="title"></navHeader>
    <noticeDetail></noticeDetail>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import noticeDetail from "@/components/mobile/notice/notice-detail";

  export default {
    name: "detail",
    data() {
      return {
        title: '通知公告',
      }
    },
    components: {
      navHeader,
      noticeDetail
    }
  }
</script>

<style scoped>

</style>
