let store={}
const xuatCuahang=(src, tag)=>{
    let html=``;
    html+=`
    <h1 class="display-4">${src.Ten}</h1>
    <p class="lead">${src.Dia_chi}</p>
    <hr class="my-2">
    <p>${src.Dien_thoai} - ${src.Email}</p>
    <p class="lead">
        <a class="btn btn-primary font-weight-bold btn-lg btn-shopping" href="Jumbo action link" role="button">Contact</a>
    </p>
    `
    tag.innerHTML=html;
}

// show san pham
const ItemHeaders = document.querySelectorAll(".menuProducts");
ItemHeaders.forEach(ItemHeader => {
  ItemHeader.addEventListener("click", function() {
    ItemHeader.classList.toggle("active");
    const ItemBody = ItemHeader.nextElementSibling;
    if(ItemHeader.classList.contains("active")) {
      ItemBody.style.maxHeight = ItemBody.scrollHeight + "px";
    }
    else {
      ItemBody.style.maxHeight = 0;
    }
    
  });
});