<template>
  <div class="home">
    <div class="sub-menu">
      <ul class="nav-list">
        <li class="title">
          {{viliage}}
        </li>
        <li>
          <router-link :to="{path:'/detail/analysis',query:{viliage:viliage}}"><a @click="changeTab(1)" :class="{active:chooseTab===1}">价格走势</a></router-link>
        </li>
        <li>
          <router-link :to="{path:'/detail/houselist',query:{viliage:viliage}}"><a @click="changeTab(2)" :class="{active:chooseTab===2}">房源列表</a></router-link>
        </li>
        <li>
          <router-link :to="{path:'/detail/map',query:{viliage:viliage}}"><a @click="changeTab(3)" :class="{active:chooseTab===3}">小区地址</a></router-link>
        </li>
      </ul>
    </div>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        chooseTab: 1,
        viliage: this.$route.query.viliage
      }
    },
    methods: {
      // 导航栏文字样式改变
      changeTab (v) {
        this.chooseTab = v
      }
    }
  }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .home {
    display: flex;
  }
  .sub-menu {
    flex: 1;
    margin: 20px;
    padding: 10px;
    background-color: #ffffff;
  }
  .title{
    text-align: center;
    display: block;
    font-size: 20px;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    color: #000;
    margin-bottom: 20px;
  }
  a {
    text-align: center;
    width: 100%;
    color: #cccccc;
    display: block;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    &:hover {
      color: #000;
      background-color: #999999;
    }
    &.active {
      color: #000;
      font-weight: bold;
    }
  }
  .content{
    flex: 5;
    margin: 20px;
  }
</style>
