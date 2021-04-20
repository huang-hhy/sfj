<template>
<div>
  <nav-header :title="title"></nav-header>
  <div class="box">
  <meeting-class></meeting-class>
  </div>
</div>
</template>

<script>
import NavHeader from "@/components/mobile/layout/nav-header";
import MeetingClass from "@/components/mobile/meeting/meeting-class";
export default {
name: "life",
  components: {MeetingClass, NavHeader},
  props: {
    title: {
      type: String,
      default: '组织生活'
    }
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 组织生活',
      meta: [
        {
          hid: this.$store.state.app.title,
          name: this.$store.state.app.title,
          content: this.$store.state.app.title
        }
      ]
    }
  }
}
</script>

<style scoped>
.box{
  margin-top: 7vh;
}

</style>
