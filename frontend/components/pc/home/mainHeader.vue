<template>
  <div class="main_head_div">
    <div class="main_head">
      <div class="main_h">
        <div class="head_l">
          <img src="@/assets/image/main/logo.png" alt="">
        </div>
        <div class="head_m">
          <ul class="head_nav">
            <li :class="{nav_item:true, nav_active:navIndex===(index+1)}" v-for="(item,index) in navList" :key="index"
                @click="position(item, index)">{{item.name}}
            </li>
          </ul>
        </div>
        <div class="head_r">
          <el-button class="login" @click="handleLogin" size="mini">去看看</el-button>
          <el-button class="register" @click="handleRegister" size="mini">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from "vuex";
  import config from '@/config'

  export default {
    name: "mainHeader",
    props: {
      navIndex: {
        type: Number,
        default: 1
      },
      navName: {
        type: String,
        default: '首页'
      }
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - ' + this.navName,
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
        navList: [
          {name: '首页'},
          {name: '产品特点'},
          {name: '产品功能'},
          {name: '客户案例'},
          {name: '关于我们'},
        ],
      }
    },
    mounted() {
      this.setBaseInfo()
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      handleRegister() {
        window.open('//' + config.domain+ ':8080/#/register')
      },
      handleLogin() {
        this.$router.push({path: '/pc/home'})
      },
      position(item) {
        if (item.name === '首页') {
          this.$router.push({ path: '/pc/home/main' })
        } else if (item.name === '产品特点') {
          this.$router.push({ path: '/pc/home/main/characteristics' })
        } else if (item.name === '产品功能') {
          this.$router.push({ path: '/pc/home/main/function' })
        } else if (item.name === '客户案例') {
          this.$router.push({ path: '/pc/home/main/case' })
        } else if (item.name === '关于我们') {
          this.$router.push({ path: '/pc/home/main/aboutUs' })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .main_head_div{
    position: relative;
    width: 1920px;
    height: 120px;
    margin: auto;
    background: #ffffff;

    .main_head {
      position: fixed;
      position: absolute;
      top: 0;
      left: 0;
      background: #ffffff;
      width: 1920px;
      z-index: 99;

      .main_h {
        width: 1920px;
        display: flex;
        margin: 28px auto 21px;

        .head_l {
          margin-left: 360px;
          margin-right: 290px;

          img {
            width: 121px;
            height: 66px;
          }
        }

        .head_m {
          margin-right: 2px;

          .head_nav {

            .nav_item {
              display: inline-block;
              margin-top: 37px;
              padding-right: 35px;
              cursor: pointer;
              text-align: center;
              color: #2b2a2a;
              font-size: 24px;
              line-height: 30px;
            }

            .nav_active {
              color: #d7000f;
            }

            .nav_item:hover {
              color: #d7000f;
            }
          }
        }

        .head_r {
          margin-top: 37px;
          text-align: right;

          .login{
            background-color: #d7000f;
            color: #f7f5f5;
            font-size: 18px;
            text-align: center;
            height: 33px;
            width: 90px;
            border-radius: 4px;
            cursor: pointer;
            border: #d7000f 1px solid;
          }

          .register{
            background-color: transparent;
            color: #d7000f;
            height: 33px;
            width: 76px;
            font-size: 18px;
            text-align: center;
            border-radius: 4px;
            cursor: pointer;
            border: #d7000f 1px solid;
          }

          .el-button {
            border-radius: 3px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
