let store = {}
const xuatCuahang = (src, tag) => {
  let html = ``;
  html += `
    <h1 class="display-4">${src.Ten}</h1>
    <p class="lead">${src.Dia_chi}</p>
    <hr class="my-2">
    <p>${src.Dien_thoai} - ${src.Email}</p>
    <p class="lead">
        <a class="btn btn-primary font-weight-bold btn-lg btn-shopping" href="Jumbo action link" role="button">Contact</a>
    </p>
    `
  tag.innerHTML = html;
}

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
