<template>
  <div class="grids">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: "grid",
  }
</script>

<style scoped>
.grids{
  width: 100%;
  position: relative;
  overflow: hidden;
}
.grids::after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid #eaeef1;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>
