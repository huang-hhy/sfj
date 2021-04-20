<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <el-card class="content">
      <main-header :content="content" style="margin: 20px 0 30px" />
      <div style="margin: 20px 0 30px">
        <el-radio-group v-model="page.status" @change="getList" :fill="'#e33a3c'" :text-color="'#ffffff'">
          <el-radio-button label="1">{{ type === '在线考试' ? '已考' : '已参加' }}</el-radio-button>
          <el-radio-button label="0">{{ type === '在线考试' ? '未考' : '未参加' }}</el-radio-button>
        </el-radio-group>
        <el-input v-model="page.title" :placeholder="type === '在线考试' ? '请输入考试名称' : '请输入问卷名称'" clearable @clear="getList"
                  @keyup.enter.native="getList"/>
        <el-button @click="getList">查询</el-button>
      </div>
      <div class="examList" v-for="(item, index) in list" :key="index">
        <div class="examHeader">
          <span class="examType">{{ type }}</span>
          <i class="el-icon-info"/>
          <span class="title">{{ item.title }}</span>
          <span v-if="type === '在线考试'" class="examStatus">{{ page.status * 1 === 1 ? '已考' : '未考' }}</span>
          <span v-if="type === '问卷调查'" class="examStatus">{{ page.status * 1 === 1 ? '已参加' : '未参加' }}</span>
          <span class="handleLook" @click="handleLook(item)">查看详情</span>
        </div>
        <div class="examContent">
          <span class="item">
            <span class="icon"/>
            <span class="itemText">创建时间: {{ moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </span>
          <span class="item">
            <span class="icon"/>
            <span class="itemText">更新时间： {{ moment(item.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </span>
          <span v-if="type === '在线考试'" class="item">
            <span class="icon"/>
            <span class="itemText">考试时长： {{ item.duration }} 小时</span>
          </span>
          <span class="item">
            <span class="icon"/>
            <span class="itemText">开始时间： {{ moment(item.startTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </span>
          <span class="item">
            <span class="icon"/>
            <span class="itemText">结束时间： {{ moment(item.endTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </span>
          <span v-if="type === '在线考试'" class="item">
            <span class="icon"/>
            <span class="itemText">总分： {{ item.totalScore }} 分</span>
          </span>
        </div>
      </div>
      <el-pagination
        :total="page.total"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="changeCurrent"
        @size-change="changeSize"
        class="pagination"
      />
    </el-card>
    <answer-form v-model="formList" :type="type" />
  </div>
</template>

<script>

  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import {getExamListPast, getExamListNow, getPersonalMessage} from '@/api/pc'
  import moment from 'moment'
  import AnswerForm from "./form/answerForm"
  import mainHeader from "../../../../components/pc/common/mainHeader"
  import {decrypt, encrypt} from "../../../../libs/tools";

  export default {
    name: "index",
    components: {
      mainHeader,
      AnswerForm,
      NavBar
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - ' + this.type,
      }
    },
    data() {
      return {
        type: '',
        list: [],
        page: {
          status: '1',
          total: 0,
          pageSize: 10,
          pageNum: 1,
          title: '',
          paperTypeId: '',
          pdOrgId: '',
          pdUserId: ''
        },
        moment: moment,
        formList: {
          refresh: false,
          id: ''
        },
        content: {
          sort: '2',
          name: '个人中心',
          url: '/pc/profile',
          title: ''
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
        this.type = data.type
        this.content.title = data.type
        this.page.pdOrgId = data.pdOrgId
        this.page.pdUserId = data.pdUserId
        this.getList()
      },
      getList() {
        if (this.type === '在线考试') {
          this.page.paperTypeId = '1'
        } else if (this.type === '问卷调查') {
          this.page.paperTypeId = '2'
        }
        const params = {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize
        }
        const data = {
          title: this.page.title,
          paperTypeId: this.page.paperTypeId
        }
        if (this.page.status * 1 === 1) {
          getExamListPast(params, data).then(res => {
            if (res.code * 1 === 0) {
              this.list = res.data.list
              this.page.total = res.data.total * 1
            }
          })
        } else {
          getExamListNow(params, data).then(res => {
            if (res.code * 1 === 0) {
              this.list = res.data.list
              this.page.total = res.data.total * 1
            }
          })
        }
        getPersonalMessage({}).then(res => {
          console.log(res)
          if (res.code * 1 === 0) {
            console.log(res)
          }
        })
      },
      handleLook(item) {
        if (this.page.status * 1 === 1) {
          item.moldJson = JSON.parse(item.moldJson)
          let radio = 0
          let checkBox = 0
          item.moldJson.test.forEach(i => {
            if (i.mold * 1 === 1) {
              radio = i.score
            } else if (i.mold * 1 === 2) {
              checkBox = i.score
            }
          })
          this.formList = {
            refresh: !this.formList.refresh,
            id: item.id,
            type: this.type,
            qualifiedScore: item.qualifiedScore,
            repeatNum: item.repeatNum,
            radio: radio,
            checkBox: checkBox
          }
        } else {
          let params = {
            id: item.id,
            type: this.type,
            time: parseInt(new Date().getTime() / 1000)
          }
          params = encrypt(JSON.stringify(params))
          this.$router.push({
            path: '/pc/profile/exam/paper',
            query: {
              params: params
            }
          })
        }
      },
      changeCurrent(current) {
        this.page.pageNum = current
        this.getList()
      },
      changeSize(limit) {
        this.page.pageSize = limit
        this.getList()
      }
    }
  }
</script>

<style lang="less">
  .content {
    .el-radio-button__inner:hover {
      color: #e33a3c;
    }

    .el-input__inner:focus {
      border: #e33a3c 1px solid;
    }
  }
</style>

<style scoped lang="less">
  .content {
    width: 1050px;
    margin: 20px auto;
    overflow: hidden;

    .el-input {
      margin-left: 50px;
      width: 240px;
    }

    .el-button {
      background: #e33a3c;
      border: #e33a3c 1px solid;
      color: #FFFFFF;
      margin-left: 15px;
    }

    .el-button:hover {
      background: #d0181a;
    }

    .examList {
      margin: 50px auto 0;
      padding: 0 30px;

      span {
        display: inline-block;
        vertical-align: middle;
      }

      .examHeader {
        .examType {
          width: 87px;
          line-height: 32px;
          cursor: pointer;
          color: #fff;
          padding-left: 20px;
          background: url("~assets/pc/exam/exam.png") no-repeat;
        }

        i {
          vertical-align: middle;
          font-size: 32px;
          color: #e33a3c;
          line-height: 32px;
          margin-left: -10px;
          cursor: pointer;
        }

        .title {
          font-size: 14px;
          line-height: 32px;
          color: #949699;
          margin: 0 10px;
        }

        .examStatus {
          background: #a1a1a1;
          text-align: center;
          color: #FFFFFF;
          padding: 0 10px;
          border-radius: 20px;
          margin-left: 10px;
        }

        .handleLook {
          color: #e33a3c;
          padding: 5px 10px;
          font-size: 14px;
          border: #e33a3c 1px solid;
          border-radius: 8px;
          float: right;
          cursor: pointer;
        }

        .handleLook:hover {
          background: #e33a3c;
          color: #FFFFFF;
        }
      }

      .examContent {
        background: #f8f8f8;
        border: #f4f4f4 1px solid;
        margin: 15px 0;
        padding: 0 28px;

        .item {
          line-height: 30px;
          margin: 10px;
          width: 30%;

          .icon {
            width: 8px;
            height: 8px;
            background: #e8e8e8;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
      }
    }

    .pagination {
      float: right;
      margin: 30px 0;
    }
  }
</style>
