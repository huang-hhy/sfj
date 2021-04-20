<template>
  <div>
    <navHeader :title="title"></navHeader>
    <meetingClass/>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import meetingClass from "@/components/mobile/meeting/meeting-class";

  export default {
    name: "class",
    data() {
      return {
        title: '三会一课',
      }
    },
    components: {
      navHeader,
      meetingClass
    }
  }
</script>

<style scoped>

</style>
