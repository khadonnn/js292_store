let mobiles=[];
let dsNhom=[];
let dsTmp=[];

// Tim theo Tên
const timTheoTen=(event)=>{
    console.log(event.keyCode);
    if(event.keyCode==13){
        event.preventDefault();
        let gtTim=event.target.value;
        let ds=dsTmp.filter(x=>x.Ten.toLowerCase().includes(gtTim.toLowerCase()))
        xuatMobile(ds, tagMobile);
    }
}
const timTheoSubmit=(event)=>{
    if(event.target.type==="submit"){
        event.preventDefault();
        let gtTim=document.getElementById('Search').value;
        let ds=dsTmp.filter(x=>x.Ten.toLowerCase().includes(gtTim.toLowerCase()))
        xuatMobile(ds, tagMobile);
    }
}
// sap xep Gia
const sapXepGia=(btn)=>{
    let sort=Number(btn.getAttribute("sort"));
    let lbl='';
    if(sort==1){
        sort=-1
        lbl=`Giá &uparrow;`
        dsTmp.sort((a,b)=>{
            return Number(a.Don_gia_Ban)-Number(b.Don_gia_Ban)
        })
    }else{
        sort=1
        lbl=`Giá &downarrow;`
        dsTmp.sort((a,b)=>{
        return Number(b.Don_gia_Ban) - Number(a.Don_gia_Ban)
        });
    }
    btn.setAttribute("sort",sort);
    btn.innerHTML=lbl;
    xuatMobile(dsTmp,tagMobile);
}
// sap xep Ten
const sapXepTen=(btn)=>{
    let sort=Number(btn.getAttribute("sort"));
    let lbl='';
    if(sort==1){
        sort=-1
        lbl=`Tên &uparrow;`
        dsTmp.sort((a,b)=>{
            return a.Ten.toLowerCase().localeCompare(b.Ten.toLowerCase())
        })
    }else{
        sort=1
        lbl=`Tên &downarrow;`
        dsTmp.sort((a,b)=>{
            return b.Ten.toLowerCase().localeCompare(a.Ten.toLowerCase())
        })
    }
    btn.setAttribute("sort",sort);
    btn.innerHTML=lbl;
    xuatMobile(dsTmp,tagMobile); 
}

const xuatMobile = (src = [], tag) => {
    let html = ``;
    src.forEach((item) => {
        html += `
    <div class="col-sm-3 col-md-3 col-xl-3 mb-2 card-transform">
        <div class="card border-dark card-product card-item" >
            <i class="fa-solid fa-heart"></i>
            <img class="card-img-top " src="${urlImages}/${item.Ma_so}.png" alt="" onclick="showModal(this)">
            <div class="card-body">
                <h5 class="card-title text-info">${item.Ten}</h5>
                <p class="card-text text-danger">${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup></p>
            </div>
            <div class="row card-footer d-flex justify-content-end">
                <a href="javaScript:void(0)" onclick="addToCart('${item.Ma_so}',2)" class=" btn btn-outline-primary btn-shopping d-flex">
                <span class="card-i-footer d-flex align-content-center">
                <i class="fa-solid fa-cart-shopping "></i>
                </span>
                Thêm vào giỏ
                </a>
            </div>
        </div>
    </div>
        `
    })
    tag.innerHTML = html;
    tagTieude.innerHTML=`Mobile (${src.length})`
}

// loc gia san pham
const taoNhomMobile = () => {
    dsNhom = Array.from(new Set(mobiles.map(x => x.Nhom.Ma_so))).map(Ma_so => {
        nhom = {
            Ma_so: Ma_so,
            Ten: mobiles.find(x => x.Nhom.Ma_so == Ma_so).Nhom.Ten.toUpperCase(),
            Soluong: mobiles.filter(x => x.Nhom.Ma_so == Ma_so).length
        }
        return nhom
    })

    dsNhom.unshift({
        "Ma_so": "ALL",
        "Ten": "ALL",
        "Soluong": mobiles.length
    })
}

const xuatNhomMobile = (ds = [], tag) => {
    let html = ``;
    ds.forEach((item, index) => {
        let clsActive = (index == 0) ? "alway-hover" : "";
        html += `
        <li class="list-item d-flex justify-content-between align-items-center ${clsActive}" onclick="xuatMobileTheoNhom('${item.Ma_so}',this)">
            <a href="javaScript:void(0)" >${item.Ten}</a>
            <span class="badge badge-primary badge-pill ml-2">${item.Soluong}</span>
            
        </li>
        `
    })
    tag.innerHTML = html;
}

const xuatMobileTheoNhom = (maNhom,x) => {
    if (maNhom != "ALL") {
        dsTmp = mobiles.filter(x => x.Nhom.Ma_so == maNhom);
    } else {
        dsTmp = mobiles
    }
    document.querySelectorAll(".alway-hover")[0].classList.remove("alway-hover")
    x.classList.add('alway-hover');
    updateSlider(dsTmp)
    xuatMobile(dsTmp, tagMobile);
    
}

// 
// getAPI("listSTORE").then((result)=>{
//     store = result[0];
//     xuatCuahang(store, tagStore);
//     getAPI("listMOBILE").then((result)=>{
//         mobiles = result;
//         dsTmp=result;
//         taoNhomMobile();
//         console.log(dsNhom);
//         xuatNhomMobile(dsNhom,tagLstNhom);
//         xuatMobile(mobiles, tagMobile)
//         updateSlider(dsTmp)
//         ScrollReveal().reveal('.card-transform')

//     })
// }).catch((err) => {
//     console.log(err)
// });

// Load more san pham

dbPromise=idb.open(db,1);
idbObjStore.getAll("store").then((result)=>{
    store=result[0];
    xuatCuahang(store,tagStore);
    idbObjStore.getAll("mobile").then((result)=>{
        mobiles=result;
        dsTmp=result;
        lst.mobile=result;
        taoNhomMobile();
        xuatNhomMobile(dsNhom,tagLstNhom);
        xuatQuangcao(dsTmp,tagCarousel);
        xuatMobile(mobiles,tagMobile)
        updateSlider(dsTmp);
        ScrollReveal().reveal('.card-transform')

    })
    
})

if (sessionStorage.getItem("carts") != undefined) {
    carts = JSON.parse(sessionStorage.getItem("carts"))
    Th_Gio_hang.innerHTML = carts.length;
}