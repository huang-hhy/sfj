<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <main-header :content="content" style="margin: 20px 0" />
      <el-container>
        <el-aside>
          <div class="title">
            <i class="el-icon-location-information" style="font-size: 22px; margin-right: 10px; font-weight: bold" />
            <span>在线学习</span>
          </div>
          <div v-for="item in typeList" :key="item.id" :class="typeId === item.id ? 'activityType' : 'type'" @click="changeTypeId(item.id)">
            <span>{{ item.typeName }}</span>
          </div>
        </el-aside>
        <el-main>
          <div class="studyList" v-for="(item, index) in list" :key="index">
            <div class="el-card" @click="handleLook(item.id)">
              <img :src="attachUrl + item.imgUrl">
              <p class="title" v-if="item.title.length < 8">{{ item.title }}</p>
              <p class="title" v-else>
                <span v-for="(item2, index2) in item.title" :key="index2" v-if="index2 < 8">{{ item2 }}</span>
                <span>……</span>
              </p>
              <p class="compulsory">
                <el-tag v-if="item.compulsory * 1 === 0" type="success">必 修</el-tag>
                <el-tag v-else type="warning">选 修</el-tag>
              </p>
              <p class="item">组织名称： {{ item.orgName }}</p>
              <p class="item">学习人数： {{ item.userStudyNum }}</p>
              <p class="item">支部学习数： {{ item.orgStudyNum }}</p>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>
<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import { getStudyType, getStudyList } from '@/api/pc'
  import config from '@/config'
  import mainHeader from "../../../../components/pc/common/mainHeader";
  import {encrypt} from "../../../../libs/tools";

  export default {
    name: "index",
    components: {
      mainHeader,
      NavBar
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 在线学习',
      }
    },
    data() {
      return {
        list: [],
        typeList: [],
        typeId: '742412555544166400',
        attachUrl: config.attachUrl,
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '专题学习'
        }
      }
    },
    mounted() {
      this.setBaseInfo()
      this.getList()
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      getList() {
        const data = {
          studyTypeId: this.typeId
        }
        getStudyList(data).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data.list
          }
        })
        getStudyType({}).then(res => {
          if (res.code * 1 === 0) {
            this.typeList = res.data
          }
        })
      },
      changeTypeId(id) {
        this.typeId = id
        this.getList()
      },
      handleLook(id) {
        let params = {
          id: id
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: '/pc/profile/course/detail',
          query: {
            name: '个人中心',
            params: params
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    width: 1050px;
    margin: 20px auto;

    .el-container {
      margin: 30px 0;
      ::v-deep .el-aside {
        margin: 20px 0;
        width: 200px !important;
        .title {
          line-height: 60px;
          font-size: 18px;
          padding-left: 20px;
          cursor: pointer;
          border: #e3e0e0 1px solid;
          color: #d33a31;
          font-weight: bold;
        }

        .activityType, .type:hover {
          background-color: #eeeeee;
          font-size: 16px;
          padding-left: 20px;
          line-height: 50px;
          color: #d33a31;
          border-bottom: #e3e0e0 1px solid;
          border-left: #e3e0e0 1px solid;
          border-right: #e3e0e0 1px solid;
        }

        .type {
          line-height: 50px;
          font-size: 16px;
          color: #1a1a1a;
          padding-left: 20px;
          cursor: pointer;
          border-bottom: #e3e0e0 1px solid;
          border-left: #e3e0e0 1px solid;
          border-right: #e3e0e0 1px solid;
        }
      }

      .el-main {
        overflow: hidden;
        .studyList {
          float: left;

          .el-card {
            padding: 20px;
            width: 240px;
            margin: 0 15px 20px 0;
            cursor: pointer;
            text-align: center;

            img {
              width: 80px;
              height: 80px;
            }

            .title {
              font-size: 16px;
              font-weight: bold;
              margin: 15px 0;
            }

            .item {
              margin: 10px 0;
            }
          }

          .el-card:hover {
            box-shadow: #d0d3d5 2px 2px;
          }
        }
      }
    }
  }
</style>
