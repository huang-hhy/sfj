<template>
  <div>
    <navHeader :title="title"></navHeader>
    <meetingAppointment/>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import meetingAppointment from "@/components/mobile/meeting/meeting-appointment";

  export default {
    name: "appointment",
    data() {
      return {
        title: '预约会议',
      }
    },
    components: {
      navHeader,
      meetingAppointment
    }
  }
</script>

<style scoped>

</style>
