dbPromise = idb.open(db, 1);
idbObjStore.getAll("store").then((result) => {
    store = result[0];
    xuatCuahang(store, tagStore);
    CKEDITOR.replace("thNoidung", {
        "customConfig": "configContact.js"
    })

})

document.getElementById("btnLamlai").onclick = () => {
    document.getElementById("Th_Ho_ten").innerHTML = "";
    document.getElementById("Th_Email").innerHTML = "";
    document.getElementById("Th_Dien_thoai").innerHTML = "";
    document.getElementById("Th_Tieu_de").innerHTML = "";
    CKEDITOR.instances.thNoidung.setData();
    document.getElementById("Th_Ho_ten").focus();
}

document.getElementById("btnGoi").onclick = () => {
    let hoTen = document.getElementById("Th_Ho_ten").value;
    let email = document.getElementById("Th_Email").value;
    let dienThoai = document.getElementById("Th_Dien_thoai").value;
    let tieuDe = document.getElementById("Th_Tieu_de").value;
    let noidung = CKEDITOR.instances.thNoidung.getData();

    // document.getElementById("lblHo_ten").innerHTML="";
    // document.getElementById("lblEmail").innerHTML="";
    // document.getElementById("lblDien_thoai").innerHTML="";
    // document.getElementById("lblTieu_de").innerHTML="";
    // document.getElementById("lblNoidung").innerHTML="";
    let lbls = document.getElementsByClassName("error");
    for (let i = 0; i < lbls.length; i++) {
        lbls[i].innerHTML = ""
    }

    if (hoTen == "") {
        document.getElementById("lblHo_ten").innerHTML = "(*)";
        document.getElementById("Th_Ho_ten").focus();
        return false;
    }
    if (email == "") {
        document.getElementById("lblEmail").innerHTML = "(*)";
        document.getElementById("Th_Email").focus();
        return false;
    }
    if (dienThoai == "") {
        document.getElementById("lblDien_thoai").innerHTML = "(*)";
        document.getElementById("Th_Dien_thoai").focus();
        return false;
    }
    if (tieuDe == "") {
        document.getElementById("lblTieu_de").innerHTML = "(*)";
        document.getElementById("Th_Tieu_de").focus();
        return false;
    }
    if (noidung == "") {
        document.getElementById("lblNoidung").innerHTML = "(*)";
        document.getElementById("thNoidung").focus();
        return false;
    }
    let html = `<h4>Họ tên: ${hoTen}</h4>`;
    html += `Email: ${email}<br />Điện thoại: ${dienThoai}`;
    html += `<p><b>Nội dung</b></p>`;
    html += `${noidung}`;
    let thongTin = {
        tieude: tieuDe,
        noidung: html
    }

    // Gọi API
    apiLienhe(thongTin).then(result => {
        console.log(result);
        if(result.Noi_dung){
            alert(`Cám ơn bạn. Chúng tôi sẽ trả lời sớm nhất cho bạn`);
        }else{
            alert(`Cám ơn bạn. Hiện tại việc gửi mail có sự cố, bạn có thể liên hệ với chúng tôi qua số hotline: 0909123456`)
        }
        
        console.log(result)
        // window.location = '../home'
    })
}
