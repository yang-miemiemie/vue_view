<template>
  <div class="home">
    <div class="filter-area">
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
    <analysis-month ref="month"></analysis-month>
    </div>
  </div>
</template>
<script>
  import {regionList, viliageList} from '/api/index.js'
  import AnalysisMonth from '/components/analysis/month'
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
        this.$refs.month.draw(this.regionFilter, this.viliageFilter)
      }
    },
    mounted () {
      this.loadRegion()
      this.loadViliage()
      this.loadAnalysis()
    },
    components: {
      AnalysisMonth
    }
  }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
  }
  .home>div{
    width: 100%;
  }
  .filter-area {
    background-color: #ffffff;
    padding: 20px;
  }
</style>
