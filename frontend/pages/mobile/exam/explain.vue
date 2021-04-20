<template>
  <div>
    <navHeader :title="title"></navHeader>
    <examExplain></examExplain>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import examExplain from '@/components/mobile/exam/exam-explain'

  export default {
    name: "explain",
    data() {
      return {
        title: '在线考试',
      }
    },
    components: {
      navHeader,
      examExplain
    }
  }
</script>

<style scoped>

</style>
