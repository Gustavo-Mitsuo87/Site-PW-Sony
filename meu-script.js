window.addEventListener('load', () => {
  const faixa = document.querySelector('.XPcarousel-faixa');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const slides = document.querySelectorAll('.XPcarousel-faixa img');
  const indicadores = document.querySelectorAll('.XPcarousel-indicators span');

  let slideWidth = slides[0]?.clientWidth || 0;
  let ImagemAtual = 0;
  let intervalo;

  function updateCarousel() {
    if (slides.length === 0) return;

    faixa.style.transform = `translateX(${-ImagemAtual * slideWidth}px)`;

    slides.forEach(slide => slide.classList.remove('active'));
    slides[ImagemAtual].classList.add('active');

    indicadores.forEach(ind => ind.classList.remove('active'));
    indicadores[ImagemAtual].classList.add('active');
  }

  function iniciarAutoPlay() {
    intervalo = setInterval(() => {
      ImagemAtual = (ImagemAtual + 1) % slides.length;
      updateCarousel();
    }, 3000);
  }

  function pararAutoPlay() {
    clearInterval(intervalo);
  }

  // Botão próximo
  nextBtn.addEventListener('click', () => {
    ImagemAtual = (ImagemAtual + 1) % slides.length;
    updateCarousel();
  });

  // Botão anterior
  prevBtn.addEventListener('click', () => {
    ImagemAtual = (ImagemAtual - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  // Clique nas bolinhas
  indicadores.forEach(ind => {
    ind.addEventListener('click', () => {
      ImagemAtual = parseInt(ind.dataset.slide);
      updateCarousel();
    });
  });

  // Pausar autoplay ao passar o mouse
  document.querySelector('.XPcarousel').addEventListener('mouseenter', pararAutoPlay);

  // Retomar autoplay ao tirar o mouse
  document.querySelector('.XPcarousel').addEventListener('mouseleave', iniciarAutoPlay);

  // Ajustar tamanho ao redimensionar
  window.addEventListener('resize', () => {
    slideWidth = slides[0]?.clientWidth || 0;
    updateCarousel();
  });

  // Transição suave no movimento
  faixa.style.transition = 'transform 0.5s ease-in-out';

  // Inicialização
  updateCarousel();
  iniciarAutoPlay();
});