<template>
  <div>
    <navHeader :title="title"></navHeader>
    <personalSetting></personalSetting>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import personalSetting from '@/components/mobile/profile/personal-setting'
  export default {
    name: "setting",
    data() {
      return {
        title: '设置',
      }
    },
    head() {
      return {
        title: this.$store.state.app.title + '- 设置',
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
      personalSetting
    }
  }
</script>

<style scoped>

</style>
