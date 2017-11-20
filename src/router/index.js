import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import {ACCESS_TOKEN} from "../config/env";
import CheckAccess from "../config/CheckAccess";
import CheckExtendInfo from "../config/CheckExtendInfo";
const checkExtendInfo = new CheckExtendInfo(axios);
const checkAccess = new CheckAccess(axios);
Vue.use(Router);
/* 路由配置文件 */
const router = new Router({
  routes: [
    {
      path: '/addressList',
      component: resolve => require(['../../src/components/basis.vue'], resolve),
      redirect: {name: "list"},
      children: [
        /**
         * 通讯录列表
         */
        {
          name: "list",
          path: '/addressList/list',
          component: resolve => require(['../../src/pages/list.vue'], resolve),
          meta: { keepAlive: true }
        },
        /**
         * 用户详情
         */
        {
          name: "userDetail",
          path: '/addressList/userDetail',
          component: resolve => require(['../../src/pages/userDetail.vue'], resolve),
          meta: { keepAlive: false }
        },
        /**
         * 会议详情
         */
        // {
        //   name: "details",
        //   path: "/bus/details/:meetingId",
        //   component: resolve => require(["../../src/pages/meeting-details.vue"], resolve)
        // },
        // /**
        //  * 会议签到
        //  */
        // {
        //   name: "attendance",
        //   path: "/bus/attendance/:meetingId",
        //   component: resolve => require(["../../src/pages/meeting-attendance.vue"], resolve)
        // },
        // /**
        //  * 会议参与人员
        //  */
        // {
        //   name: "attendee",
        //   path: "/bus/attendee/:meetingId",
        //   component: resolve => require(["../../src/pages/meeting-attendee.vue"], resolve)
        // },
        // /**
        //  * 签到成功
        //  */
        // {
        //   name: "att_success",
        //   path: "/bus/att_success/:meetingId",
        //   component: resolve => require(["../../src/pages/attendance-success.vue"], resolve)
        // }
      ]
    },
    {path: "*", redirect: "/addressList"},
  ]
});

/*router.beforeEach(function (to, from, next) {
 store.commit('updateLoadingStatus', {isLoading: true});
 next()
 });

 router.afterEach(function (to) {
 store.commit('updateLoadingStatus', {isLoading: false})
 });*/

// router.beforeEach((to, from, next) => {
//   checkAccess.checkToken(to, next);
//   // checkExtendInfo.checkExtend(to, next);
// });
export default router;
