<template>
  <div class="line">
    <div class="main"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {monthAnalysis} from '/api/index.js'
  export default {
    data () {
      return {
        legendArr: [],
        myChart: {}
      }
    },
    methods: {
      draw (region, viliage) {
        let paramsarg = {}
        if (region !== '') {
          paramsarg['region'] = region
        }
        if (viliage !== '') {
          paramsarg['viliage'] = viliage
        }
        let params = {
          params: paramsarg
        }
        monthAnalysis(params).then(res => {
          if (res.call_status === 0) {
            let data = res.data
            let xName = []
            let avgData = []
            let maxData = []
            let countData = []
            let minData = []
            data.forEach((item, index) => {
              let fullname = item.year + '-' + item.month
              xName[index] = fullname
              avgData[index] = item.avgprice
              maxData[index] = item.maxprice
              minData[index] = item.minprice
              countData[index] = item.count
            })
            let sData = []
            sData.push({type: 'line', name: '平均价', data: avgData, yAxisIndex: 0})
            sData.push({type: 'line', name: '最高价', data: maxData, yAxisIndex: 0})
            sData.push({type: 'line', name: '最低价', data: minData, yAxisIndex: 0})
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
                data: ['平均价', '最高价', '最低价']
              },
              xAxis: [{
                name: '时间',
                type: 'category',
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
                scale: true,
                name: '均价',
                type: 'value'
              }, {
                show: false
              }],
              series: sData
            }
            this.myChart.setOption(option, true)
            window.addEventListener('resize', function () {
              this.myChart.resize()
            }.bind(this))
          }
        })
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
