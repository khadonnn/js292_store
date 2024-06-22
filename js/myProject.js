
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
// show san pham
const ItemHeaders = document.querySelectorAll(".menuProducts");
ItemHeaders.forEach(ItemHeader => {
  ItemHeader.addEventListener("click", function () {
    ItemHeader.classList.toggle("active");
    const ItemBody = ItemHeader.nextElementSibling;
    if (ItemHeader.classList.contains("active")) {
      ItemBody.style.maxHeight = ItemBody.scrollHeight + "px";
    }
    else {
      ItemBody.style.maxHeight = 0;
    }

  });
});
// counting

let animationStarted = false; // Biến để kiểm soát
const counts = document.querySelectorAll('.counter');
const speed = 97;
// Function để bắt đầu hiệu ứng
function startCounterAnimation() {
  counts.forEach((counter) => {
    function update() {
      const target = Number(counter.getAttribute('data-target'));
      const count = Number(counter.innerText);
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(update, 15);
      } else {
        counter.innerText = target.toLocaleString()+`+`;
      }
    }
    update();
  });
}

// Sử dụng Intersection Observer 
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animationStarted) {
      startCounterAnimation(); // Bắt đầu 
      animationStarted = true; // Đánh dấu 
      observer.unobserve(entry.target); // Dừng q
    }
  });
}, { threshold: 0.5 }); // visibility
const counterWrapper = document.querySelector('.contact-bottom');
if (counterWrapper) {
  observer.observe(counterWrapper);
}