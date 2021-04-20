<template>
  <div>
   <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title"/>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
    import {mapActions} from 'vuex'
    
  export default{
    name:"demo",
    components:{
      NavBar
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      })
    },
    mounted() {
      this.setBaseInfo()
    },
  }
</script>

<style>
</style>
