<template>
  <div class="pb_footer">
    <div class="footer">
      <ul class="footer_list">
        <li class="footer_li" v-for="(item,index) in link" :key="index">
          <p v-for="(item2,index2) in item.list" :key="index2">{{item2.name}}</p>
        </li>
        <li class="code_li">
          <img src="@/assets/pc/home/qr-code.jpg" alt=""/>
          <p>移动端</p>
        </li>
      </ul>
      <p>
        <span>温馨提示：使用本平台业务，所涉及的信息仅在本平台间传播</span>
        <span>备案号：粤ICP备17109783号-6</span>
      </p>
      <p v-if="$store.state.app.copyright">
        {{$store.state.app.copyright}}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "footer.vue",
    props: {
      link: {
        type: Array
      }
    }
  }
</script>

<style scoped lang="less">
  .pb_footer {
    clear: both;
    width: 100%;
    margin-top: 20px;
    background-color: #E74C4E;

    .footer {
      width: 1000px;
      margin: 0px auto;
      padding: 20px 0 15px 0;
      font-size: 12px;
      color: #333;

      .footer_list {
        overflow: auto;

        .footer_li {
          width: 12%;
          display: inline-block;
          vertical-align: top;

          p {
            line-height: 20px;
            cursor: pointer;
          }
        }

        .code_li {
          float: right;
          margin-right: 10px;

          img {
            width: 64px;
            height: 64px;
          }

          p {
            text-align: center;
            padding: 2px 0;
          }
        }
      }

      p {

        text-align: center;
        line-height: 20px;
        /*margin: 0 auto;*/

        span {
          margin-right: 10px;
        }
      }
    }
  }
</style>
