import {setStore, getStore, removeStore} from "./mUtils";
import CheckExtendInfo from "./CheckExtendInfo";
import {PROJECT_HOME_PAGE, CLOUD_HOME_PAGE, USER_API, ACCESS_TOKEN, CLIENT_ID, TOKEN_API, setCloudUser} from "./env";
const checkExtendInfo = new CheckExtendInfo();

export default class CheckAccess {
  getPromise(flag) {
    return new Promise((resolve, reject) => {
      flag ? resolve() : reject(error);
    });
  }

  queryString(key) {
    return (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
  };

  constructor(axios) {
    this.axios = axios;
    this.pageLink = getStore("redirect_uri_location");
    if (!this.pageLink) {
      this.pageLink = window.location.href;
      setStore("redirect_uri_location", window.location.href);
    }
  }

  //-------------------------------------------------------------------------------------/
  checkCode(next) {
    //检测code信息
    var code = this.queryString('code');
    if (code) {
      this.getAccessToken(code, this.pageLink, next);
    } else {
      window.location.href = (TOKEN_API + "/oauth/authorize?client_id=lcsoft&response_type=code&redirect_uri=" + encodeURIComponent(this.pageLink));
    }
  }

  getAccessToken(code, url, next) {
    let _url = TOKEN_API + "/oauth/token?grant_type=authorization_code&client_id=" + CLIENT_ID
      + "&client_secret=123456&code=" + code
      + "&redirect_uri=" + encodeURIComponent(this.pageLink);
    this.axios({
      method: 'POST',
      url: _url
    }).then((res) => {
      this.getUserInfo(res.data.access_token, next);
    })
  }

  getUserInfo(access_token, next) {
    this.axios({
      method: 'GET',
      url: TOKEN_API + '/user?access_token=' + access_token
    }).then(res => {
      let user = res.data;
      this.getUserDetail(user, access_token, next)
    })
  }

  getUserDetail(user, token, next) {
    this.axios({
      method: 'GET',
      url: USER_API + '/user/user/getUserByUserName?userName=' + user.name + '&access_token=' + token
    }).then((res) => {
      let details = res.data;
      const User = {
        username: user.name,
        authority: user.authorities[0].authority,
        token: user.details.tokenValue,
        detail: details,
        deadline: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime(),
        isCommonFun: false
      };
      setCloudUser(User);
      checkExtendInfo.checkExtend(null, next);
    });
  }

  checkToken(route, next) {
    if (ACCESS_TOKEN) {
      let deadline = getStore("cloud").deadline;
      if (Date.now() > deadline) {
        removeStore("cloud");
        this.checkCode(next);
      } else {
        removeStore("redirect_uri_location");
        checkExtendInfo.checkExtend(route, next);
      }
    } else {
      this.checkCode(next);
    }
  }

  //-------------------------------------------------------------------------------------/
};
