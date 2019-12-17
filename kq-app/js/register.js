let btnReg = document.querySelector('.btnReg');
let userinfo = document.querySelector('#reg-info')
let uname = document.querySelector('#username')
let phoneReg = document.querySelector('#phoneReg')
let pswReg = document.querySelector('#pswReg')
let jieshou = document.querySelector('#jieshou')


btnReg.onclick = function() {
    let errorN = document.querySelector(".errorN");
    let errorPh = document.querySelector(".errorPh");
    let errorPs = document.querySelector(".errorPs");
    if (utils.userNameCE(uname.value)) {
        errorN.style.opacity = 0;
    } else {
        errorN.style.opacity = 1;
    }
    if (utils.tel(phoneReg.value)) {
        errorPh.style.opacity = 0;
    } else {
        errorPh.style.opacity = 1;
    }
    if (utils.psw(pswReg.value)) {
        errorPs.style.opacity = 0;
    } else {
        errorPs.style.opacity = 1;
    }

    let regNPP = errorPs.style.opacity + errorPh.style.opacity + errorN.style.opacity;
    if (regNPP != '000') {
        alert("请按要求输入");
        return;
    }
    if (!jieshou.checked) {
        alert("请同意协议！");
        return;
    }
    username = uname.value
    phone = phoneReg.value
    password = pswReg.value
        // 把三个数据发送后端
    utils.fetch('./api/v1/user/reg.php', { username, phone, password }).then(resp => {
        userinfo.innerHTML = resp.body.msg
        if (resp.code === 200) {
            userinfo.classList.add('text-success')
            setTimeout(() => {
                $('#reg').modal('hide')
            }, 2000)
        } else {
            userinfo.classList.add('text-danger')
        }
        setTimeout(() => {
            userinfo.innerHTML = ''
            userinfo.className = 'text-center'
        }, 2000)
    })
}

$('#reg').on('hidden.bs.modal', function(e) {
    uname.value = phoneReg.value = pswReg.value = ''
})