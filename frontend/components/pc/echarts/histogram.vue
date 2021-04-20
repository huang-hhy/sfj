<template>
  <div class="count-chart-wrapper">
    <div class="chart-title">
      {{ title }}
    </div>
    <div class="count-chart" ref="chart"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import {statisticMeeting, staticOrgUser} from '@/api/pc'

  export default {
    name: "histogram",
    props: {
      name: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        title: '发货量',
        colorList: [
          //设置发货柱子的，普通的柱子颜色
          '#69d3be',
          '#9D9E9F',
          '#F88282'
        ],
        // colorList2: [
        //   //设置发货柱子的，柱子实现渐变色
        //   ["#0282DE", "#3F28D0"],
        //   ["#FED701", "#E66938"],
        //   ["#67E0E3", "#0181DE"]
        // ],
        list: ['1', '2', '3', '1', '2', '3'],
        nameList: ['一', '二', '三', '四', '五', '六']
      }
    },
    mounted() {
      setTimeout(() => {
        this.getList()
      }, 500)
    },
    methods: {
      getList() {
        this.title = ''
        this.list = []
        this.nameList = []
        staticOrgUser({ orgId: this.$store.state.app.id }).then(res => {
          if (res.code * 1 === 0) {
            const temp = res.data
            if (this.name === 'orgType') {
              statisticMeeting({orgId: this.$store.state.app.id}).then(res => {
                if (res.code * 1 === 0) {
                  this.title = '会议活动类型次数'
                  const tem = res.data.meetingTypes
                  tem.forEach(item => {
                    this.list.push(item.num)
                    this.nameList.push(item.name)
                  })
                  this.$nextTick(() => {
                    this.initChart()
                  })
                }
              })
            } else if (this.name === 'userAge') {
              this.title = '党员年龄'
              temp.ages.forEach(item => {
                this.list.push(item.num)
                this.nameList.push(item.name)
              })
              this.$nextTick(() => {
                this.initChart()
              })
            } else if (this.name === 'partyYears') {
              this.title = '入党时间'
              temp.joinPartyTimes.forEach(item => {
                this.list.push(item.num)
                this.nameList.push(item.name)
              })
              this.$nextTick(() => {
                this.initChart()
              })
            }
          }
        })
      },
      // 初始化图表样式
      initChart() {
        this.chart = echarts.init(this.$refs.chart)
        let _this = this
        this.chart.setOption({
          grid: {
            left: '50'
          },
          // legend: {
          //   show: false,
          //   data: this.legends
          // },
          tooltip: {
            trigger: 'axis',
            show: true,
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'  // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis: {
            axisLine: {show: true},  // 轴线
            axisTick: {show: false},  // 刻度
            type: 'category',
            data: this.nameList,  // x轴显示
            axisLabel: {
              color: '#333',
              interval: 0  // 0：不隔行显示，1:隔一行显示
            }
          },
          yAxis: {
            type: 'value',
            nameTextStyle: {
              fontWeight: 'bold',
              align: 'left',
              padding: [0, 50, 10, 0],
              color: '#ffffff'
            },
            axisLine: {show: true},  // 轴线
            axisTick: {show: true},  // 刻度
            axisLabel: {
              color: '#333',
              formatter: '{value}'  // Y轴的显示形式，value,percent
            }
          },
          series: [
            // {  // 实现渐变色的柱子
            //   data: this.list,  // 显示的数据
            //   type: 'bar',
            //   smooth: true,  // 平滑
            //   symbol: 'none',
            //   lineStyle: {
            //     color: '#ff5858'
            //   },
            //   barMaxWidth: 60,  // 设置柱子的宽度
            //   itemStyle: {
            //     normal: {
            //       label: {
            //         show: true,  // 开启显示
            //         position: 'top',  // 在上方显示
            //         textStyle: {
            //           // 数值样式
            //           color: '#222',
            //           fontSize: 14
            //         }
            //       },
            //       color: params => {
            //         let colorList = _this.colorList2  // 实现柱子的渐变色数组
            //         let index = params.dataIndex  // dataIndex data中数据的下标
            //         if (params.dataIndex >= colorList.length) {
            //           index = params.dataIndex - colorList.length
            //         }
            //         return new echarts.graphic.LinearGradient(0, 0, 0, 1, [  // 渐变
            //           { offset: 0, color: colorList[index][0] },
            //           { offset: 1, color: colorList[index][1] }
            //         ])
            //       }
            //     }
            //   }
            // },
            {
              // 实现普通色的柱子
              data: this.list,
              type: 'bar',
              smooth: true, // 平滑
              symbol: 'none',
              lineStyle: {
                color: '#ff5858'
              },
              barMaxWidth: 60,
              itemStyle: {
                normal: {
                  label: {
                    show: true,  // 开启显示
                    position: 'top',  // 在上方显示
                    textStyle: {
                      // 数值样式
                      color: '#222',
                      fontSize: 14
                    }
                  },
                  color: params => {
                    let colorList = _this.colorList  // 柱子的颜色是普通的颜色
                    let index = params.dataIndex
                    if (params.dataIndex >= colorList.length) {
                      index = params.dataIndex - colorList.length
                    }
                    return colorList[index]
                  }
                }
              }
            }
          ]
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .count-chart-wrapper {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-size: 30px;
    line-height: 80px;
    color: #1a1a1a;
    font-weight: bold;
    height: 100%;

    .count-chart {
      position: relative;
      margin: 0 auto;
      width: 80%;
      height: 80%;
    }
  }
</style>
