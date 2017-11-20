/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
import {setStore, getStore} from "./mUtils";
const imgBaseUrl = 'https://fuss10.elemecdn.com';
let cloudHost = null;
let projectHost = null;
let cloud = {};
let cloudLoginRoot = null;
let access_token = null;
let userId = null;
let userTypeId = null;
let tenantId = 1;
let extend_info = getStore("extend_info");
let routerMode = null;

function getExtendInfo() {
  extend_info = getStore("extend_info");
}
function setExtendInfo(extendInfo) {
  if (extendInfo) {
    setStore("extend_info", extendInfo);
    (extend_info = extendInfo);
  }
}

function getCloudUser() {
  cloud = getStore("cloud") || null;
  if (cloud) {
    access_token = cloud.token;
    userId = cloud.detail.id;
    userTypeId = cloud.detail.userTypeId;
    tenantId = cloud.detail.tenantId;
  }
}

function setCloudUser(cloud) {
  setStore("cloud", cloud || {
      "username": "440303200206142316",
      "authority": "Student",
      "token": "28705b2c-f778-4175-860b-df6e12461144",
      "detail": {
        "id": 1848,
        "userTypeId": 10,
        "userCode": "11003733-a350-40de-89c0-00f9d80cb0c5",
        "userName": "440303200206142316",
        "userPassword": "",
        "email": "demo@szlcsoft.com",
        "mobile": "13924629863",
        "qq": null,
        "realName": "高睿",
        "company": null,
        "identityNumber": "440303200206142316",
        "lastLoginIp": "",
        "lastLoginTime": "2017-07-29 11:39:34.0",
        "openId": null,
        "status": 1,
        "userTypeName": "学生",
        "roles": [{"id": 2, "roleNo": 6, "roleCode": "Student", "roleName": "学生", "tenantId": 1}],
        "schoolId": 0,
        "tenantId": 1,
        "warningPassword": true
      },
      "deadline": 1501862399999,
      "isCommonFun": false
    });
  getCloudUser();
}

if (process.env.NODE_ENV === 'development') {
  cloudHost = "http://192.168.0.189:8090";
  projectHost = "http://192.168.0.115:8080";
  cloudLoginRoot = "http://192.168.0.189:85";
  routerMode = 'hash';
  // setCloudUser();
  getCloudUser();
} else {
  routerMode = 'hash';
  cloudHost = "//192.168.0.189:8090";
  cloudLoginRoot = "//192.168.0.189:85";
  projectHost = "//192.168.0.189:85";
  getCloudUser();
}

let projectHomePage = projectHost + "/";
// 获取token
let tokenApi = cloudHost + "/oauth-server-app";
let cloudHomepage = cloudHost + "/oauth-server-app/login";
let baseUrl = cloudHost + "/edu-meeting-api";
let userApi = cloudHost + "/edu-user-api";

let client_id = "lcsoft";
let client_secret = "123456";
let isCommonFun = cloud ? cloud.isCommonFun : false;
let schoolInfo = cloud ? cloud.schoolInfo : {};

export {
  baseUrl as BASE_URL,
  imgBaseUrl as IMG_BASE_URL,
  routerMode as ROUTER_MODE,
  access_token as ACCESS_TOKEN,
  cloud as CLOUD,
  tenantId as TENANT_ID,
  userId as USER_ID,
  userApi as USER_API,
  cloudHomepage as CLOUD_HOME_PAGE,
  projectHomePage as PROJECT_HOME_PAGE,
  client_id as CLIENT_ID,
  tokenApi as TOKEN_API,
  client_secret as CLIENT_SECRET,
  userTypeId as USER_TYPE_ID,
  cloudLoginRoot as CLOUD_LOGIN_ROOT,
  isCommonFun as IS_FULL_SCREEN,
  schoolInfo as SCHOOL_INFO,
  extend_info as EXTEND_INFO,
  setCloudUser,
  getCloudUser,
  getExtendInfo,
  setExtendInfo
};
