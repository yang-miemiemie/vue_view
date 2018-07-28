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
      <div class="w">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="region"
            label="区域">
          </el-table-column>
          <el-table-column
            label="小区">
            <template slot-scope="scope">
              <el-button type="text" @click="toAnalysis(scope.row.viliage)">{{scope.row.viliage}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="area"
            label="面积">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>
          <el-table-column
            label="均价">
            <template slot-scope="scope">
              {{scope.row.price / scope.row.area | priceFilter }}
            </template>
          </el-table-column>
          <el-table-column
            label="房型">
            <template slot-scope="scope">
              {{scope.row.roomcount}}室{{scope.row.hallcount}}厅
            </template>
          </el-table-column>
          <el-table-column
            prop="publicdate"
            label="发布日期">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="openWindow(scope.row.link)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="w">
        <el-pagination
          @current-change="toPage"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
  </div>
</template>
<script>
  import {regionList, viliageList, houseList} from '/api/index.js'
  export default {
    data () {
      return {
        regionFilter: '',
        viliageFilter: '',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        tableData: [],
        regions: [],
        viliages: []
      }
    },
    filters: {
      priceFilter: function (value) {
        // 截取当前数据到小数点后两位
        let realVal = Number(value).toFixed(2)
        return Number(realVal)
      }
    },
    methods: {
      onRegionChange: function (val) {
        this.viliageFilter = ''
        this.loadViliage()
        this.currentPage = 1
        this.loadForm()
      },
      onViliageChange: function (val) {
        this.currentPage = 1
        this.loadForm()
      },
      toPage: function (page) {
        this.currentPage = page
        this.loadForm()
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
      loadForm: function () {
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
        houseList(this.currentPage, this.pageSize, params).then(res => {
          if (res.call_status === 0) {
            let pageInfo = res.pageInfo
            this.tableData = pageInfo.dataList
            this.totalCount = pageInfo.totalCount
          }
        })
      },
      openWindow: function (url) {
        window.open(url)
      },
      toAnalysis: function (viliage) {
        this.$parent.changePage(2)
        this.$router.push({
          path: '/analysis',
          query: {
            viliage: viliage
          }
        })
      }
    },
    mounted () {
      this.loadRegion()
      this.loadViliage()
      this.loadForm()
    }
  }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
  }
</style>
