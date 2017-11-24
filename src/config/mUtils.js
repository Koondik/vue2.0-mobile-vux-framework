/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  // if (typeof content !== 'string') {
  content = JSON.stringify(content);
  // }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  let data = window.localStorage.getItem(name);
  return data ? JSON.parse(data) : null;
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode === 'float' ? parseFloat(target) : parseInt(target);
};

/**
 * 将日期格式化成指定格式的字符串
 * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
 * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
export const formatDate = function (date = Date.now(), fmt) {
  if (typeof date === "string") {
    date = date.replace(/-/g, "/").replace(".0", "");
  }
  let _date = new Date(date);
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
  let obj = {
    'y': _date.getFullYear(), // 年份，注意必须用getFullYear
    'M': _date.getMonth() + 1, // 月份，注意是从0-11
    'd': _date.getDate(), // 日期
    'q': Math.floor((_date.getMonth() + 3) / 3), // 季度
    'w': _date.getDay(), // 星期，注意是0-6
    'H': _date.getHours(), // 24小时制
    'h': _date.getHours() % 12 === 0 ? 12 : _date.getHours() % 12, // 12小时制
    'm': _date.getMinutes(), // 分钟
    's': _date.getSeconds(), // 秒
    'S': _date.getMilliseconds() // 毫秒
  };
  let week = ['天', '一', '二', '三', '四', '五', '六'];
  for (let i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
      let val = obj[i] + '';
      if (i === 'w') return (m.length > 2 ? '星期' : '周') + week[val];
      for (let j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
      return m.length === 1 ? val : val.substring(val.length - m.length);
    });
  }
  return fmt;
};
