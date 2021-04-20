<template>
  <div class="container">
    <navHeader :title="title" class="pro_header"></navHeader>
    <profile></profile>
    <navFooter></navFooter>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import profile from '@/components/mobile/profile/profile'
  import navFooter from '@/components/mobile/layout/nav-footer'
  import {mapActions} from 'vuex'
  export default {
    layout: 'mobile',
    name: "index",
    data() {
      return {
        title: '个人中心',
      }
    },
    components: {
      navHeader,
      profile,
      navFooter
    },
    head() {
      return {
        title: this.$store.state.app.title + '- 个人中心',
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
        setBaseInfo: 'app/setBaseInfo',
        setUserCenter: 'user/setUserCenter'
      })
    },
    mounted() {
      this.setBaseInfo()
      this.setUserCenter()
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

<style scoped lang="less">


</style>
