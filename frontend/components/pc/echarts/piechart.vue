<template>
  <div class="echart-sheet">
    <div ref="pieChart" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import {statisticOrgList, staticOrgUser} from '@/api/pc'

  export default {
    name: "piechart",
    props: {
      name: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        list: [
          {name: '未领取', value: 10},
          {name: '处理中', value: 30},
          {name: '已完成', value: 50}
        ],
        nameList: ['未领取', '处理中', '已完成'],
        title: '这是个标题'
      }
    },
    mounted() {
      setTimeout(() => {
        this.getList()
      }, 500)
    },
    methods: {
      getList() {
        staticOrgUser({orgId: this.$store.state.app.id}).then(res => {
          if (res.code === 0) {
            const temp = res.data
            if (this.name === 'orgNum') {
              statisticOrgList().then(res => {
                if (res.code * 1 === 0) {
                  this.list = []
                  this.nameList = []
                  this.title = '党组织数'
                  const tem = res.data.orgTypes
                  tem.forEach(item => {
                    this.list.push({name: item.name, value: item.num})
                    this.nameList.push(item.name)
                  })
                  this.$nextTick(function () {
                    this.getPie()
                  })
                }
              })
            } else if (this.name === 'userEducation') {
              this.list = []
              this.nameList = []
              this.title = '党员学历'
              temp.educations.forEach(item => {
                this.list.push({name: item.name, value: item.num})
                this.nameList.push(item.name)
              })
              this.$nextTick(function () {
                this.getPie()
              })
            } else if (this.name === 'userSex') {
              this.list = []
              this.nameList = []
              this.title = '性别比例'
              temp.sexs.forEach(item => {
                this.list.push({name: item.name, value: item.num})
                this.nameList.push(item.name)
              })
              this.$nextTick(() => {
                this.getPie()
              })
            } else if (this.name === 'userType') {
              this.list = []
              this.nameList = []
              this.title = '党员统计'
              temp.userTypes.forEach(item => {
                this.list.push({name: item.name, value: item.num})
                this.nameList.push(item.name)
              })
              this.$nextTick(() => {
                this.getPie()
              })
            }
          }
        })
      },
      getPie() {
        // 绘制图表
        const myChart = echarts.init(this.$refs.pieChart)
        // 指定图表的配置项和数据
        const option = {
          // 标题
          title: {
            text: this.title,
            x: 'center',  // 标题位置
            textStyle: {
              fontSize: 40
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b} : {c} ({d}%)',
            textStyle: {
              fontSize: 30
            }
          },
          legend: {  // 图例 标注各种颜色代表的模块
            bottom: 10, // 控制图例出现的距离 默认左上角
            left: 'center', // 控制图例的位置
            textStyle: {  // 图例中文字的样式
              color: '#000',
              fontSize: 24
            },
            data: this.nameList  // 图例上显示的饼图各模块上的名字
          },
          color: ['#32dadd', '#b6a2de', '#5ab1ef'],
          series: {
            name: this.title,  // {a}
            type: 'pie', // echarts图的类型，pie代表饼图
            radius: '70%',  // 饼图中饼状部分的大小所占整个父元素的百分比
            center: ['50%', '50%'],  // 整个饼图在整个父元素中的位置
            data: this.list,  // 饼图数据  各个模块的名字和值
            itemStyle: {
              normal: {
                label: {
                  show: true,  // 饼图上是否出现标注文字 标注各模块代表什么 默认是true
                  textStyle: {
                    fontSize: 24
                  }
                },
                labelLine: {
                  show: true  // 官网demo里外部标注上的消息先的显示隐藏， 默认显示
                }
              }
            }
          }
        }
        myChart.setOption(option)
      }
    }
  }
</script>

<style scoped lang="less">
  .echart-sheet {
    width: 100%;
    height: 100%;
  }
</style>
