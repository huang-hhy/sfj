<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <div class="profile">
<!--      <div class="profile_l">-->
<!--        <ul class="profile_l_list">-->
<!--          <li :class="{profile_l_li:true,active:activeIndex==item.id}" v-for="(item,index) in this.lmenu" :key="index"-->
<!--              @click="gotoItem(item)">-->
<!--            <span class="border"></span>-->
<!--            <span class="icon">-->
<!--              <svg-icon icon-class="position"/>-->
<!--            </span>-->
<!--            <span>{{item.name}}</span>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
      <div class="profile_r">
        <div class="personal_info" v-if="this.type === '个人信息'">
          <h2 class="title">
            个人信息
            <span class="more fr" @click="logout">退出</span>
          </h2>
          <p class="login">
            <span class="fl">{{$store.state.user.userName}} , 欢迎来到智慧党建云平台，这是您第{{recordLogin.num}}次登录，上次登录时间为：{{moment(recordLogin.loginTime * 1000).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </p>
          <div class="info">
            <img :src="attachUrl+$store.state.user.usersInfo.miniPic">
            <div class="info_content">
              <div class="info_top">
                <p class="top_item">
                  <span class="name">{{$store.state.user.userName}}</span>
                </p>
                <p class="top_item">
                  <span class="name">我的积分：</span>
                  <span class="value">{{$store.state.user.usersInfo.score}}分</span>
                </p>
                <p class="top_item">
                  <span class="name">我的组织：</span>
                  <span class="value">{{$store.state.user.orgName}}</span>
                </p>
              </div>
              <div class="info_bottom">
                <div class="bottom_item">
                  <span>党员类型：</span>
                  <span v-if="$store.state.user.usersInfo.userIdentity === '1'">群众</span>
                  <span v-if="$store.state.user.usersInfo.userIdentity === '2'">积极分子</span>
                  <span v-if="$store.state.user.usersInfo.userIdentity === '3'">发展对象</span>
                  <span v-if="$store.state.user.usersInfo.userIdentity === '4'">预备党员</span>
                  <span v-if="$store.state.user.usersInfo.userIdentity === '5'">正式党员</span>
                </div>
                <div class="bottom_item">
                  <span>性别：</span>
                  <span v-if="$store.state.user.sex === '0'">男</span>
                  <span v-if="$store.state.user.sex === '1'">女</span>
                  <span v-if="$store.state.user.sex === '2'">未知</span>
                </div>
                <div class="bottom_item">
                  <span>出生日期：</span>
<!--                  <span>{{moment($store.state.user.usersInfo.birthday * 1000).format('YYYY-MM-DD  HH:mm:ss')}}</span>-->
                  <span>{{ $store.state.user.usersInfo.birthday }}</span>
                </div>
                <div class="bottom_item">
                  <span>民族：</span>
                  <span>{{$store.state.user.usersInfo.nation}}</span>
                </div>
                <div class="bottom_item">
                  <span>年龄：</span>
<!--                  <span> {{moment().year() - moment($store.state.user.usersInfo.birthday * 1000).year() + (moment($store.state.user.usersInfo.birthday * 1000).format('MM') < moment().format('MM') || (moment($store.state.user.usersInfo.birthday * 1000).format('MM') === moment().format('MM') && moment($store.state.user.usersInfo.birthday * 1000).format('DD') < moment().format('DD')) ? 1 : 0)}} 岁</span>-->
                  <span>{{ age }}</span>
                </div>
                <div class="bottom_item">
                  <span>籍贯：</span>
                  <span>{{$store.state.user.usersInfo.nativePlace}}</span>
                </div>
                <div class="bottom_item">
                  <span>身份证：</span>
                  <span>{{$store.state.user.usersInfo.userId}}</span>
                </div>
                <div class="bottom_item">
                  <span>手机号码：</span>
                  <span>{{$store.state.user.phone}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="party_affairs">
            <h2 class="title">党务快捷入口</h2>
            <ul class="party_affairs_list">
              <li class="party_affairs_li" v-for="(item,index) in party" :key="index" @click="goto(item.name)">
                <span class="name fl">{{item.name}}</span>
                <span class="right fr">
                  <svg-icon icon-class="right2"/>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import config from '@/config'
  import moment from 'moment';
  import { loginRecord } from '@/api/pc'
  import {encrypt} from "../../../libs/tools";

  export default {
    name: "profile",
    middleware: 'pcUserAuth',
    components: {
      config,
      NavBar
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 个人中心',
        meta: [
          {
            hid: this.$store.state.app.title,
            name: this.$store.state.app.title,
            content: this.$store.state.app.title
          }
        ]
      }
    },
    data() {
      return {
        moment:moment,
        type: '个人信息',
        attachUrl: config.attachUrl,
        activeIndex: 1,
        recordLogin: [],
        // lmenu: [
        //   {id: 1, name: '个人信息'},
        //   {id: 2, name: '我的通知'},
        //   {id: 3, name: '我的支部生活'},
        //   {id: 4, name: '新时代大科室'},
        //   {id: 5, name: '党务服务中心'},
        // ],
        party: [
          {id: 0, name: "个人信息", icon: "el-icon-location"},
          {id: 1, name: "待办事项", icon: "el-icon-common"},
          {id: 2, name: "通知公告", icon: "el-icon-document"},
          {id: 3, name: "组织生活", icon: "el-icon-document"},
          // {id: 4, name: "入党流程", icon: "el-icon-document"},
          // {id: 5, name: "关系转接", icon: "el-icon-document"},
          { id: 5, name: '工作指引', icon: "el-icon-document"},
          // {id: 6, name: "党费缴纳", icon: "el-icon-document"},
          {id: 7, name: "积分明细", icon: "el-icon-document"},
          {id: 8, name: "留言箱", icon: "el-icon-document"},
          // {id: 9, name: "意见征集", icon: "el-icon-document"},
          {id: 10, name: "专题学习", icon: "el-icon-document"},
          {id: 11, name: "在线考试", icon: "el-icon-document"},
          // {id: 12, name: "党员互动", icon: "el-icon-document"},
          {id: 13, name: "民主评议", icon: "el-icon-document"},
          {id: 14, name: "问卷调查", icon: "el-icon-document"},
          {id: 15, name: "政治生日", icon: "el-icon-document"}
        ],
        age: null
      }
    },
    mounted() {
      this.setBaseInfo()
      this.setUserCenter()
      this.getLoginRecord()
      setTimeout(() => {
        this.getAge()
      }, 20)
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo',
        setUserCenter: 'user/setUserCenter'
      }),
      getAge() {
        let birthday = new Date(this.$store.state.user.usersInfo.birthday)
        let d = new Date()
        this.age = d.getFullYear() - birthday.getFullYear() - (d.getMonth() > birthday.getMonth() ? 0 : (d.getDay() > birthday.getDay() ? 0 : 1))
      },
      logout() {
        this.$confirm('确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.setItem('token', '')
          this.$store.commit('user/SET_DATA', {
            id: '',
            loginName: '',
            avatar: '',
            phone: '',
            email: '',
            orgId: '',
            orgName: '',
            userName: '',
            sex: ''
          })
          this.$store.commit('app/SET_TOKEN', '')
          // window.sessionStorage.clear()
          this.$router.push({path: '/pc/home'})
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });

      },
      goto(type) {
        if (type == '专题学习') {
          this.$router.push({
            path: '/pc/profile/course',
            query: {
              name: '个人中心'
            }
          })
        } else if (type == '在线考试') {
          let params = {
            pdOrgId: this.$store.state.user.orgId,
            type: type,
            pdUserId: this.pdUserId
          }
          params = encrypt(JSON.stringify(params))
          this.$router.push({
            path: '/pc/profile/exam',
            query: {
              name: '个人中心',
              params: params
            }
          })
        } else if (type == '问卷调查') {
          let params = {
            type: type,
            pdOrgId: this.$store.state.user.orgId,
            pdUserId: this.$store.state.user.id
          }
          params = encrypt(JSON.stringify(params))
          this.$router.push({
            path: '/pc/profile/exam',
            query: {
              name: '个人中心',
              params: params
            }
          })
        } else if (type == '民主评议') {
          let params = {
            commentatorId: this.$store.state.user.id
          }
          params = encrypt(JSON.stringify(params))
          this.$router.push({
            path: '/pc/profile/democraticAssessment',
            query: {
              name: '个人中心',
              params: params
            }
          })
        } else if (type == '待办事项') {
          this.$router.push({
            path: '/pc/profile/schedule',
            query: {
              name: '个人中心'
            }
          })
        } else if (type == '通知公告') {
          this.$router.push({
            path: '/pc/profile/notice',
            query: {
              name: '个人中心'
            }
          })
        // } else if (type == '关系转接') {
        //   this.$router.push({
        //     path: '/pc/profile/transfer',
        //     query: {
        //       name: '个人中心'
        //     }
        //   })
        } else if (type == '组织生活') {
          this.$router.push({
            path: '/pc/profile/organization',
            query: {
              name: '个人中心'
            }
          })
        // } else if (type == '入党流程') {
        //   this.$router.push({
        //     path: '/pc/profile/joiningProcess',
        //     query: {
        //       name: '个人中心'
        //     }
        //   })
        } else if (type == '留言箱') {
          this.$router.push({
            path: '/pc/profile/bbs',
            query: {
              name: '个人中心'
            }
          })
        // }else if (type == '意见征集'){
        //   this.$router.push({
        //     path: '/pc/profile/opinion',
        //     query: {
        //       functionType: '0',
        //       name: '个人中心'
        //     }
        //   })
        // }else if(type == '党员互动'){
        //   this.$router.push({
        //     path: '/pc/profile/opinion',
        //     query: {
        //       functionType: '1',
        //       name: '个人中心'
        //     }
        //   })
        } else if (type == '政治生日') {
          this.$router.push({
            path: '/pc/profile/cards',
            query: {
              name: '个人中心'
            }
          })
        } else if (type == '积分明细') {
          this.$router.push({
            path: '/pc/profile/points',
            query: {
              name: '个人中心'
            }
          })
        // } else if (type == '党费缴纳') {
        //   this.$router.push({
        //     path: '/pc/profile/payment',
        //     query: {
        //       name: '个人中心'
        //     }
        //   })
        } else if (type == '个人信息') {
          this.$router.push({
            path: '/pc/profile/userMessage',
            query: {
              name: '个人中心'
            }
          })
        } else if (type == '工作指引') {
          this.$router.push({
            path: '/pc/profile/instructions',
            query: {
              name: '个人中心'
            }
          })
        }
      },
      // gotoItem(item) {
      //   this.activeIndex=item.id
      //   if(item.name == '我的通知') {
      //     this.$router.push({
      //       path: '/pc/profile/notice',
      //       query: {
      //         name: '个人中心'
      //       }
      //     })
      //   } else if(item.name == '我的支部生活') {
      //     this.$router.push({
      //       path: '/pc/profile/organization',
      //       query: {
      //         name: '个人中心'
      //       }
      //     })
      //   } else if(item.name == '新时代大科室') {
      //     this.$router.push({
      //       path: '/pc/profile/course',
      //       query: {
      //         name: '个人中心'
      //       }
      //     })
      //   } else if(item.name == '党务服务中心') {
      //     this.$router.push({
      //       path: '/pc/profile/bbs',
      //       query: {
      //         name: '个人中心'
      //       }
      //     })
      //   }
      // },
      getLoginRecord(){
        loginRecord({}).then( res => {
          if(res.code === 0){
            this.recordLogin = res.data
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .profile {
    width: 1000px;
    margin: 20px auto;
    font-size: 14px;
    display: flex;

    /*.profile_l {*/
    /*  width: 18%;*/
    /*  overflow: auto;*/
    /*  font-size: 14px;*/

    /*  .profile_l_list {*/
    /*    border-top: 1px solid #CCCCCC;*/
    /*    !*border-left: 1px solid #CCCCCC;*!*/
    /*    !*border-right: 1px solid #CCCCCC;*!*/
    /*    border-radius: 4px;*/

    /*    .profile_l_li {*/
    /*      background: #ffffff;*/
    /*      border-bottom: 1px solid #E0E0E0;*/
    /*      padding: 10px 5px;*/
    /*      color: #333333;*/
    /*      cursor: pointer;*/

    /*      .border {*/
    /*        border-left: 4px solid #ffffff;*/
    /*        margin-right: 20px;*/
    /*      }*/

    /*      .icon {*/
    /*        color: #333333;*/
    /*        font-size: 12px;*/
    /*      }*/
    /*    }*/

    /*    .active {*/
    /*      color: #E4393C;*/
    /*      background: #FCF3F3;*/

    /*      .icon {*/
    /*        color: #E4393C;*/
    /*      }*/

    /*      .border {*/
    /*        border-left: 4px solid #E4393C;*/
    /*      }*/
    /*    }*/
    /*  }*/
    /*}*/

    .profile_r {
      /*width: 82%;*/
      width: 100%;
      padding-left: 20px;

      .title {
        margin-top: 5px;
        font-size: 18px;
        color: #333;
        font-weight: bold;

        .more {
          font-size: 12px;
          color: #999999;
          text-align: center;
          cursor: pointer;
        }
      }

      .login {
        margin: 15px 0;
        padding: 5px 15px;
        background: #FAF3F4;
        overflow: auto;
        border: 1px solid #FAE3E4;
      }

      .info {
        display: flex;

        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 15px;
        }

        .info_content {
          /*width: calc(82% - 75px);*/
          width: calc(82% - 125px);
          margin-left: 50px;

          .info_top {
            .top_item {
              font-size: 14px;
              line-height: 20px;

              .value {
                color: #E4393C;
              }
            }
          }

          .info_bottom {
            margin: 30px 0;
            width: 100%;

            .bottom_item {
              display: inline-block;
              line-height: 28px;
              width: 48%;
            }

            .bottom_item:nth-child(2n) {
              padding-left: 60px;
            }
          }
        }
      }

      .party_affairs {
        margin: 20px 0;

        .party_affairs_list {
          margin: 10px 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          text-align: justify;

          .party_affairs_li {
            padding: 6px 10px;
            border: 1px solid #E0E0E0;
            margin: 5px 20px 5px 0;
            border-radius: 4px;
            cursor: pointer;

            .name {
              text-align: center;
            }

            .right {
              font-size: 8px;
              color: #E4393C;
            }
          }

          .party_affairs_li:hover {
            background: #E4393C;
            color: #ffffff;

            .right {
              font-size: 8px;
              color: #ffffff;
            }
          }
        }

        .party_affairs_list {
          .party_affairs_li {
            width: -webkit-calc(100% / 4 - 20px);
            width: calc(100% / 4 - 20px);
          }
        }

        .party_affairs_list:after {
          content: ' ';
          flex: auto;
        }
      }
    }
  }
</style>
