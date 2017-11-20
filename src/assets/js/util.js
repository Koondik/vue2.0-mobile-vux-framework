/* 工具类函数 */
let Utils = {
  getUrlParam(name) {
    var result = "";
    var index = window.location.href.indexOf('?');
    var searchArr = window.location.href.slice(index + 1).split("&");
    searchArr.map(function (item) {
      var arr = item.split("=");
      if (arr[0] == name) {
        result = decodeURIComponent(arr[1]);
      }
    });
    return result
  }
};
export default Utils
