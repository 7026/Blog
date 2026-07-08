---
title: 项目 通用工具类
date: 2021-05-16
tags:
  - JS
categories:
  - JS
img:
  - /abstract/2.jpeg

---

:::tip common.js
需要安装JQuery
:::

<!-- more -->

## 

```js
let $ = require('jquery');
let jCookie = require('jquery.cookie');

function ieCheck() {
  let type = 10,
    browser = navigator.appName,
    b_version = navigator.appVersion,
    version = b_version.split(';'),
    trim_Version = 'FireFox';

  if (version && version instanceof Array && version.length > 1) {
    trim_Version = version[1].replace(/[ ]/g, '');
  }

  if (browser === 'Microsoft Internet Explorer' && trim_Version === 'MSIE6.0') {
    type = 6;
  } else if (
    browser === 'Microsoft Internet Explorer' &&
    trim_Version === 'MSIE7.0'
  ) {
    type = 7;
  } else if (
    browser === 'Microsoft Internet Explorer' &&
    trim_Version === 'MSIE8.0'
  ) {
    type = 8;
  } else if (
    browser === 'Microsoft Internet Explorer' &&
    trim_Version === 'MSIE9.0'
  ) {
    type = 9;
  }

  return type;
}

const isIE = ieCheck() < 9;

export default {
  protocol: location.protocol,
  hostname: location.hostname,
  port: location.port,
  host: location.host,
  isIE: isIE,
  notIE: isIE === false,

  ieCheck: function () {
    let type = ieCheck(),
      browser = navigator.appName,
      b_version = navigator.appVersion,
      version = b_version.split(';'),
      trim_Version = 'FireFox';

    return { type: type, browser: browser, version: trim_Version };
  },

  /*

    */
  matchToTarget: function (source, rules, keyName, parentObj) {
    if (this.isArray(source) === false || this.isObj(rules) === false) {
      warning.log('参数source只接受数组，参数rules只接受对象。');
      return source;
    }

    keyName = this.isNull(keyName) ? new Date().getTime() : keyName;

    $.each(source, (itemIndex, item) => {
      if (this.notNull(item) && this.isObj(item)) {
        item.key = item.key ? item.key : keyName + '_' + itemIndex;
        item.parentObj = parentObj;

        $.each(item, (itemKey, itemValue) => {
          $.each(rules, (ruleKey, ruleValue) => {
            if (this.notNull(ruleValue) && this.isObj(ruleValue)) {
              const sourceKey = ruleValue.source;

              if (sourceKey === itemKey) {
                item[ruleKey] = this.isArray(itemValue)
                  ? this.matchToTarget(
                      itemValue,
                      ruleValue.rules ? ruleValue.rules : rules,
                      item.key,
                      item
                    )
                  : (item[ruleKey] = itemValue);
              }
            } else {
              console.error('rules的键值必须为一个对象！');
            }
          });
        });
      }
    });

    return source;
  },

  //自动给后台返回的数据添加key值
  autoAddKeys: function (list, index, keyName) {
    $['each'](list, (itemIndex, item) => {
      if (this.isNull(item['key'])) {
        item['key'] = index + '_' + keyName + '_' + itemIndex;
      }
    });

    return list;
  },

  //表格分页序号计算
  computeDataNo: function( index, current, size ){
    return `${ index + 1 + ( current ? ( Number( current ) - 1 ) * ( size ? Number( size ) : 0 ) : 0 ) }`;
  },

  ajax: function (args, noParse) {
    const self = this,
      path = args['url'],
      targetType = args['targetType'];

    if (this.isNull(path)) {
      throw new Error('请求路径URL未定义');
    }

    const sendRandom = { sendRandom: new Date().getTime() + Math.random() };

    let defaultDomain = process.env['REQUEST_DOMAIN' + (targetType || '')],
      defaultPort = process.env['REQUEST_PORT' + (targetType || '')],
      defaultType = process.env['REQUEST_TYPE' + (targetType || '')],
      defaultPrefix = process.env['REQUEST_PREFIX' + (targetType || '')],
      defaultPrefixType =
        process.env['REQUEST_PREFIX_TYPE' + (targetType || '')],
      data = args['data'],
      type = args['type'],
      domain = args['domain'],
      port = args['port'],
      requestType = args['requestType'],
      async = args['async'],
      prefix = args['prefix'],
      prefixType = args['prefixType'],
      xhrFields = args['xhrFields'],
      dataType = args['dataType'],
      contentType = args['contentType'],
      func = args['func'],
      success = args['success'],
      error = args['error'];

    data = this.isNull(data)
      ? sendRandom
      : $['extend'](true, {}, data, sendRandom);
    type = this.isNull(type) ? 'post' : type.toLowerCase();
    domain = this.isNull(domain) ? defaultDomain : domain;
    port = this.isNull(port) ? defaultPort : port;
    requestType = this.isNull(requestType)
      ? requestType === ''
        ? ''
        : defaultType
      : requestType;
    async = this.isNull(async) ? true : async;
    prefix = this.isNull(prefix)
      ? prefix === ''
        ? ''
        : defaultPrefix
      : prefix;
    prefixType = this.isNull(prefixType)
      ? prefix === ''
        ? ''
        : defaultPrefixType
      : prefixType;
    xhrFields = this.isNull(xhrFields) ? { withCredentials: true } : xhrFields;
    dataType = this.isNull(dataType) ? 'text' : dataType;
    contentType = this.isNull(contentType)
      ? 'application/json;charset=utf-8;'
      : contentType;

    if (args['noParse']) {
      noParse = args['noParse'];
    }

    if (this.isNull(success)) {
      success = (resultData, ts, response) => {
        let jsonData = null;
        try {
          jsonData = dataType !== 'json' ? JSON.parse(resultData) : resultData;
        } catch (e) {
          jsonData = resultData;
        }

        const { code, msg, data } = jsonData;

        if (code !== '0' && code !== 0) {
          self.message({
            type: 'error',
            content:
              '后台处理异常，错误信息：“ ' +
              msg +
              ' ”, 请联系管理员或稍后再试。',
          });

          self.callback(func, [false, jsonData, ts, response]);
        } else {
          self.callback(func, [true, data, ts, response]);
        }
      };
    }

    if (this.isNull(error)) {
      error = (xtr, ts, et) => {
        self.message({
          type: 'error',
          content: '请求发生错误，请联系网站管理员',
        });
        self.callback(func, [false, xtr, ts, et]);
      };
    }

    let url =
      domain + ':' + port + '/' + prefix + prefixType + path + requestType;

    $.ajax({
      url: url,
      data: type === 'post' && noParse !== true ? JSON.stringify(data) : data,
      type: type,
      async: async,
      contentType: contentType,
      dataType: dataType,
      crossDomain: true === !document.all,
      xhrFields: xhrFields,
      //jsonp: 'callback',//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
      //jsonpCallback: '?',//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      },
      success: success,
      error: error,
    });
  },

  //cookie操作
  //key：键名  value：值( 如果不设置此项，则为获取对应cookie )  option：参数  no_default不设置默认时间：默认为false
  cookie: function (key, value, option, no_default) {
    if (value == null || this.notNull(value)) {
      //保存cookie
      option = this.isNull(option) ? {} : option;

      if (no_default === true) {
        //不设置默认参数
        return $.cookie(key, value, option);
      } else {
        //包含默认参数
        let options = $.extend(true, {}, { expires: 30, path: '/' }, option);
        return $.cookie(key, value, options);
      }
    } else {
      //获取cookie
      return $.cookie(key, { path: '/' });
    }
  },

  //获取Cookie
  getCookie: function (key) {
    return this.cookie(key);
  },

  //设置Cookie
  setCookie: function (key, value, option, no_default) {
    return this.cookie(key, value, option, no_default);
  },

  //删除Cookie
  deleteCookie: function (key) {
    return this.cookie(key, null, { expires: 0, path: '/' }, true);
  },

  //判断对象是否为空（并包含空对象、空字符串、空数组的判断）
  isNull: function (obj) {
    if (this.isBoolean(obj)) {
      return false;
    } else if ((obj && obj !== '' && obj !== '') || obj === 0) {
      if (typeof obj == 'string') {
        return obj.trim() === '';
      } else {
        if (obj instanceof Array) {
          return obj.length === 0;
        } else if (obj instanceof Object) {
          if (typeof obj.length != 'undefined') {
            return obj.length === 0;
          } else {
            return $['isEmptyObject'](obj);
          }
        } else {
          return false;
        }
      }
    } else {
      return true;
    }
  },

  //判断对象是否非空（并包含空对象、空字符串、空数组的判断）
  notNull: function (obj) {
    return !(this.isNull(obj) === true);
  },

  //判断一个对象中的所有属性是否都为空
  objectWithoutValue: function( obj ) {
    let result = true;

    if( this.notNull( obj ) ){
      $.each( obj, ( key, value ) => {
        if( this.notNull( value ) ){
          result = false;
        }
      } );
    }

    return result;
  },

  //判断后台传值为true的几种方式，并返回boolean型结果
  isTrue: function (obj) {
    return (
      obj === 1 ||
      obj === true ||
      obj === 'true' ||
      obj === 'TRUE' ||
      obj === 'True'
    );
  },

  //判断后台传值为false的几种方式，并返回boolean型结果
  isFalse: function (obj) {
    return !(this.isTrue(obj) === true);
  },

  isBoolean: function (obj) {
    return typeof obj == 'boolean' && (obj === true || obj === false);
  },

  isObj: function (obj) {
    return (
      typeof obj == 'object' && obj instanceof Object && !(obj instanceof Array)
    );
  },

  isArray: function (obj) {
    return obj instanceof Array;
  },

  formatDate: function (originalData, fmt) {
    if (originalData && (isNaN(originalData) || originalData instanceof Date)) {
      if (typeof originalData == 'string' && originalData.indexOf('%') !== -1) {
        return originalData;
      }

      let dateTime = '',
        date = originalData + '',
        time = '',
        tempDate = date.split('T'),
        tempTime = '';

      if (tempDate instanceof Array && tempDate.length === 2) {
        date = tempDate[0];
        tempTime = tempDate[1];
      }

      if (typeof date == 'string') {
        let reg1 = new RegExp('年|月|日', 'g');
        let reg2 = new RegExp('.', 'g');
        let reg3 = new RegExp('-', 'g');

        if (reg1.test(date)) {
          date = date.replace(/年|月/g, '/');
          date = date.replace(/日/g, '');
        }

        if (reg2.test(date)) {
          date = date.replace(/\./g, '/');
        }

        if (reg3.test(date)) {
          date = date.replace(/-/g, '/');
        }

        dateTime += date;
      }

      if (typeof tempTime == 'string') {
        time = tempTime.split('.')[0];

        dateTime += ' ' + time;
      }

      dateTime =
        originalData instanceof Date ? originalData : new Date(dateTime);

      if (date !== 'Invalid Date') {
        if (typeof fmt === 'string') {
          return dateTime.format(fmt);
        } else {
          return dateTime.format('yyyy-MM-dd');
        }
      }
    }

    return originalData;
  },

  //计算字符串中的中文字符数量
  computerChinaChartNumber: function (content) {
    let sum = 0,
      reg = /[\u4E00-\u9FA5]/g; //测试中文字符的正则
    if (content) {
      if (reg.test(content)) {
        //使用正则判断是否存在中文
        sum = content.match(reg).length;
      }
    }

    return sum;
  },

  //数字补位
  coverRage: function (number, digit) {
    let str = number;
    digit = isNaN(digit) ? 2 : digit;
    switch (digit) {
      case 2:
        str = number > 9 ? str : '0' + str;
        break;
      case 3:
        str = number > 99 ? str : '00' + str;
        break;
    }
    return str;
  },

  //判断是否为一个方法
  isFunc: function (func) {
    return typeof func === 'function';
  },

  //执行回调
  callback: function (callback, args) {
    return this.isFunc(callback)
      ? this.notNull(args)
        ? callback(args)
        : callback()
      : null;
  },

  //返回数据对象中的所有ID字段
  getParamIdList: function (dataList) {
    let paramIdList = [];

    if (dataList instanceof Array === false && dataList instanceof Object) {
      dataList = [dataList];
    }

    $['each'](dataList, (index, data) => {
      if (data instanceof Array === false && data instanceof Object) {
        let idList = {};

        $['each'](data, function (key, value) {
          if (key === 'listid' || key['endWith']('Id')) {
            idList[key] = value;
          }
        });

        paramIdList.push(idList);
      }
    });

    return paramIdList;
  },

  //将传入配置参数中的返回函数重命名
  changeParamsFuncName(source, parentName, funcName) {
    let replace = (params) => {
      if (this.isNull(funcName)) {
        funcName = parentName;
        parentName = null;
      }

      if (this.notNull(params) && this.notNull(funcName)) {
        if (this.notNull(params[parentName])) {
          if (this.isFunc(params[parentName][funcName])) {
            params[parentName][funcName + 'ForCallback'] =
              params[parentName][funcName];
            delete params[parentName][funcName];
          }
        } else {
          if (this.isFunc(params[funcName])) {
            params[funcName + 'ForCallback'] = params[funcName];
            delete params[funcName];
          }
        }
      }

      return params;
    };

    if (source instanceof Array) {
      $['each'](source, (index, params) => {
        source[index] = replace(params);
      });

      return source;
    } else {
      return replace(source);
    }
  },

  //合并对象
  extend: function (args) {
    return $['extend'](...args);
  },

  //比较两个参数的值是否相等
  compare: function (a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
      let type = null,
        aProps = [],
        bProps = [],
        aLen = 0,
        bLen = 0;

      if (a instanceof Array && b instanceof Array) {
        type = 'array';
        aLen = a.length;
        bLen = b.length;
      } else if (a instanceof Object && b instanceof Object) {
        type = 'object';
        aProps = Object.getOwnPropertyNames(a);
        bProps = Object.getOwnPropertyNames(b);
        aLen = aProps.length;
        bLen = bProps.length;
      } else {
        if (a !== b) {
          return false;
        }
      }

      if (aLen !== bLen) {
        return false;
      }

      for (let i = 0; i < aLen; i++) {
        let itemA = type === 'object' ? a[aProps[i]] : a[i];
        let itemB = type === 'object' ? b[bProps[i]] : b[i];

        if (this.compare(itemA, itemB) === false) {
          return false;
        }
      }
    } else {
      if (a !== b) {
        return false;
      }
    }

    return true;
  },

  listObjectChangeToObject: function (list) {
    let object = {};

    $['each'](list, (index, item) => {
      object[item.type] = item.items;
    });

    return object;
  },

  adjustContainerHeight: function (
    containerIdentify,
    otherHeight,
    isHeight,
    minHeight
  ) {
    const target = $(containerIdentify);

    minHeight = minHeight || 100;

    if (this.notNull(target)) {
      const browserHeight = this.getBrowserHeight();
      otherHeight = otherHeight || 180;
      let height = browserHeight - otherHeight;

      if (height < minHeight) {
        height = minHeight;
      }

      if (this.isTrue(isHeight)) {
        target['css']({ height: height + 'px' });
      } else {
        target['css']({ 'max-height': height + 'px' });
      }
    }
  },

  //构建元素验证对象
  getValidates(formParams, form) {
    const { getFieldProps, getFieldError, isFieldValidating } = form;
    let validates = {};

    $['each'](formParams, (formKey, formValue) => {
      let validate = null;

      if (formValue instanceof Array) {
        validate = [];

        $['each'](formValue, (index, value) => {
          let items = {};

          $['each'](value, (itemKey, itemValue) => {
            const keyName = formKey + '__' + itemValue.key + '__' + index;

            let fieldProps = getFieldProps(keyName, itemValue);
            fieldProps = this.extend([true, {}, itemValue, fieldProps]);

            fieldProps.key = keyName;
            fieldProps['data-__meta'].key = keyName;

            this.setFormFieldsNullDefault(fieldProps);

            items[keyName] = fieldProps;
          });

          validate.push(items);
        });
      } else {
        if (this.notNull(formValue)) {
          validate = getFieldProps(formKey, formValue);
          validate = this.extend([true, {}, formValue, validate]);

          this.setFormFieldsNullDefault(validate);
        } else {
          delete formParams[formKey];
        }
      }

      validate && (validates[formKey] = validate);
    });

    return validates;
  },

  setFormFieldsNullDefault(validate) {
    if (validate.value == null) {
      if (validate.typeName === 'Select') {
        validate.value = undefined;
      }
    }
  },

  message: function (args) {
    if (this.notNull(args)) {
      let { type, content, duration, top } = args;

      // success error info warning warn loading
      type = type || 'info';
      duration = duration || 5;
      top = top || 24;

      if (typeof content == 'string') {
        antdMsg.config({ top: top });

        antdMsg[type](content, duration);
      }
    }
  },

  buildDicData(dicDataArray) {
    let dicData = {};

    $['each'](dicDataArray, (index, dicDataItem) => {
      const keyName = this.toHump(dicDataItem.type);
      dicData[keyName] = this.matchListData(dicDataItem.items);
      dicData[keyName + 'HasDefault'] = this.matchListData(
        dicDataItem.items,
        true
      );
    });

    return dicData;
  },

  matchListData(data, hasDefaultParam) {
    let dataList = hasDefaultParam
      ? [{ key: 'defaultAll', value: '', title: '全部', label: '全部' }]
      : [];

    $['each'](data, (index, item) => {
      let obj = {};
      obj.key = obj.value = item['dictKey'];
      obj.title = obj.label = item['dictValue'];

      dataList.push(obj);
    });

    return dataList;
  },

  //下划线转换驼峰
  toHump: function (str) {
    return str.replace(/\_(\w)/g, function (all, letter) {
      return letter.toUpperCase();
    });
  },

  //驼峰转换下划线
  toLine: function (str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
  },

  /**
   * 获取浏览器可视区域高度
   * @return number 高度值
   * example： common.get_browser_height();
   */
  getBrowserHeight: function () {
    let winHeight;

    if (document.documentElement.clientHeight) {
      winHeight = document.documentElement.clientHeight;
    } else if (document.body && document.body.clientHeight) {
      winHeight = document.body.clientHeight;
    } else {
      winHeight = 0;
    }

    return winHeight;
  },

  /**
   * 获取浏览器可视区域宽度
   * @return number 高度值
   * example： common.get_browser_width();
   */
  getBrowserWidth: function () {
    let winWidth;

    if (document.documentElement.clientWidth) {
      winWidth = document.documentElement.clientWidth;
    } else if (document.body && document.body.clientWidth) {
      winWidth = document.body.clientWidth;
    } else {
      winWidth = 0;
    }

    return winWidth;
  },

  /** 添加window对象的resize监听，并记录对应的事件标识 */
  addListener: (target, event, common, func) => {
    $(target)['bind'](event, (e) => {
      common.callback(func, [e]);
    });

    let events = $['_data'](window, 'events')['resize'];
    return events[events.length - 1]['guid'];
  },

  /** 根据对应的事件标识，移除window对象的resize监听 */
  removeListener: (target, event, common, guid) => {
    $['each']($['_data'](target, 'events')[event], (index, eventItem) => {
      if (eventItem['guid'] === guid) {
        $['_data'](target, 'events')[event].splice(index, 1);
      }
    });
  },
};

//根据提供的对象键值，从一个对象数组中去掉匹配的对象
//参数：key 匹配对象的键名  value 匹配到对象的值
//返回值：去除后的新对象数组
Array.prototype.removeByObject = function (key, value) {
  let list = [];
  $['each'](this, function (index, item) {
    if (item[key] !== value) {
      list.push(item);
    }
  });
  return list;
};

//根据提供的对象键值，从一个对象数组中获取匹配的对象
//参数：key 匹配对象的键名  value 匹配到对象的值
//返回值：获取后的对象
Array.prototype.getChooseByObject = function (key, value) {
  let list = [];
  $['each'](this, function (index, item) {
    if (item[key] === value) {
      list.push(item);
    }
  });
  return list;
};

String.prototype.endWith = function (endStr) {
  var d = this.length - endStr.length;
  return d >= 0 && this.lastIndexOf(endStr) === d;
};

Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }

  return fmt;
};

//替换全部
String.prototype.replaceAll = function (findStr, replaceStr) {
  return this.replace(new RegExp(findStr, 'gm'), replaceStr);
};

//获取所需时区的对应时间
Date.prototype.getDatetimeByTimeZone = function (timeZone) {
  let d = this,
    localTime = d.getTime(),
    localOffset = d.getTimezoneOffset() * 60000, //获得当地时间偏移的毫秒数,这里可能是负数
    utc = localTime + localOffset, //utc即GMT时间
    offset = timeZone, //时区，北京市+8  美国华盛顿为 -5
    localSecondTime = utc + 3600000 * offset; //本地对应的毫秒数
  return new Date(localSecondTime);
};

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

(function ($, h, c) {
  let a = $([]),
    e = ($.resize = $.extend($.resize, {})),
    i,
    k = 'setTimeout',
    j = 'resize',
    d = j + '-special-event',
    b = 'delay',
    f = 'throttleWindow';
  e[b] = 250;
  e[f] = true;
  $.event.special[j] = {
    setup: function () {
      if (!e[f] && window[k]) {
        return false;
      }
      let l = $(this);
      a = a.add(l);
      $.data(this, d, {
        w: l.width(),
        h: l.height(),
      });
      if (a.length === 1) {
        g();
      }
    },
    teardown: function () {
      if (!e[f] && this[k]) {
        return false;
      }
      let l = $(this);
      a = a.not(l);
      l.removeData(d);
      if (!a.length) {
        clearTimeout(i);
      }
    },
    add: function (l) {
      if (!e[f] && this[k]) {
        return false;
      }
      let n;
      function m(s, o, p) {
        let q = $(this),
          r = $.data(this, d);
        r.w = o !== c ? o : q.width();
        r.h = p !== c ? p : q.height();
        n.apply(this, arguments);
      }
      if ($.isFunction(l)) {
        n = l;
        return m;
      } else {
        n = l.handler;
        l.handler = m;
      }
    },
  };
  function g() {
    i = h[k](function () {
      a.each(function () {
        let n = $(this),
          m = n.width(),
          l = n.height(),
          o = $.data(this, d);
        if (m !== o.w || l !== o.h) {
          n.trigger(j, [(o.w = m), (o.h = l)]);
        }
      });
      g();
    }, e[b]);
  }
})($, window);

```

