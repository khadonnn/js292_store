var saleRandom = 10 + Math.random() *10;
var saleRate=saleRandom.toFixed(2);


const OnSaleTivi=(src=[],tagSaleTivi)=>{
    let html=``
    src.slice(0, 4).forEach((item)=>{
        html +=`
        <div class="col-xl-3 col-sm-6 col-md-6" >
            <div class="image-container">
                <div class="card border-dark card-product card-product">
                    <i class="fa-solid fa-heart"></i>
                    <img class="card-img-top " src="${urlImages}/${item.Ma_so}.png" alt="" onclick="showModal(this)">
                    <div class="card-body pt-1 pb-1">
                        <h5 class="card-title text-info">${item.Ten}</h5>
                        <p class="card-text text-danger mb-1">${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup></p>
                        <div class="sale-section d-flex justify-content-between">
                            <p class="card-text text-secondary"
                                style="text-decoration: line-through; font-size: 13px;">
                                ${item.Don_gia_Ban}<sup>đ</sup>
                            </p>
                            <p class="card-text text-info " style="font-size: 12px;right:14px">-${saleRate}<sup>%</sup></p>
                        </div>
                    </div>
                    <div class="card-footer text-right pt-1">
                        <a href="javaScript:void(0)" class="btn btn-info btn-shopping " style="font-size:12px,font-weight:400" onclick="addToCart('${item.Ma_so}',1)">Thêm vào giỏ</a>
                    </div>
                </div>
            </div>
        </div>
        `
    })
    tagSaleTivi.innerHTML=html;
}
// offer end in
const day=document.querySelector('.day')
const hour=document.querySelector('.hour')
const minute=document.querySelector('.minute')
const second=document.querySelector('.second')
// tarGetTime.setDate(tarGetTime.getDate())

function upDateTime(){
    const tarGetTime=new Date("Jun 25, 2024 23:59:59").getTime();
    const currentTime=new Date().getTime();
    const timeDifference=tarGetTime - currentTime;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // const hours=Math.floor(timeDifference/(1000*60*60*24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes=Math.floor((timeDifference%(1000*60*60))/(1000*60));
    const seconds=Math.floor((timeDifference%(1000*60))/1000)
    
    day.textContent=days.toString().padStart(2,"0");
    hour.textContent=hours.toString().padStart(2,"0");
    minute.textContent=minutes.toString().padStart(2,"0");
    second.textContent=seconds.toString().padStart(2,"0")
    
}
upDateTime()
setInterval(upDateTime,1000);