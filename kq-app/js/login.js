let btnLogin = document.querySelector('.btnLogin');
let userinfoL = document.querySelector('#login-info')
let phoneLogin = document.querySelector('#phoneLogin')
let pswLogin = document.querySelector('#pswLogin')
let jizhu = document.querySelector('#jizhu')

btnLogin.onclick = function() {
    let errorPhL = document.querySelector(".errorPhL");
    let errorPsL = document.querySelector(".errorPsL");
    if (utils.tel(phoneLogin.value)) {
        errorPhL.style.opacity = 0;
    } else {
        errorPhL.style.opacity = 1;
    }
    if (utils.psw(pswLogin.value)) {
        errorPsL.style.opacity = 0;
    } else {
        errorPsL.style.opacity = 1;
    }

    let regNPP = errorPsL.style.opacity + errorPhL.style.opacity;
    if (regNPP != '00') {
        alert("请按要求输入");
        return;
    }
    phone = phoneLogin.value
    password = pswLogin.value
        // 把三个数据发送后端
    utils.fetch('./api/v1/user/login.php', { phone, password }).then(resp => {
        userinfoL.innerHTML = resp.body.msg
        if (resp.code === 200) {
            userinfoL.classList.add('text-success')
            setTimeout(() => {
                $('#login').modal('hide')
            }, 2000)
            loginUser[0].classList.add("hidden");
            loginUser[1].classList.remove("hidden");
            loginedUser.innerHTML = resp.body.user.username;
            loginFlag = true;
            getData();
            if (jizhu.checked) {
                utils.setCookie("loginUserifo", JSON.stringify(resp.body.user), { expires: 7 });
            }
        } else {
            userinfoL.classList.add('text-danger')
        }
        setTimeout(() => {
            userinfoL.innerHTML = ''
            userinfoL.className = 'text-center'
        }, 2000)
    })
}

$('#login').on('hidden.bs.modal', function(e) {
    phoneLogin.value = pswLogin.value = ''
})