<template>
  <div>
    <div class="reply" :style="showFace?'height:60vh':showComment?'height:22vh':'height:8vh'">
      <div class="commit" v-show="!this.showComment">
        <div class="input" @click="comment">
          <img src="@/assets/mobile/news/edit.png" alt="">
          <input type="text" placeholder="说点什么吧..." @click="showBox=true">
        </div>
        <div class="message">
          <img src="@/assets/mobile/news/commit.png" alt="">
          <span>20</span>
        </div>
      </div>
      <div class="comment" v-show="showComment">
        <div class="content">
          <textarea rows="2" cols="20" ref="textarea" placeholder="说点什么吧..." v-model="inputMsg"></textarea>
        </div>
        <div class="deliver">
          <div class="fl">
            <img src="@/assets/mobile/news/face.png" alt="" class="face" @click="lookFace">
            <img src="@/assets/mobile/news/anonymous.png" alt="" class="anonymous">
            <span>匿名</span>
          </div>
          <div class="fr">
            <button class="cancel" @click="cancel">取消</button>
            <button class="confirm">发表</button>
          </div>
        </div>
      </div>
      <picker
        class="emoji-select"
        v-if="showFace"
        title="Pick your emoji..."
        emoji="point_up"
        @select="addEmoji"
      />
    </div>
    <div class="mask" v-if="showBox" @click="cancel"></div>
  </div>
</template>

<script>
  import {Picker} from 'emoji-mart-vue';

  export default {
    name: "reply.vue",
    data() {
      return {
        showFace: false,
        showComment: false,
        inputMsg: '',
        showEmojiPicker: false,
        showBox: false,
      }
    },
    methods: {
      addEmoji(emoji) {
        let textarea = this.$refs.textarea;
        const cursorPosition = textarea.selectionEnd;
        const start = this.inputMsg.substring(0, textarea.selectionStart);
        const end = this.inputMsg.substring(textarea.selectionStart);
        this.inputMsg = start + emoji.native + end;
        // console.log(this.inputMsg)
        // console.log(typeof (this.inputMsg))
        this.$nextTick(() => {
          textarea.selectionEnd = cursorPosition + emoji.native.length;
          textarea.focus();
        })
      },
      lookFace() {
        this.showFace = !this.showFace;
        if (process.client) {
          document.documentElement.scrollTop = document.documentElement.offsetHeight;
        }
      },
      comment() {
        this.showComment = !this.showComment
        if (!this.showComment)
          this.showFace = false
        if (process.client) {
          document.documentElement.scrollTop = document.documentElement.offsetHeight;
        }
      },
      cancel() {
        this.showComment = false
        this.showFace = false
        this.showBox = false
        if (process.client) {
          document.documentElement.scrollTop = document.documentElement.offsetHeight;
        }
      }
    },
    components: {
      Picker
    }
  }
</script>

<style scoped lang="less">
  .reply {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #ffffff;
    height: 8vh;
    z-index: 10;
    .commit {
      display: flex;
      width: 100%;
      height: 8vh;
      background: #EDEDED;
      padding: 1vw 5vw;

      .input {
        width: 80vw;
        background: #FFFFFF;
        border: 1px solid #DFDFDF;
        border-radius: 4vw;
        padding: 1.2vw 3vw;
        margin: auto 3vw auto 0;

      }

      input {
        width: 90%;
        line-height: 3vh;
        color: #333333;
      }

      input::-webkit-input-placeholder {
        color: #CCCCCC;
      }
    }

    .message {
      position: relative;
      margin: auto 0;

      img {
        width: 6vw;
        height: 6vw;
        /*margin-right: 1vw;*/
        display: inline-block;
      }

      span {
        position: absolute;
        top: -1vw;
        right: -2vw;
        display: inline-block;
        padding: 0 .8vw;
        background: #F25D51;
        color: #ffffff;
        font-size: 1.2vh;
        border-radius: 50%;
      }
    }

    .comment {
      .content {
        textarea {
          width: 100%;
          padding: 3vw;
          height: 14vh;
          border: 1px solid #CCCCCC;
        }

        textarea:focus {
          outline: none;
        }

        textarea::-webkit-input-placeholder {
          color: #CCCCCC;
        }
      }

      .deliver {
        border: none;
        overflow: auto;
        padding: 1vw 0 2vw 0;
        font-size: 1.8vh;
        line-height: 5vh;

        .face {
          width: 7vw;
          height: 7vw;
          margin-left: 3vw;
        }

        .anonymous {
          width: 4vw;
          height: 4vw;
          margin: 0 .3vw 0 1vw;
        }

        button {
          width: 18vw;
          height: 5vh;
          margin-right: 2vw;
          border-radius: 1.2vw;
        }

        .cancel {
          color: #A1A1A1;
          background: #ffffff;
          border: 1px solid #A1A1A1;
        }

        .confirm {
          color: #ffffff;
          background: #F44436;
          border: 1px solid #F44436;
        }
      }
    }

    /deep/ .emoji-select {
      width: 100% !important;
      height: 40vh !important;
    }

    /deep/ .emoji-mart-search {
      display: none;
    }

    /deep/ .emoji-mart-preview {
      display: none;
    }
    /deep/ .emoji-mart-category-label{
      display: none;
    }
    /ddep/ .emoji-mart-scroll{
      display: none;
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;
  }
</style>
