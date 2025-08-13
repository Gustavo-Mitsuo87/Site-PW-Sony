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
