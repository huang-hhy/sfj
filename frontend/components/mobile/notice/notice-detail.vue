<template>
  <div>
    <div class="notice_detail">
      <h2 class="title">{{ item.title }}</h2>
      <p class="time">
        <span class="fl">来源：{{ item.orgName }}</span>
        <span class="fr">{{ item.updateTime }}</span>
      </p>
      <div class="notice_content">
        <p class="paragraph">{{item.content}}</p>
        <p class="paragraph">
          为贯彻落实十九大精神，实现2020年全民脱贫目标，党组织决定组织全体广东分公司全体党员于2019年6月10日一起和使命，贯彻以人民为中心的发展思想，落实新发展理念，做好稳增长、促改革、调结构、惠民生、防风险、保稳定各项工作，不断增强各族群众的获得感、幸福感、安全感，把祖国北部边疆这道风景线打造得更加亮丽。
          相关要求：</p>
        <p class="paragraph">1、参会人员不予请假，特殊情况须报领导批准，并写以书面的形式写明理由。</p>
        <p class="paragraph">2、因会议涉及选举，所以不到场人员均视为弃权。</p>
        <p class="paragraph">3、参会人员尽可能穿正装 出席，贯彻以人民为中心的发展思想，落实新发展理念，做好稳增长、促改革、调结构、惠民生、防风险、保稳定各项工作。</p>
        <p class="paragraph">请各党支部按照要求做好相关准备工作，务必保证本次会议顺利进行。</p>
      </div>
<!--      <div class="file">-->
<!--        <div class="pdf">-->
<!--          <img src="~assets/image/test.png" alt="">-->
<!--          <p>-->
<!--            <span>9月份党支部委员会会议纪要.pdf</span>-->
<!--            <span>1.2MB</span>-->
<!--          </p>-->
<!--        </div>-->
<!--        <img src="~assets/image/test.png" alt="" class="more">-->
<!--      </div>-->
    </div>
    <reply></reply>
  </div>
</template>

<script>
  import reply from "@/components/mobile/reply/reply";
  import {getNoticeDetail} from '@/api/mobile'

  export default {
    name: "notice-detail",
    components: {
      reply
    },
    data() {
      return {
        item: {},
      }
    },
    methods: {
      getNoticeInfo(id){
        //查询通知公告详情
        getNoticeDetail(id).then(res =>{
          if (res.code * 1 === 0) {
            res.data.updateTime = this.$op.moment(res.data.updateTime * 1000).format('YYYY-MM-DD')
            this.item = res.data
            console.log('查询通知公告详情')
            console.log(this.item)
          }
        })
      }
    },
    mounted() {
      let {id} = this.$route.query
      this.getNoticeInfo(id)
    }
  }
</script>

<style scoped lang="less">
  .notice_detail {
    padding: 5vw;
    margin-bottom: 8vh;
    margin-top: 7vh;

    .title {
      text-align: center;
      font-size: 2.8vh;
      line-height: 3.2vh;
      margin-bottom: 2vw;
      font-weight: bold;
      color: #000;
    }

    .time {
      line-height: 2.4vh;
      overflow: auto;

      span {
        font-size: 1.8vh;
        margin-right: 2vw;
        color: #9D9D9D;
      }
    }

    .notice_content {
      padding: 3vw 0;

      .paragraph {
        line-height: 3vh;
        text-indent: 2em;
        font-size: 2vh;
        color: #333333;
        text-align: justify;
      }
    }

    .file {
      border: 1px solid #CCCCCC;
      border-radius: 2vw;
      padding: 4vw;
      overflow: auto;
      color: #F44E41;

      .pdf {
        display: flex;
        float: left;
        vertical-align: middle;

        img {
          width: 10vw;
          height: 10vw;
          border-radius: 2vw;
        }

        p {
          margin: 0 2vw;

          span {
            display: block;
            vertical-align: middle;
            line-height: 2.8vh;
          }
        }
      }

      .more {
        float: right;
        width: 6vw;
        height: 6vw;
        margin-top: 2vw;
      }
    }
  }
</style>
