const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const indicatorsContainer = document.querySelector('.carousel-indicators');

let index = 0;
const totalSlides = slides.length;

// Criar indicadores dinamicamente
slides.forEach((_, i) => {
  const btn = document.createElement('button');
  if (i === 0) btn.classList.add('active');
  btn.addEventListener('click', () => {
    index = i;
    updateCarousel();
  });
  indicatorsContainer.appendChild(btn);
});

const indicators = document.querySelectorAll('.carousel-indicators button');

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
  indicators.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
}

// Rotação automática
setInterval(() => {
  index = (index + 1) % totalSlides;
  updateCarousel();
}, 4000);