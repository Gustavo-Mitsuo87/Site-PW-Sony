const track = document.querySelector(".carousel-track");
let slides = document.querySelectorAll(".carousel-track img");

const slideSize = slides[0].clientWidth + 20; // largura + margem

// Duplica todos os slides para criar o loop
track.innerHTML += track.innerHTML; 
slides = document.querySelectorAll(".carousel-track img");

let index = 0; 
track.style.transform = `translateX(${-slideSize * index}px)`;

// Botões
document.querySelector(".next").addEventListener("click", () => {
  index++;
  moveCarousel();
});

document.querySelector(".prev").addEventListener("click", () => {
  index--;
  moveCarousel();
});

function moveCarousel() {
  track.style.transition = "transform 0.4s ease-in-out";
  track.style.transform = `translateX(${-slideSize * index}px)`;
  setActiveImage();
}

// Reset invisível quando passar do limite
track.addEventListener("transitionend", () => {
  if (index >= slides.length / 2) {
    track.style.transition = "none";
    index = 0;
    track.style.transform = `translateX(${-slideSize * index}px)`;
  } else if (index < 0) {
    track.style.transition = "none";
    index = slides.length / 2 - 1;
    track.style.transform = `translateX(${-slideSize * index}px)`;
  }
  setActiveImage();
});

// Destaque da imagem ativa
function setActiveImage() {
  slides.forEach(img => img.classList.remove("active"));
  const current = ((index % (slides.length / 2)) + (slides.length / 2)) % (slides.length / 2);
  slides[current].classList.add("active");
}

// Responsivo
window.addEventListener("resize", () => {
  const newSize = slides[0].clientWidth + 20;
  track.style.transition = "none";
  track.style.transform = `translateX(${-newSize * index}px)`;
});
