<template>
  <div class="news">
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo" />
    <div class="news_container">
      <div class="pbc_head">
        <svg-icon icon-class="position" />
        <span class="bold">当前位置：</span>
        <span class="bold head_name">
          <nuxt-link to="/pc/home">首页></nuxt-link>
        </span>
        <span class="bold head_name" @click="selectMenu(-1,$route.query.id)">{{ title }}</span>
      </div>
      <div class="pbc_body">
        <ul class="pbc_bl_list" v-if="menu.children">
          <li v-for="(item,index) in menu.children" :key="index" @click="selectMenu(index,item.id)" :class="{pbc_bl_li:true,active:status===index}">
            {{item.label}}
          </li>
        </ul>
        <div class="pbc_br_list">
          <el-table id="table" :data="list" :show-header="false" style="width:1000px">
            <el-table-column>
              <template slot-scope="scope">
                <div class="pbc_br_li" @click="goto(scope.row.id)">
                  <img src="~assets/image/point.png" alt />
                  <p class="name">{{scope.row.articleTitle}}</p>
                  <p class="time">{{$op.moment(scope.row.createTime*1000).format('YYYY-MM-DD')}}</p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="content_page">
        <el-pagination :current-page.sync="page.pageNum" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="page.total" />
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {
    mapActions
  } from 'vuex'
  import Pagination from "@/components/pc/pagination"
  import {
    getChannels,
    getArticleList
  } from '@/api/pc'
  import {
    decrypt,
    encrypt
  } from "../../../libs/tools";

  export default {
    name: "news",
    data() {
      return {
        menu: [],
        title: '',
        status: -1,
        list: [],
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        }
      };
    },
    components: {
      NavBar,
      Pagination
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 新闻',
        meta: [{
          hid: this.$store.state.app.title,
          name: this.$store.state.app.title,
          content: this.$store.state.app.title
        }]
      }
    },
    watch: {
      $route: {
        handler(val) {
          this.title = this.$route.query.name
          this.page.pageNum = 1
          this.status = -1
          let {
            id
          } = JSON.parse(decrypt(val.query.params))
          this.getList(id)
          this.getLeftMenu(id)
        },
        deep: true
      }
    },
    mounted() {
      this.setBaseInfo()
      this.setUserCenter()
      this.getData(this.$route.query.params)
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo',
        setUserCenter: 'user/setUserCenter'
      }),
      getData(data) {
        data = JSON.parse(decrypt(data))
        this.title = this.$route.query.name
        let {
          id
        } = data
        this.getList(id)
        this.getLeftMenu(id)
      },
      getLeftMenu(id) {
        getChannels(id).then(res => {
          if (res.code === 0) {
            // console.log(res)
            this.menu = res.data[0]
          }
        })
      },
      getList(id) {
        let where = {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum
        }
        const data = {
          articleChannelId: id
        }
        getArticleList(where, data).then(res => {
          if (res.code === 0) {
            this.list = res.data.list
            this.page.total = res.data.total * 1
          }
        })
      },
      selectMenu(index, id) {
        this.status = index
        this.page.currentPage = 1
        this.getList(id)
      },
      goto(id) {
        let params = {
          id
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: "/pc/news/detail",
          query: {
            params: params,
            name: this.$route.query.name
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .news_container {
    width: 1000px;
    margin: 15px auto;
    background: #ffffff;

    .pbc_head {
      overflow: auto;
      display: flex;
      width: 100%;
      height: 35px;
      line-height: 35px;
      margin-bottom: 10px;

      svg {
        width: 20px;
        height: 20px;
        padding: 2px;
        margin: auto 0;
      }

      .bold {
        font-weight: bold;
      }

      .head_name:hover {
        color: #E4393C;
      }

      span {
        font-size: 16px;
        text-align: center;
        margin-right: 5px;
      }
    }

    .pbc_body {
      overflow: auto;
      background: #ffffff;
      display: flex;

      .pbc_bl_list {
        display: inline-block;
        border-top: 1px solid #E4393C;
        margin-right: 1%;
        width: 19%;

        .pbc_bl_li {
          color: #333333;
          cursor: pointer;
          width: 100%;
          text-align: center;
          font-size: 16px;
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #E0E0E0;
          border-left: 1px solid #E0E0E0;
          border-right: 1px solid #E0E0E0;
        }

        .pbc_bl_li:hover {
          text-decoration: underline;
        }

        .active {
          color: #E4393C;
        }
      }

      .pbc_br_list {
        /*width: 80%;*/
        border-top: 1px solid #E4393C;
        border-bottom: 1px solid #E0E0E0;
        border-left: 1px solid #E0E0E0;
        border-right: 1px solid #E0E0E0;
        overflow: hidden;

        .pbc_br_li {
          display: flex;
          width: 100%;
          cursor: pointer;
          font-size: 14px;
          padding: 10px 0;
          border-bottom: 1px solid #E0E0E0;

          img {
            width: 20px;
            height: 20px;
            margin: auto 0;
          }

          .name {
            width: calc(100% - 120px);
            float: left;
            padding-right: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .time {
            width: 100px;
            float: right;
          }
        }

        .pbc_br_li:hover {
          color: #E4393C;
        }
      }
    }

    .content_page {
      float: right;
      margin-top: 20px;
    }

    .el-table--enable-row-hover .el-table__body tr:hover>td {
      background-color: #ffffff;
    }

    .el-table__row>td {
      border: none;
    }

    .el-table::before {
      //去掉最下面的那一条线
      height: 0px;
    }

    .el-table__body tr,
    .el-table__body td {
      padding: 0;
    }
  }
</style>
