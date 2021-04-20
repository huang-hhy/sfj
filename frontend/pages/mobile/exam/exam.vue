<template>
  <div>
    <navHeader :title="title"></navHeader>
    <startExam></startExam>
  </div>

</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import startExam from '@/components/mobile/exam/start-exam'

  export default {
    name: "exam",
    data() {
      return {
        title: '在线考试'
      }
    },
    components: {
      navHeader,
      startExam
    }
  }
</script>

<style scoped>

</style>
