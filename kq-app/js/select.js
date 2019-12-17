const tbody = document.querySelector('#list-tbody')
if (!loginFlag) {
    tbody.innerHTML = "<h1>请先登录，才能浏览更多信息哦！</h1>";
} else {
    getData()
}



function getData() {
    utils.fetch('./api/v1/shop/select.php').then(resp => {
        if (resp.code === 200) {
            const { list } = resp.body
            let html = list.reduce((str, shop, index) => {
                str += `<tr data-id="${shop.Id}">
            <td>${index+1}</td>
            <td><span class="spanName">${shop.name}</span><input type="text" class="inpName" ></td>
            <td><span class="spanPrice">${shop.price}</span><input type="text" class="inpPrice"></td>
            <td><span class="spanNum">${shop.num}</span><input type="text"  class="inpNum"></td>
            <td>
              <button class="btn btn-xs btn-edit btn-info" id="btnEdit">编辑</button>
              <button class="btn btn-xs btn-del btn-danger" id="btnDel">删除</button>
              <button class="btn btn-xs btn-ok btn-success" id="btnOk">确定</button>
              <button class="btn btn-xs btn-cancel btn-warning" id="btnCancel">取消</button>
            </td>
          </tr>`
                return str
            }, '')

            tbody.innerHTML = html
        } else {
            alert('网络失败，请重试')
        }
    })
}