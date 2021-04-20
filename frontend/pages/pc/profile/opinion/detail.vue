<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <main-header :content="content" />
      <div class="article">
        <h1 class="title">{{ list.title }}</h1>
        <div class="item">
          <span>征集组织： {{ list.orgName }}</span>
          <span>发布时间： {{ moment(list.publicTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </div>
        <div class="article_content" v-html="list.content"></div>
      </div>
      <el-card class="comment">
        <div style="overflow: hidden">
          <el-row>
            <el-col :span="2">
              <span style="line-height: 30px; font-size: 16px">上传附件</span>
            </el-col>
            <el-col :span="22">
              <el-upload
                :action="uploadPath"
                list-type="picture-card"
                :http-request="handleUpload"
                class="uploadImg"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </el-col>
          </el-row>
          <el-row style="margin: 20px 0">
            <el-col :span="2">
              <span>评论内容</span>
            </el-col>
            <el-col :span="22">
              <el-input v-model="comment.content" placeholder="有想法？发表出来" type="textarea" :rows="5" />
            </el-col>
          </el-row>
          <el-button round type="success" size="small" style="float: right; padding: 8px 20px; margin-bottom: 10px;"  @click="submit">发表</el-button>
        </div>
        <div v-for="(item, index) in list.solicitOpinionsRepositoryList" :key="index" class="container">
          <p class="user">用户{{ item.userId }}</p>
          <p class="indent commentContent">{{ item.content }}</p>
          <p class="indent" v-for="(i, ind) in item.uploadUrl" :key="ind">
            <a :href="downloadUrl + '?name=' + i">{{ i }}</a>
          </p>
          <p class="indent time">{{ moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
  import NavBar from "../../../../components/layout-pc/common/nav-bar";
  import {mapActions} from 'vuex'
  import { getSolicitOpinionDetail, uploadFile, saveSolicitOpinions } from '@/api/pc'
  import moment from 'moment'
  import config from '@/config'
  import mainHeader from "../../../../components/pc/common/mainHeader";

  export default {
    name: "detail",
    components: {
      mainHeader,
      NavBar
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 意见征集详情',
      }
    },
    data() {
      return {
        list: {},
        id: '',
        moment: moment,
        comment: {
          url: []
        },
        commentRules: {},
        activityTab: 'first',
        uploadPath: '/api/common/upload',
        downloadUrl: '/api/common/download/resource',
        attachUrl: config.attachUrl,
        functionType: '',
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: '',
          path: '/pc/profile/opinion',
          topic: '',
          type: ''
        }
      }
    },
    mounted() {
      this.setBaseInfo()
      this.id = this.$route.query.id
      this.functionType = this.$route.query.functionType
      this.content.title = this.$route.query.functionType * 1 === 0 ? '意见征集' : '党员互动'
      this.content.type = this.$route.query.functionType
      this.activityTab = 'first'
      this.getList()
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      getList() {
        getSolicitOpinionDetail(this.id).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data
            this.content.topic = this.list.title
            this.list.solicitOpinionsRepositoryList.forEach(item => {
              if (item.uploadUrl) {
                item.uploadUrl = item.uploadUrl.split(',')
              } else {
                item.uploadUrl = []
              }
            })
          }
        })
      },
      handleUpload(res) {
        let fd = new FormData
        fd.append('file', res.file)
        uploadFile(fd).then(res => {
          if (res.code * 1 === 0) {
            this.comment.url.push(res.data.url)
          }
        })
      },
      submit() {
        const url = this.comment.url.join()
        const data = {
          solicitOpinionsId: this.id,
          content: this.comment.content,
          uploadUrl: url
        }
        saveSolicitOpinions(data).then(res => {
          if (res.code * 1 === 0) {
            this.getList()
            this.$message.success('发表成功')
          } else {
            this.$message.error(res.msg)
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

    .article {
      .title {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 60px;
      }

      .item {
        text-align: center;
        font-size: 12px;
        line-height: 20px;

        span {
          margin: 0 50px;
        }
      }

      .article_content {
        margin: 30px 0;
      }
    }

    .comment {
      .container {
        margin: 20px 0 30px;
        padding-top: 15px;
        border-top: #8c939d 1px dashed;

        .user {
          font-size: 16px;
          line-height: 30px;
        }

        .commentContent {
          line-height: 50px;
          font-size: 16px;
        }

        .indent {
          text-indent: 2em;
        }

        .time {
          color: #8c939d;
          line-height: 30px;
          cursor: pointer;
        }
      }
    }
  }
</style>
