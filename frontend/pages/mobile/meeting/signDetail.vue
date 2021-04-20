<template>
  <div>
    <navHeader :title="title"></navHeader>
    <attendanceDetail></attendanceDetail>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import attendanceDetail from "@/components/mobile/meeting/attendance-detail";

  export default {
    name: "signDetail",
    data() {
      return {
        title: '签到详情',
      }
    },
    components: {
      navHeader,
      attendanceDetail
    }
  }
</script>

<style scoped lang="less">
</style>
