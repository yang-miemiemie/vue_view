<template>
  <div class="line">
    <div class="main"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data () {
      return {
        legendArr: [],
        myChart: {}
      }
    },
    methods: {
      draw (xName, xData, yName, yData, lNames) {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.querySelector('.line>.main'))
        var option = {
          title: {
            show: false
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            show: true,
            data: lNames
          },
          xAxis: [{
            name: xName,
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            data: xData
          }],
          yAxis: [{
            axisLine: {
              show: false
            },
            scale: true,
            name: yName,
            type: 'value'
          }, {
            show: false
          }],
          series: yData
        }
        this.myChart.setOption(option, true)
        window.addEventListener('resize', function () {
          this.myChart.resize()
        }.bind(this))
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .line
    height 700px
    padding-bottom 20px;
    background-size 100% 100%
    background-color #ffffff
    .main
      width 100%
      height 100%;
</style>
