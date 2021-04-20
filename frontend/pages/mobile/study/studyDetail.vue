<template>
  <div>
    <navHeader :title=title></navHeader>
    <div class="video">
      <video :preload="preload" :poster="videoImg" :height="height" :width="width" align="center" :controls="controls" :autoplay="autoplay">
        <source :src="videoSrc" type="video/mp4">
      </video>
    </div>
    <div class="course_detail">
      <p class="name">{{info.title}}</p>
      <p class="study_person">
        <span>{{info.userStudyNum+'人学习'}}</span>
        <span>{{info.orgStudyNum+'个支部学习'}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  import config from '@/config';
  import navHeader from '@/components/mobile/layout/nav-header'
  import {getStudyDetail} from '@/api/mobile'
  export default {
    name: 'Video',
    components: {
      navHeader
    },
    data() {
      return {
        title: '课程详情',
        videoSrc: config.attachUrl + '/profile/upload/2020/09/22/8affd345753bd424e3bec203a89941e2.mp4',
        videoImg: require('@/assets/mobile/video/black.jpg'),
        playStatus: '',
        muteStatus: '',
        isMute: true,
        isPlay: false,
        width: '100%', // 设置视频播放器的显示宽度（以像素为单位）
        height: '250px', // 设置视频播放器的显示高度（以像素为单位）
        preload: 'auto', //  建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        controls: true, // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        autoplay: false,
        info: {}
      }
    },
     methods: {
       getStudyDetail(id){
         getStudyDetail(id).then(res=>{
           this.info = res.data
         })
       }
     },
    mounted() {
      this.getStudyDetail(this.$route.query.id)
    }

  }
</script>

<style scoped lang="less">
.video{
  margin-top: 7vh;
}
.course_detail{
  padding: 2vw 5vw;
  .name{
    font-weight: bold;
    font-size: 2.2vh;
    color: #333;
    line-height: 5vh;
  }
  .study_person{
    span{
      font-size: 2vh;
      padding-right: 3vw;
      border-right: 1px solid #bebebe;
    }
    span:nth-last-child(1){
      border: none;
    }
  }
}
</style>
