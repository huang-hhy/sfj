<template>
  <div>
    <navHeader :title="title"></navHeader>
    <examAnalysis></examAnalysis>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import examAnalysis from '@/components/mobile/exam/exam-analysis'

  export default {
    name: "analysis",
    data() {
      return {
        title: '试题解析'
      }
    },
    components: {
      navHeader,
      examAnalysis
    }
  }
</script>

<style scoped>

</style>
