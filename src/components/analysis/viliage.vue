<template>
  <div class="line">
    <div class="main"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {viliageAnalysis} from '/api/index.js'
  export default {
    data () {
      return {
        legendArr: [],
        myChart: {}
      }
    },
    methods: {
      draw (region, year, month) {
        let paramsarg = {}
        if (region !== '') {
          paramsarg['region'] = region
        }
        if (year !== '') {
          paramsarg['year'] = year
        }
        if (month !== '') {
          paramsarg['month'] = month
        }
        let params = {
          params: paramsarg
        }
        viliageAnalysis(params).then(res => {
          if (res.call_status === 0) {
            let data = res.data
            let xName = []
            let avgData = []
            let maxData = []
            let countData = []
            let minData = []
            data.forEach((item, index) => {
              xName[index] = item.viliage
              avgData[index] = item.avgprice
              maxData[index] = item.maxprice
              minData[index] = item.minprice
              countData[index] = item.count
            })
            let sData = []
            sData.push({type: 'bar', name: '平均价', data: avgData, yAxisIndex: 0})
            sData.push({type: 'bar', name: '最高价', data: maxData, yAxisIndex: 0})
            sData.push({type: 'bar', name: '最低价', data: minData, yAxisIndex: 0})
            sData.push({type: 'bar', name: '发布数', data: countData, yAxisIndex: 1, label: {show: true, position: 'top', formatter: '{a}: {c}', fontSize: 12, color: '#000'}})
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
                data: ['平均价', '最高价', '最低价', '发布数']
              },
              xAxis: [{
                name: '小区',
                type: 'category',
                axisLabel: {
                  interval: 0
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                data: xName
              }],
              yAxis: [{
                axisLine: {
                  show: false
                },
                name: '均价',
                type: 'value'
              }, {
                show: false
              }],
              dataZoom: {
                type: 'slider',
                xAxisIndex: 0,
                startValue: 0,
                endValue: 5,
                zoomLock: true
              },
              series: sData
            }
            this.myChart.setOption(option, true)
            var me = this
            this.myChart.on('click', function (params) {
              me.clickViliage(xName[params.dataIndex])
            })
            window.addEventListener('resize', function () {
              this.myChart.resize()
            }.bind(this))
          }
        })
      },
      clickViliage (viliage) {
        this.$parent.clickViliage(viliage)
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
