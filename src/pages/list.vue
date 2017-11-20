<!-- 主页 -->
<template>
  <div>
    <search
      placeholder="请输入搜索内容"
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      :auto-fixed="false"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
    <tab :line-width=3 active-color='#4e97d9' custom-bar-width="87.5px" v-model="selected" @click="a(item)">
      <tab-item class="vux-center"  :selected="tab == item" v-for="(item, index) in list" @on-item-click="tab = item" :key="index">{{item}}</tab-item>
    </tab>
    <mt-tab-container v-model="tab">
      <mt-tab-container-item id="组织架构">
        <structure></structure>
      </mt-tab-container-item>
      <mt-tab-container-item id="字母排序">
        <letter-list></letter-list>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Search,  Tab, TabItem, Swiper, SwiperItem } from 'vux';
  import { TabContainer, TabContainerItem } from 'mint-ui';
  import structure from './structure.vue';
  import letterList from './letterList.vue';
  import {ACCESS_TOKEN, EXTEND_INFO, TENANT_ID} from "../config/env";
  import{formatDate} from "../config/mUtils";
  Vue.component(TabContainer.name,TabContainer);
  Vue.component(TabContainerItem.name,TabContainerItem);
  export default {
    directives: {},
    components: {Search, Tab, TabItem, Swiper, SwiperItem , structure , letterList},
    beforeCreate() {
    },
    data() {
      return {
        value: '',
        results: [],
        list:['组织架构','字母排序'],
        selected: 0,
        tab:'组织架构'
      };
    },
    watch: {
//      "conditionParams.searchText": function (v1, v2) {
//        (!v1 && v1 != v2) && this.doGetList();
//      }
    },
    methods: {
      a(item){
        console.log(item);
      },
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        console.log('on-change', val)
        this.results = val ? getResult(this.value) : []
      },
      onSubmit () {
        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },
      onFocus () {
        console.log('on focus')
      },
      onCancel () {
        console.log('on cancel')
      },


      checkMeetingDetails(item){
        this.$router.push({name: "details", params: {meetingId: item.id}, query: {status: item.status}});
      },
      async doGetList (){
        this.conditionParams.teacherId = EXTEND_INFO.extendId;
        debugger;
        let res = await this.$api.doRequest("/meeting/meetinguser/getMyMeetingList", "get", this.conditionParams);
//        let res = await this.$api.doRequest("/meeting/meeting", "get", this.conditionParams);
        this.list = res.list.map(item => {
          item.launchTime = formatDate(item.launchTime, "yyyy-MM-dd HH:mm");
          return item;
        });
      },
      async updateMeetingStatus(data, status){
        if (data.status) return this.checkMeetingDetails(data);
        let self = this;
        let params = {
          id: 0,
          status: status,
          attendanceStatus: 0,
          meetingId: data.id,
          readDate: null,
          remark: null,
          signDate: formatDate(Date.now(), "yyyy-MM-dd HH:mm:ss"),
          teacherId: EXTEND_INFO.extendId,
          tenantId: data.tenantId
        };
        this.$vux.confirm.show({
          title: '温馨提示',
          content: status > 0 ? '您确定参加该会议吗？' : "您拒绝参加该会议吗？",
          onConfirm () {
            self.$api.doRequest("/meeting/meetinguser", "post", {}, params).then(res => {
              if (res.code) {
                return self.$vux.toast.text('error', res.data);
              }
              self.$vux.toast.text(status > 0 ? '会议报名成功！' : "您已成功拒绝参加该会议", 'middle');
              status > 0 && self.$router.push({name: "attendee", params: {meetingId: data.id}});
            })
          }
        });
      },
    },
    mounted() {
//      this.doGetList();
    },
    computed: {}
  };
  function getResult (val) {
    let rs = []
    for (let i = 0; i < 20; i++) {
      rs.push({
        title: `${val} 结果： ${i + 1} `,
        other: i
      })
    }
    return rs
  }
</script>

<style lang="scss" type="text/scss" scoped>
  $mainColor:#4e97d9;
  i.weui-icon-search{
    color:$mainColor;
  };

  .no-meeting {
    text-align: center;
    background-color: #fff;
    font-size: 12px;
    height: 30px;
    line-height: 30px;

  }

  .search-panel {
    width: 100%;
    height: 40px;
    background-color: #fff;
    margin-bottom: 8px;
    text-align: center;
    input {
      border-radius: 10px;
      outline: none;
      /*border: 1px solid #4e97d9;*/
      border: none;
      background-color: #f2f6f5;
      width: 90%;
      height: 30px;
      margin: 5px auto auto;
      padding: 0 6px;
      &::-webkit-input-placeholder {
        text-align: center;
      }
    }
  }
</style>
