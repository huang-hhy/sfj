<template>
  <header class="header">
    <slot name="left"></slot>
    <span class="header_title"></span>
    <slot name="right"></slot>
  </header>
</template>

<script>
  export default {
    name: "header-top"
  }
</script>

<style scoped>

</style>
