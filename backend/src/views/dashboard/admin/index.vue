<template>
  <div class="dashboard-editor-container">
    <div style="width: 1450px; margin: auto">
      <div class="header">
        <img src="../../../assets/images/index/top.png" style="width: 100%" alt="">
        <div class="title">
          {{ title }}
        </div>
      </div>
      <div style="overflow: hidden">
        <div class="dashboard-editor-container_l">
          <div class="dashboard_l_item lTop">
            <div class="dashboard_l_item_title">
              <div class="dashboard_l_item_image" />
              <div style="float:left;">党组织数</div>
            </div>
            <panel-group :data="orgData" @handleSetLineChartData="handleSetLineChartData" />
          </div>
          <div class="dashboard_l_item lBottom">
            <div class="dashboard_l_item_title">
              <div class="dashboard_l_item_image" />
              <div style="float:left;">党员统计</div>
            </div>
            <!--            <line-chart :chart-data="lineChartData" />-->
            <panel-group :data="userData" @handleSetLineChartData="handleSetLineChartData" />
          </div>
        </div>
        <div class="dashboard-editor-container_c">
          <div class="dashboard_c_item cTop">
            <div class="dashboard_c_item_title">
              <div class="dashboard_c_item_image" />
              <div style="float:left;">党员结构</div>
            </div>
            <div style="overflow:hidden;">
              <div style="float:left;width: 48%;padding: 0 1%">
                <raddar-chart />
              </div>
              <div style="float:left;width: 48%;padding: 0 1%">
                <pie-chart />
              </div>
            </div>
          </div>
          <div class="dashboard_c_item cBottom">
            <div class="dashboard_c_item_title">
              <div class="dashboard_c_item_image" />
              <div style="float:left;">组织生活</div>
            </div>
            <bar-chart />
          </div>
        </div>
        <div class="dashboard-editor-container_r">
          <div class="dashboard_r_item">
            <div class="dashboard_r_item_title">
              <div class="dashboard_r_item_image" />
              <div style="float:left;">律师行业党委数据</div>
            </div>
            <panel-group :data="lawyersData" @handleSetLineChartData="handleSetLineChartData" />
          </div>
          <div class="dashboard_r_item">
            <div class="dashboard_r_item_title">
              <div class="dashboard_r_item_image" />
              <div style="float:left;">律师行业党员数据</div>
            </div>
            <panel-group :data="lawyersMemberData" @handleSetLineChartData="handleSetLineChartData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import { getStatisticOrgUsers, getStatisticOrgs } from '@/api/data-count'
// import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
// import TodoList from './components/TodoList'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    // LineChart,
    RaddarChart,
    PieChart,
    BarChart
    // TodoList
  },
  data() {
    return {
      title: sessionStorage.getItem('title') || '智慧党建云',
      lineChartData: lineChartData.newVisitis,
      orgData: [
        {
          name: '基层党委',
          icon: 'partyOrg',
          num: 12
        },
        {
          name: '党支部',
          icon: 'partyOrg',
          num: 172
        },
        {
          name: '党总支部',
          icon: 'partyOrg',
          num: 10
        },
        {
          name: '党小组',
          icon: 'partyOrg',
          num: 30
        }
      ],
      userData: [
        {
          name: '正式党员',
          icon: 'peoples',
          num: 3188
        },
        {
          name: '预备党员',
          icon: 'peoples',
          num: 44
        },
        {
          name: '男党员',
          icon: 'peoples',
          num: 2221
        },
        {
          name: '女党员',
          icon: 'peoples',
          num: 1011
        },
        {
          name: '在职党员',
          icon: 'peoples',
          num: 2297
        },
        {
          name: '离退休党员',
          icon: 'peoples',
          num: 935
        },
        {
          name: '党员',
          icon: 'peoples',
          num: 3232
        },
        {
          name: '党员平均年龄',
          icon: 'peoples',
          num: '51.6'
        }
      ],
      lawyersData: [
        {
          name: '律所党组织',
          icon: 'partyOrg',
          num: 336
        },
        {
          name: '律所党委',
          icon: 'partyOrg',
          num: 7
        },
        {
          name: '党总支',
          icon: 'partyOrg',
          num: 3
        },
        {
          name: '党支部',
          icon: 'partyOrg',
          num: 326
        }
      ],
      lawyersMemberData: [
        {
          name: '党员',
          icon: 'peoples',
          num: 5073
        },
        {
          name: '党员律师',
          icon: 'peoples',
          num: 4039
        }
      ]
    }
  },
  mounted() {
    this.getOrgs()
    // this.getOrgUsers()
  },
  methods: {
    getOrgs() {
      getStatisticOrgs().then(res => {
        if (res.code * 1 === 0) {
          const orgTypes = res.data.orgTypes
          this.orgData = orgTypes.reduce((res, current) => {
            res.push({
              name: current.name,
              icon: 'partyOrg',
              num: current.num
            })
            return res
          }, [])
        }
      })
    },
    getOrgUsers() {
      getStatisticOrgUsers({ orgId: '' }).then(res => {
        if (res.code * 1 === 0) {
          console.log(res)
        }
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  /*padding: 32px;*/
  /*background-color: rgb(240, 242, 245);*/
  position: relative;
  background-color: #131360;

  .header {
    color: #fff;
    text-align: center;
    position: relative;

    .title {
      display: block;
      position: absolute;
      top: 30%;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
    }
  }

  .dashboard-editor-container_l {
    float: left;
    width: 370px;

    .dashboard_l_item {
      margin: 40px auto;
      padding: 0 20px 0 20px;

      .dashboard_l_item_title {
        margin-bottom: 30px;
        padding-top: 40px;
        color: #ffffff;
        overflow: hidden;

        .dashboard_l_item_image {
          float: left;
          background-color: yellow;
          width: 10px;
          height: 15px;
          margin: 0 10px;
        }

        span {
          font-size: 16px;
          line-height: 30px;
        }
      }
    }

    .lTop {
      background-image: url("../../../assets/images/index/left.png");
      background-size: 100% 100%;
    }

    .lBottom {
      background-image: url("../../../assets/images/index/centerBottom.png");
      background-size: 100% 100%;
    }
  }

  .dashboard-editor-container_c {
    float: left;
    width: 650px;
    margin: 0 40px 0 40px;

    .dashboard_c_item {
      margin: 40px auto;
      padding: 20px;

      .dashboard_c_item_title {
        margin-bottom: 30px;
        overflow: hidden;
        color: #ffffff;
        padding-top: 20px;

        .dashboard_c_item_image {
          float: left;
          background-color: yellow;
          width: 10px;
          height: 15px;
          margin: 0 10px;
        }

        span {
          font-size: 16px;
          line-height: 30px;
        }
      }
    }

    .cTop {
      background-image: url("../../../assets/images/index/centerTop.png");
      background-size: 100% 100%;
    }

    .cBottom {
      background-image: url("../../../assets/images/index/centerBottom.png");
      background-size: 100% 100%;
      padding-right: 40px;
    }
  }

  .dashboard-editor-container_r {
    float: left;
    width: 335px;

    .dashboard_r_item {
      margin: 40px auto;
      padding: 30px;
      background-image: url("../../../assets/images/index/right.png");
      background-size: 100% 100%;

      .dashboard_r_item_title {
        margin-bottom: 20px;
        overflow: hidden;
        padding-top: 20px;
        color: #ffffff;

        .dashboard_r_item_image {
          float: left;
          background-color: yellow;
          width: 10px;
          height: 15px;
          margin-right: 5px;
        }

        span {
          font-size: 16px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
