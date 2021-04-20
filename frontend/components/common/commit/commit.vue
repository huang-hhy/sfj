<template>
  <div class="tui-card-class tui-card" :class="[full?'tui-card-full':'',border?'tui-card-border':'']" @tap="handleClick"
        @longtap="longTap">
    <div class="tui-card-header" :class="{'tui-header-line':header.line}" :style="{background:header.bgcolor || '#fff'}">
      <div class="tui-header-left">
        <image :src="image.url" class="tui-header-thumb" :class="{'tui-thumb-circle':image.circle}" mode="widthFix" v-if="image.url"
               :style="{height:(image.height || 60)+'rpx',width:(image.width || 60)+'rpx'}"></image>
        <p class="tui-header-title" :style="{fontSize:(title.size || 30)+'rpx',color:(title.color || '#7A7A7A')}" v-if="title.text">{{title.text}}</p>
      </div>
      <div class="tui-header-right" :style="{fontSize:(tag.size || 24)+'rpx',color:(tag.color || '#b2b2b2')}" v-if="tag.text">
        {{tag.text}}
      </div>
    </div>
    <div class="tui-card-body">
      <slot name="body"></slot>
    </div>
    <div class="tui-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tuiCard",
    props: {
      //是否铺满
      full: {
        type: Boolean,
        default: false
      },
      image: {
        type: Object,
        default: function() {
          return {
            url: "", //图片地址
            height: 60, //图片高度
            width: 60, //图片宽度
            circle: false
          }
        }
      },
      //标题
      title: {
        type: Object,
        default: function() {
          return {
            text: "", //标题文字
            size: 30, //字体大小
            color: "#7A7A7A" //字体颜色
          }
        }
      },
      //标签，时间等
      tag: {
        type: Object,
        default: function() {
          return {
            text: "", //标签文字
            size: 24, //字体大小
            color: "#b2b2b2" //字体颜色
          }
        }
      },
      header: {
        type: Object,
        default: function() {
          return {
            bgcolor: "#fff", //背景颜色
            line: false //是否去掉底部线条
          }
        }
      },
      //是否设置外边框
      border: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: 0
      }
    },
    methods: {
      handleClick() {
        this.$emit('click', {
          index: this.index
        });
      },
      longTap() {
        this.$emit('longclick', {
          index: this.index
        });
      }
    }
  }
</script>

<style scoped>
  .tui-card {
    margin: 0 3vw;
    font-size: 2.8vw;
    background-color: #fff;
    border-radius: 1vw;
    box-shadow: 0 0 1vw #eee;
    box-sizing: border-box;
    overflow: hidden;
  }

  .tui-card-full {
    margin: 0 !important;
    border-radius: 0 !important;
  }

  .tui-card-full::after {
    border-radius: 0 !important;
  }

  .tui-card-border {
    position: relative;
    box-shadow: none !important
  }

  .tui-card-border::after {
    content: ' ';
    position: absolute;
    height: 200%;
    width: 200%;
    border: 1px solid #ddd;
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    left: 0;
    top: 0;
    border-radius: 2vw;
    box-sizing: border-box;
    pointer-events: none;
  }

  .tui-card-header {
    width: 100%;
    padding: 2vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    border-top-left-radius: 1vw;
    border-top-right-radius: 1vw;
  }

  .tui-card-header::after {
    content: '';
    position: absolute;
    border-bottom: 1px solid #eaeef1;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    bottom: 0;
    right: 0;
    left: 0;
    pointer-events: none;
  }

  .tui-header-line::after {
    border-bottom: 0 !important;
  }

  .tui-header-thumb {
    height: 6vw;
    width: 6vw;
    vertical-align: middle;
    margin-right: 2vw;
    border-radius: 6vw;
  }

  .tui-thumb-circle {
    border-radius: 50% !important;
  }

  .tui-header-title {
    display: inline-block;
    font-size: 3vw;
    color: #7a7a7a;
    vertical-align: middle;
    max-width: 46vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .tui-header-right {
    font-size: 2.4vw;
    color: #b2b2b2;
  }

  .tui-card-body {
    font-size: 3.2vw;
    color: #262b3a;
    box-sizing: border-box;
  }

  .tui-card-footer {
    font-size: 2.8vw;
    color: #596d96;
    border-bottom-left-radius: 1vw;
    border-bottom-right-radius: 1vw;
    box-sizing: border-box;
  }
</style>
