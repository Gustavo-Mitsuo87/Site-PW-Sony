// Seleciona o navbar
const navbar = document.getElementById('navbar');

// Adiciona um listener de scroll na janela
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled'); // Adiciona a classe quando rolar
  } else {
    navbar.classList.remove('scrolled'); // Remove a classe ao voltar
  }
});

//////////////////////////////////////////////////////////////
const track = document.querySelector('.carousel-track');
  const cards = Array.from(track.children);
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');

  let currentIndex = 0;

    const updateCarousel = () => {
    const cardWidth = cards[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  };

  nextButton.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Responsividade: atualiza o carrossel ao redimensionar a janela
  window.addEventListener('resize', updateCarousel);


