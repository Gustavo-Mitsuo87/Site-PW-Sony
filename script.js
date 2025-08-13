// Seleciona o navbar
const navbar = document.getElementById("navbar");

// Adiciona um listener de scroll na janela
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled"); // Adiciona a classe quando rolar
  } else {
    navbar.classList.remove("scrolled"); // Remove a classe ao voltar
  }
});

//////////////////////////////////////////////////////////////
const track = document.querySelector(".carousel-track");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");

let currentIndex = 1;
let isTransitioning = false;
let autoplayInterval;
let startX = 0;
let endX = 0;

// Clona primeiro e último slide
const cards = Array.from(track.children);
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);
firstClone.classList.add("clone");
lastClone.classList.add("clone");

track.appendChild(firstClone);
track.insertBefore(lastClone, track.firstChild);

const updatedCards = Array.from(track.children);

function updateCarousel() {
  const cardWidth = updatedCards[0].getBoundingClientRect().width;
  track.style.transition = "transform 0.4s ease-in-out";
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function jumpToRealSlide() {
  const cardWidth = updatedCards[0].getBoundingClientRect().width;
  track.style.transition = "none";
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// Navegação pelas setas
nextButton.addEventListener("click", () => {
  if (isTransitioning) return;
  currentIndex++;
  updateCarousel();
  isTransitioning = true;
});

prevButton.addEventListener("click", () => {
  if (isTransitioning) return;
  currentIndex--;
  updateCarousel();
  isTransitioning = true;
});

// Loop contínuo visual
track.addEventListener("transitionend", () => {
  const realCardsCount = updatedCards.length - 2;
  if (updatedCards[currentIndex].classList.contains("clone")) {
    if (currentIndex === updatedCards.length - 1) {
      currentIndex = 1;
    } else if (currentIndex === 0) {
      currentIndex = realCardsCount;
    }
    jumpToRealSlide();
  }
  isTransitioning = false;
});

// Swipe para touch
track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50;
  if (endX < startX - threshold) {
    nextButton.click();
  } else if (endX > startX + threshold) {
    prevButton.click();
  }
}

// Responsividade: atualiza o carrossel ao redimensionar a janela
window.addEventListener("resize", updateCarousel);

function scrollCarousel(id, direction) {
  const carousel = document.getElementById(id);
  if (!carousel) return;

  // Detecta o card certo baseado no id
  let cardClass =
    id === "games" ? ".card-ps" : id === "games-plus" ? ".card-ps-plus" : null;
  if (!cardClass) return;

  const card = carousel.querySelector(cardClass);
  if (!card) return;

  const cardStyle = window.getComputedStyle(card);
  const cardWidth = card.offsetWidth;
  const gap = 16; // ou pega de algum lugar se for dinâmico

  const scrollAmount = cardWidth + gap;

  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });

  // Pequeno efeito visual
  carousel.style.transition = "transform 0.3s ease";
  carousel.style.transform = "scale(0.98)";
  setTimeout(() => {
    carousel.style.transform = "scale(1)";
  }, 200);
}

const video = document.getElementById("video1");
const btn = document.getElementById("playSoundBtn");

btn.addEventListener("click", () => {
  video.muted = false;
  video.volume = 1;
  video.play();
});
// TV Inicio

// TV Fim
