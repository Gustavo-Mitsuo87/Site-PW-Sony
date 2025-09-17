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
const cards = document.querySelectorAll(".card6");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 1;

// Clona primeiro e último pra suavizar o loop
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

track.appendChild(firstClone);
track.insertBefore(lastClone, cards[0]);

const cardWidth = cards[0].clientWidth;
track.style.transform = `translateX(${-cardWidth * index}px)`;

const moveToCard = () => {
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(${-cardWidth * index}px)`;
};

nextBtn.addEventListener("click", () => {
  if (index >= cards.length + 1) return;
  index++;
  moveToCard();
});

prevBtn.addEventListener("click", () => {
  if (index <= 0) return;
  index--;
  moveToCard();
});

track.addEventListener("transitionend", () => {
  const cardElements = document.querySelectorAll(".card6");

  if (cardElements[index].id === firstClone.id) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }

  if (cardElements[index].id === lastClone.id) {
    track.style.transition = "none";
    index = cardElements.length - 2;
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }
});


///////////////////////////////////////////////////////////////
const searchIcon = document.getElementById("search-icon");
const searchInput = document.getElementById("search-input");

searchIcon.addEventListener("click", () => {
  searchInput.classList.toggle("active");
  if (searchInput.classList.contains("active")) {
    searchInput.focus();
  }
});
