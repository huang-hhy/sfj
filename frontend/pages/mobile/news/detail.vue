<template>
  <div class="container">
    <navHeader :title="title"></navHeader>
    <newsDetail></newsDetail>
<!--    <comment></comment>-->
<!--    <reply></reply>-->
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import newsDetail from '@/components/mobile/news/news-detail'
  import comment from '@/components/mobile/reply/comment'
  import reply from '@/components/mobile/reply/reply'
  import {mapActions} from 'vuex'

  export default {
    name: "detail",
    data() {
      return {
        title: '文章详情'
      }
    },
    components: {
      navHeader,
      newsDetail,
      comment,
      reply
    },
    head() {
      return {
        title: this.$store.state.app.title + '- 新闻详细',
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
