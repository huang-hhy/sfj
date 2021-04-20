<template>
  <div>
<div class="header-main">
  <navHeader :title="title"></navHeader>
</div>
    <NoticeList></NoticeList>
  </div>
</template>

<script>

import NavHeader from "@/components/mobile/layout/nav-header";
import NoticeList from "@/components/mobile/notice/notice-list";
export default {

  name: "notice-list",
  components: {NavHeader,NoticeList},
  props: {
    title: {
      type: String,
      default: '通知公告'
    }
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 通知公告',
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

<style scoped lang="less">
.header-main {
  width: 100%;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 5vw;
  background-color: #F44436;
  position: relative;
}

</style>
