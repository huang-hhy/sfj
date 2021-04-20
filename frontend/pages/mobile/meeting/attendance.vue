<template>
  <div>
    <navHeader :title="title"></navHeader>
    <meetingAttendance :signedType="signedType"></meetingAttendance>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import meetingAttendance from '@/components/mobile/meeting/meeting-attendance'

  export default {
    name: "attendance",
    head() {
      return {
        title: this.$store.state.app.title + '-会议详情',
        meta: [
          {
            hid: this.$store.state.app.title,
            name: this.$store.state.app.title,
            content: this.$store.state.app.title
          }
        ]
      }
    },
    data() {
      return {
        title: '会议详情',
        signedType: '1'
      }
    },
    components: {
      navHeader,
      meetingAttendance
    }
  }
</script>

<style scoped>

</style>
