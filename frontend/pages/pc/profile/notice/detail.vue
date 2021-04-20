<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <div class="main_body">
      <mainHeader :content="content" style="margin: 50px 0"/>
      <div class="content">
        <div class="header">
          <h1 class="header_title">{{list.title}}</h1>
          <div class="header_message">
            <span>发布组织：{{list.orgName}}</span>
            <span>接收组织：{{list.receiveOrgNames}}</span>
            <span>更新时间：{{moment(list.updateTime * 1000).format('YYYY-MM-DD HH:mm:sss')}}</span>
          </div>
        </div>
        <div class="notices_content">
          {{list.content}}
        </div>
        <div class="footer">
          <div class="footer_message">
            <p>公告创建时间：{{moment(list.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}}</p>
            <p>公告更新时间：{{moment(list.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')}}</p>
            <p>发布公告组织：{{list.orgName}}</p>
            <p>接收公告组织：{{list.receiveOrgNames}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import {getAffiche} from '@/api/pc'
  import moment from 'moment'
  import mainHeader from "../../../../components/pc/common/mainHeader";
  import {decrypt} from "../../../../libs/tools";

  export default {
    name: "detail",
    components: {
      mainHeader,
      NavBar
    },
    data() {
      return {
        moment: moment,
        list: [],
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '通知公告',
          path: '/pc/profile/notice',
          topic: ''
        }
      }
    },
    mounted() {
      this.setBaseInfo()
      this.getData(this.$route.query.params)
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      getData(data) {
        data = JSON.parse(decrypt(data))
        this.getList(data.id)
      },
      getList(id) {
        getAffiche(id).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data
            this.content.topic = this.list.title
          }
        })
      }
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 公告详情',
      }
    }
  }
</script>

<style scoped lang="less">
  .main_body {
    width: 1000px;
    margin: auto;

    /*.header {*/
    /*  font-size: 16px;*/
    /*  margin: 50px auto;*/

    /*  span {*/
    /*    margin-right: 10px;*/
    /*  }*/

    /*  .profile, .notice, .item {*/
    /*    color: #1a1a1a;*/
    /*    cursor: pointer;*/
    /*  }*/

    /*  .profile:hover, .notice:hover {*/
    /*    color: #2d8cf0;*/
    /*  }*/
    /*}*/

    .content {
      .header {
        width: 100%;

        .header_title {
          text-align: center;
          font-size: 24px;
          line-height: 50px;
          font-weight: bold;
          color: #211c1c;
        }

        .header_message {
          margin: auto;
          text-align: center;

          span {
            display: inline-block;
            margin-right: 20px;
            font-size: 12px;
            line-height: 30px;
          }
        }
      }

      .notices_content {
        margin: 20px auto;
        font-size: 18px;
        color: #211c1c;
        line-height: 30px;
        padding-bottom: 20px;
        border-bottom: #a1a1a1 1px dashed;
        text-indent: 2em;
      }

      .footer {
        .footer_message {
          p {
            font-size: 12px;
            line-height: 30px;
          }
        }
      }
    }
  }
</style>
