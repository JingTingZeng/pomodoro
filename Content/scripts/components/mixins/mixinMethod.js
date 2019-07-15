/*
* vue mixin 共用的方法
*/
(function (self) {
    "use strict";

    if (typeof self === "undefined") {
        self = {};
    }
    var exports = {
        data: function () {
            return {
                showLoading: false,
                
            };
        },
        created: function () {
        },
        methods: {
            
            /**
             * 取得Url上的Id
             */
            getUrlId: function (key) {
                if (key !== undefined) {
                    var params = this.getParams(location.search);
                    return params[key];
                }

                var arr = location.pathname.split("/");
                return arr[arr.length - 1].split("?")[0];
            },
            /*
             * 建立GUID
             */
            createGuid: function () {
                function S4() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                }

                return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
            },
        },
        computed: {
        }
    };

    self.mixinMethod = exports;
})(self);