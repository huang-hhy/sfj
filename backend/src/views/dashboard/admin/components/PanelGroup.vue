<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col v-for="(item, index) in data" :key="index" :xs="24" :sm="24" :lg="12" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper">
            <svg-icon :icon-class="item.icon" class-name="card-panel-icon icon-people" />
          </div>
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="item.num *1" :duration="2600" class="card-panel-num" />
            <div class="card-panel-text">
              {{ item.name }}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    /*height: 108px;*/
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    /*background: #fff;*/
    background-color: transparent;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      /*margin: 14px 0 0 14px;*/
      padding: 10px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 25px;
    }

    .card-panel-description {
      float: left;
      /*font-weight: bold;*/
      /*margin: 26px;*/
      /*margin-left: 0px;*/
      /*margin: 26px 0 26px 10px;*/
      margin-left: 10px;

      .card-panel-text {
        height: 18px;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
        margin-bottom: 12px;
        color: #ffffff;
      }

      .card-panel-num {
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        color: #dd1100;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
