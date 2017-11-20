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
        <i v-if="getExtendInfo.extendName===meetingDetails.initiator" class="qr-code c-btn" @click="showQrCodeModal=true"></i>
      </div>
    </div>
    <div class="meeting-container">
      <div class="meeting-content" v-html="meetingDetails.remark||'暂无会议详情'">
      </div>
    </div>
    <tabbar v-if="getExtendInfo.extendName===meetingDetails.initiator" class="btns-panel" style="position: fixed">
      <tabbar-item @click.native="goToAttendance(1)">
        <span slot="label">考勤查看</span>
      </tabbar-item>
    </tabbar>
    <tabbar v-if="!status&&(getExtendInfo.extendName!==meetingDetails.initiator)" class="btns-panel" style="position: fixed">
      <tabbar-item @click.native="updateMeetingStatus(1)">
        <span slot="label">确认参会</span>
      </tabbar-item>
      <tabbar-item @click.native="meetingLeave()">
        <span slot="label" class="c-btn leave-btn">请假</span>
      </tabbar-item>
      <tabbar-item @click.native="updateMeetingStatus(-1)">
        <span slot="label" class="c-btn reject-btn">拒绝参加</span>
      </tabbar-item>
    </tabbar>
    <tabbar v-if="status&&(getExtendInfo.extendName!==meetingDetails.initiator)" class="btns-panel" style="position: fixed">
      <tabbar-item>
        <span slot="label" :class="{agree:status==1,reject__before:status==-1}">{{status>0?"已同意参加":"已拒绝参加"}}</span>
      </tabbar-item>
      <tabbar-item @click.native="status=0">
        <span slot="label" class="c-btn anew">重新选择</span>
      </tabbar-item>
    </tabbar>
    <div v-transfer-dom>
      <confirm v-model="showMeetingLeave"
               show-input
               ref="confirm5"
               title="请输入请假理由"
               confirm-text="提交"
               @on-confirm="doMeetingLeave">
      </confirm>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showQrCodeModal" class="dialog-demo">
        <div class="img-box">
          <img :src="getMeetingQrCode" style="max-width:100%">
          <div style="font-size: 12px;color:rgb(140, 140, 140) ">扫一扫上面的二维码图案，会议考勤</div>
        </div>
        <div @click="showQrCodeModal=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
  import {Confirm, Group, XDialog, XSwitch, XButton, TransferDomDirective as TransferDom, Tabbar, TabbarItem} from 'vux';
  import {BASE_URL, ACCESS_TOKEN, EXTEND_INFO, TENANT_ID, PROJECT_HOME_PAGE} from "../config/env";
  import {formatDate} from "../config/mUtils";
  export default {
    directives: {
      TransferDom
    },
    components: {
      Confirm,
      Group,
      XSwitch,
      XDialog,
      XButton,
      Tabbar,
      TabbarItem
    },
    beforeCreate() {
    },
    data() {
      return {
        status: 0,
        showMeetingLeave: false,
        showQrCodeModal: false,
        meetingQrCodeSrc: null,
        extend_info: null,
        meetingDetails: {}
      };
    },
    methods: {
      goToAttendance(){
        this.$router.push({name: "attendee", params: {meetingId: this.meetingDetails.id}, query: {status: this.meetingDetails.status}});
      },
      async getMeetingDetails (){
        let url = "/meeting/meeting/" + this.$route.params.meetingId;
        let res = await this.$api.doRequest(url, "get");
        res.launchTime = formatDate(res.launchTime, "yyyy-MM-dd hh:ss");
        this.meetingDetails = res;
      },
      async updateMeetingStatus(status, remark){
        let self = this;
        let params = {
          id: 0,
          status: status,
          attendanceStatus: 0,
          meetingId: this.meetingDetails.id,
          readDate: null,
          remark: remark || null,
          signDate: formatDate(Date.now(), "yyyy-MM-dd HH:mm:ss"),
          teacherId: EXTEND_INFO.extendId,
          tenantId: this.meetingDetails.tenantId
        };
        this.$vux.confirm.show({
          title: '温馨提示',
          content: status > 0 ? '您确定参加该会议吗？' : "您真的不参加该会议吗？",
          onConfirm () {
            self.$api.doRequest("/meeting/meetinguser", "post", {}, params).then(res => {
              if (res.code) {
                return self.$vux.toast.text('error', res.data)
              }
              self.$vux.toast.text(status > 0 ? '会议报名成功！' : "您已成功拒绝参加该会议", 'middle');
              self.$router.replace({name: "details", params: {meetingId: params.meetingId}, query: {status: status}});
              self.status = status;
//              status > 0 && self.$router.push({name: "attendee", params: {meetingId: params.meetingId}});
            })
          }
        });
      },
      async doMeetingLeave(remark){
        let params = {
          id: 0,
          status: -1,
          attendanceStatus: 0,
          meetingId: this.meetingDetails.id,
          readDate: null,
          remark: remark || null,
          signDate: formatDate(Date.now(), "yyyy-MM-dd HH:mm:ss"),
          teacherId: EXTEND_INFO.extendId,
          tenantId: this.meetingDetails.tenantId
        };
        this.$api.doRequest("/meeting/meetinguser", "post", {}, params).then(res => {
          if (res.code) {
            return this.$vux.toast.text('error', res.data)
          }
          this.$vux.toast.text('会议请假申请已提交！', 'middle')
          this.status = -1;
        })
      },
      async attendanceSmart(meetingId){
        let res = await this.$api.doRequest("/meeting/meetinguser/updateMyMeetingStatus", "put", {meetingId: meetingId, teacherId: EXTEND_INFO.extendId, status: 1});
        if (res.code) {
          alert("系统错误，签到失败");
        } else {
          this.$router.push({name: "att_success", params: {meetingId: meetingId}});
        }
      },
      meetingLeave(){
        this.showMeetingLeave = true;
      }
    },
    mounted() {
      this.getMeetingDetails();
      this.status = parseInt(this.$route.query.status);
      if (this.$route.query.doattendance) {
        let meetingId = this.$route.params.meetingId;
        this.attendanceSmart(meetingId);
      }
    },
    computed: {
      getExtendInfo(){
        return EXTEND_INFO;
      },
      getMeetingQrCode(){
        let redirectPath = PROJECT_HOME_PAGE + "#/bus/details/" + this.meetingDetails.id
          + "?status=" + this.$route.query.status + "&doattendance=true&meetingId=" + this.meetingDetails.id;
        let url = BASE_URL + "/meeting/meeting/getMeetingQrCode?access_token=" + ACCESS_TOKEN
          + "&redirectPath=" + encodeURIComponent(redirectPath);
        return url;
      },
    }
  };
</script>

<style lang="less" type="text/scss" scoped>
  @import '~vux/src/styles/close';

  .meeting-container {
    position: relative;
    padding: 8px;
    background-color: #fff;
    .meeting-content {
      margin-bottom: 45px;
      p {
        text-indent: 2em;
        text-align: justify;
        line-height: 1.5;
        letter-spacing: 2px;
        color: #333333;
        font-size: 14px;
      }
    }
  }

  .dialog-demo {
    .weui-dialog {
      border-radius: 8px;
      padding-bottom: 8px;
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
    }
    .img-box {
      overflow: hidden;
    }
    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
</style>
