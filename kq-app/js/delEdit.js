let flagEdit = false;
tbody.onclick = function(e) {
    let target = e.target || e.srcElement;
    if (target.id == "btnDel") {
        let id = target.parentElement.parentElement.getAttribute("data-id");
        utils.fetch('./api/v1/shop/delete.php', { id }).then(resp => {
            console.log(resp);
            getData();
        })
    }
    if (target.id == "btnEdit") {
        flagEdit = true;
        tr = target.parentElement.parentElement;
        const spanName = tr.getElementsByClassName("spanName")[0].innerHTML;
        const spanPrice = tr.getElementsByClassName("spanPrice")[0].innerHTML;
        const spanNum = tr.getElementsByClassName("spanNum")[0].innerHTML;

        inpName = tr.getElementsByClassName("inpName")[0];
        inpPrice = tr.getElementsByClassName("inpPrice")[0];
        inpNum = tr.getElementsByClassName("inpNum")[0];

        inpName.value = spanName;
        inpPrice.value = spanPrice;
        inpNum.value = spanNum;
        tr.classList.add("edit");
    }

    if (target.id == "btnOk" && flagEdit) {
        let id = tr.getAttribute("data-id");
        utils.fetch('./api/v1/shop/edit.php', { id, name: inpName.value, price: inpPrice.value, num: inpNum.value }).then(resp => {
            getData();
        })
    }
    if (target.id == "btnCancel") {
        tr.classList.remove("edit");
    }
}