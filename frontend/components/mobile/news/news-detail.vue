<template>
  <div>
    <div class="news_detail">
      <h2 class="title">{{item.articleTitle}}</h2>
      <div class="news_d_h">
        <div class="news_d_l">
          <span class="source">来源：{{item.orgName}}</span>
          <p class="time">发布时间：{{item.createTime}}</p>
          <p class="read">阅读量：{{item.browseNumber}}</p>
        </div>
        <div class="news_d_r">
          <img src="@/assets/mobile/news/right.png" alt="">
        </div>
      </div>
      <div class="detail" v-html="xssParse(item.articleInfo.content)"/>
    </div>
  </div>
</template>

<script>
  import {getArticle} from '@/api/pc'
  import {xssParse} from '@/utils/xss'
  export default {
    name: "news-detail",
    data() {
      return {
        test: `<p style="text-align: center" onclick='alert("xss攻击")'>链接</p><p>123</p>`,
        item: {
          articleInfo: {
            content: ''
          }
        }
      }
    },
    methods: {
      xssParse(html) {
        return xssParse(html)
      },
      getInfo(id) {
        getArticle(id).then(res => {
          if (res.code === 0) {
            res.data.createTime = this.$op.moment(res.data.createTime * 1000).format('YYYY-MM-DD')
            this.item = res.data
          }
        })
      }
    },
    mounted() {
      let {id} = this.$route.query
      this.getInfo(id)
    }
  }
</script>

<style scoped lang="less">
  .news_detail {
    margin-bottom: 8vh;
    margin-top: 7vh;
    padding: 2vw 5vw;

    .title {
      font-size: 2.6vh;
      margin-bottom: 2vw;
      line-height: 3.4vh;
      text-align: justify;
      // border: 1px solid #000;
    }

    .news_d_h {
      // border: 1px solid #000;
      overflow: auto;
      height: 8vh;
      line-height: 0;

      .news_d_l {
        float: left;
        // margin: auto 0;
        .source {
          // height: 3vh;
          border-top-right-radius: 1vw;
          border-bottom-right-radius: 1vw;
          font-size: 1.6vh !important;
          display: inline-block;
          padding: 2vw;
          background: #FE4141;
          color: #fff;
        }

        .time {
          font-size: 1.6vh !important;
          line-height: 2vh;
          margin: auto 0;
          height: 2.5vh;
        }

        .read {
          font-size: 1.6vh !important;
          line-height: 1vh;
          margin: auto 0;
          height: 2.5vh;
        }
      }

      .news_d_r {
        float: right;

        img {
          margin: auto 0;
          width: 28vw;
          height: 6vh;
        }

      }
    }

    .article_name {
      text-align: center;
      font-size: 1.8vh;
      line-height: 0vh;
      // border: 1px solid #000;
    }

    .article_time {
      text-align: center;
      font-size: 1.8vh;

      .time {
        margin-right: 2vw;
      }
    }

    .detail {

    }
  }

  @deep: ~'>>>';
  @{deep} h1 {
    font-size: 3vh;
    font-weight: bold;
    line-height: 4.8vh;
  }

  @{deep} h2 {
    font-size: 2.6vh;
    font-weight: bold;
    line-height: 4vh;
  }

  @{deep} h3 {
    font-size: 2.2vh;
    font-weight: bold;
    line-height: 3.6vh;
  }

  @{deep} h4 {
    font-size: 2vh;
    font-weight: bold;
    line-height: 3.2vh;
  }

  @{deep} h5 {
    font-size: 1.8vh;
    font-weight: bold;
  }

  @{deep} h6 {
    font-size: 1.6vh;
    font-weight: bold;
  }

  @{deep} p {
    font-size: 2vh;
    line-height: 3.2vh;
    padding: .3vh 0;
    text-align: justify;
  }

  @{deep} img {
    width: 98%;
    margin: 2vw auto;
  }

  @{deep} blockquote {
    width: 98%;
    margin: 1vw auto;
    padding: 1vw 0;
    border-left: 1.5vw solid #D0E5F2;
    background: #F1F1F1;
  }

  @{deep} table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #999;
    width: 98%;
    margin: 2vw auto;
    border-collapse: collapse;
    table-layout: fixed;
    overflow-x: scroll;

    @{deep} th {
      border: 1px solid #999;
      background: #f1f1f1;
    }

    @{deep} td {
      background: #fff;
      border: 1px solid #999;
    }
  }

  @{deep} div {
    font-size: 2vh;
  }
</style>
