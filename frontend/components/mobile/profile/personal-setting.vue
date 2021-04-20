<template>
  <div class="personal_setting">
    <div class="setting_card">
      <div class="setting_item">
        <p class="name fl">修改密码</p>
        <p class="content fr">
          <svg-icon icon-class="right"/>
        </p>
      </div>
    </div>
    <div class="setting_card">
      <div class="setting_item">
        <p class="name fl">清除缓存</p>
        <p class="content fr">
          <svg-icon icon-class="right"/>
        </p>
      </div>
      <div class="setting_item">
        <p class="name fl">最新版本</p>
        <p class="content fr">1.5.2
          <svg-icon icon-class="right"/>
        </p>
      </div>
    </div>
    <div class="setting_card">
      <div class="setting_item">
        <p class="name fl">服务协议</p>
        <p class="content fr">
          <svg-icon icon-class="right"/>
        </p>
      </div>
      <div class="setting_item">
        <p class="name fl">关于我们</p>
        <p class="content fr">
          <svg-icon icon-class="right"/>
        </p>
      </div>
    </div>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
  export default {
    name: "personal-setting",
    methods:{
      logout(){
        this.$router.push({path: '/mobile/home'})
      }
    }
  }
</script>

<style scoped lang="less">
  .personal_setting {
    margin-top: 7vh;

    .setting_card {
      padding: 0 5vw;
      border-bottom: 1.8vw solid #F1F1F1;

      .setting_item {
        font-size: 2.2vh;
        padding: 2vw 0;
        border-bottom: .2vw solid #F1F1F1;
        overflow: auto;

        .name {
          color: #333333;
        }

        .content {
          color: #999999;
        }
      }
    }

    .border {

    }

    .setting_item:nth-last-child(1) {
      border: none;
    }

    button {
      margin: 3vw 5vw;
      width: calc(100% - 10vw);
      height: 5vh;
      line-height: 5vh;
      border-radius: 1.6vw;
      background: #F44436;
      color: #ffffff;
    }
  }
</style>
