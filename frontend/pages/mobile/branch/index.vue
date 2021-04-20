<template>
  <div>
    <div class="branch_head"></div>
    <div class="branch_content">
      <div class="branch_list" v-for="(item,index) in branchList" :key="index">
        <div class="branch_left">
          <img class="avatar" src="@/assets/mobile/profile/wode-icon-shequdangxiao.png" alt="">
        </div>
        <div class="branch_right">
          <p class="name">{{item.userName+' · '+item.orgName}}</p>
          <p class="content">{{item.content}}</p>
          <div class="img_list">
            <img class="branch_img" v-for="(item2,index2) in item.imgUrl" :key="index2" :src="attachUrl+item2" preview="1" alt="" preview-text="item.content">
          </div>
          <div class="content_detail">
            <p class="time">2020-09-28</p>
            <img src="@/assets/mobile/branch/praise.png" class="praise" alt="" @click="leaveMessagePraise(item.id)">
          </div>
          <div class="praise_list" v-if="item.praiseUserNames">
            <img class="love" src="@/assets/mobile/branch/love.png" alt="">
            <span class="love_name">{{item.praiseUserNames}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {leaveMessageList,leaveMessagePraise} from '@/api/mobile'
  import config from '@/config';
  export default {
    layout: 'mobile',
    name: "index",
    data() {
      return {
        attachUrl: config.attachUrl,
        branchList: [],
        dataList: [
          {name: '测试1', icon: require('@/assets/mobile/profile/wode-icon-shequdangxiao.png')},
          {name: '测试2', icon: require('@/assets/mobile/profile/wode-icon-zaixiankaosi.png')},
          {name: '测试3', icon: require('@/assets/mobile/profile/wode-icon-shiziku.png')}
        ]
      }
    },
    methods: {
      leaveMessagePraise(id){
        leaveMessagePraise({id}).then(res=>{
          if(res.code === 0) {
            this.leaveMessageList()
          }
        })
      },
      leaveMessageList() {
        leaveMessageList({pageNum: 1, pageSize: 9999}).then(res=>{
          if(res.code === 0){
            this.branchList = res.data.list
            this.branchList.forEach(item=>{
              item.imgUrl = JSON.parse(item.imgUrl)
            })
            this.$previewRefresh()
          }
        })
      }
    },
    mounted() {
      this.leaveMessageList()
    }
  }
</script>

<style lang="less" scoped>
  .branch_head {
    background: url('~assets/mobile/branch/zhibuquan-bg.png') no-repeat center 0 scroll;
    background-size: 100% 10vh;
    height: 10vh;
  }

  .branch_content {
    margin-bottom: 10vh;

    .branch_list {
      padding: 2vw 5vw;
      background: #FFFFFF;
      border-bottom: 1px solid #f5f5f5;
      overflow: auto;

      .branch_left {
        float: left;
        width: 15%;

        .avatar {
          vertical-align: top;
          width: 12vw;
          height: 12vw;
          border: 1px solid #999;
          border-radius: 50%;
          margin-right: 4vw;
        }
      }

      .branch_right {
        float: right;
        width: 82%;

        .name {
          line-height: 12vw;
          color: #999;
          font-size: 2vh;
        }

        .content {
          color: #333;
          font-size: 2vh;
          line-height: 6vw;
        }

        .img_list {
          margin: 2vw 0;

          .branch_img {
            margin-right: 4.5vw;
            margin-top: 2vw;
            width: 27%;
            height: 15vw;
            cursor: pointer;
          }
        }

        .content_detail {
          overflow: auto;
          margin-bottom: 1vw;

          .time {
            float: left;
          }

          .praise {
            float: right;
            width: 5vw;
            right: 5vw;
          }
        }

        .praise_list {
          background: #eeeeee;
          margin: auto 0;
          padding: 1vw 2vw;

          .love {
            width: 4.5vw;
            height: 5vw;
          }

          .love_name {
            font-size: 2vh;
            color: #8895AF;
            vertical-align: middle;
            margin-right: 2vw;
          }
        }
      }
    }
  }
</style>
