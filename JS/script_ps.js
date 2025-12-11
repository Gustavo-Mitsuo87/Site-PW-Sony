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

const searchIcon = document.getElementById("search-icon");
const searchInput = document.getElementById("search-input");
searchIcon.addEventListener("click", () => {
  searchInput.classList.toggle("active");
  if (searchInput.classList.contains("active")) {
    searchInput.focus();
  }
});
function trocarControle(img) {
  const controleGrande = document.getElementById("controle-grande");
  const controleTitulo = document.getElementById("controle-titulo");
  const controleTexto = document.getElementById("controle-texto");
  const controleLink = document.getElementById("controle-link"); // botão

  // fade out
  controleGrande.style.opacity = "0";
  controleTitulo.style.opacity = "0";
  controleTexto.style.opacity = "0";
  controleLink.style.opacity = "0";

  setTimeout(() => {
    controleGrande.src = img.getAttribute("data-png");
    controleTitulo.textContent = img.getAttribute("data-title");
    controleTexto.textContent = img.getAttribute("data-text");
    controleLink.href = img.getAttribute("data-link"); // atualiza link

    // fade in
    controleGrande.style.opacity = "1";
    controleTitulo.style.opacity = "1";
    controleTexto.style.opacity = "1";
    controleLink.style.opacity = "1";
  }, 200);
}

// garante que ao carregar a página já aparece a primeira imagem + titulo + texto + link
window.addEventListener("DOMContentLoaded", () => {
  const primeiraThumb = document.querySelector(".thumbs img");
  if (primeiraThumb) {
    document.getElementById("controle-grande").src =
      primeiraThumb.getAttribute("data-png");
    document.getElementById("controle-titulo").textContent =
      primeiraThumb.getAttribute("data-title");
    document.getElementById("controle-texto").textContent =
      primeiraThumb.getAttribute("data-text");
    document.getElementById("controle-link").href =
      primeiraThumb.getAttribute("data-link");
  }
});
