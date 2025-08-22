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

const menuToggle = document.getElementById("menu-toggle");
const sideMenu = document.getElementById("side-menu");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", (e) => {
  e.preventDefault();
  sideMenu.classList.toggle("active");
  overlay.style.display = sideMenu.classList.contains("active") ? "block" : "none";
});

// Fechar menu clicando no overlay
overlay.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.style.display = "none";
});


const searchIcon = document.getElementById("search-icon");
const searchInput = document.getElementById("search-input");

searchIcon.addEventListener("click", () => {
  searchInput.classList.toggle("active");
  if (searchInput.classList.contains("active")) {
    searchInput.focus();
  }
});
