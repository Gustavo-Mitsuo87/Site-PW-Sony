function scrollCarousel(id, direction) {
  const carousel = document.getElementById(id);
  if (!carousel) return;

  let cardClass = id === "games-plus-tv" ? ".card-ps-plus-tv" : null;

  if (!cardClass) return;

  const cards = carousel.querySelectorAll(cardClass);
  if (!cards.length) return;

  const cardWidth = cards[0].offsetWidth;
  const gap = 16; // Espaço entre os cards
  const scrollAmount = cardWidth + gap;

  // Verifica posição atual
  const maxScroll = scrollAmount * (cards.length - 1);

  // Se estiver no fim e for para a direita, volta pro início
  if (direction > 0 && carousel.scrollLeft >= maxScroll) {
    carousel.scrollLeft = 0;
  }
  // Se estiver no início e for para a esquerda, vai para o fim
  else if (direction < 0 && carousel.scrollLeft <= 0) {
    carousel.scrollLeft = maxScroll;
  } else {
    // Movimento normal
    carousel.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  }
}
const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".carousel-slide"));
const indicatorsContainer = document.querySelector(".carousel-indicators");

let index = 0;
const totalSlides = slides.length;

// Criar indicadores dinamicamente
slides.forEach((_, i) => {
  const btn = document.createElement("button");
  if (i === 0) btn.classList.add("active");
  btn.addEventListener("click", () => {
    index = i;
    updateCarousel();
  });
  indicatorsContainer.appendChild(btn);
});

const indicators = document.querySelectorAll(".carousel-indicators button");

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
  indicators.forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
}

// Rotação automática
setInterval(() => {
  index = (index + 1) % totalSlides;
  updateCarousel();
}, 4000);
