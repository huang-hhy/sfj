<template>
  <div class="meeting_appointment">
    <div class="appointment_item">
      <div class="fl">
        <span class="item_name">会议类型</span>
        <img src="~assets/mobile/meeting/info-background.png" alt=""/>
      </div>
      <div class="fr">
        <span class="choose">请选择</span>
        <img src="~assets/mobile/meeting/info-background.png" alt=""/>
      </div>
    </div>
    <div class="appointment_item">
      <div class="fl">
        <span class="item_name">会议日期</span>
        <img src="~assets/mobile/meeting/info-background.png" alt=""/>
      </div>
      <div class="fr">
        <span class="content">2019-08-20</span>
      </div>
    </div>
    <div class="appointment_item">
      <div class="fl">
        <span class="item_name">开始时间</span>
        <span class="content">09 : 00</span>
      </div>
      <div class="fr">
        <span class="item_name">结束时间</span>
        <span class="content">11 : 30</span>
      </div>
    </div>
    <div class="appointment_item">
      <div class="fl">
        <span class="item_name">会议地点</span>
        <img src="~assets/mobile/meeting/info-background.png" alt=""/>
      </div>
      <div class="fr">
        <span class="choose">请选择</span>
        <img src="~assets/mobile/meeting/info-background.png" alt=""/>
      </div>
    </div>
    <div class="appointment_time">
      <img src="~assets/mobile/meeting/info-background.png" alt=""/>
      <span>添加会议时间和地点</span>
    </div>
    <div class="appointment_item">
      <div class="fl">
        <span class="item_name">会议主题</span>
        <img src="~assets/mobile/meeting/info-background.png" alt=""/>
      </div>
      <div class="fr">
        <span class="choose">请输入会议主题，最多32个字</span>
      </div>
    </div>
    <div class="appointment_item">
      <div class="fl">
        <span class="item_name">会议议题</span>
        <textarea rows='3' cols='50' placeholder="请输入会议议题..."></textarea>

        <!--          <span class="item_tip">请输入会议要求，如服饰、人数、携带物品等</span>-->
      </div>
      <div class="fl">
        <div class="issue">
          <img src="~assets/mobile/meeting/info-background.png" alt="" class="issue_photos"/>
          <img src="~assets/mobile/meeting/meeting.png" alt="" class="remove">
        </div>
        <img src="~assets/mobile/meeting/info-background.png" alt="" class="camera"/>
      </div>
    </div>
    <div class="appointment_item">
      <div class="fl">
        <span class="item_name">会议要求</span>
        <span class="item_tip">请输入会议要求，如服饰、人数、携带物品等</span>
      </div>
    </div>
    <div class="appointment_item">
      <div class="fl">
        <span class="item_name">参议人员</span>
        <img src="~assets/mobile/meeting/info-background.png" alt=""/>
      </div>
      <div class="fr">
        <span class="choose">请选择（可多选）</span>
        <img src="~assets/mobile/meeting/info-background.png" alt=""/>
      </div>
    </div>
    <div class="appointment_enclosure">
      <img src="~assets/mobile/meeting/info-background.png" alt=""/>
      <span>添加附件</span>
    </div>
    <div class="appointment_btn">
      <button class="draft">存为草稿</button><button class="release">发布</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "meeting-appointment"
  }
</script>

<style scoped lang="less">
  .meeting_appointment {
    font-size: 2.2vh;

    .appointment_item {
      padding: 2.8vw 0;
      margin: 0 5vw;
      background: #ffffff;
      overflow: auto;
      border-bottom: 1px solid #EEEEEE;

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

      textarea {
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
  }
</style>
