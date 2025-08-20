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

function setupIndicators(id) {
  const carousel = document.getElementById(id);
  const indicators = document.getElementById(`${id}-indicators`);
  if (!carousel || !indicators) return;

  const cardClass = id === "games-plus" ? ".card-ps-plus" : null;
  if (!cardClass) return;

  const cards = carousel.querySelectorAll(cardClass);
  indicators.innerHTML = "";

  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("indicator");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      const cardWidth = cards[0].offsetWidth;
      const gap = 16;
      const scrollAmount = index * (cardWidth + gap);

      carousel.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    indicators.appendChild(dot);
  });

  carousel.addEventListener("scroll", () => {
    const scrollLeft = carousel.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 16;
    const activeIndex = Math.round(scrollLeft / cardWidth);

    indicators.querySelectorAll(".indicator").forEach((dot, i) => {
      dot.classList.toggle("active", i === activeIndex);
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setupIndicators("games-plus");
});
