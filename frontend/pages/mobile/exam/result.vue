<template>
  <div>
    <navHeader :title="title"></navHeader>
    <examResult></examResult>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import examResult from "@/components/mobile/exam/exam-result";

  export default {
    name: "result",
    data() {
      return {
        title: '在线考试',
      }
    },
    components: {
      navHeader,
      examResult
    }
  }
</script>

<style scoped>

</style>
