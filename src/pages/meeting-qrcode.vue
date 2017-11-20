<!-- 主页 -->
<template>
  <div>
    <!--<ui-search class="search-panel" v-model="searchVal" cancel-text=""></ui-search>-->
    <div class="meeting-box" v-for="i in list" slot="list">
      <div class="meeting-title">
        <span>《深化综合改革转变发展方式加快创建世界一流学校》</span>
        <label shape="square" class="meeting-status">已参会</label>
      </div>
      <div class="meeting-info">
        <span class="meeting-time">2017-10-26 15:30</span>
        <span class="meeting-address">阶梯教室</span>
        <span class="open-meeting-details" @click="checkMeetingDetails()">...</span>
      </div>

      <div class="meeting-box-footer" style="display: block">
        <flexbox :gutter="10" justify="center" style="margin-top: 10px;">
          <flexbox-item :span="2/12">
            考勤率:
          </flexbox-item>
          <flexbox-item :span="5/12">
            <div class="flex-demo">
              <x-progress :percent="80" :show-cancel="false"></x-progress>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/12">
            <span>80%</span>
          </flexbox-item>
          <flexbox-item :span="2/10">
            <span @click="checkAttendance()">(80/100)</span>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
  import {ACCESS_TOKEN} from "../config/env";
  import {XProgress, Box, Flexbox, FlexboxItem, Divider} from 'vux'
  export default {
    directives: {},
    components: {XProgress, Box, Flexbox, FlexboxItem, Divider},
    beforeCreate() {
    },
    data() {
      return {
        searchVal: null,
        list: 5,
      };
    },
    methods: {
      checkMeetingDetails(){
        this.$router.push({name: "details", params: {meetingId: 12}});
      },
      async doGetList (){
      },
      checkAttendance(){
        this.$router.push({name: "attendee", params: {meetingId: 12}});
      }
    },
    mounted() {
    },
    computed: {}
  };
</script>

<style lang="scss" type="text/scss" scoped>
  /*.flex-demo {*/
  /*text-align: center;*/
  /*color: #fff;*/
  /*background-color: #20b907;*/
  /*border-radius: 4px;*/
  /*background-clip: padding-box;*/
  /*}*/
</style>
