const utils = {
    userNameCE: function(str) {
        var reg = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;
        var res1 = 0;
        if (reg.test(str)) {
            res1 = str.replace(/[\u4e00-\u9fa5]/g, 'aa').length;
        }
        return res1 > 18 || res1 < 2 ? false : true
    },
    user: function(str) {
        var reg = /^[a-zA-Z|_]{1}\w{4,17}$/; //字母或下划线开头的用户名
        return reg.test(str);
    },
    psw: function(str) {
        var reg = /^\w{6,18}$/; //字母或下划线开头的用户名
        return reg.test(str);
    },
    tel: function(str) {
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/; //手机号码
        return reg.test(str);
    },
    IDnumber: function(str) {
        var reg = /^\d{15}|\d{18}$/; //身份证号(15位、18位数字);
        return reg.test(str);
    },
    email: function(str) {
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //Email地址
        return reg.test(str);
    },
    date: function(str) {
        var reg = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/; //日期
        return reg.test(str);
    },
    getEle(ele) {
        // substr(参数1，参数2)
        // 参数1表示开始的索引位置
        // 参数2表示截取个数，如果没有参数2表示从开始位置截取到最后
        var str1 = ele.substr(0, 1); //拿到前面的字符
        var str2 = ele.substr(1);

        if (str1 === '#') {
            return document.getElementById(str2)
        } else if (str1 === '.') {
            return document.getElementsByClassName(str2);
        } else {
            return document.getElementsByTagName(ele);
        }
    },
    move(ele, obj, fun) {
        let index = 0
        for (let attr in obj) {
            index++;
            clearInterval(ele[attr]);
            ele[attr] = setInterval(() => {
                let currentStyle;
                let speed;
                if (attr == "opacity") {
                    currentStyle = getStyle(ele, attr) * 100;
                    speed = (currentStyle + (obj[attr] - currentStyle) / 5) / 100;
                    ele.style[attr] = speed;
                } else {
                    currentStyle = getStyle(ele, attr)
                    speed = (obj[attr] - currentStyle) / 5
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    speed = currentStyle + speed;
                    ele.style[attr] = speed + "px";
                }
                if (parseInt(currentStyle) == obj[attr]) {
                    clearInterval(ele[attr]);
                    index--;
                    if (index == 0) {


                        fun && fun();
                    }
                }
            }, 30)
        }
    },
    getStyle(ele, attr) {
        var style;
        if (window.getComputedStyle) {
            style = window.getComputedStyle(ele)[attr];
        } else {
            style = ele.currentStyle[attr]
        }
        return parseFloat(style)
    },

    /** 取某一条cookie
     *  @param key <string> 要获取的cookie的名称
     *  @return <string>  这条cookie的值
     */
    getCookie(key) {
        // 取出所有cookie，构造成一个对象
        let str = document.cookie
        let cookies = str.split('; ')
        let obj = new Object()
        cookies.forEach(item => {
                let arr = item.split('=')
                obj[arr[0]] = decodeURIComponent(arr[1])
            })
            // 从对象里找到key的属性值
        return obj[key]
    },

    /** 存一条cookie
     * @param {string} key 要存的cookie的名称
     * @param {string} value  要存的cookie的值
     * @param {object} [options]  可选参数，制定存cookie的一些选项，比如 { expires: 7, path: '/'}，存一条7天过期，根目录的cookie
     */
    setCookie(key, value, options) {
        // 编码再存
        let str = `${key}=${encodeURIComponent(value)}`
            // 先判断是否传了options
        if (options) {
            // 再判断options里面有什么属性
            if (options.expires) {
                var date = new Date()
                date.setDate(date.getDate() + options.expires)
                str += `;expires=${date.toUTCString()}`
            }
            if (options.path) {
                str += `;path=${options.path}`
            }
        }
        document.cookie = str
    },

    /** ajax get请求
     * @param {string} url 请求路径
     * @param {object} query  请求要携带的参数
     * @param {function} fn 请求成功之后的回调函数
     * @param {boolean} [isJson] 请求数据是否为json，默认值为true
     */
    get(url, query, fn, isJson = true) {
        // 参数默认值的写法是ES6新增的
        // 如果有query，在url后面拼接query
        if (query) {
            url += '?'
            for (var key in query) {
                url += `${key}=${query[key]}&`
            }
            // 在拼接完成以后最后回多出一个&
            url = url.slice(0, -1)
        }
        // 1、创建和兴对象
        var xhr = new XMLHttpRequest()
            // 2、打开连接
        xhr.open('get', url)
            // 3、发送请求
        xhr.send()
            // 4、监听状态改变
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // 请求成功
                    // 如果isJson为true，就parse之后传过去，否则就传字符串本身
                    var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
                        // 回调的常规写法：fn有效才调用
                    fn && fn(res)
                }
            }
        }
    },

    /** ajax post请求
     * @param {string} url 请求路径
     * @param {object} query  请求要携带的参数
     * @param {function} fn 请求成功之后的回调函数
     * @param {boolean} [isJson] 请求数据是否为json，默认值为true
     */
    post(url, query, fn, isJson = true) {
        var str = ''
        if (query) {
            for (var key in query) {
                str += `${key}=${query[key]}&`
            }
            str = str.slice(0, -1)
        }
        var xhr = new XMLHttpRequest()
        xhr.open('post', url)
            // 把发送数据格式设置为urlencoded
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.send(str)
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
                    fn && fn(res)
                }
            }
        }
    },

    /**jsonp请求
     * 
     * @param {string} url     请求的路径
     * @param {string} cb      回调函数名（这个函数必须是全局函数）
     * @param {object} [query] 其他参数
     */
    jsonp(url, cb, query) {
        // 创建script标签
        url += `?cb=${cb}`
        if (query) {
            for (var key in query) {
                url += `&${key}=${query[key]}`
            }
        }
        var script = document.createElement('script')
        script.src = url
        document.body.appendChild(script)
            // 过河拆桥
        document.body.removeChild(script)
    },
    /** 基于promise的ajax get请求
     * @param {string} url 请求路径
     * @param {object} query  请求要携带的参数
     * @param {boolean} [isJson] 请求数据是否为json，默认值为true
     */
    fetch(url, query, isJson = true) {
        if (query) {
            url += '?'
            for (var key in query) {
                url += `${key}=${query[key]}&`
            }
            url = url.slice(0, -1)
        }
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()
            xhr.open('get', url)
            xhr.send()
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(isJson ? JSON.parse(xhr.responseText) : xhr.responseText)
                    } else {
                        reject()
                    }
                }
            }
        })
    },

    postPromise(url, option, json = true) {
        let str = ''
        if (option) {
            for (let key in option) {
                str += `${key}=${option[key]}&`
            }
            str = str.slice(0, -1);
        }
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("post", url);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhr.send(str);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let res = json ? JSON.parse(xhr.responseText) : xhr.responseText;
                        resolve(res);
                    } else {
                        reject();
                    }
                }
            }
        })
    }
}