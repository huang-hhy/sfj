<template>
  <div>
    <navHeader :title="title"></navHeader>
    <div class="box"></div>
    <onlineExam></onlineExam>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import onlineExam from '@/components/mobile/exam/online-exam'

  export default {
    name: "index",
    data() {
      return {
        title: '在线考试',
      }
    },
    head() {
      return {
        title: this.$store.state.app.title + '- 在线考试',
        meta: [
          {
            hid: this.$store.state.app.title,
            name: this.$store.state.app.title,
            content: this.$store.state.app.title
          }
        ]
      }
    },
    components: {
      navHeader,
      onlineExam
    }
  }
</script>

<style scoped lang="less">
.box{
  margin-top: 7vh;
}
</style>
