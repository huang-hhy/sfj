<template>
<div>
  <nav-header :title="title"></nav-header>
</div>
</template>

<script>
import NavHeader from "@/components/mobile/layout/nav-header";
export default {
name: "inter-detail",
  components: {NavHeader},
  props: {
    title: {
      type: String,
      default: '互动详情'
    }
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 互动详情',
      meta: [
        {
          hid: this.$store.state.app.title,
          name: this.$store.state.app.title,
          content: this.$store.state.app.title
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>
