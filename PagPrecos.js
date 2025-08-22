// Garante que o script rode após o HTML estar carregado
document.addEventListener('DOMContentLoaded', () => {

  // ===== SISTEMA DE AVALIAÇÃO (HOVER + CLICK) =====
  // Seleciona todos os blocos que podem conter estrelas
  document.querySelectorAll('.product-info, .product-card, .product-details').forEach(block => {
    const stars = block.querySelectorAll('.star'); // pega apenas as estrelas dentro deste bloco
    if (stars.length === 0) return;                // se não tiver estrelas neste bloco, sai

    let selectedRating = 0;                        // guarda a nota selecionada para este bloco

    stars.forEach(star => {
      // quando passar o mouse em uma estrela...
      star.addEventListener('mouseover', () => {
        // remove hover de todas
        stars.forEach(s => s.classList.remove('hovered'));
        // pinta de 1 até o valor da estrela atual
        const val = Number(star.dataset.value);    // garante que é número
        for (let i = 0; i < val; i++) {
          stars[i].classList.add('hovered');       // aplica classe de hover (fica dourada)
        }
      });

      // quando tirar o mouse da estrela, remove o hover
      star.addEventListener('mouseout', () => {
        stars.forEach(s => s.classList.remove('hovered'));
      });

      // quando clicar, fixa as estrelas como "selected"
      star.addEventListener('click', () => {
        selectedRating = Number(star.dataset.value); // salva a nota
        // limpa qualquer seleção anterior
        stars.forEach(s => s.classList.remove('selected'));
        // aplica a seleção fixa
        for (let i = 0; i < selectedRating; i++) {
          stars[i].classList.add('selected');       // aplica classe selected (fica dourada permanente)
        }
        console.log(`Você avaliou este produto com ${selectedRating} estrelas`);
      });
    });
  });

  // ===== BOTÃO "MAIS DETALHES" (expandir/contrair) =====
  document.querySelectorAll('.product-details').forEach(card => {
    const moreBtn = card.querySelector('.more-btn');   // botão que expande/recolhe
    const moreText = card.querySelector('.more-text'); // conteúdo extra a mostrar/ocultar
    if (!moreBtn || !moreText) return;                 // se faltar algo, não faz nada

    let expanded = false;                               // estado atual (fechado por padrão)
    moreBtn.addEventListener('click', () => {
      expanded = !expanded;                             // inverte o estado
      moreText.style.display = expanded ? 'inline' : 'none'; // mostra ou esconde
      moreBtn.textContent = expanded ? 'Menos detalhes' : 'Mais detalhes'; // troca o rótulo
    });
  });

  // ===== BOTÃO "COMPRAR" =====
  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // tenta descobrir o título mais próximo do botão
      const info = btn.closest('.product-info');                    // sobe até o bloco de infos
      const title = info?.querySelector('.product-title')?.textContent?.trim() || 'Produto';
      alert(`${title} adicionado ao carrinho! `);                  // feedback ao usuário
      console.log("Produto comprado:", title);                       // log no console (debug)
    });
  });

});
