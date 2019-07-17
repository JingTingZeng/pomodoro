/*
* vue format mixin 文字格式共用的方法
*/
(function (self) {

    "use strict";
    if (typeof self === "undefined") {
        self = {};
    }

    var exports = {
        methods: {
            /*
             * 格式化日期 YYYY-MM-DD
             */
            dateConvert: function (date, template) {
                if (!date) {
                    return "";
                }
                template = template || 'YYYY-MM-DD';

                return moment(date).format(template);
            },
            /**
             * 左邊補位
             * @param {type} i : 元素
             * @param {type} l : 要補的長度
             * @param {type} s : 要補的字元
             * @returns {type} 
             */
            strPad: function (i, l, s) {
                var o = i.toString();
                s = (s) || '0';
                while (o.length < l) {
                    o = s + o;
                }
                return o;
            },
            /**
             * 右邊補位
             * @param {type} i : 元素
             * @param {type} l : 要補的長度
             * @param {type} s : 要補的字元
             * @returns {type} 
             */
            strPadRight: function (i, l, s) {
                var o = i.toString();
                s = (s) || "0";
                while (o.length < l) {
                    o = o + s;
                }
                return o;
            },
            /*
             * 數字金額 三位一撇
             */
            moneyFormat: function (money, isNull) {
                // References: https://goo.gl/4XfhY1
                if (!isNull) {
                    return money === undefined
                        ? ""
                        : money === null
                            ? 0 : money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                } else {
                    return money === undefined || money === null ? "---" : money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            },
            /**
             * 數字金額 四捨五入進整數 且 三位一撇
             * @param {type} money
             * @returns {type} 
             */
            moneyFixedFormat: function (money) {
                if (!money) {
                    return "";
                }
                if (money == 0) {
                    return 0;
                }
                return this.moneyFormat(Math.round(money))
            },
            /**
             * 四捨五入 進 指定 小數點位數
             * @param {type} value
             * @param {type} digits
             * @returns {type} 
             */
            fixed: function (value, digits) {
                if (!digits && digits !== 0) {

                    digits = 3;
                }

                if (value == 0) {

                    return 0;
                }

                return value.toFixed(digits);
            }
        },
        filters: {
            /*
             * 格式化日期 YYYY-MM-DD
             */
            dateConvert: function (date, template) {
                if (date === null) {
                    return "";
                }
                // if (template === undefined) {
                //     template = "YYYY-MM-DD";
                // }
                template = template || 'YYYY/MM/DD';
                return moment(date).format(template);
            },
            /*
            * 分鐘秒格式 
            */
            timeConvert:function(time){
                if (time === null) {
                    return "";
                }
                return moment(time).format('mm:ss');
            },
            /*
             * 補0或補字符
             */
            fillCharFormat: function (ori, fillChar, totalLength) {
                // var fillLength = totalLength - ori.length;
                var fillLength = totalLength - (ori + '').length;
                if (fillLength < 1) {
                    return ori;
                }

                for (var i = 0; i < fillLength; i++) {
                    ori = fillChar + ori;
                }
                return ori;
            },
            /*
             * 取代...過濾字數
             */
            substring: function (str, start, end) {
                var etc = "";
                if (str === undefined || str === null) {
                    return "";
                }
                if (str.length > end) {
                    etc = "...";
                }
                return str.substr(start, end) + etc;
            },
            
        }
    }

    self.formatMixin = exports;

})(self);