import {setStore, getStore} from "./mUtils";
import axios from 'axios';
import {USER_API, EXTEND_INFO, USER_ID, CLOUD, ACCESS_TOKEN, setExtendInfo} from "./env";

export default class checkExtendInfo {

  getExtendDetail(next) {
    axios({
      method: 'GET', url: USER_API + '/user/user/getUserExtendById?userId=' + USER_ID + '&access_token=' + ACCESS_TOKEN
    }).then((res) => {
      if (res.code) throw  new Error(res);
      let cloudInfo = {userId: USER_ID};
      if (!res.data.extendId) cloudInfo["extendName"] = CLOUD.username;
      setExtendInfo(Object.assign(res.data, cloudInfo));
      next();
    })
  }

  checkExtend(route, next) {
    let lStoreExtendInfo = getStore("extend_info") || {};
    console.log("检查用户信息：", lStoreExtendInfo, USER_ID);
    if (lStoreExtendInfo.userId !== USER_ID) {
      this.getExtendDetail(next);
    } else {
      next();
    }
  }
};
