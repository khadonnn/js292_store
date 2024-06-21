var capNhat = true; // Thêm
const Xuat_Danh_sach = (ds) => {
    
    let html = ``;
    ds.sort((a, b) => a.Ho_ten.localeCompare(b.Ho_ten))
    ds.forEach((item, index) => {
        html += `
        <tr>
            <td scope="row" class="text-center">${item.Ma_so}</td>
            <td class="text-center">
                <img src='${Dia_chi_Img}/${item.Ma_so}.png' class="" />
            </td>
            <td>${item.Ho_ten}</td>
            <td class="text-center">${item.Nhom_Nguoi_dung.Ten}</td>
            <td>
                <a href="javaScript:void(0)" data-toggle="modal" data-target="#modelId" title='Sửa user' onclick="updateUser('${item.Ma_so}')">
                    <i class="fa fa-pencil-square-o text-danger" aria-hidden="true"></i>
                </a>
            </td>
            <td>
                <a href="javaScript:void(0)" onclick="deleteUser('${item.Ma_so}')" title='Xóa user'>
                    <i class="fa fa-trash text-danger" aria-hidden="true"></i>
                </a>
            </td>
        </tr>
        `
    })

    document.querySelector("#Th_Danhsach").innerHTML = html;
}

const KeyCode = (event) => {
    if (event.keyCode == 13) {
        let gtTim = event.target.value.trim()
        let ds = dsUser.filter(x => x.Ho_ten.toLowerCase().includes(gtTim.toLowerCase()))
        Xuat_Danh_sach(ds)

    }
}
// Add Mobile
const insertUser = () => {
    capNhat = true;
    showModal();
}
// Update Mobile
const updateUser = (key) => {
    capNhat = false;
    let item = dsUser.find(x => x.Ma_so == key);
    showModal(item);

}
// Delete Mobile
const deleteUser = (key) => {
    if(confirm('Hệ thống sẽ Xóa Dữ liệu...?')){
        let condition={
            "Ma_so":key
        }
        apiUserDelete(condition).then(result=>{
            alert('Xóa thành công');
            window.location.reload();
        })
    }
}
// Show Modal
const showModal = (item = null) => {
    let urlImg = null;
    let Nhom = "";
    document.querySelector("#ModalTitle").innerHTML = `Thêm Nhân viên`;
    if (item) {
        document.querySelector("#ModalTitle").innerHTML = `Sửa Nhân viên`;
        urlImg = `${Dia_chi_Img}/${item.Ma_so}.png`;
        Nhom = item.Nhom_Nguoi_dung.Ma_so;
    }

    let html = ``
    html += `
    <div class="form-group">
        <label for="Th_Ma_so">Mã Số</label>
        <input type="text" class="form-control" id="Th_Ma_so" readonly placeholder="Mã số Nhân viên" style="visibility: visible;"
            value="${item ? item.Ma_so : ''}">
    </div>
    <div class="form-group">
        <label for="Th_Ho_ten">Tên</label>
        <input type="text" class="form-control" id="Th_Ho_ten" 
            placeholder="Tên Nhân viên" value="${item ? item.Ho_ten : ''}">
    </div>
     <div class="form-group">
        <label for="Th_Vi_tri">Vị trí</label>
        <input type="text" class="form-control" id="Th_Vi_tri" 
            placeholder="Tên Nhân viên" value="${item ? item.Nhom_Nguoi_dung.Ten : ''}">
    </div>
    <div class="form-group">
        <label for="Th_Don_gia_Nhap">Tên đăng nhập</label>
    <input type="text" class="form-control" id="Th_Dang_Nhap" 
            placeholder="Tên đăng nhập" value="${item ? item.Ten_Dang_nhap : ''}">
    </div>
    <div class="form-group">
        <label for="Th_Don_gia_Ban">Mật khẩu</label>
        <input type="text" class="form-control" id="Th_Mat_khau" 
            placeholder="Mật khẩu" value="${item ? item.Mat_khau : ''}">
    </div>
    <div class="form-group">
        <label for="Th_Nhom_Dien_thoai">Vị trí</label>
        <select id="Th_Nhom_Dien_thoai">
            <option value="QUAN_LY_BAN_HANG" ${Nhom == 'QUAN_LY_BAN_HANG' ? 'selected' : ''} >QUAN_LY_BAN_HANG</option>
            <option value="QUAN_LY_CUA_HANG" ${Nhom == 'QUAN_LY_CUA_HANG' ? 'selected' : ''}>QUAN_LY_CUA_HANG</option>
            <option value="NHAN_VIEN_BAN_HANG" ${Nhom == 'NHAN_VIEN_BAN_HANG' ? 'selected' : ''}>NHAN_VIEN_BAN_HANG</option>
            <option value="NHAN_VIEN_QUAN_LY" ${Nhom == 'NHAN_VIEN_QUAN_LY' ? 'selected' : ''}>NHAN_VIEN_QUAN_LY</option>
        </select>
    </div>
    <div class="form-group">
        <label for="Th_File">Chọn hình</label>
        <input type="file" class="form-control-file" id="Th_File" onchange="previewImg()">`
    if (!item) {
        html += `<img id="Th_PreImg" style="width:10rem"  />`
    } else {
        html += `<img id="Th_PreImg" style="width:10rem" src="${urlImg}"  />`
    }

    html += `</div>`

    document.querySelector("#ModalBody").innerHTML = html

}
// Preview Image
const previewImg = () => {
    var reader = new FileReader();
    reader.onload = function (e) {
        console.log(e.target.result)
        Th_PreImg.src = e.target.result;
    }
    reader.readAsDataURL(document.querySelector("#Th_File").files[0]);
    
}
// Get key end, create key new
const autoKey = () => {
    let keyNhom = Th_Nhom_Dien_thoai.value;
    let arrNhom = dsUser.filter(x => x.Nhom.Ma_so == keyNhom)
    arrNhom.sort((a, b) => { return Number(a.Ma_so.trim().split("_")[1]) - Number(b.Ma_so.trim().split("_")[1]) })
    let keyEnd = arrNhom[arrNhom.length - 1];
    let num = Number(keyEnd.Ma_so.split("_")[1]) + 1;
    keyNhom = keyNhom.concat("_", num.toString());
    return keyNhom;
}

// Save 
const saveUser = () => {

    let Ma_so = (document.querySelector("#Th_Ma_so").value != "") ? document.querySelector("#Th_Ma_so").value : autoKey();
    // console.log(Ma_so);
    // return false;
    
    let Ho_ten = document.querySelector("#Th_Ho_ten").value.trim();
    let Mat_khau = (document.querySelector("#Th_Mat_khau").value);
    let Ten_Dang_nhap = (document.querySelector("#Th_Dang_Nhap").value);
    let Nhom_Dien_thoai = document.querySelector("#Th_Nhom_Dien_thoai").value;
    let Th_Vi_tri=document.querySelector("#Th_Vi_tri").value;

    if (capNhat) {
        // Insert
        let userNew = {
            "Ho_ten": Ho_ten,
            "Ma_so": Ma_so,
            "Ten_Dang_nhap": Ten_Dang_nhap,
            "Mat_khau": Mat_khau,
            "Nhom_Nguoi_dung": {
                "Ten": Th_Vi_tri,
                "Ma_so": Nhom_Dien_thoai
            }
        }
        
        //console.log(mobileNew)
        //return false;
        // Call API
        apiUserInsert(userNew).then(result=>{
            console.log(result);
            if(result.Noi_dung){
                saveImg(Ma_so);
                apiUser().then(result => {
                    dsUser = result;
                    Xuat_Danh_sach(dsUser);
                    document.querySelector("#ModalCancel").click();
                    window.location.reload();
                })
            }
            
        })


    } else {
        // Update
        let userUpdate = {
            condition: {
                "Ma_so": Ma_so
            },
            update: {
                $set: {
                    "Ho_ten": Ho_ten,
                    "Ten_Dang_nhap": Ten_Dang_nhap,
                    "Mat_khau": Mat_khau,
                    "Nhom_Nguoi_dung": {
                        "Ten": Th_Vi_tri,
                        "Ma_so": Nhom_Dien_thoai
                    }
                }

            }
        }
        // console.log(mobileUpdate)
        // Call API
        apiUserUpdate(userUpdate).then(result=>{
            saveImg(Ma_so);
            apiUser().then(result => {
                dsUser = result;
                Xuat_Danh_sach(dsUser);
                document.querySelector("#ModalCancel").click();
            })
            //window.location.reload();
        }) 


    }
    
    
}

const saveImg=(Ma_so)=>{
    let imgName = document.querySelector("#Th_File").value
    // Người dùng có chọn hình
    if (imgName) {
        let reader = new FileReader()
        let Chuoi_nhi_phan = ""
        //let Ten_Hinh = `${Ma_so}.png` // upload vào thư mục images trong dịch vụ nodejs
        let Ten_Hinh = `${Ma_so}` // upload lên trên host cloudinary
        reader.onload = function (e) {
            Chuoi_nhi_phan = e.target.result;
            let img = { "name": Ten_Hinh, "src": Chuoi_nhi_phan }
            //console.log(img)
            apiImageDienthoai(img).then(result=>{
                console.log(result)
                //reader.clear()    
            })
            
        }
        reader.readAsDataURL(document.querySelector("#Th_File").files[0])
    }
}