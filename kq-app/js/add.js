const info = document.querySelector('#add-info')
const inputName = document.querySelector('#inputName')
const inputPrice = document.querySelector('#inputPrice')
const inputNum = document.querySelector('#inputNum')

document.querySelector('#btn-add').onclick = function() {
    const name = inputName.value
    const price = inputPrice.value
    const num = inputNum.value

    // 把三个数据发送后端
    utils.fetch('./api/v1/shop/add.php', { name, price, num }).then(resp => {
        info.innerHTML = resp.body.msg
        if (resp.code === 200) {
            info.classList.add('text-success')
            setTimeout(() => {
                $('#addModal').modal('hide')
                getData()
            }, 2000)
        } else {
            info.classList.add('text-danger')
        }
        setTimeout(() => {
            info.innerHTML = ''
            info.className = 'text-center'
        }, 2000)
    })
}

$('#addModal').on('hidden.bs.modal', function(e) {
    inputName.value = inputPrice.value = inputNum.value = ''
})