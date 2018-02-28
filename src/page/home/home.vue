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
            prop="viliage"
            label="小区">
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
  import {regions, viliages, list} from '/api/index.js'
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
    methods: {
      onRegionChange: function (val) {
        this.viliageFilter = ''
        let params = {
          params: {
            region: val
          }
        }
        viliages(params).then(res => {
          let data = res
          this.viliages = data
        })
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
        list(this.currentPage, this.pageSize, params).then(res => {
          let data = res.list
          this.tableData = data
          this.totalCount = res.totalCount
        })
      },
      openWindow: function (url) {
        window.open(url)
      }
    },
    mounted () {
      regions().then(res => {
        let data = res
        this.regions = data
      })
      viliages().then(res => {
        let data = res
        this.viliages = data
      })
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
