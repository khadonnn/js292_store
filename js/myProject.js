
// scroll-animation
ScrollReveal({ 
    reset: true,
    distance: '70px',
    durtation: 2000,
    easing:'ease'
});
ScrollReveal().reveal('.contact-bottom, .main_title', { origin: 'bottom', interval: 300});
ScrollReveal().reveal(' .list-products', { origin: 'top', interval: 300, reset:true });
ScrollReveal().reveal('.product-title', { origin: 'left',reset:false });
ScrollReveal().reveal('.thumbnail-products', { origin: 'right'});
  
// flash-sale
const listProducts =document.querySelectorAll(".flash-sale-list .flash-sale-header");
listProducts.forEach((li)=>{
    li.addEventListener("click",()=>{
        listProducts.forEach((li2)=>{
            li2.classList.remove("active");
        })
        li.classList.add("active");
    });
})

// list-products
