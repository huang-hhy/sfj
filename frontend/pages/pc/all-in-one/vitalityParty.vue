<template>
  <div class="vitalityParty">
    <div class="header">
      <img src="@/assets/pc/all-in-one/danghui.png" @click="gotoItem">
    </div>
    <div class="chart">
      <div class="echart">
        <histogram :name="'orgType'" />
      </div>
      <div class="echart">
        <piechart :name="'orgNum'" />
      </div>
      <div class="echart">
        <histogram :name="'userAge'" />
      </div>
      <div class="echart">
        <piechart :name="'userEducation'" />
      </div>
      <div class="echart">
        <histogram :name="'partyYears'" />
      </div>
      <div class="echart">
        <piechart :name="'userSex'" />
      </div>
      <div class="echart">
        <piechart :name="'userType'" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import Histogram from "../../../components/pc/echarts/histogram";
  import Piechart from "../../../components/pc/echarts/piechart";

  export default {
    name: "vitalityParty",
    components: {Piechart, Histogram},
    head() {
      return {
        title: '活力党建'
      }
    },
    mounted() {
      this.setBaseInfo()
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo'
      }),
      gotoItem() {
        this.$router.push({ path: '/pc/all-in-one' })
      }
    }
  }
</script>

<style scoped lang="less">
  .vitalityParty {
    height: 2211px;
    width: 3685px;
    background: url("~assets/pc/home/shan.png") no-repeat;
    background-size: 100% 100%;
    overflow: auto;

    img {
      cursor: pointer;
    }

    .header {
      text-align: center;

      img {
        margin: 100px auto;
      }
    }

    .chart {
      overflow: hidden;

      .echart {
        width: calc(33% - 100px);
        height: 500px;
        margin: 100px 50px;
        float: left;
        background: rgba(255, 255, 255, 0.25);
        padding: 20px 0;
      }
    }
  }

  .vitalityParty::-webkit-scrollbar {
    width: 2px;
  }


</style>
