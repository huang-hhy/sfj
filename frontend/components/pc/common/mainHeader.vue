<template>
  <div class="mainHeader">
    <div v-if="content.sort * 1 === 0" class="main">
      <div class="title">
        <i class="el-icon-location-information"/>
        <span>{{ content.title }}</span>
      </div>
      <div class="more" @click="gotoItem">
        <span>更多</span>
        <i class="el-icon-d-arrow-right" />
      </div>
    </div>
    <div v-else-if="content.sort * 1 === 1" class="secondary">
      <i class="el-icon-location-information" />
      <span>{{ content.title }}</span>
    </div>
    <div v-else-if="content.sort * 1 === 2" class="pages">
      <i class="el-icon-location-information" />
      <span class="name" @click="gotoItem">{{ content.name }}</span>
      <span> > </span>
      <span :class="content.topic ? 'titles' : 'title'" @click="goTitle">{{ content.title }}</span>
      <span v-if="content.topic"> > </span>
      <span v-if="content.topic" class="topic">{{ content.topic }}</span>
    </div>
  </div>
</template>

<script>
  import {encrypt} from "../../../libs/tools";

  export default {
    name: "mainHeader",
    props: {
      content: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      gotoItem() {
        this.$router.push({
          path: this.content.url,
          query: {
            name: this.content.name
          }
        })
      },
      goTitle() {
        if (this.content.topic) {
          let params = {
            type: this.content.type
          }
          params = encrypt(JSON.stringify(params))
          this.$router.push({
            path: this.content.path,
            query: {
              name: this.content.name,
              params: params
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .mainHeader {

    .main {
      overflow: hidden;
      line-height: 60px;

      .title {
        font-size: 18px;
        font-weight: bold;
        color: #335C88;
        float: left;

        i {
          font-size: 24px;
          font-weight: bold;
          margin-right: 10px;
        }
      }
      .more {
        float: right;
        cursor: pointer;
        i {
          margin-left: 5px;
        }
      }

      .more:hover {
        color: #335C88;
      }
    }

    .secondary {
      font-size: 18px;
      font-weight: bold;
      color: #335C88;

      i {
        font-size: 24px;
        font-weight: bold;
        margin-right: 10px;
      }
    }

    .pages {
      font-size: 16px;
      line-height: 30px;

      span {
        margin: 0 5px;
      }

      i {
        color: #335C88;
        font-size: 24px;
        font-weight: bold;
        margin-right: 10px;
      }

      .name, .title, .titles, .topic {
        cursor: pointer;
        color: #1a1a1a;
      }

      .name:hover, .titles:hover {
        color: #335C88;
      }
    }
  }
</style>
