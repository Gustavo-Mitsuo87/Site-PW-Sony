function initCarrossel(carrossel) {
  const slides = carrossel.querySelector('.slides');
  const slide = carrossel.querySelectorAll('.slide');
  const prev = carrossel.querySelector('.prev');
  const next = carrossel.querySelector('.next');
  t
  let index = 0;
  let autoPlay;

  function showSlide(i) {
    if (i < 0) index = slide.length - 1;
    else if (i >= slide.length) index = 0;
    else index = i;

    slides.style.transform = `translateX(${-index * 100}%)`;
  }

  function startAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
      showSlide(index + 1);
    }, 3000);
  }

  prev.addEventListener('click', () => {
    showSlide(index - 1);
    startAutoPlay();
  });

  next.addEventListener('click', () => {
    showSlide(index + 1);
    startAutoPlay();
  });

  startAutoPlay();
}

/* Inicializa todos os carrosséis da página */
document.querySelectorAll('.carrossel').forEach(initCarrossel);

///////////////////////////////////////////////////////////////
const searchIcon = document.getElementById("search-icon");
const searchInput = document.getElementById("search-input");

searchIcon.addEventListener("click", () => {
  searchInput.classList.toggle("active");
  if (searchInput.classList.contains("active")) {
    searchInput.focus();
  }
});

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