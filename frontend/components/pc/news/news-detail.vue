<template>
  <div class="news_detail">
    <div class="ar_left">
      <newsContent :item="item"></newsContent>
    </div>
    <div class="ar_right">
      <h2>热门文章推荐</h2>
      <ul class="arr_list">
        <li class="arr_li" v-for="(item,index) in hot" :key="index" @click="goto(item.id)">
          <p :class="{order:true,order_f:index==0,order_s:index==1,order_t:index==2}">{{index+1}}</p>
          <p class="title">{{item.articleTitle}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import newsContent from '@/components/pc/news/news-content.vue'
  import {getArticle, getHotArticle} from '@/api/pc'

  export default {
    name: "news-detail",
    components: {
      newsContent
    },
    data() {
      return {
        item: {
          articleInfo: {
            content: ''
          }
        },
        hot: []
      }
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 新闻详细',
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
      getHot() {
        getHotArticle().then(res => {
          if (res.code === 0) {
            this.hot = res.data
          }
        })
      },
      getInfo(id) {
        getArticle(id).then(res => {
          if (res.code === 0) {
            res.data.createTime = this.$op.moment(res.data.createTime * 1000).format('YYYY-MM-DD')
            this.item = res.data
          }
        })
      },
      goto(id) {
        this.$router.push({path: '/pc/news/detail', query: {id: id, name: this.$route.query.name}})
        this.getInfo(id)
        this.getHot()
      }
    },
    mounted() {
      let {id} = this.$route.query
      this.getInfo(id)
      this.getHot()
    }
  }
</script>

<style scoped lang="less">
  .news_detail {
    display: flex;
    width: 1000px;
    margin: 0 auto;
    padding: 30px 0;

    .ar_left {
      width: 72%;
    }

    .ar_right {
      width: 28%;
      margin-top: 5px;

      h2 {
        color: red;
        font-size: 24px;
        font-weight: 500;
        line-height: 1.1;
        padding-bottom: 10px;
        border-bottom: 1px dotted #b0abab;
      }

      .arr_list {
        padding: 10px 0;

        .arr_li {
          display: flex;
          margin-bottom: 5px;
          padding-right: 5px;
          cursor: pointer;

          .order {
            background: #b6b0ac;
            color: #fff;
            width: 25px;
            min-width: 25px;
            height: 20px;
            line-height: 20px;
            overflow: hidden;
            text-align: center;
            vertical-align: super;
            margin: auto 0;
          }

          .order_f {
            background: #F72F56;
            font-style: italic;
          }

          .order_s {
            background: #FC7648;
            font-style: italic;
          }

          .order_t {
            background: #FF9D1E;
            font-style: italic;
          }

          .title {
            line-height: 30px;
            text-indent: 8px;
            font-size: 13px;
            color: #2f4050;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
