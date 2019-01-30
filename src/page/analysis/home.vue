<template>
  <div class="home">
    <div class="sub-menu">
      <ul class="nav-list">
        <li>
          <router-link to="/analysis/viliage"><a @click="changeTab(1)" :class="{active:chooseTab===1}">小区总览</a></router-link>
        </li>
        <li>
          <router-link to="/analysis/month"><a @click="changeTab(2)" :class="{active:chooseTab===2}">价格走势</a></router-link>
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
        chooseTab: 1
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
