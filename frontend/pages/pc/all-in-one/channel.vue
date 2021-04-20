<template>
  <div class="channel">
    <div class="channelNav">
      <div class="nav">
        <img style="width: 50%;height: 10%;margin: 165px 0 10px 130px;cursor: pointer;" src="@/assets/pc/all-in-one/danghui.png"
          @click="gotoAllInOne" />
        <div class="navList" v-for="(item, index) in navList" :key="index" @click="changeId(item)">
          <span :class="id === item.id ? 'activityNav' : 'navItem'">{{ item.articleChannelName }}</span>
        </div>
      </div>

      <div class="navList2">
        <div class="icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="title" v-for="(item,index) in list" :key="index">
          <p :class="titleid === item.id ? 'active':'default'" @click="changeTitle(item)">{{item.articleTitle}}</p>
        </div>
       <!-- <div class="title" v-if="title=='学习教育'" v-for="(item,index) in studyTitle" :key="index">
          <p :class="titleid === item.id ? 'active':'default'" @click="changeTitle(item)">{{item.articleTitle}}</p>
        </div> -->
        <!-- <div class="title" v-else v-for="(item,index) in list" :key="index">
          <p :class="titleid === item.id ? 'active':'default'" @click="changeTitle(item)">{{item.articleTitle}}</p>
        </div> -->
      </div>
    </div>

    <div class="channelList" :class="title=='党务管理' || title=='活力党建' || title=='学习教育' ? 'bg':'' ">
      <div v-if="title === '党建要闻' || title === '先锋谱' || title === '百年党建'">
        <h3>{{detail.articleTitle}}</h3>
        <div class="date">
          <p>发布时间: {{ moment(detail.publicTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
          <p>来源: {{detail.orgName}}</p>
        </div>
        <div class="content">
          <p class="detail" v-html="detail.articleInfo?detail.articleInfo.content:''">
          </p>
        </div>
      </div>
      <!-- <el-card class="channelItem" v-for="(item, index) in list" :key="index">
        <div @click="gotoNews(item.id)">
          <div class="title">
            <img :src="attachUrl + item.articleShowImg">
            <p style="font-size: 60px; line-height: 200px">
              <span v-for="(item2, index2) in item.articleTitle" :key="index2" v-if="index2 < 10">{{ item2 }}</span>
              <span v-if="item.articleTitle.length > 10">……</span>
            </p>
            <el-tag type="success" style="font-size: 40px">{{ item.articleName }}</el-tag>
          </div>
          <p>阅读量： {{ item.browseNumber }}</p>
          <p>上传者： {{ item.uploaderName }}</p>
          <p>发布组织： {{ item.orgName }}</p>
          <p>发布时间： {{ moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
        </div>
      </el-card> -->
      <div class="articleList" v-else-if="title === '学习教育'">
        <div class="item" v-if="titleid=='720305287583498240'">
            <div  class="box" v-for="(item,index) in study.sjTestPaperList" @click="goDetail(item)">
            <div class="top">
              <img src="@/assets/pc/all-in-one/danghui2.png" />
              <p>{{item.title}}</p>
            </div>
            <div class="main">
              <p>创建时间：{{ moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
              <p>结束时间: {{ moment(item.endTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
            </div>
          </div>
        </div>

        <div v-else-if="titleid=='720304949728116736'">
          <div class="box" v-for="(item,index) in study.wjTestPaperList" @click="goDetail(item)">
            <div class="top">
              <img src="@/assets/pc/all-in-one/danghui2.png" />
              <p>{{item.title}}</p>
            </div>
            <div class="main">
              <p>创建时间: {{ moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
              <p>结束时间: {{ moment(item.endTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
            </div>
          </div>
        </div>

        <div v-else-if="titleid=='720305542572015616'" >
           <div class="box" v-for="(item,index) in study.studList" @click="goDetail(item)">
             <div class="top">
               <img src="@/assets/pc/all-in-one/danghui2.png" />
               <p>{{item.title}}</p>
             </div>
             <div class="main">
               <p>课题类型: {{item.typeName}}</p>
               <p>发布组织: {{item.orgName}}</p>
               <p>创建时间: {{ moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
             </div>
           </div>
        </div>

       <div v-else="titleid=='720304378988199936'">
           <div  class="box" v-for="(item,index) in study.workGuidelineList" @click="goDetail(item)">
            <div class="top">
              <img src="@/assets/pc/all-in-one/danghui2.png" />
              <p>{{item.title}}</p>
            </div>
            <div class="main">
              <p>创建时间: {{ moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
              <p>更新时间: {{ moment(item.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
            </div>
          </div>
       </div>


      </div>

      <div class="articleList" v-else-if="title === '活力党建'">
        <div class="item" v-if="titleid=='828922388153368576'">
          <div  class="box" v-for="(item,index) in wonderful" @click="goDetail(item)">
            <div class="top">
              <img src="@/assets/pc/all-in-one/danghui2.png" />
              <p>{{item.title}}</p>
            </div>
            <div class="main">
              <p>召开时间：{{ moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
              <p>会议地点：{{item.address}}</p>
              <p>会议类型：{{item.typeName}}</p>
            </div>
          </div>
        </div>
        <div class="box2" v-else-if="titleid == '827216837597986816'" style="padding:0;">
          <client-only>
            <baidu-map :points="points" v-if="points.length" />
          </client-only>
        </div>
        <div class="box3" v-else style="background-color: white;">
          <orgs></orgs>
        </div>
      </div>

      <div class="partyList" v-else="title === '党务管理'">
          <div class="item" v-for="(item,index) in partyList">
            <div class="top">
              <img src="@/assets/pc/all-in-one/danghui2.png" />
              <p>{{item.typeName}}</p>
            </div>
            <div class="main">
              <p>召开时间: {{ moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
              <p>会议地点: {{item.address}}</p>
              <p>会议标题: {{item.title}}</p>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import orgs from './orgs.vue'
  import {
    decrypt,
    encrypt
  } from "../../../libs/tools";
  import {
    getAllInOne,
    getArticleList,
    getArticle,
    getChannelList,
    getPartyAdministration,
    getOrganization,
    getHomeData
  } from '@/api/pc'
  import config from '@/config'
  import moment from 'moment'
  import screenfull from 'screenfull'
  import BaiduMap from './baidu-map.vue'

  export default {
    name: "channel",
    components:{orgs,BaiduMap},
    head() {
      return {
        title: this.title
      }
    },
    data() {
      return {
        title: '',
        id: '',
        titleid: '',
        navList: [],
        detail: {},
        attachUrl: config.attachUrl,
        list: [],
        moment: moment,
        ifFull: false,
        studyTitle:[
            {articleTitle:'在线考试',id:'720305287583498240'},
            {articleTitle:'问卷调查',id:'720304949728116736'},
            {articleTitle:'专题学习',id:'720305542572015616'},
            {articleTitle:'党务知识',id:'720304378988199936'},
          ],
         study:[],
         vitality:[
           {articleTitle:'精彩回顾',id:'828922388153368576'},
           {articleTitle:'党建地图',id:'827216837597986816'},
           {articleTitle:'组织架构',id:'826762718592630784'},
         ],
         party:[{articleTitle:'民主评议',id:'720302766878097408'}],
         studyId:'',
         partyList:[],
         wonderful:[],
        points: [],
      }
    },
    mounted() {
      this.title = this.$route.query.name
      this.id = decrypt(this.$route.query.id)
      this.getNavList()
      this.getList()
      this.getChanne()
      this.getParty()
      this.getOrganizationChart()
      this.getWonderful()
      this.getHomeDataList()
    },
    methods: {

      getHomeDataList() {
        getHomeData().then(res => {
          if (res.code * 1 === 0) {
            const temp = res.data.orgs
            if(temp.length > 0) {
              this.points = []
              temp.forEach(item => {
                if (item.lng && item.lat) {
                  this.points.push({
                    id: item.id,
                    lng: item.lng * 1,
                    lat: item.lat * 1,
                    address: item.address
                  })
                }
              })
            }
          }
        })
      },

      //获取活力党建的精彩回顾
      getWonderful(){
        const distinguish=1
        getPartyAdministration(distinguish).then(res => {
          this.wonderful=res.data
          // console.log(this.wonderful)
          // console.log(res)
        })
      },

      //获取组织架构树数据
      getOrganizationChart(){
        getOrganization().then(res =>{
          // console.log(res)
        })
      },

      //获取党务管理数据
      getParty(){
        const distinguish=0
        getPartyAdministration(distinguish).then(res => {
          this.partyList=res.data
          // console.log(this.partyList)
        })
      },

      goDetail(item){
        // console.log(item)
        let data=JSON.stringify(item)
        sessionStorage.setItem('item',data)
        // const data=JSON.stringify(item)
        this.$router.push({
          path:'/pc/all-in-one/detail2',
          query:{
            articleChannelId:encrypt(item.id),
            titleId:encrypt(this.titleid),
            navId:encrypt(this.id),
          }
        })
      },

      getChanne(){
        getChannelList().then(res=>{
         this.study=res.data
          // console.log(this.study)
        })
      },

      //获取标题id
      changeTitle(item) {
        this.titleid = item.id
        // console.log(this.titleid)
        this.getArticleDeatil(this.titleid)
        // console.log(item)
      },


      //获取文章详情
      getArticleDeatil(id) {
        getArticle(id).then(res => {
          if (res.code * 1 === 0) {
            this.$set(this, 'detail', res.data)
          }
        })
      },

      changeScreenFull() {
        if (!screenfull.isEnabled) {
          this.$message.warning('该浏览器不支持全屏显示')
          return false
        } else {
          screenfull.toggle()
          this.isFull = !screenfull.isFullscreen
        }
      },


      //获取频道列表
      getNavList() {
        getAllInOne().then(res => {
          if (res.code * 1 === 0) {
            this.navList = res.data.channels
            // console.log(res)
          }
        })
      },


      //获取标题列表
      getList() {
        const data = {
          articleChannelId: this.id
        }
        getArticleList({}, data).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data.list
            if(this.title=='学习教育'){
              this.list=this.studyTitle
            }else if(this.title=='活力党建'){
              this.list=this.vitality
            }else if(this.title=='党务管理'){
              this.list=this.party
            }

            this.titleid = this.list[0].id
            this.getArticleDeatil(this.titleid)

          }
        })
      },

      //返回一体机首页
      gotoAllInOne() {
        this.$router.push({
          path: '/pc/all-in-one'
        })
      },


      //获取频道id
      changeId(item) {
        this.id = item.id
        this.title = item.articleChannelName
        this.getList()
        // console.log(this.title)

      },


      gotoNews(id) {
        this.$router.push({
          path: '/pc/all-in-one/detail',
          query: {
            id: encrypt(id),
            articleChannelId: encrypt(this.id)
          }
        })
      }

    }
  }
</script>

<style scoped>
  .detail>>>div,
  .detail>>>p {
    font-size: 50px;
    line-height: 100px;
    text-align: center;
  }

  .detail>>>table {
    width: 100%;
  }

  .detail>>>img {
    text-align: center;
    width: 80%;
  }

  .detail>>>table p {
    width: 78%;
    font-size: 40px;
    line-height: 100px;
    margin: auto;
  }
</style>
<style scoped lang="less">
  .map{
    height: 1000px;
  }
  .bg{
    background-image: url("~assets/pc/home/shan.png");
    background-repeat: no-repeat;background-size: 100% 100%;
    background-attachment:fixed;
  }
  .active {
    color: red;
  }
  .default {
    color: white;
  }
  .activityNav,
  .navItem:hover {
    color: #DC0909;
    font-weight: 700;

  }
  .channel {
    margin: 0 auto;
    width: 3685px;
    height: 2211px;
    overflow: hidden;
    // background-image: url("~assets/pc/home/shan.png");
    background-size: 100% 100%;

    .channelNav {
      height: 100%;
      float: left;
      width: 30%;
      position: relative;
      .danghui {
        text-align: center;
        padding: 100px 0 50px;
        img {
          width: 392px;
          height: 267px;
        }
      }
      .nav {
        width: 50%;
        height: 100%;
        float: left;
        background-color: #DDDDDD;
        .navList {
          margin: 50px auto;
          text-align: center;
          line-height: 150px;
          font-size: 100px;
          cursor: pointer;
          span {
            font-size: 80px;
            transition: .3s;
            width: 100%;
            display: inline-block;
          }
          .navList:hover span {
            color: red;
          }
        }

      }

      .navList2 {
        width: 55%;
        height: 100%;
        float: left;
        opacity: 0.7;
        overflow: auto;
        position: absolute;
        right: -54px;
        background-color: #bfb3a2;

        .icon {
          margin: 180px 200px 0 200px;

          span {
            text-align: center;
            display: block;
            width: 140px;
            height: 25px;
            margin-bottom: 20px;
            border-radius: 10px;
            background-color: white;
          }
        }

        .title {
          width: 100%;
          height: 200px;
          padding: 0 20px;
          border-bottom: 2px solid white;
          p {
            font-size: 60px;
            line-height: 200px;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            transition: .5s;
            margin-left: -75px;
          }
          p:hover{
            color: red;
          }
        }
      }
    }

    .channelList {
      width: 70%;
      float: left;
      height: 100%;
      overflow: auto;
      position: relative;
      background-color: white;
      .partyList{
        width: 100%;
        height: 100%;
        padding-top: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        .item{
          width: 40%;
          height: 660px;
          font-size: 80px;
          cursor: pointer;
          margin-bottom: 50px;
          border-radius: 20px;
          background-color: white;
          box-shadow: darkgrey 10px 10px 30px 5px;
          // background-color: pink;
          .top{
            width: 100%;
            height: 25%;
            border-bottom: 10px solid red;
            img{
              height: 70%;
              width: 10%;
              float: left;
              margin: 20px 50px 0 100px;
            }
            p{
              // float: left;
              height: 100%;
              font-size: 60px;
              line-height: 160px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .main{
            width: 100%;
            height: 75%;
            padding-top: 20px;
            p{
              height: 150px;
              line-height: 150px;
              font-size: 50px;
              margin-left: 100px;
            }
          }
        }
      }
      h3 {
        width: 100%;
        text-align: center;
        font-size: 70px;
        margin-top: 50px;
        line-height: 120px;
      }
      .date {
        width: 100%;
        height: 100px;
        line-height: 100px;
        display: flex;
        justify-content: center;
        p {
          font-size: 40px;
          margin-right: 50px;
        }
      }
      .content {
        width: 100%;
        height: 100%;
        padding: 0 50px;
        margin-top: 20px;
        overflow: hidden;
        p {
          width: 100%;
        }
      }

      .articleList {
        width: 100%;
        height: 100%;
        // display: flex;
        // flex-wrap: wrap;
        // padding-top: 80px;
        // justify-content: space-evenly;
        // align-items: flex-start;
        .box2{
          padding: 0;
          div{
            padding: 0;
          }
        }
        div{
         width: 100%;
         height: 100%;
          // padding-top: 80px;
          padding-top: 50px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          align-items: flex-start;
            .box {
             // overflow: hidden;
             width: 40%;
            height: 660px;
            font-size: 80px;
            cursor: pointer;
            line-height: 150px;
            padding-top: 0px;
            margin-bottom: 50px;
            border: 3px solid #CCCCCC;
            border-radius: 20px;
            background-color: white;
            box-shadow: darkgrey 10px 10px 30px 5px;
            .top {
              width: 100%;
              height: 25%;
              overflow: hidden;
              // padding-left: 90px;
              padding: 0px;
              vertical-align: bottom;
              border-bottom: 10px solid #e53434;
              img {
                float: left;
                width: 10%;
                margin-top: 35px;
                margin-right: 20px;
                height: 55%;
              }
              p {
                float: left;
                font-size: 70px;
                width: 60%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            .main {
              width: 100%;
              height: 70%;
              p {
                font-size: 50px;
                margin-left: 100px;
                line-height: 120px;
                width: 100%;
              }
            }
          }
        }

      }
      .channelItem {
        float: left;
        width: calc(50% - 100px);
        margin: 50px;
        padding: 50px;
        font-size: 50px;
        line-height: 100px;
        cursor: pointer;
        .title {
          text-align: center;
          img {
            width: 300px;
            height: 300px;
          }
        }
      }
    }
    .channelList::-webkit-scrollbar {
      width: 2px;
    }
  }
</style>
