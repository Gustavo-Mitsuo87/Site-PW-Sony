// Carrossel Principais Recursos
const pista_principais_recursos = document.querySelector('.carrossel-pista-principais-recursos');
const slides_principais_recursos = Array.from(document.querySelectorAll('.carrossel-slide-principais-recursos'));
const container_indicadores_principais_recursos = document.querySelector('.carrossel-indicadores-principais-recursos');

let index = 0;
const totalSlides = slides_principais_recursos.length;

// Criar indicadores dinamicamente
slides_principais_recursos.forEach((_, i) => {
  const btn_principais_recursos = document.createElement('button');
  if (i === 0) btn_principais_recursos.classList.add('active');
  btn_principais_recursos.addEventListener('click', () => {
    index = i;
    updateCarousel_principais_recursos();
  });
  container_indicadores_principais_recursos.appendChild(btn_principais_recursos);
});

const indicadores_principais_recursos = document.querySelectorAll('.carrossel-indicadores-principais-recursos button');

function updateCarousel_principais_recursos() {
  pista_principais_recursos.style.transform = `translateX(-${index * 100}%)`;
  indicadores_principais_recursos.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
}

// Rotação automática
setInterval(() => {
  index = (index + 1) % totalSlides;
  updateCarousel_principais_recursos();
}, 4000);        

// Fim Carrossel Principais Recursos

// Antes e Depois Triluminos Color

//variavel para controlar o estado do botão
let ativo = false

//função chamada ao clicar o botão
function alternarBotao() {
  const btn = document.getElementById('toggleBotao');
  const container = document.getElementById('toggleContainer');
  const imagem = document.getElementById('imagem');

  ativo = !ativo; //alterna o estado (true/false)
  btn.classList.toggle('ativo-botao');
  container.classList.toggle('ativo-container');

  //Troca a imagem com base no estado 
  imagem.src = ativo
  ? "Imagens/com-triluminos.png"
  : "Imagens/sem-triluminos.png";
}

