<template>
  <div id="dituContent" style="width:100%;height:450px;border:#ccc solid 1px;" ></div>
</template>
<script>
  export default {
    data () {
      return {
        viliage: this.$route.query.viliage
      }
    },
    mounted () {
      this.initMap()
    },
    methods: {
      initMap () {
        var map = new BMap.Map('dituContent')
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
        var myGeo = new BMap.Geocoder()
        myGeo.getPoint('武汉市' + this.viliage, function (point) {
          console.log(point)
          if (point) {
            map.centerAndZoom(point, 16)
            map.addOverlay(new BMap.Marker(point))
          }
        }, '武汉市')
        map.enableDragging()
        map.enableScrollWheelZoom()
        map.enableDoubleClickZoom()
        map.enableKeyboard()
        map.addControl(new BMap.NavigationControl())
        map.addControl(new BMap.ScaleControl())
        map.addControl(new BMap.OverviewMapControl())
      }
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
