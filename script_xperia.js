const navbar = document.getElementById("navbar");

// Adiciona um listener de scroll na janela
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled"); // Adiciona a classe quando rolar
  } else {
    navbar.classList.remove("scrolled"); // Remove a classe ao voltar
  }
});








window.addEventListener('load', () => { /*serve para que o script espere a pagina carregar antes de rodar */
  const faixa = document.querySelector('.XPcarousel-faixa'); /*linha interira do slide*/
  const prevBtn = document.querySelector('.prev'); /*botão de navegação*/
  const nextBtn = document.querySelector('.next'); /*botão de navegação*/
  const slides = document.querySelectorAll('.XPcarousel-slide'); /*todos os slides do carrossel "array"*/
  const indicadores = document.querySelectorAll('.XPcarousel-indicators span'); /*bolinhas do carrossel*/ 

  
  let ImagemAtual = 0; /*guarda o indice do slide atual, começa em zero = primeiro slide*/ 
  

  function updateCarousel() {
    const slideWidht = slides[0].offsetWidth + 20; /* largura real + margem */
    faixa.style.transform = `translateX(-${ImagemAtual * slideWidht}px)`;
    /*geralmente usado com CSS, este comando define uma transformação de trasnlação horizontal(eixo x) de um elemento que aqui é o "ImagemAtual" */
    /* o "$" significa "value" que representa uma variavel ou valor dinamico que determina a quantidade de deslocamento*/
    /*o valor é negativo pois a translação sera para a esquerda, se fosse um movimento para direita o value seria positivo */
    /*slides[0].offsetWidth -> pega a largura exata de um slide.
    + 20 -> compensa as margens laterais (margin: 0 10px).
    Multiplicamos pelo índice ImagemAtual para mover a faixa corretamente.
    */
  
    indicadores.forEach(ind => ind.classList.remove('active'));
    /* forEach serve para percorrer cada elemento de um array */
    /*"(ind => ind.classList.remove('active'))" este comando serve para tirar a classe ativo de todos os elementos antes de adicionar
     a classe active. Isso garante que apenas 1 fique ativo por vez
     */
    indicadores[ImagemAtual].classList.add('active')
    /*quando for mostrada uma imagem a bolinha/indicador corresponda com a numeração da imagem */

  
  }

 
  

  


  
  nextBtn.addEventListener('click', () => {
    ImagemAtual = (ImagemAtual + 1) % slides.length;
    updateCarousel();
  });
  /*Botao "proximo" adiciona +1 no indice e move a faixa ao clicar */
  
  prevBtn.addEventListener('click', () => {
    ImagemAtual = (ImagemAtual - 1 + slides.length) % slides.length;
    updateCarousel();
  });
  /*botao "anterior" subtrai 1 do indice voltando a faixa */
  /*(ImagemAtual - 1 + slides.length) isso aqui serve para que o valor nao seja negativo, assim mantendo o loop do carousel */
 

  indicadores.forEach(ind => {
    ind.addEventListener('click', () => {
      ImagemAtual = parseInt(ind.dataset.slide);
      updateCarousel();
    });
  });
/*clique das bolinhas
  "addEventListener" ativa funções com base em eventos, aqui quando o usuario clicar em alguma bolinha a ImagemAtual sera mudada para
   a que esta destinada naquela bolinha

  ind.dataset.slide → pega o valor do atributo data-slide daquele span/bolinha atribuido no HTML.
  parseInt(...) → transforma a string "0" ou "1" ou "2" em número (0, 1, 2).
  Esse número é atribuído à variável ImagemAtual.
  Depois chamamos updateCarousel(), que move a faixa para o slide certo
*/

  
  
 


  faixa.style.transition = 'transform 0.7s ease-in-out';
/*garante que sempre que for aplicado translateX, o movimento será suave */

  updateCarousel();
  
  /* Inicializa o carrossel na primeira imagem e ja liga o autoplay */

});

window.addEventListener('load', () => {

const faixaCell = document.querySelector('.xcarou-faixa-cell');
const PrevBtnCell = document.querySelector('.prev-cell');
const NextBtnCell = document.querySelector('.next-cell');
const slidecell = document.querySelectorAll('.xcarou-slide-cell');
const indicadoresCell = document.querySelectorAll ('.xcarou-indicators-cell span');

let ImagemCellAtual = 0;

function updateCarousel () {

  const visiveis = 4;
  const slideWidht = slidecell [0].offsetWidth ; //offsetWidth (PADDING + CONTEUDO + BORDA )
  const style = getComputedStyle(slidecell[0]);
  const margin = parseInt(style.marginLeft) + parseInt(style.marginRight);
  const totalWidht = slideWidht + margin; 

  const grupo = ImagemCellAtual / visiveis;

    faixaCell.style.transform = `translateX(-${grupo * totalWidht * visiveis }px)`;

    indicadoresCell.forEach(ind => ind.classList.remove('active'));
    indicadoresCell[grupo].classList.add('active');

};

NextBtnCell.addEventListener('click' , () => {

  const visiveis = 4;
    ImagemCellAtual = (ImagemCellAtual + visiveis) %slidecell.length;
    updateCarousel ();

});

PrevBtnCell.addEventListener('click' , () => {

  const visiveis = 4;
    ImagemCellAtual = (ImagemCellAtual - visiveis + slidecell.length) %slidecell.length;
    updateCarousel();

});

indicadoresCell.forEach(ind => {

  ind.addEventListener('click' , () => {

  const visiveis = 4;
    ImagemCellAtual = parseInt(ind.dataset.slidecell) * visiveis;
    updateCarousel ()
  });

});
 
faixaCell.style.transition= 'transform 0.7s ease-in-out';

updateCarousel();
});


const fofoqueira = new IntersectionObserver((fofoca) =>{

  fofoca.forEach((entry) => {
    if(entry.isIntersecting === true) {
        entry.target.classList.add('xpshow')

    } 
  });

});

const elementos = document.querySelectorAll('.xpinfo')

elementos.forEach((elemento) => fofoqueira.observe(elemento))