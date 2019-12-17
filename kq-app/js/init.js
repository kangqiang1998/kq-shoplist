let cookieLogin = utils.getCookie("loginUserifo");
let cancelUser = document.querySelector("#cancelUser")
if (cookieLogin) {
    loginUser[0].classList.add("hidden");
    loginUser[1].classList.remove("hidden");
    let jsoncookieLogin = JSON.parse(cookieLogin)
    loginedUser.innerHTML = jsoncookieLogin.username;
}
cancelUser.onclick = function() {
    let res = confirm("你确认注销登录吗？");
    if (res) {
        utils.setCookie("loginUserifo", "", { expires: -1 });
        loginUser[1].classList.add("hidden");
        loginUser[0].classList.remove("hidden");
        loginFlag = false;
    }
}
loginFlag = loginUser[0].classList.contains("hidden");