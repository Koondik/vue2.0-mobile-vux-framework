<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>
<style lang="scss" type="text/scss">
  @import "./assets/css/common";
  /*@import './assets/css/style.css';*/
  #app{
    min-height:100vh;
  }
</style>
<style lang="less" type="text/scss">
  @import '~vux/src/styles/reset.less';
  .weui-tabbar {
    background-color: #fff !important;
  }

  .weui-tabbar:before {
    border-top: 1px solid #e2e2e2 !important;
  }

  .btns-panel {
    .weui-tabbar__item {
      &:nth-child(1) p.weui-tabbar__label {
        color: #4dbe4c;
      }
      &:nth-child(2) p.weui-tabbar__label {
        color: #297fd0;
      }
      &:nth-child(3) p.weui-tabbar__label {
        color: #f68a8a;
        &:after {
          display: none;
        }
      }
      .weui-tabbar__label {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          display: inline-block;
          height: 22px;
          width: 1px;
          background-color: #e2e2e2;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
        }
      }
    }
  }

  .attendance__low-color {
    .teacher-statistics, .percent-num {
      color: #f68a8a !important;
    }
    .weui-progress__inner-bar {
      background-color: #f68a8a;
    }
  }

  .attendance__middle-color {
    .teacher-statistics, .percent-num {
      color: #4e97d9 !important;
    }
    .weui-progress__inner-bar {
      background-color: #4e97d9;
    }
  }

  .attendance__high-color {
    .teacher-statistics, .percent-num {
      color: #4dbe4c !important;
    }
    .weui-progress__inner-bar {
      background-color: #4dbe4c;
    }
  }

</style>
