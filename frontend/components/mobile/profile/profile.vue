<template>
  <div class="profile">
    <div class="profile_head">
      <div class="userInfo">
        <img :src="$store.state.user.avatar?$store.state.user.avatar:require('@/assets/mobile/profile/user.png')"
             class="userInfo_img" alt="">
        <div class="userInfo_content">
          <p class="userInfo_name">{{$store.state.user.loginName}}</p>
          <p class="userInfo_org">{{$store.state.user.orgName}}</p>
        </div>
      </div>
      <div class="profile_menu">
        <div class="menu_item">
          <img class="menu_item_img" src="@/assets/mobile/profile/integral.png" alt="">
          <p class="menu_item_name">积分{{$store.state.user.score}}</p>
        </div>
        <div class="menu_item">
          <img class="menu_item_img" src="@/assets/mobile/profile/clock.png" alt="">
          <p class="menu_item_name">打卡{{$store.state.user.studyNum}}</p>
        </div>
      </div>
    </div>
    <div class="modular" v-for="(item,index) in modularList" :key="index">
      <div class="title">{{item.title}}</div>
      <div class="modular_list">
        <div class="modular_li" v-for="(item2,index2) in item.list" :key="index2" @click="goto(item2.path,item2.typeName)">
          <img class="modular_li_img" :src="index===0?attachUrl+item2.icon:item2.icon" alt="">
          <p class="modular_li_name">{{item2.typeName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {meetingType} from '@/api/mobile'
  import config from '@/config';
  import {mapActions} from "vuex";

  export default {
    name: "profile",
    data() {
      return {
        attachUrl: config.attachUrl,
        login: true,
        item: [],
        headList: [
          {id: 1, name: '积分', img: require('@/assets/mobile/profile/integral.png')},
          {id: 2, name: '打卡', img: require('@/assets/mobile/profile/clock.png')}
        ],
        modularList: []
      }
    },
    mounted() {
      this.meetingType()
      this.setUserCenter()
    },
    methods: {
      goto(path,name) {
        this.$router.push({path: path, query:{name}})
      },
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo',
        setUserCenter: 'user/setUserCenter'
      }),
      meetingType() {
        meetingType({}).then(res => {
          res.data.forEach(item => {
            item.path = '/mobile/profile/party-org-life'
          })
          this.modularList.push({title: '党组织生活', list: res.data})
          const list1 = [
            {
              typeName: '组织关系转接',
              icon: require('@/assets/mobile/profile/wode-icon-guanxizhaunjie.png'),
              path: '/mobile/profile/relationship-transfer-list'
            },
            {typeName: '流动党员', icon: require('@/assets/mobile/profile/wode-icon-liudongdangyuan.png')},
            {typeName: '组织通讯录', icon: require('@/assets/mobile/profile/wode-icon-tongxunlu.png')},
            {typeName: '党员知识问答', icon: require('@/assets/mobile/profile/wode-icon-zhishiwenda.png')}
          ]
          this.modularList.push({title: '党员服务', list: list1})
          const list2 = [
            {typeName: '社区党校', icon: require('@/assets/mobile/profile/wode-icon-shequdangxiao.png')},
            {typeName: '在线考试', icon: require('@/assets/mobile/profile/wode-icon-zaixiankaosi.png'), path: '/mobile/profile/online-exam-list'},
            {typeName: '师资库', icon: require('@/assets/mobile/profile/wode-icon-shiziku.png')}
          ]
          this.modularList.push({title: '教育培训', list: list2})
          const list3 = [
            {typeName: '党群服务中心', icon: require('@/assets/mobile/profile/wode-icon-fuwuzhongxin.png')},
            {typeName: '党务公开', icon: require('@/assets/mobile/profile/wode-icon-dangwugongkai.png')}
          ]
          this.modularList.push({title: '党群服务', list: list3})
        })
      },
      loginSkip() {
        this.$router.push({path: '/mobile/login'})
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
    }
  }
</script>

<style scoped lang="less">
  .profile {
    margin-bottom: 7vh;
    background: #F5F5F5;

    .profile_head {
      position: relative;
      height: 26vh;
      background: url('~assets/mobile/profile/wode-bg.png') no-repeat center 0 scroll;
      background-size: 100% 18vh;

      .userInfo {
        display: flex;
        margin: auto 0;
        position: absolute;
        top: 6vh;
        left: 8vw;
        z-index: 2;

        .userInfo_img {
          width: 14vw;
          height: 14vw;
          border-radius: 50%;
          margin-right: 2vw;
        }

        .userInfo_content {
          margin: auto 0;

          .userInfo_name {
            color: #fff;
            font-weight: bold;
            font-size: 2.2vh;
            line-height: 4vh;
          }

          .userInfo_org {
            font-size: 1.8vh;
            display: inline-block;
          }
        }
      }

      .profile_menu {
        margin: 5vw;
        width: calc(100% - 10vw);
        background: #ffffff;
        border-radius: 2vw;
        padding: 0 8vw;
        display: flex;
        position: absolute;
        top: 7.6vh;
        left: 0;

        .menu_item {
          width: 50%;
          text-align: center;
          margin: 8vw 0 1vw 0;
          border-right: .1vw solid #f4f4f4;

          .menu_item_img {
            width: 25%;
            height: 5vh;
          }

          .menu_item_name {
            line-height: 4vh;
          }
        }

        .menu_item:nth-last-child(1) {
          border: none;
        }
      }
    }

    .modular {
      clear: both;
      margin: 2vw 5vw;

      .title {
        border-left: 4px solid #F44436;
        height: 4vw;
        line-height: 4vw;
        font-size: 2vh;
        color: #000000;
        padding-left: 2vw;
      }

      .modular_list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        margin: 2vh 0;
        border-bottom: 1px solid #dddddd;
      }

      .modular_li {
        width: 25%;
        text-align: center;
        margin: .5vh 0;
        color: #666666;
        cursor: pointer;

        .modular_li_img {
          width: 40%;
          height: 4vh;
        }

        .modular_li_name {
          line-height: 3.8vh;
          font-size: 1.7vh;
          text-align: center;
        }
      }

      .modular_list {
        .modular_li {
          width: -webkit-calc(100% / 4);
          width: calc(100% / 4);
        }
      }

      .modular_list:after {
        content: ' ';
        flex: auto;
      }
    }
  }
</style>
