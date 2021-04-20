<template>
<div class=" ">
  <div class="appointment_btn">
    <img src="~assets/mobile/profile/birthday.png" alt="生日贺卡">
    <button class="draft" @click="back">返回</button><button class="release" @click="downloadimg()">下载贺卡</button>
  </div>
</div>
</template>

<script>
export default {
name: "birthday",
  methods:{
    back(){
      this.$router.go(-1);//返回上一层
    },
    downloadimg(){

    }
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 生日贺卡',
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

    }
  }

}
</script>

<style scoped lang="less" >
.birthday {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-attachment: fixed;
  background-image: url('~assets/mobile/profile/birthday.png')
}
img {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-attachment: fixed;
}
.appointment_btn {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;

  button {
    width: 50%;
    height: 7vh;
    font-size: 2.4vh;
    display: inline-block;
  }

  .draft {
    border-top: 1px solid #EEEEEE;
    background: #ffffff;
    color: #F44436;
  }

  .release {
    border-top: 1px solid #F44436;
    background: #F44436;
    color: #ffffff;
  }
}


</style>
