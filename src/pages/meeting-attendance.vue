<!-- 主页 -->
<template>
  <div>
    <!--<ui-search class="search-panel" v-model="searchVal" cancel-text=""></ui-search>-->
    <div class="meeting-box" v-for="item in list" slot="list">
      <div class="meeting-title">
        <span>{{item.meetingName}}</span>
      </div>
      <div class="meeting-info">
        <span class="meeting-time">{{item.launchTime }}</span>
        <span class="meeting-address">{{item.address}}</span>
        <span class="open-meeting-details" @click="checkMeetingDetails(item)">...</span>
      </div>

      <div class="meeting-box-footer" style="display: block">
        <flexbox :gutter="10" justify="center" style="margin-top: 10px;" :class="getRegisteredClassName(item)">
          <flexbox-item :span="2/12">
            考勤率:
          </flexbox-item>
          <flexbox-item :span="5/12">
            <x-progress :percent="parseInt(item.attendRate)" :show-cancel="false"></x-progress>
          </flexbox-item>
          <flexbox-item :span="1/12">
            <span class="percent-num">{{item.attendRate}}%</span>
          </flexbox-item>
          <flexbox-item :span="2/10">
            <span class="teacher-statistics" @click="checkMeetingUser(item)">({{item.attendCount }}/{{item.planCount }})</span>
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
        conditionParams: {searchText: null, fromTime: null, toTime: null, pageNum: 1, pageSize: 9999, meetingId: null},
        list: [],
      };
    },
    methods: {
      checkMeetingDetails(data){
        this.$router.push({name: "details", params: {meetingId: data.id}});
      },
      checkMeetingUser (data){
        this.$router.push({name: "attendee", params: {meetingId: data.id}});
      },
      async doGetList (){
        this.conditionParams.meetingId = this.$route.params.meetingId;
        let res = await this.$api.doRequest("/meeting/meeting", "get", this.conditionParams);
        this.list = res.list;
      },
      getRegisteredClassName(data){
        let dClass = "attendance__middle-color";
        if (data > 80) {
          dClass = "attendance__high-color"
        } else if (data <= 80 && data >= 60) {
          dClass = "attendance__middle-color"
        } else {
          dClass = "attendance__low-color"
        }
        return dClass;
      }
    },
    mounted() {
      this.doGetList();
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
