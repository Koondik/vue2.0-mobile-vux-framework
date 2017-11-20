<!--组织架构-->
<template>
  <div>
    <group>
      <cell :title="'行政组织架构'" @click.native="showContent = !showContent">
        <div slot="icon" class="cell__icon">
          <i class="iconfont icon-distribution"></i>
        </div>
      </cell>
      <div class="cell--wrap" :class="showContent?'animate':'slide'">
        <cell
          :title="'校办处'"
          :border-intent="false"
          @click.native="showContent004 = !showContent004">
          <div slot="icon" class="cell__icon--arrow" :class="showContent004 ? 'up' : 'down'">
            <i class="iconfont icon-qrcodecornerlt" ></i>
          </div>
        </cell>
        <div class="cell--wrap" :class="showContent004?'animate':'slide'">
          <cell class="cell__subCell" :title="'易飞燕'" :link="{ name: 'userDetail'}">
            <div slot="icon" class="cell__icon cell__icon--danger">
              飞燕
            </div>
          </cell>
          <cell class="cell__subCell" :title="'余新语'" :link="{ name: 'userDetail'}" >
            <div slot="icon" class="cell__icon cell__icon--primary" >
              新语
            </div>
          </cell>
        </div>
        <cell
          :title="'教务处'"
          :border-intent="false">
          <div slot="icon" class="cell__icon--arrow" :class="showContent004 ? 'up' : 'down'">
            <i class="iconfont icon-qrcodecornerlt"></i>
          </div>
        </cell>
      </div>
    </group>
  </div>
</template>

<script>
  import {ACCESS_TOKEN} from "../config/env";
  import {Cell , Group} from 'vux'
  export default {
    data () {
      return {
        showContent: false,
        showContent004: false
      }
    },
    mounted() {

    },
    computed: {},
    components:{Cell , Group}
  };
</script>

<style lang="scss" type="text/scss" scoped>
  .slide {
    /*padding: 0 15px!important;*/
    overflow: hidden;
    max-height: 0;
    transition: max-height .2s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .animate {
    /*padding: 10px 15px!important;*/
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
</style>
