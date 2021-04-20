<template>
  <div>
    <navHeader :title="title"></navHeader>
    <meetingSummary/>
  </div>
</template>

<script>

  import navHeader from '@/components/mobile/layout/nav-header'
  import meetingSummary from "@/components/mobile/meeting/meeting-summary";

  export default {
    data() {
      return {
        title: '会议纪要',
      }
    },
    components: {
      navHeader,
      meetingSummary
    }
  }
</script>

<style scoped lang="less">

</style>
