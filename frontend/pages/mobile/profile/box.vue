<template>
  <div>
    <div class="header-main">
      <navHeader :title="title"></navHeader>
    </div>
    <div class="message_appointment">
      <div class="appointment_item">
        <div class="fl">
          <span class="item_name">留言对象</span>
          <img src="~assets/mobile/meeting/info-background.png" alt="">
        </div>
        <div class="fr">
          <span class="choose">{{userInfo.orgName}}</span>

        </div>
      </div>
      <div class="appointment_item">
        <div class="fl">
          <span class="item_name">留言标题</span>
        </div>
        <div class="fl">
          <el-input class="input" v-model="inputTitle" placeholder="请输入留言标题" type="textarea" rows='2'
                    cols='50'></el-input>

        </div>
      </div>
      <div class="appointment_item">
        <div class="fl">
          <span class="item_name">留言内容</span>
          <el-input
            type="textarea"
            placeholder="说点什么吧..."
            rows='4' cols='50'
            maxlength="255"
            @input="descInput"
            v-model="desc">
          </el-input>
          <span class="fr count">{{ txtVal }}/255</span>

        </div>
        <!--        <div class="fl">-->
        <!--          <div class="issue">-->
        <!--            <img src="~assets/mobile/meeting/info-background.png" alt="" class="issue_photos">-->
        <!--            <img src="~assets/mobile/meeting/meeting.png" alt="" class="remove">-->
        <!--          </div>-->
        <!--          <img src="~assets/mobile/meeting/info-background.png" alt="" class="camera">-->
        <!--        </div>-->
      </div>
      <el-upload
        v-model="imgUrl"
        class="appointment_enclosure"
        accept=".jpg,.jpeg,.png,.bmp"
        :limit="10"
        action="http://www.zt.com:3000/api/app/leaveMessage/save"
        multiple
        :on-change="imgSaveToUrl"
        :auto-upload="false"
      >
        <img src="~assets/mobile/meeting/info-background.png" alt="">
        <span>添加图片</span>
      </el-upload>

      <div class="appointment_btn">
        <button class="release" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/mobile/layout/nav-header";
import {setMessage} from '@/api/mobile'
import config from '@/config'

export default {
  name: "box",
  components: {
    NavHeader,
    config
  },
  props: {
    title: {
      type: String,
      default: '留言箱'
    }
  },
  head() {
    return {
      title: this.$store.state.app.title + ' 留言箱',
      meta: [
        {
          hid: this.$store.state.app.title,
          name: this.$store.state.app.title,
          content: this.$store.state.app.title
        }
      ]
    }
  },
  mounted() {
    this.userInfo = this.$store.state.user
  },
  data() {
    return {
      inputTitle: '',
      attachUrl: config.attachUrl,
      txtVal: 0,
      desc: "",
      imgUrl: [],
      userInfo: {}
    }

  },
  methods: {
    descInput() {
      this.txtVal = this.desc.length;
    },
    imgSaveToUrl(event) {
      // 获取上传图片的本地URL，用于上传前的本地预览
      console.log(event)
        var URL = null;
        if (window.createObjectURL != undefined) {
          // basic
          URL = window.createObjectURL(event.raw)+",";
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          URL = window.URL.createObjectURL(event.raw)+",";
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          URL = window.webkitURL.createObjectURL(event.raw)+",";
        }
        // 转换后的地址为 blob:http://xxx/7bf54338-74bb-47b9-9a7f-7a7093c716b5
      //拼接imgUrl集合
        this.imgUrl += URL;
        console.log(this.imgUrl)
        // this.isShowImgUpload = true;//呈现本地预览组件
        // this.isShowUpload = false;//隐藏上传组件

    },
    setMessageInfo(data) {
      setMessage({}).then(res => {
        if (res.code * 1 === 0) {
          this.$toast('提交成功',{
            type:"success"
          })

          console.log(res)
        }
      })
    },
    submit() {
      console.log('提交')
      let data = {
        content: this.desc,
        imgUrl: this.imgUrl
      }
      console.log(data)
      this.setMessageInfo(data)
    }
  }
}

</script>
<style scoped lang="less">
.header-main {
  width: 100%;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 5vw;
  background-color: #F44436;
  position: relative;
}

.message_appointment {
  font-size: 2.2vh;

  .appointment_item {
    padding: 2.8vw 0;
    margin: 0 5vw;
    background: #ffffff;
    overflow: auto;
    //border-bottom: 1px solid #EEEEEE;

    .item_name {
      color: #666666;
    }

    .item_tip {
      font-size: 2vh;
      padding-top: 2vw;
      color: #CCCCCC;
      display: block;
    }

    .content {
      color: #666666;
      margin-left: 2vw;
    }

    img {
      vertical-align: top;
      width: 2vw;
      height: 2vw;
    }

    .choose {
      color: #CCCCCC;
    }

    .count {
      font-size: 10px;
      color: #cccccc;
    }

    .input {
      border: none;
      font-size: 2vh;
      width: 100%;
      margin: 2.5vw 0;
      height: 8vh;
    }

    textarea:focus {
      outline: none;
    }

    textarea::-webkit-input-placeholder {
      color: #CCCCCC;
    }

    .issue {
      display: inline-block;
      position: relative;

      .issue_photos {
        width: 12vw;
        height: 12vw;
        margin-right: 2vw;
        border-radius: 2vw;
      }

      .remove {
        width: 5vw;
        height: 5vw;
        position: absolute;
        top: -2vw;
        right: 0vw;
        border-radius: 50%;
      }
    }

    .camera {
      width: 12vw;
      height: 12vw;
      margin-right: 2vw;
      border-radius: 2vw;
    }
  }

  .appointment_time {
    padding: 2.8vw 5vw;
    background: #ffffff;
    border-bottom: 2.5vw solid #EBEBEB;

    img {
      width: 6vw;
      height: 6vw;
      border-radius: 50%;
      vertical-align: middle;
    }

    span {
      color: #F45043;
      font-weight: bold;
      vertical-align: middle;
    }
  }

  .appointment_enclosure {
    padding: 2.8vw 0;
    margin: 0 5vw;
    background: #ffffff;

    img {
      width: 6vw;
      height: 6vw;
      border-radius: 50%;
      vertical-align: middle;
    }

    span {
      color: #F45043;
      font-weight: bold;
      vertical-align: middle;
    }
  }

  .appointment_btn {
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 5vh;
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
      margin: 0 auto;
    }
  }
}

</style>
