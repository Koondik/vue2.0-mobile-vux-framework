<!--字母排序-->
<template>
  <div>
    <mt-index-list :showIndicator="true">
      <mt-index-section index="A">
        <cell :title="'易飞燕'" :link="{ name: 'userDetail'}">
          <div slot="icon" class="cell__icon cell__icon--danger">
            飞燕
          </div>
        </cell>
        <cell :title="'余新语'" :link="{ name: 'userDetail'}">
          <div slot="icon" class="cell__icon cell__icon--primary">
            新语
          </div>
        </cell>
      </mt-index-section>
      <mt-index-section index="B">
        <cell :title="'易飞燕'" :link="{ name: 'userDetail'}">
          <div slot="icon" class="cell__icon cell__icon--danger">
            飞燕
          </div>
        </cell>
        <cell :title="'余新语'" :link="{ name: 'userDetail'}">
          <div slot="icon" class="cell__icon cell__icon--primary">
            新语
          </div>
        </cell>
      </mt-index-section>
      <mt-index-section index="C">
        <cell :title="'易飞燕'" :link="{ name: 'userDetail'}">
          <div slot="icon" class="cell__icon cell__icon--danger">
            飞燕
          </div>
        </cell>
        <cell :title="'余新语'" :link="{ name: 'userDetail'}">
          <div slot="icon" class="cell__icon cell__icon--primary">
            新语
          </div>
        </cell>
      </mt-index-section>
      <mt-index-section index="D">
        <cell :title="'易飞燕'" :link="{ name: 'userDetail'}">
          <div slot="icon" class="cell__icon cell__icon--danger">
            飞燕
          </div>
        </cell>
        <cell :title="'余新语'" :link="{ name: 'userDetail'}">
          <div slot="icon" class="cell__icon cell__icon--primary">
            新语
          </div>
        </cell>
      </mt-index-section>
      <mt-index-section index="E">
        <cell :title="'易飞燕'" :link="{ name: 'userDetail'}">
          <div slot="icon" class="cell__icon cell__icon--danger">
            飞燕
          </div>
        </cell>
        <cell :title="'余新语'" :link="{ name: 'userDetail'}">
          <div slot="icon" class="cell__icon cell__icon--primary">
            新语
          </div>
        </cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Cell , Group} from 'vux'
  import { IndexList, IndexSection } from 'mint-ui';
  Vue.component(IndexList.name, IndexList);
  Vue.component(IndexSection.name, IndexSection);
  import {ACCESS_TOKEN} from "../config/env";

  export default {
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
  .weui-cell{
    background-color:#fff;
  }
</style>
