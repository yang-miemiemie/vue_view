<template>
  <div class="home">
    <div class="charts">
      <analysis-month ref="month"></analysis-month>
    </div>
  </div>
</template>
<script>
  import AnalysisMonth from '/components/analysis/month'
  export default {
    data () {
      return {
        viliage: this.$route.query.viliage
      }
    },
    methods: {
      loadAnalysis: function () {
        this.$refs.month.draw('', this.viliage)
      }
    },
    mounted () {
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
  .charts{
    width: 100%;
  }
</style>
