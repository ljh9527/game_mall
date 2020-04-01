const getUrlParam = (name, url) => {
  let str = url || window.location.href.split('#');
  let strParam = '';
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`); // 构造一个含有目标参数的正则表达式对象

  if (str[0] && str[0].indexOf('?') !== -1) {
    strParam = str[0].split('?')[1];
  }

  if (str[1] && str[1].indexOf('?') !== -1) {
    strParam = str[1].split('?')[1];
  }

  const r = strParam.match(reg); // 匹配目标参数

  if (r != null) {
    return unescape(r[2]); // 返回参数值
  } else {
    return '';
  }
};

export default getUrlParam;
