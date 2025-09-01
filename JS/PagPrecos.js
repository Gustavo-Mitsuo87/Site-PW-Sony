document.addEventListener('DOMContentLoaded', () => {
  const starsAll = document.querySelectorAll('.precos-star');
  starsAll.forEach(star => {
    const starsParent = star.closest('.precos-stars');
    if (!starsParent) return;
    const stars = Array.from(starsParent.querySelectorAll('.precos-star'));
    star.addEventListener('mouseover', () => {
      stars.forEach(s => s.classList.remove('hovered'));
      const val = Number(star.dataset.value) || 0;
      for (let i = 0; i < val; i++) stars[i].classList.add('hovered');
    });
    star.addEventListener('mouseout', () => {
      stars.forEach(s => s.classList.remove('hovered'));
    });
    star.addEventListener('click', () => {
      const val = Number(star.dataset.value) || 0;
      stars.forEach(s => s.classList.remove('selected'));
      for (let i = 0; i < val; i++) stars[i].classList.add('selected');
    });
  });

  document.querySelectorAll('.precos-lateral-card').forEach(card => {
    const moreBtn = card.querySelector('.precos-more-btn');
    const moreText = card.querySelector('.precos-more-text');
    if (!moreBtn || !moreText) return;
    let expanded = false;
    moreBtn.addEventListener('click', () => {
      expanded = !expanded;
      moreText.style.display = expanded ? 'block' : 'none';
      moreBtn.textContent = expanded ? 'Menos detalhes' : 'Mais detalhes';
    });
  });

  document.querySelectorAll('.precos-buy-btn, .precos-carrinho-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const info = btn.closest('.precos-product-info');
      const title = info?.querySelector('.precos-product-title')?.textContent?.trim() || 'Produto';
      if (btn.classList.contains('precos-carrinho-btn')) {
        alert(`${title} adicionado ao carrinho!`);
      } else {}
      console.log('Ação no produto:', title);
    });
  });

  const mainImage = document.getElementById('mainImage');
  const thumbnails = Array.from(document.querySelectorAll('.precos-thumb'));
  const prevBtn = document.querySelector('.precos-prev');
  const nextBtn = document.querySelector('.precos-next');

  if (mainImage && thumbnails.length && prevBtn && nextBtn) {
    let currentIndex = thumbnails.findIndex(t => t.classList.contains('active') || t.classList.contains('precos-active'));
    if (currentIndex === -1) currentIndex = 0;

    function updateCarousel(index) {
      currentIndex = index;
      mainImage.src = thumbnails[currentIndex].src;
      thumbnails.forEach(t => t.classList.remove('active', 'precos-active'));
      thumbnails[currentIndex].classList.add('active', 'precos-active');
    }

    prevBtn.addEventListener('click', () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = thumbnails.length - 1;
      updateCarousel(newIndex);
    });

    nextBtn.addEventListener('click', () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= thumbnails.length) newIndex = 0;
      updateCarousel(newIndex);
    });

    thumbnails.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => updateCarousel(idx));
    });
  }
});
