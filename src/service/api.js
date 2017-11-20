/**
 * FileName：api
 * Created By No.3 On 2017/7/28 0028 8:37
 * e-mail：woyzb@vip.qq.com
 */
import $http from "axios";

import axiosConfig from "./RequestConfig";
import {BASE_URL, ACCESS_TOKEN, TENANT_ID, USER_ID} from '../config/env';

$http.interceptors.request.use((config) => {
  // this.loading();
  return config;
}, (error) => {
  console.log("error111:", error);
  return Promise.reject(error);
});

$http.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.error("error:", error);
  return Promise.reject(error);
});


function handUrl(url) {
  url = BASE_URL + url;
  url += ("?access_token=" + ACCESS_TOKEN + "&tenantId=" + TENANT_ID);
  return url;
}

function handleData(url, method, params = {}, data = {}) {
  // url = handUrl(url);
  params["access_token"] = ACCESS_TOKEN;
  params["tenantId"] = TENANT_ID;
  data["userId"] = USER_ID;
  data["tenantId"] = TENANT_ID;
  let config = Object.assign({}, axiosConfig.config);
  config.url = url;
  config.method = method.toLowerCase();
  config.params = params;
  config.data = data;
  return config;
}

export default {
  /**
   * @param url
   * @param method
   * @param params query参数
   * @param data body 参数 只限于POST与PUT
   * @returns {Promise}
   */
  doRequest(url, method, params = {}, data = {}) {
    return new Promise((resolve, reject) => {
      $http.request(handleData(url, method, params, data)).then(res => {
        let _res = res.data;
        resolve(_res);
      }).catch(error => {
        // layer.closeAll('loading');
        console.log("err0r:", error);
        // layer.msg("网络请求错误，请您检查网络后刷新重试<!--<br />如仍需帮助，请拨打屏幕下方的技术支持电话！-->");
        reject(error);
      });
    });
  },
  uploadFile(url, formData, params = {}) {
    return new Promise((resolve, reject) => {
      params["access_token"] = ACCESS_TOKEN;
      params["userId"] = USER_ID;
      params["tenantId"] = TENANT_ID;
      console.log("formData:::", formData);
      let config = Object.assign({}, axiosConfig.config);
      config.url = url;
      config.method = "POST";
      config.params = params;
      config.data = formData;
      config.headers = {
        'Content-Type': 'multipart/form-data'
      };

      $http.request(config).then(res => {

      });
    });
  },
  exportFile(url, params) {
    params["access_token"] = ACCESS_TOKEN;
    params["userId"] = USER_ID;
    params["tenantId"] = TENANT_ID;
    url = BASE_URL + url;
    let dataStr = ''; //数据拼接字符串
    Object.keys(params).forEach(key => {
      if (params[key]) dataStr += key + '=' + params[key] + '&';
    });
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
    window.open(url, "_blank");
  }
}
