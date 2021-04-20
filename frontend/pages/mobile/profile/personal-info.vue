<template>
<div>
  <nav-header :title="title"></nav-header>
  <div class="box"></div>
<ul >
  <li class="profile_item " v-for="(item,index) in infoList" :key="index">{{item.name}}
    <div class="fr right">
<!--      <span class="fl" v-for="(item,index) in personList" :key="index">{{item.value}}</span>-->
    <svg-icon icon-class="right"/>
  </div>
  </li>
</ul>
</div>
</template>

<script>
import NavHeader from "@/components/mobile/layout/nav-header";
export default {
name: "personal-info",
  components: {NavHeader},
  props: {
    title: {
      type: String,
      default: '个人信息'
    }
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 个人信息',
      meta: [
        {
          hid: this.$store.state.app.title,
          name: this.$store.state.app.title,
          content: this.$store.state.app.title
        }
      ]
    }
  },
  data(){
    return{
    infoList:[{name:'头像'},{name:'姓名'},{name:'性别'},{name:'年龄'},{name:'民族'},{name:'籍贯'},{name:'党员类型'},{name: '身份证号码'},{name: '手机号码'},],
      // personList:[{value:'头像 '},{value:'张三 '},{value:'男'},{value:'25'},{value:'汉'},{value:'广东广州'},{value:'共产党员'}]
  }
  }
}
</script>

<style scoped lang="less">
.box{
  margin-top: 7vh;
}
.profile_item {
  font-size: 2vh;
  color: #333333;
  margin: 0 4vw;
  padding: 3vw 0;
  border-bottom: 1px solid #dddddd;
  overflow: auto;

  .right {
    color: #999999;
  }
  .fl {
    float: left
  }
}

</style>
