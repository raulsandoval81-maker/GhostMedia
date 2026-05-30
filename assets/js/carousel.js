const payload = JSON.parse(
  localStorage.getItem("ghost-carousel-payload") || "{}"
);

const slides = [
  payload.slide1 || "Slide 1",
  payload.slide2 || "Slide 2",
  payload.slide3 || "Slide 3",
  payload.slide4 || "Slide 4",
  payload.slide5 || "Slide 5"
];

let current = 0;

const slideCounter = document.getElementById("slideCounter");
const carouselSlide = document.getElementById("carouselSlide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function renderSlide() {
  slideCounter.textContent = `${current + 1} / ${slides.length}`;

  carouselSlide.innerHTML = `
    <div class="slide-preview">
      <div class="slide-badge">${current + 1}/5</div>
      <div class="slide-main">
        <h1>${slides[current]}</h1>
      </div>
      <div class="slide-footer">
        <div class="ghost">👻</div>
        <strong>GHOST LOOP HQ</strong>
      </div>
    </div>
  `;
}

prevBtn.addEventListener("click", () => {
  if (current > 0) current--;
  renderSlide();
});

nextBtn.addEventListener("click", () => {
  if (current < slides.length - 1) current++;
  renderSlide();
});

renderSlide();