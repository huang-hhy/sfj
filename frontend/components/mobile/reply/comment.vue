<template>
  <div class="news_comment">
    <ul class="comment_list">
      <li class="comment_li">
        <img src="@/assets/mobile/profile/user.png" alt="" class="fl">
        <div class="fr sponsor">
          <p class="name">仙女穿搭教室</p>
          <p class="reply">
            <span class="content">好看</span>
            <span class="time">昨天23:08</span>
          </p>
          <div class="add_reply">
            <div class="add_reply_head">
              <img src="@/assets/mobile/profile/user.png" alt="" class="fl">
              <p class="name">太阳</p>
            </div>
            <div class="add_reply_content">
              <span class="content">高个子不是要穿长款，而是要长一点的短款。。。。</span>
              <span class="time">8小时前</span>
            </div>
          </div>
          <div class="add_reply">
            <div class="add_reply_head">
              <img src="@/assets/mobile/profile/user.png" alt="" class="fl">
              <p class="name">太阳</p>
            </div>
            <div class="add_reply_content">
              <span class="content">高个子不是要穿长款，而是要长一点的短款。。。。</span>
              <span class="time">8小时前</span>
            </div>
          </div>
        </div>
        <div class="comment_reply fr">
          <span class="reply">回复</span>
          <span class="more">查看更多</span>
        </div>
      </li>
      <li class="comment_li">
        <img src="@/assets/mobile/profile/user.png" alt="" class="fl">
        <div class="fr sponsor">
          <p class="name">仙女穿搭教室</p>
          <p class="reply">
            <span class="content">好看</span>
            <span class="time">昨天23:08</span>
          </p>
          <div class="add_reply">
            <div class="add_reply_head">
              <img src="@/assets/mobile/profile/user.png" alt="" class="fl">
              <p class="name">太阳</p>
            </div>
            <div class="add_reply_content">
              <span class="content">高个子不是要穿长款，而是要长一点的短款。。。。</span>
              <span class="time">8小时前</span>
            </div>
          </div>
          <div class="add_reply">
            <div class="add_reply_head">
              <img src="@/assets/mobile/profile/user.png" alt="" class="fl">
              <p class="name">太阳</p>
            </div>
            <div class="add_reply_content">
              <span class="content">高个子不是要穿长款，而是要长一点的短款。。。。</span>
              <span class="time">8小时前</span>
            </div>
          </div>
        </div>
        <div class="comment_reply fr">
          <span class="reply">回复</span>
          <span class="more">查看更多</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "comment"
  }
</script>

<style scoped lang="less">
  .news_comment {
    padding: 4vw 5vw;
    margin-bottom: 5vh;
    background: #f5f5f5;
    .comment_list {
      margin-bottom: 3vw;
      .comment_li{
        margin: 2vw 0;
        overflow: auto;
        img {
          width: 10vw;
          height: 10vw;
          margin-right: 2vw;
          border-radius: 50%;
        }

        .sponsor {
          width: 78vw;
          margin: auto 0;

          .name {
            color: #666666;
            font-size: 1.9vh;
          }

          .reply {
            margin-bottom: 2vw;
            text-align: justify;
            .content {
              font-size: 2vh;
              color: #333333;
              margin-right: 1vw;
            }

            .time {
              font-size: 1.8vh;
              color: #999999;
            }
          }

          .add_reply_head {
            display: flex;
            margin: 1vw 0;
            img {
              width: 6vw;
              height: 6vw;
              margin-right: 0.5vw;
            }

            .name {
              height: 6vw;
              line-height: 6vw;
              color: #666666;
              font-size: 1.9vh;
            }
          }

          .add_reply_content {
            margin-left: 6.5vw;

            text-align: justify;
            .content {
              font-size: 2vh;
              color: #333333;
            }
            .time{
              font-size: 1.8vh;
              color: #999999;
            }
          }
        }
        .comment_reply{
          font-size: 1.8vh;
          .reply{
            margin-right: 4vw;
          }
        }
      }
    }
  }
</style>
