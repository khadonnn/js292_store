const xuatKhuyenMai = (src = [], tag,nhom) => {
    let html = ``;
    src.slice(0, 8).forEach((item) => {
        html += `
    <div class="col-sm-10 col-md-6 col-lg-3 col-xl-3 mb-2 card-transform">
        <div class="card border-dark card-product card-item">
            <i class="fa-solid fa-heart"></i>
            <img class="card-img-top img-fluid" src="${urlImages}/${item.Ma_so}.png" alt=""onclick="showModal(this)" >
            <div class="card-body">
                <h5 class="card-title text-info">${item.Ten}</h5>
                <p class="card-text text-danger">${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup></p>
            </div>
            <div class="row card-footer d-flex justify-content-end">
                <a href="javaScript:void(0)" onclick="addToCart('${item.Ma_so}',${nhom})" class=" btn btn-outline-primary btn-shopping d-flex ">
                <span class="card-i-footer d-flex align-items-center">
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
}



// getAPI("listSTORE").then((result) => {
//     store = result[0];
//     console.log(store)
//     xuatCuahang(store, tagStore);
//     getAPI("listTIVI").then((result) => {
//         xuatKhuyenMai(result, tagTivi);
//         OnSaleTivi(result, tagSaleTivi);
//         console.log(result)
//         getAPI("listMOBILE").then((result) => {
//             xuatKhuyenMai(result, tagMobile);
//             getAPI("listFOOD").then((result) => {
//                 xuatKhuyenMai(result, tagFood);
//                 ScrollReveal().reveal('.card-product')

//             })

//         })
//     })

// }).catch((err) => {
//     console.log(err)
// })

dbPromise=idb.open(db,1);
idbObjStore.getAll("store").then((result)=>{
    store=result[0];
    xuatCuahang(store,tagStore);
    idbObjStore.getAll("tivi").then((result)=>{
        lst.tivi=result;
        xuatKhuyenMai(result,tagTivi,1);
        OnSaleTivi(result,tagSaleTivi,1);
    })
    idbObjStore.getAll("mobile").then((result)=>{
        lst.mobile=result;
        xuatKhuyenMai(result,tagMobile,2);
    })
    idbObjStore.getAll("food").then((result)=>{
        lst.food=result;
        xuatKhuyenMai(result,tagFood,3);
            ScrollReveal().reveal('.card-product')
        
    })
    
})
