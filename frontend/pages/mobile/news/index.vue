<template>
  <div class="container">
    <news></news>
  </div>
</template>

<script>
  import news from '@/components/mobile/news/news'
  import newsDetail from '@/components/mobile/news/news-detail'
  import {mapActions} from 'vuex'
  export default {
    name: "index",
    components: {
      news,
      newsDetail
    },
    head() {
      return {
        title: this.$store.state.app.title + '- 新闻',
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
