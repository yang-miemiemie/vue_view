<template>
  <div class="home">
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
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
    <div>
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
  import {houseList} from '/api/index.js'
  export default {
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        tableData: [],
        viliage: this.$route.query.viliage
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
      loadForm: function () {
        let paramsarg = {}
        paramsarg['viliage'] = this.viliage
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
      }
    },
    mounted () {
      this.loadForm()
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
</style>
