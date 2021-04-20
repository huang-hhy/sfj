<template>
  <div class="container">
    <div class="left">
      <div class="left1">
        <img @click="gotoAllInOne" src="@/assets/pc/all-in-one/danghui.png" />
        <ul>
          <li @click="changeNav(item)" :class="navId === item.id ? 'active':''" v-for="(item,index) in navList" :key="index">{{item.articleChannelName}}</li>
        </ul>
      </div>
      <div class="left2">
        <div class="top">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="title_list">
          <ul v-if="titleId === '828922388153368576'">
            <li  @click="changeTitle(item)" :class="item.id === '720305287583498240' ? 'active':'noactive'" v-for="(item,index) in vitality" :key="index">{{item.articleTitle}}</li>
          </ul>
          <ul v-else-if="navId === '821428720232300544'">
            <li  @click="changeTitle(item)" :class="titleId === item.id ? 'active':'noactive'" v-for="(item,index) in studyTitleList" :key="index">{{item.articleTitle}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right">
          <div v-if="titleId  === '720305287583498240'">
            <div class="study">
              <div class="header">
                <h2>{{data.title}}</h2>
                <div class="date">
                  <p>创建时间：{{ moment(data.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
                  <p>更新时间：{{ moment(data.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
                  <p>总分：{{exam.test[0].score}}</p>
                </div>
              </div>
              <div class="main">
                  <div class="item" v-for="(item,index) in option" :key="index">
                    <div class="top">
                      <span>{{index+1}}、</span>
                      <span>{{item.questionTitle}}</span>
                    </div>
                    <div class="content">
                      <el-checkbox-group
                        v-model="item.options"
                        v-for="(i, ind) in item.options"
                        :key="ind"
                        disabled
                      >
                        <el-checkbox :label="i.opt">
                          <span class="opt">{{ i.opt }}</span>
                          <span>{{ i.content }}</span>
                        </el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <div class="footer">
                      <p>正确答案：{{item.answer}}</p>
                      <p>答案解析：{{item.analysis}}</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div v-else-if="titleId  === '720304949728116736'">
                <div class="study">
                  <div class="header">
                    <h2>{{data.title}}</h2>
                    <div class="date">
                      <p>创建时间：{{ moment(data.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
                      <p>更新时间：{{ moment(data.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
                      <p>总分：{{questionnaire.test[0].score}}</p>
                    </div>
                  </div>
                  <div class="main">
                      <div class="item" v-for="(item,index) in option" :key="index">
                        <div class="top">
                          <span>{{index+1}}、</span>
                          <span>{{item.questionTitle}}</span>
                        </div>
                        <div class="content">
                          <el-checkbox-group
                            v-model="item.options"
                            v-for="(i, ind) in item.options"
                            :key="ind"
                            disabled
                          >
                            <el-checkbox :label="i.opt">
                              <span class="opt">{{ i.opt }}</span>
                              <span>{{ i.content }}</span>
                            </el-checkbox>
                          </el-checkbox-group>
                        </div>
                        <div class="footer">
                          <p>正确答案：{{item.answer}}</p>
                          <p>答案解析：{{item.analysis}}</p>
                        </div>
                      </div>
                  </div>
                </div>
          </div>
          <div v-else-if="titleId  === '720305542572015616'">
              <div class="study">
                <div class="header">
                  <h2>{{data.title}}</h2>
                  <div class="date">
                    <p>创建时间：{{ moment(data.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
                    <p>更新时间：{{ moment(data.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
                  </div>
                </div>
                <div class="main">
                    <div class="article" v-if="data.literature">
                      <article v-html="data.literature"></article>
                    </div>
                    <div class="video" v-else>
                      <video controls="controls" style="width: 80%" :src="attachUrl+data.videoUrl"></video>
                      <!-- <img :src="attachUrl+data.imgUrl" /> -->
                    </div>
                </div>
              </div>
          </div>
          <div v-else-if="titleId  === '720304378988199936'">
                 <div class="study">
                   <div class="header">
                     <h2>{{data.title}}</h2>
                     <div class="date">
                       <p>创建时间：{{ moment(data.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
                       <p>更新时间：{{ moment(data.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
                     </div>
                   </div>
                   <div class="main">
                       <div class="article">
                         <article v-html="data.content" style="font-size: 50px;"></article>
                         <div class="accessory">
                              <p data-v-40970478="" class="text"><i style="color: red;" data-v-40970478="" class="el-icon-document"></i> <span data-v-40970478="">附件</span></p>
                               <div data-v-40970478="" v-for="item in accessory"><a @click="clickAccessory" data-v-40970478="" href="#">{{item.name}}</a></div>

                         </div>
                       </div>

                   </div>
                 </div>
          </div>
          <div v-else-if="titleId  === '828922388153368576'">
                <div class="study">
                  <div class="header">
                    <h2>{{data.title}}</h2>
                    <div class="date">
                      <p>创建时间：{{ moment(data.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
                      <p>更新时间：{{ moment(data.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
                    </div>
                  </div>
                  <div class="main">

                  </div>
                </div>
          </div>
    </div>
    <el-dialog
      title="图片预览"
      :visible.sync="imgDialogVisible"
      width="60%">
      <span>图片预览</span>
    </el-dialog>
  </div>

</template>

<script>
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
  import moment from 'moment'
  import config from '@/config'
  export default {
    name: 'detail2',
    data() {
      return {
          imgDialogVisible:false,
          data:{},
          exam:{},
          option:[],
          accessory:[],
          moment: moment,
          attachUrl: config.attachUrl,
          questionnaire:[],
          navList:[],
          navId:'',
          titleId:'',
          articleId:'',
          studyTitleList:[
            {articleTitle:'在线考试',id:'720305287583498240'},
            {articleTitle:'问卷调查',id:'720304949728116736'},
            {articleTitle:'专题学习',id:'720305542572015616'},
            {articleTitle:'党务知识',id:'720304378988199936'},
          ],
          vitality:[
            {articleTitle:'精彩回顾',id:'720305287583498240'},
            {articleTitle:'党建地图',id:'720304949728116736'},
            {articleTitle:'组织架构',id:'720305542572015616'},
          ]
      }
    },
    mounted() {
      this.getNavList()
      this.navId=decrypt(this.$route.query.navId)
      this.titleId=decrypt(this.$route.query.titleId)
      this.articleId=decrypt(this.$route.query.articleChannelId)
     // this.titleId='720305542572015616'
     // console.log(this.navId)
     // console.log(this.titleId)
     // console.log(this.articleId)
     this.data=JSON.parse(sessionStorage.getItem('item'))

     if(this.titleId  === '720305287583498240'){
       this.exam = JSON.parse(this.data.moldJson)
       this.option = this.exam.test[0].moldJson
     }else if(this.titleId  === '720304949728116736'){
        this.questionnaire=JSON.parse(this.data.moldJson)
        this.option = this.questionnaire.test[0].moldJson
     }else if(this.titleId  === '720304378988199936'){
       this.accessory=JSON.parse(this.data.enclosure)
       console.log(this.accessory)
     }



    },
    methods: {

      clickAccessory(){
        this.imgDialogVisible=!this.imgDialogVisible
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

      changeNav(data){
        this.navId=data.id
        this.$router.push({
          path: '/pc/all-in-one/channel',
          query: {
            name: data.articleChannelName,
            id: encrypt(data.id),
          }
        })
        // console.log(data)
      },


      changeTitle(data){
        this.titleId=data.id
        console.log(data)
      },

      //返回一体机首页
      gotoAllInOne() {
        this.$router.push({
          path: '/pc/all-in-one'
        })
      },

    }
  }
</script>

<style lang="less" scoped>
  .el-checkbox-group{
    height: 100px;
    line-height: 100px;
  }

  .el-checkbox__original{
    width: 50px;
    height: 50px;
  }
  .active{
    color: red;
  }
  .noactive{
    color: white;
  }
  .container {
    margin: 0 auto;
    width: 3685px;
    height: 2211px;
    overflow: hidden;
    // background-image: url("~assets/pc/home/shan.png");
    // background-size: 100% 100%;
    // background-attachment:fixed;
    .left {
      width: 30%;
      height: 100%;
      float: left;
      .left1 {
        width: 50%;
        height: 100%;
        float: left;

        background-color: #DDDDDD;

        img {
          width: 50%;
          height: 10%;
          margin: 130px 0 0 130px;
        }

        ul {
          width: 100%;
          height: 100%;
          margin-top: 100px;

          li {
            font-size: 80px;
            height: 200px;
            cursor: pointer;
            line-height: 200px;
            text-align: center;
          }
        }
      }

      .left2 {
        width: 50%;
        height: 100%;
        float: left;
        opacity: 0.7;
        background-color: #bfb3a2;
        .top{
         margin: 180px 200px 0 200px;
          span{
            width: 140px;
            height: 25px;
            border-radius: 10px;
            margin-bottom: 20px;
            display: block;
            background-color: white;
            text-align: center;
          }
        }
        .title_list{
          ul {
                width: 100%;
                height: 100%;
                margin-top: 50px;
                li {
                   cursor: pointer;
                  font-size: 60px;
                  height: 200px;
                  line-height: 200px;
                  padding: 0 20px;
                  text-align: center;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
            }
        }
      }
    }

    .right {
      width: 70%;
      height: 100%;
      float: left;
      overflow: auto;
      div{
        width: 100%;
        height: 100%;
        .study{
        width: 100%;
        height: 100%;
        font-size: 80px;
        padding: 0 20px;
        .header{
          width: 100%;
          height: 20%;
          h2{
            height: 200px;
            line-height: 200px;
            color: black;
            letter-spacing:5px;
            text-align: center;
            }
           .date{
             display: flex;
             justify-content: space-around;
             height: 100px;
             p{
                font-size: 50px;
                line-height: 100px;
             }
           }
          }
          .main{
            width: 100%;
            height: 80%;
            .article{
              article{
                font-size: 60px;
                line-height: 100px;
              }
              .accessory{
                height: 0px;
                margin-top: 50px;
                p{
                  font-size: 50px;
                  line-height: 100px;
                }
                div{
                  height: 100px;
                  line-height: 100px;
                  a{
                    font-size: 50px;
                  }
                }
              }
            }
            .video{
              text-align: center;
            }

            .item{
              width: 95%;
              height: 1200px;
              margin: 0 auto 200px;
              border: 2px solid #ccc0c4;
              .top{
                width: 100%;
                height: 15%;
                background-color: #f3f1f1;
                span{
                  font-size: 50px;
                  line-height: 180px;
                  margin-left: 50px;
                }
              }
              .content{
                width: 100%;
                height: 70%;
               padding-left: 50px;
                div{
                  height: 145px;
                  line-height: 160px;
                  label{
                    span:nth-child(1){
                      margin-right: 50px;
                      span{
                        span,input{
                          display: inline-block;
                          width: 50px;
                          height: 50px;
                        }
                      }
                    }
                    span:nth-child(2){
                      span{
                        font-size: 50px;
                        margin-right: 50px;
                      }

                    }
                  }
                }
              }
              .footer{
                width: 100%;
                height: 15%;
                padding-left: 50px;
                border-top:5px dashed #ccc;
                p{
                  line-height: 85px;
                  font-size: 40px;
                }
              }
            }
          }
        }
      }

    }
  }
  ::v-deep .el-checkbox__inner{
      width: 30px;
      height: 30px;
      margin: -30px 30px 0 0;
  }
</style>
