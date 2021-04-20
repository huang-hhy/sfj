<template>
  <div class="meeting-info">
    <infoList :info="info"></infoList>
  </div>
</template>

<script>
  import infoList from "@/components/mobile/meeting/info-list";

  export default {
    name: "meeting-info",
    props: {
      info: {
        type: Array
      }
    },
    components: {
      infoList
    }
  }
</script>

<style scoped lang="less">
  .meeting-info {
    background-size: cover;
    background-attachment: fixed;
    background-image: url('~assets/mobile/meeting/info-background.png');
  }
</style>
