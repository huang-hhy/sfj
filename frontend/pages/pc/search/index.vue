<template>
  <div class="seek">
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title"/>
    <Search/>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import Search from "@/components/pc/search/search";
  import {mapActions} from 'vuex'

  export default {
    name: "search",
    components: {
      NavBar,
      Search
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 新闻搜索',
        meta: [
          {
            hid: this.$store.state.app.title,
            name: this.$store.state.app.title,
            content: this.$store.state.app.title
          }
        ]
      }
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      })
    },
    mounted() {
      this.setBaseInfo()
    },
    asyncData(context) {
      if (process.server) {
        // let baseUrl = `http://` + context.req.headers.host
        // return context.$axios({
        //   method: 'get',
        //   url: baseUrl + '/api/home/index/system'
        // }).then(function (res) {
        //   let {code, data} = res.data
        //   if (code === 0) {
        //     context.store.dispatch('app/setApp', {title: data.supplier.supplierName})
        //   }
        // })
      }
    }
  }
</script>

<style scoped>

</style>
