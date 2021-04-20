<template>
  <div class="container">
    <div class="left">
      <div class="danghui">
        <img style="width: 300px;position: absolute;height: 250px;z-index: 999;margin-left: 150px;margin-top: 80px;cursor: pointer;" src="@/assets/pc/all-in-one/danghui.png" @click="gotoAllInOne">
      </div>
        <div class="one">
           <ul>
             <li @click="handelNavList(item)" :class="id === item.id ? 'active' : ''" v-for="(item,index) in navList" :key="index">{{item.articleChannelName}}</li>
           </ul>
        </div>
        <div class="two">
          <div class="icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="title" v-for="(item,index) in list" :key="index">
            <p :class="titleid === item.id ? 'active':'default'" @click="changeTitle(item)">{{item.articleTitle}}</p>
          </div>
        </div>
    </div>
    <div class="right">
      <div class="articleDetail" v-if="title === '党建要闻' || title === '先锋谱' || title === '百年党建'">
          <div>
             <h3>{{detail.articleTitle}}</h3>
              <div class="date">
                <p>发布时间: {{ moment(detail.publicTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
                <p>来源: {{detail.orgName}}</p>
              </div>
              <div class="content">
                <!-- <p v-if="detail.articleInfo.content.lenght !== 0" v-html="detail.articleInfo.content"></p> -->
              </div>
          </div>

      </div>

      <div class="articleList" v-else>
        <div class="box">
          <div class="top">
            <img src="@/assets/pc/all-in-one/danghui2.png"/>
            <p>党员大会1</p>
          </div>
          <div class="main">
            <p>会议主题：</p>
            <p>会议主题：</p>
            <p>会议主题：</p>
            <p>会议主题：</p>
            <p>会议主题：</p>
          </div>
        </div>
        <div class="box">
          <div class="top">
            <img src="@/assets/pc/all-in-one/danghui2.png"/>
            <p>党员大会</p>
          </div>
          <div class="main">
            <p>会议主题：</p>
            <p>会议主题：</p>
            <p>会议主题：</p>
            <p>会议主题：</p>
            <p>会议主题：</p>
          </div>
        </div>
        <div class="box">
          <div class="top">
            <img src="@/assets/pc/all-in-one/danghui2.png"/>
            <p>党员大会</p>
          </div>
          <div class="main">
            <p>会议主题：</p>
            <p>会议主题：</p>
            <p>会议主题：</p>
            <p>会议主题：</p>
            <p>会议主题：</p>
          </div>
        </div>
        <div class="box">
          <div class="top">
            <img src="@/assets/pc/all-in-one/danghui2.png"/>
            <p>党员大会</p>
          </div>
          <div class="main">
            <p>会议主题：</p>
            <p>会议主题：</p>
            <p>会议主题：</p>
            <p>会议主题：</p>
            <p>会议主题：</p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import {decrypt, encrypt} from "../../../libs/tools";
  import {getAllInOne, getArticleList,getArticle} from '@/api/pc'
  import moment from 'moment'
  export default{
    data(){
      return{
        navList: [],
        list:[],
        title: '',
        id: '',
        titleid:'',
        detail:{},
        moment: moment,
        articleList:[],
        articleLists:[],
        articleChannelName:'',
        type:'党建要闻'
      }
    },
    methods:{

      //获取频道列表
      getNavList(){
         getAllInOne().then(res => {
           // console.log(res)
           if (res.code * 1 === 0) {
               this.navList=res.data.channels
               // console.log(res.data.channels)
           }
         })
      },

      //获取文章列表
      getList() {
        const data = {
          articleChannelId: this.id
        }
        getArticleList({}, data).then(res => {
          if (res.code * 1 === 0) {
            this.list = res.data.list
            this.titleid=this.list[0].id
            this.getArticleDeatil(this.titleid)
          }
        })
      },

      //獲取文章详情数据
      getArticleDeatil(id){
          getArticle(id).then(res => {
           this.detail=res.data
            // console.log(this.detail)
          })
      },


      //获取
      handelNavList(item){
        console.log(item)
        this.id=item.id
        // this.articleList=item.articleList
        this.title=item.articleChannelName
        this.getList()
        // console.log(this.title)
      },

      //切换标题时更换文章详情
      changeTitle(item){
        this.titleid=item.id
        this.getArticleDeatil(this.titleid)
        // console.log(item.id)
        // console.log(this.titleid)
      },


      gotoAllInOne(){
        this.$router.push('/pc/all-in-one')
      }
    },
    created(){
      // console.log(this.detail.articleInfo.content)
       this.getList()
    },
    mounted() {
      this.title = this.$route.query.name
      this.id = decrypt(this.$route.query.id)

      // console.log(this.title,this.id)
      this.getNavList()
      this.getList()
      // this.getArticleDeatil()
      // console.log(this.title)

    },
  }
</script>

<style scoped lang="less">
  .active{color: red;}
  .default{color: white;}
  .container{
    margin: 0 auto;
   width: 3685px;
   height: 2211px;
   // overflow: hidden;
   overflow: auto;
   background-image: url("~assets/pc/home/shan.png");
   background-size: 100% 100%;
   .left{
     width: 35%;
     height: 100%;
     float: left;
     // background-color: pink;
     .one{
       width: 50%;
       height: 100%;
       float: left;
       background-color: #dddddd;
       position: relative;
       ul{
         position: absolute;
         top: 50%;
         transform: translateY(-50%);
         width: 100%;
         text-align: center;
         li{
           list-style: none;
           font-size: 80px;
           line-height: 200px;
           cursor: pointer;
         }
         li:hover{
           color: red;
         }
       }
     }
     .two{
       width: 50%;
       height: 100%;
       float: left;
       opacity: 0.7;
       background-color: #bfb3a2;
       .icon{
        margin-top: 150px;
        margin-left: 240px;
         span{
           text-align: center;
           display:block;
           width: 130px;
           height: 20px;
           margin-bottom: 15px;
           border-radius: 10px;
           background-color: white;
         }
       }
       .title{
         width: 100%;
         height: 200px;
         padding: 0 20px;
         border-bottom: 2px solid white;
         p{
           // color: white;
           font-size: 60px;
           line-height: 200px;
           text-align: center;
           overflow:hidden;
           white-space:nowrap;
           text-overflow:ellipsis;
           cursor: pointer;
         }
       }
     }
   }
   .right{
     width: 65%;
     height: 100%;
     float: right;
     position: fixed;
      .articleDetail{
        width: 100%;
        height: 100%;
        h3{
            width: 100%;
            text-align: center;
            font-size: 70px;
            margin-top: 50px;
            line-height: 120px;
        }
        .date{
            width: 100%;
            height: 100px;
            line-height: 100px;
            // background-color: pink;
            display: flex;
            justify-content: center;
            p{
              font-size: 30px;
              margin-right: 50px;

            }
        }
        .content{
            width: 100%;
            height: 100%;
            padding: 0 50px;
            margin-top: 20px;
            overflow: hidden;
            img{
              width: 100%;
            }
            p{
               font-size: 50px;
               line-height: 100px;
            }
        }
      }

     // background-color: gold;
     .articleList{
       width: 100%;
       height: 100%;
       display: flex;
       flex-wrap: wrap;
       padding-top: 80px;
       justify-content: space-evenly;
       align-items: flex-start;

       .box{
         overflow: hidden;
         width: 40%;
         height: 660px;
         font-size: 80px;
         line-height: 150px;
         border: 3px solid #CCCCCC;
         border-radius: 20px;
         background-color: white;
         box-shadow: darkgrey 10px 10px 30px 5px ;
         .top{
           width: 100%;
            overflow: hidden;
            padding-left: 90px;
           vertical-align:bottom;
            border-bottom: 10px solid #e53434;
           img{
             float: left;
             width: 10%;
             margin-top: 30px;
             margin-right: 20px;
           }
           p{
             float: left;
             font-size: 70px;

           }
         }
         .main{
           p{
             font-size: 50px;
             margin-left: 100px;
             line-height: 120px;
           }
         }
       }
     }

   }
  }
</style>
