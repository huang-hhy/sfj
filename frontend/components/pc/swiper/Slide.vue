<template>
  <div class="slide">
    <img src="@/assets/image/left-black.png" alt="" class="prev pn">
    <img src="@/assets/image/right-black.png" alt="" class="next pn">
    <div class="img-list">
      <ul>
        <li v-for="(item,index) in slide" :key="index" @click="goTo(item)">
          <img :src="item.img"/>
          <div class="bottom">
            <p>{{item.content}}</p>
          </div>
          <img src="@/assets/pc/home/pause.png" class="pause"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Slide",
    data() {
      return {};
    },
    props: {
      slide: {
        type: Array
      },
      isSlide: {
        type: Boolean
      },
      className: {
        type: Object
      }
    },
    methods: {
      goTo(item) {
        this.$emit('goTo',JSON.parse(JSON.stringify(item)))
      },
      scroll(wraper, prev, next, img, speed, or) {
        if (process.client) {
          var wraper = $(wraper); //$(wraper);
          var prev = $(prev);
          var next = $(next);
          var img = $(img).find("ul");
          var w = img.find("li").outerWidth(true);
          var s = speed;
          next.click(function () {
            img.animate({"margin-left": -w}, function () {
              img
                .find("li")
                .eq(0)
                .appendTo(img);
              img.css({"margin-left": 0});
            });
          });

          prev.click(function () {
            img.find("li:last").prependTo(img);
            img.css({"margin-left": -w});
            img.animate({"margin-left": 0});
          });

          if (or == true) {
            ad = setInterval(function () {
              next.click();
            }, s * 1500);
            wraper.hover(
              function () {
                clearInterval(ad);
              },
              function () {
                ad = setInterval(function () {
                  next.click();
                }, s * 1500);
              }
            );
          }
        }
      }
    },
    created() {
      this.scroll(".slide", ".prev", ".next", ".img-list", 4, false);
    }
  }
</script>

<style scoped lang="less">
  .slide {
    position: relative;
    margin: 0px auto;
    padding-left: 8px;
    width: 1000px;

    .pn {
      cursor: pointer;
      position: absolute;
      display: block;
      width: 30px;
      height: 30px;
      background-color: #FFFFFF;
      border: 1px solid #ccc;
      border-radius: 50%;
      padding: 2px 1px;
      text-align: center;
      line-height: 30px;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .prev {
      left: 16px;
      z-index: 3;
    }

    .next {
      right: -18px;
      z-index: 3;
    }

    .img-list {
      position: relative;
      width: 980px;
      height: 150px;
      margin-left: 10px;
      overflow: hidden;

      ul {
        width: 9999px;

        li {
          display: inline-block;
          width: 235px;
          height: 150px;
          margin-right: 10px;
          line-height: 150px;
          position: relative;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
            position: relative;
          }

          .pause {
            z-index: 10;
            width: 46px;
            height: 46px;
            position: absolute;
            background: #CFCED2;
            border-radius: 50%;
            opacity: 0.7;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .bottom {
            position: absolute;
            bottom: 0;
            width: 235px;
            opacity: 0.6;
            background-color: #333333;
            color: #fff;
            line-height: 22px;
            font-size: 12px;
            padding: 0 8px;
            text-align: center;

            p {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

        }
      }
    }
  }
</style>
