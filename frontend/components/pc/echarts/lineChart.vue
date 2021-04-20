<template>
  <div style="width: 100%; height: 100%">
    <div ref="chart" class="line-wrap"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import { staticOrgUser } from '@/api/pc'

  export default {
    name: "lineChart",
    props: {
      name: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        nameList: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        xList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        list: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 240]
          },
          {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    },
    mounted() {
      setTimeout(() => {
        this.getList()
      }, 500)
    },
    methods: {
      getList() {
        staticOrgUser({ orgId: this.$store.state.app.id }).then(res => {
          if (res.code * 1 === 0) {
            const temp = res.data
            if (this.name === 'userAge') {
              this.nameList = ['党员年龄']
              this.xList = []
              const data = []
              temp.ages.forEach(item => {
                this.xList.push(item.name)
                data.push(item.num)
              })
              this.list = [{ name: '党员年龄', type: 'line', stack: '总量', data: data}]
              this.$nextTick(() => {
                this.drawLineChart()
              })
            } else if (this.name === 'partyYears') {
              this.nameList = ['入党时间']
              this.xList = []
              const data = []
              temp.joinPartyTimes.forEach(item => {
                this.xList.push(item.name)
                data.push(item.num)
              })
              this.list = [{ name: '入党时间', type: 'line', stack: '总量', data: data }]
              this.$nextTick(() => {
                this.drawLineChart()
              })
            }
          }
        })
      },
      drawLineChart() {
        this.chart = echarts.init(this.$refs.chart)
        const option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: this.nameList,
            textStyle: {
              fontSize: 24,
              marginBottom: 30
            }
          },
          calculabel: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisTick: {
                show: false
              },
              data: this.xList,
              axisLabel: {
                fontSize: 24,
                lineHeight: 50,
                color: '#333'
              },
              // name: '时间'
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {
                show: true
              },
              axisLine: {
                show: true
              },
              // name: '（人）',
              axisLabel: {
                fontSize: 24,
                color: '#333'
              }
            }
          ],
          series: this.list
        }
        this.chart.setOption(option)
      }
    }
  }
</script>

<style scoped lang="less">
  .line-wrap {
    width: 100%;
    height: 100%;
  }
</style>
