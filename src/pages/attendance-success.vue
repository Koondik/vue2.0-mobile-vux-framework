<!-- attendance-success.vue 模块 -->
<template>
  <div>
    <div style="min-height: 220px;text-align: center;margin-top: 30px;">
      <img style="height: 220px;width: auto" src="static/img/01.png" alt="">
    </div>
    <div style="text-align: center;">
      <icon type="success"></icon>
      <span class="icon">签到成功</span>
    </div>
    <div style="width: 90%;margin: auto;margin-top: 60px">
      <x-button type="primary" @click.native="goToMeetingDetails()">返回会议详情</x-button>
    </div>
  </div>
</template>

<script>
  import {XInput, Group, XButton, Cell, Icon} from 'vux'
  export default {
    name: "attendance-success",
    components: {XButton, Icon},
    data () {
      return {}
    },
    methods: {
      goToMeetingDetails(){
        console.log("--->", this.$route.params);
        this.$router.push({name: "details", params: {meetingId: this.$route.params.meetingId}, query: {status: 1}})
      }
    },
    mounted(){
    },
    computed: {}
  }
</script>

<style lang="scss" type="text/scss" scoped></style>
