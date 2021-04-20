<template>
  <div>
    <div class="header-main">
      <nav-header :title="title"></nav-header>
    </div>
    <start-survey></start-survey>
  </div>
</template>

<script>
import NavHeader from "@/components/mobile/layout/nav-header";
import StartSurvey from "@/components/mobile/exam/start-survey";
export default {
name: "surveyDetail",
  components: {StartSurvey, NavHeader},
  props: {
    title: {
      type: String,
      default: '问卷调查'
    }
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 问卷调查',
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
