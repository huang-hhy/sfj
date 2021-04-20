<template>
  <div class="container">
    <el-carousel trigger="click" height="48vw" style="width: 100vw">
      <el-carousel-item v-for="(item,index) in swiperList" :key="index">
        <img :src="item.showImg" class="banner"/>
      </el-carousel-item>
    </el-carousel>
    <apps-group :menu="menuList" :notice="notice"/>
    <div class="news_list">
      <news-list :newsList="newsList"/>
    </div>
  </div>
</template>
<script>
  import AppsGroup from '@/components/mobile/home/apps-group'
  import newsList from '@/components/mobile/home/news-list'
  import {getHomeData} from '@/api/mobile'
  import config from '@/config'
  import {mapActions} from 'vuex'
  import NavHeader from "@/components/mobile/layout/nav-header"

  export default {
    layout: 'mobile',
    components: {
      NavHeader,
      AppsGroup,
      newsList
    },
    data() {
      return {
        swiperList: [],
        menuList: [],
        newsList: {
          title: '最新要闻',
          list: []
        },
        number: 0,
        notice: []
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
        if (res.code === 0) {
          let swiperList = res.data.rotationImgList
          this.notice = res.data.noticeList
          this.swiperList = swiperList.reduce((res,current)=>{
            current.showImg = config.attachUrl + current.showImg
            res.push(current)
            return res
          },[])
          let menuList = res.data.menus ? JSON.parse(JSON.stringify(res.data.menus)) : []

          this.menuList = menuList.reduce((res,current)=>{
            current.smallIcon = current.smallIcon ? config.attachUrl + current.smallIcon : ''
            current.path = '/mobile/news'
            res.push(current)
            return res
          },[])
          this.newsList.list = res.data.articleList
        }
      })
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
  .banner {
    width: 100%;
    height: 100%;
  }

  .news_list {
    padding: 5vw 5vw 2vw 5vw;
    background-color: #ffffff;
  }
</style>
