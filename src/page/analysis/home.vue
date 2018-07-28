<template>
  <div class="home">
    <div class="filter-area w">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="filter-item">
            <span>区域</span>
            <el-select v-model="regionFilter" filterable placeholder="请选择" @change="onRegionChange">
              <el-option
                v-for="(index,region) in regions"
                :key="index"
                :lable="region"
                :value="index">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="filter-item">
            <span>小区</span>
            <el-select v-model="viliageFilter" filterable placeholder="请选择" @change="onViliageChange">
              <el-option
                v-for="(index,viliage) in viliages"
                :key="index"
                :lable="viliage"
                :value="index">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="charts">
    <my-chart-line ref="line"></my-chart-line>
    </div>
  </div>
</template>
<script>
  import {regionList, viliageList, monthAnalysis} from '/api/index.js'
  import MyChartLine from '/components/echart/line'
  export default {
    data () {
      return {
        regionFilter: '',
        viliageFilter: this.$route.query.viliage,
        regions: [],
        viliages: []
      }
    },
    methods: {
      onRegionChange: function (val) {
        this.viliageFilter = ''
        this.loadViliage()
        this.loadAnalysis()
      },
      onViliageChange: function (val) {
        this.loadAnalysis()
      },
      loadRegion: function () {
        regionList().then(res => {
          if (res.call_status === 0) {
            let data = res.data
            this.regions = data
          }
        })
      },
      loadViliage: function () {
        let paramsarg = {}
        if (this.regionFilter !== '') {
          paramsarg['region'] = this.regionFilter
        }
        let params = {
          params: paramsarg
        }
        viliageList(params).then(res => {
          if (res.call_status === 0) {
            let data = res.data
            this.viliages = data
          }
        })
      },
      loadAnalysis: function () {
        let paramsarg = {}
        if (this.regionFilter !== '') {
          paramsarg['region'] = this.regionFilter
        }
        if (this.viliageFilter !== '') {
          paramsarg['viliage'] = this.viliageFilter
        }
        let params = {
          params: paramsarg
        }
        monthAnalysis(params).then(res => {
          if (res.call_status === 0) {
            let data = res.data
            let xData = []
            let avgData = []
            let maxData = []
            let countData = []
            let minData = []
            data.forEach((item, index) => {
              let fullname = item.year + '-' + item.month
              xData[index] = fullname
              avgData[index] = item.avgprice
              maxData[index] = item.maxprice
              minData[index] = item.minprice
              countData[index] = item.count
            })
            let yData = []
            yData.push({type: 'line', name: '平均价', data: avgData, yAxisIndex: 0})
            yData.push({type: 'line', name: '最高价', data: maxData, yAxisIndex: 0})
            yData.push({type: 'line', name: '最低价', data: minData, yAxisIndex: 0})
            yData.push({type: 'bar', name: '发布数', data: countData, yAxisIndex: 1, label: {show: true, position: 'top', formatter: '{a}: {c}', fontSize: 12, color: '#000'}})
            let lNames = ['平均价', '最高价', '最低价']
            this.$refs.line.draw('时间', xData, '均价', yData, lNames)
          }
        })
      }
    },
    mounted () {
      this.loadRegion()
      this.loadViliage()
      this.loadAnalysis()
    },
    components: {
      MyChartLine
    }
  }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
  }
</style>
