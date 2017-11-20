<!--用户详情-->
<template>
  <div class="userDetail">
    <cell>
      <div slot="icon" class="cell__avatar">
        畅往
      </div>
      <div slot="after-title" class="cell__userName">
          <div class="cell__userName__name">李畅往</div>
      </div>
    </cell>
    <cell>
      <div slot="icon">
        <span class="text-primary">所属部门</span>
      </div>
      <div slot="after-title" class="cell__userName">
        教务部
      </div>
    </cell>
    <cell>
      <div slot="icon">
        <span class="text-primary">所属职位</span>
      </div>
      <div slot="after-title" class="cell__userName">
        数学老师
      </div>
    </cell>
    <cell>
      <div slot="icon">
        <span class="text-primary">电话号码</span>
      </div>
      <div slot="after-title" class="cell__userName">
        13246812431
      </div>
      <div class="cell__contact">
        <a class="iconfont icon-msg" href="sms:13246812431"></a>
        <a class="iconfont icon-phone" href="tel:13246812431"></a>
      </div>
    </cell>
    <cell>
      <div slot="icon">
        <span class="text-primary">座机号码</span>
      </div>
      <div slot="after-title" class="cell__userName">
        0755-1258234
      </div>
      <div class="cell__contact">
        <a class="iconfont icon-phone" href="tel:13246812431"></a>
      </div>
    </cell>
    <cell>
      <div slot="icon">
        <span class="text-primary">家庭号码</span>
      </div>
      <div slot="after-title" class="cell__userName">
        0755-3521354
      </div>
      <div class="cell__contact">
        <a class="iconfont icon-phone" href="tel:13246812431"></a>
      </div>
    </cell>
    <cell></cell>
  </div>
</template>

<script>
  import {ACCESS_TOKEN} from "../config/env";
  import {Cell , Group} from 'vux'
  export default {
    name:'userDetail',
    data () {
      return {

      }
    },
    mounted() {

    },
    computed: {},
    components:{Cell , Group}
  };
</script>

<style lang="scss" type="text/scss" scoped>
  $mainColor:#4e97d9;
  $dangerColor: #f68f8f;
</style>
