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

  const cardWidth = card.offsetWidth;
  const gap = 16; // ou dinâmico via getComputedStyle
  const scrollAmount = cardWidth + gap;

  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  let nextScroll = carousel.scrollLeft + direction * scrollAmount;

  // Loop infinito
  if (nextScroll > maxScrollLeft) {
    nextScroll = 0; // volta pro início
  } else if (nextScroll < 0) {
    nextScroll = maxScrollLeft; // vai pro fim
  }

  carousel.scrollTo({
    left: nextScroll,
    behavior: "smooth",
  });

  // Efeito visual
  carousel.style.transition = "transform 0.3s ease";
  carousel.style.transform = "scale(0.98)";
  setTimeout(() => {
    carousel.style.transform = "scale(1)";
  }, 200);
}
// TV Inicio
// Lista de todas as imagens do carrossel - PrincipaisRecursosTv
const imagensPrincipaisRecursosTv = document.querySelectorAll(
  ".imagem-principais-recursos_tv"
);

// Índice da imagem atualmente visível - PrincipaisRecursosTv
let indiceAtualPrincipaisRecursosTv = 0;

// Função para mostrar a imagem com base no índice atual - PrincipaisRecursosTv
function mostrarImagemPrincipaisRecursosTv(indice) {
  imagensPrincipaisRecursosTv.forEach((img, i) => {
    img.classList.remove("ativa_principais-recursos_tv");
    img.style.display = "none";
  });

  imagensPrincipaisRecursosTv[indice].classList.add(
    "ativa_principais-recursos_tv"
  );
  imagensPrincipaisRecursosTv[indice].style.display = "block";
}

// Função para avançar para a próxima imagem - PrincipaisRecursosTv
function avancarImagemPrincipaisRecursosTv() {
  indiceAtualPrincipaisRecursosTv++;
  if (indiceAtualPrincipaisRecursosTv >= imagensPrincipaisRecursosTv.length) {
    indiceAtualPrincipaisRecursosTv = 0;
  }
  mostrarImagemPrincipaisRecursosTv(indiceAtualPrincipaisRecursosTv);
}

// Função para voltar para a imagem anterior - PrincipaisRecursosTv
function voltarImagemPrincipaisRecursosTv() {
  indiceAtualPrincipaisRecursosTv--;
  if (indiceAtualPrincipaisRecursosTv < 0) {
    indiceAtualPrincipaisRecursosTv = imagensPrincipaisRecursosTv.length - 1;
  }
  mostrarImagemPrincipaisRecursosTv(indiceAtualPrincipaisRecursosTv);
}

// Inicializa o carrossel mostrando a primeira imagem - PrincipaisRecursosTv
mostrarImagemPrincipaisRecursosTv(indiceAtualPrincipaisRecursosTv);

// TV Fim
