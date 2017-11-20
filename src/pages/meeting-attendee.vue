<!-- 主页 -->
<template>
  <div>
    <div class="meeting-box">
      <div class="meeting-title">
        <span v-text="meetingDetails.meetingName"></span>
      </div>
      <div class="meeting-info">
        <span class="meeting-time" v-text="meetingDetails.launchTime"></span>
        <span class="meeting-address" v-text="meetingDetails.address"></span>
      </div>
    </div>
    <div class="attendee-list">
      <group>
        <cell style="height: 10px;background-color: #e2eaf3;font-size: 12px">
          <div slot="title">参会人员</div>
          <span>考勤状态</span>
        </cell>
        <cell v-for="item in list">
          <div slot="icon" class="avatar" :class="{man:item.dictSexName==='男',lady:item.dictSexName==='女'}">{{item.teacherName.slice(-2)}}</div>
          <div slot="title" style="margin-left: 16px;">
            <div style="font-size: 14px;">{{item.teacherName}}</div>
            <div style="font-size: 12px;color: #8ba3b3">{{item.teacherDeptName}}</div>
          </div>
          <div slot="default">
            <label class="sign sign-ok" v-if="item.attendanceStatus==1">已签到</label>
            <label class="sign sign-no" v-if="item.attendanceStatus==-1||!item.attendanceStatus">未签到</label>
          </div>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import {Group, Cell, Confirm, Badge, XSwitch, XButton, TransferDomDirective as TransferDom} from 'vux'
  import {ACCESS_TOKEN} from "../config/env";
  import {formatDate} from "../config/mUtils";
  export default {
    directives: {
      TransferDom
    },
    components: {
      Cell,
      Group,
      Badge,
      Confirm,
      XSwitch,
      XButton
    },
    beforeCreate() {
    },
    data() {
      return {
        conditionParams: {searchText: null, pageNum: 1, pageSize: 9999, meetingId: null},
        showMeetingLeave: false,
        list: [],
        meetingDetails: {}
      };
    },
    methods: {
      async getMeetingUser (){
        this.conditionParams.meetingId = this.$route.params.meetingId;
        let res = await this.$api.doRequest("/meeting/meetinguser", "get", this.conditionParams);
        this.list = res.list;
      },
      async getMeetingDetails (){
        let url = "/meeting/meeting/" + this.$route.params.meetingId;
        let res = await this.$api.doRequest(url, "get");
        res.launchTime = formatDate(res.launchTime, "yyyy-MM-dd hh:ss");
        this.meetingDetails = res;
      },
      async doJoinMeeting(){
        this.$router.push({name: "attendance", params: {meetingId: 12}});
      },
      async doMeetingLeave(value){
        console.log(value);
      },
      meetingLeave(){
        this.showMeetingLeave = true;
      }
    },
    mounted() {
      this.getMeetingDetails();
      this.getMeetingUser();
    },
    computed: {}
  };
</script>

<style lang="scss" type="text/scss" scoped>
  .meeting-container {
    position: relative;
    padding: 15px;
    background-color: #fff;
    h3 {
      font-size: 16px;
    }
    .meeting-content {
      margin-top: 20px;
      margin-bottom: 54px;
      p {
        text-align: justify;
        line-height: 1.5;
        letter-spacing: 2px;
        color: #333333;
        font-size: 14px;
        text-indent: 2em;
      }
    }
    .content-footer {
      position: absolute;
      display: table;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 54px;
      box-shadow: inset 0 1px rgba(0, 0, 0, 0.1);
      span {
        position: relative;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        font-size: 16px;
        width: 33.33%;
        &:after {
          content: "";
          position: absolute;
          display: inline-block;
          height: 20px;
          width: 1px;
          background-color: #ccc;
          right: -2px;
          top: 50%;
          transform: translateY(-50%);
        }
        &:nth-child(1) {
          color: #4dbe4c;
        }
        &:nth-child(2) {
          color: #297fd0;
        }
        &:nth-child(3) {
          color: #f68a8a;
          &:after {
            display: none;
          }
        }
        &:active {
          transform: translateY(1px);
        }
      }
    }
  }

  .sign {
    display: block;
    font-size: 14px;
    height: 30px;
    width: 60px;
    color: #fff;
    line-height: 30px;
    text-align: center;
    border-radius: 6px;
  }

  .sign-ok {
    background-color: #4dbe4c;
  }

  .sign-no {
    background-color: #f68989;
  }

  .avatar {
    border-radius: 100%;
    height: 44px;
    width: 44px;
    text-align: center;
    line-height: 44px;
    color: #fff;
    &.man {
      background-color: #4e97d9;
    }
    &.lady {
      background-color: #f68989;
    }
  }
</style>
