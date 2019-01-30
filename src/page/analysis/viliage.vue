<template>
  <div class="home">
    <div class="filter-area">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="filter-item">
            <span>区域</span>
            <el-select v-model="regionFilter" filterable placeholder="请选择" @change="loadAnalysis">
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
            <span>时间</span>
            <el-date-picker  @change="loadAnalysis"
              v-model="date"
              type="month"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="charts">
    <analysis-viliage ref="viliage"></analysis-viliage>
    </div>
  </div>
</template>
<script>
  import {regionList} from '/api/index.js'
  import AnalysisViliage from '/components/analysis/viliage'
  export default {
    data () {
      return {
        regionFilter: '',
        regions: [],
        date: ''
      }
    },
    methods: {
      loadRegion: function () {
        regionList().then(res => {
          if (res.call_status === 0) {
            let data = res.data
            this.regions = data
          }
        })
      },
      loadAnalysis: function () {
        var year = ''
        var month = ''
        if (this.date !== '') {
          year = this.date.getFullYear()
          month = this.date.getMonth() + 1
        }
        this.$refs.viliage.draw(this.regionFilter, year, month)
      },
      clickViliage: function (viliage) {
        this.$router.push({
          path: '/detail',
          query: {
            viliage: viliage
          }
        })
      }
    },
    mounted () {
      this.loadRegion()
      this.loadAnalysis()
    },
    components: {
      AnalysisViliage
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
