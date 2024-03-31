const slides = [
  {
    id: 1,
    title: "Foundation",
    image: "https://www.gabrini.com/images/kampanya/foundation-resim-226.jpg",
    link: "https://www.gabrini.com/derma-fondoten",
  },
  {
    id: 2,
    title: "Highlighter",
    image: "https://www.gabrini.com/images/kampanya/highlighter-resim-227.jpg",
    link: "https://www.gabrini.com/highligter",
  },
  {
    id: 3,
    title: "Nailpolish",
    image: "https://www.gabrini.com/images/kampanya/nailpolish-resim-225.jpg",
    link: "https://www.gabrini.com/oje",
  },
  {
    id: 4,
    title: "Mascara",
    image: "https://www.gabrini.com/images/kampanya/mascara-resim-224.jpg",
    link: "https://www.gabrini.com/mascara",
  },
  {
    id: 5,
    title: "Perfume",
    image: "https://www.gabrini.com/images/kampanya/perfume-resim-223.jpg",
    link: "https://www.gabrini.com/parfum",
  },
  {
    id: 6,
    title: "Imagaza",
    image: "https://www.gabrini.com/images/kampanya/imagaza-resim-222.jpg",
    link: "https://www.gabrini.com/dudak",
  },
];

function composeSlide(slide) {
  return `   
    <a href=${slide.link} target="_blank">
    <div class="carousel-item ${slide.id == 1 ? "active" : ""}">
      <img src="${slide.image}" class="d-block w-100" alt="Slide ${
    slide.id
  }" title=${slide.title}>
    </div>
    </a>`;
}
function composeSlides(slides) {
  let html = "";
  for (let slide of slides) {
    html += composeSlide(slide);
  }
  return html;
}

export function initSlider(div) {
  div.innerHTML = `
    <div id="slider" class="carousel slide">
  <div class="carousel-inner">
  ${composeSlides(slides)}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#slider" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
}
