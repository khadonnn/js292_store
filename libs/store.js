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


