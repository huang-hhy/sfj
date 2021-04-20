<template>
  <div>
    <navHeader :title="title"></navHeader>
    <div class="box">
    <excellence></excellence>
    </div>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import excellence from "@/components/mobile/excellence/excellence";

  export default {
    name: "index",
    data() {
      return {
        title: '创先争优',
      }
    },
    components: {
      navHeader,
      excellence
    }
  }
</script>

<style scoped lang="less">
.box{
  margin-top: 7vh;
  background-color: #FFFFFF;
}
</style>
