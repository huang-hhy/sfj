<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <Home :channels="channels" :orgs="orgs" :notice="notice" :slide="slide"/>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import Home from '@/components/pc/home/home.vue'
  // import Footer from '@/components/layout-pc/footer.vue'
  import {getHomeData} from '@/api/pc'
  import {getNoticeList} from '@/api/common'
  import {mapActions} from 'vuex'

  export default {
    components: {
      NavBar,
      Home
      // Footer
    },
    data: () => {
      return {
        channels: [],
        orgs: [],
        title: '',
        menu: [],
        notice: [],
        slide: [],
        homeData: {}
      }
    },
    watch: {
      homeData: {
        handler(val) {
          if(val) {
            this.channels = val.channels
            this.orgs = val.orgs
            this.notice = val.noticeList
            this.slide = val.studyCourses
          }
        },
        deep: true
      }
    },
    head() {
      return {
        title: this.$store.state.app.title,
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
      getHomeData().then(res => {
      // console.log(res)
        if (res.code === 0) {
          this.homeData = res.data
          // console.log(JSON.stringify(this.homeData))
        }
      })
    },
    fetch({store, params}) {
      // console.log(store.req)
      // return
      // let baseUrl = `http://` +store.req.headers.host
      // return store.$axios({
      //   method: 'get',
      //   url: baseUrl + '/api/base/supplier/getSupplierInfo'
      // }).then(function (res) {
      //   console.log(res)
      //   store.commit('app/setApp', res.data)
      // })
    },
    asyncData(context) {
      // console.log(context.req._parsedOriginalUrl)
      // $axios.get(`/base/supplier/getSupplierInfo`).then(res =>{
      //   console.log(res)
      // })
      if (process.server) {
        let baseUrl = `http://` + context.req.headers.host
        console.log(baseUrl)
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
