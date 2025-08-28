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

// Seleciona todos os botões de toggle
const toggleButtons = document.querySelectorAll(".toggle");

toggleButtons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card_plan");
    const extraOptions = card.querySelector(".extra-options");

    // Alterna a visibilidade
    if (extraOptions.style.display === "flex" || extraOptions.style.display === "block") {
      extraOptions.style.display = "none";
    } else {
      extraOptions.style.display = "block"; // ou "flex" se quiser manter o layout em coluna
    }
  });
});

// Parte de clique no carrossel

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalDesc = document.getElementById("modal-desc");
const modalLink = document.getElementById("modal-link");
const closeBtn = document.querySelector(".close");

// Dados dos jogos (exemplo)
const gameData = {
  "MK1_ban.jpg": {
    desc: "Mortal Kombat 1 (2023) é um reboot da franquia, recriando o universo após Liu Kang se tornar Deus do Fogo. O jogo traz versões renovadas de personagens clássicos e introduz o sistema de Kameo Fighters, que permitem suporte em combate. Com gráficos modernos, lutas brutais e Fatalities icônicos, mistura jogabilidade intensa com um modo história cinematográfico.",
    link: "mk1.html"
  },
  "ACO.jpg": {
    desc: "Assassin’s Creed Odyssey (2018) se passa na Grécia Antiga durante a Guerra do Peloponeso, colocando o jogador no papel de Alexios ou Kassandra, mercenários descendentes de Leônidas. O jogo mistura exploração em mundo aberto, batalhas navais e escolhas que moldam a narrativa. Com elementos de RPG, permite personalizar habilidades e decidir o rumo da história em meio a conspirações e mitos gregos.",
    link: "aco.html"
  },
  "Detroit.jpg": {
    desc: "Detroit: Become Human (2018) é um jogo narrativo da Quantic Dream ambientado em um futuro próximo, onde androides convivem com humanos. A história acompanha Kara, Connor e Markus, cujas escolhas podem mudar radicalmente o rumo da trama. Com múltiplos finais, o jogo explora temas como liberdade, consciência e moralidade, colocando o jogador no centro de dilemas éticos intensos.",
    link: "mk1.html"
  },
  "SPR.jpg": {
    desc: "Marvel’s Spider-Man Remastered é a versão aprimorada do jogo de 2018, trazendo gráficos otimizados, tempos de carregamento rápidos e melhorias visuais. Acompanhamos Peter Parker enfrentando vilões como Senhor Negativo, Rei do Crime e o Doutor Octopus, enquanto equilibra sua vida pessoal e heroica. O jogo oferece combate fluido, exploração em mundo aberto e a experiência definitiva de ser o Homem-Aranha em Nova York.",
    link: "aco.html"
  },
  "DBDL.jpg": {
    desc: "Dead by Daylight (2016) é um jogo multiplayer de terror assimétrico, onde quatro sobreviventes devem escapar de um assassino implacável. Cada partida é um jogo de gato e rato, com sobreviventes tentando consertar geradores para abrir a saída, enquanto o assassino usa habilidades únicas para caçá-los. O game traz personagens originais e também crossovers com ícones do terror, como Freddy Krueger, Michael Myers e Ghost Face.",
    link: "mk1.html"
  },
  "DI2.jpg": {
    desc: "Dead Island 2 (2023) é um RPG de ação em primeira pessoa ambientado em uma Los Angeles devastada por zumbis. O jogador assume o papel de um dos Slayers, sobreviventes imunes ao vírus, cada um com habilidades únicas. Com combate visceral, armas personalizáveis e muito humor sombrio, o jogo mistura exploração de mundo aberto com batalhas sangrentas contra hordas de infectados.",
    link: "aco.html"
  },
  "DS.jpg": {
    desc: "Death Stranding (2019), criado por Hideo Kojima, é um jogo de ação e exploração em um futuro pós-apocalíptico. O jogador controla Sam Porter Bridges, encarregado de reconectar cidades isoladas enquanto enfrenta criaturas sobrenaturais e ameaças humanas. Com jogabilidade única focada em entregas e travessias, mistura narrativa profunda, elementos sociais online e reflexões sobre conexão humana.",
    link: "mk1.html"
  },
  "Doom.jpg": {
    desc: "Doom Eternal (2020) é a sequência direta de Doom (2016), trazendo ação frenética em primeira pessoa contra hordas demoníacas. O jogador controla o Doom Slayer, agora enfrentando a invasão do inferno na Terra e em outros mundos. Com combate ágil, armas icônicas e novas mecânicas de mobilidade, o jogo mistura brutalidade, estratégia e trilha sonora intensa para uma experiência explosiva.",
    link: "aco.html"
  },
  "Fallout.jpg": {
    desc: "Fallout 4 (2015) é um RPG de mundo aberto ambientado em uma Boston pós-apocalíptica após a guerra nuclear. O jogador assume o papel do Único Sobrevivente, que sai do Refúgio 111 em busca de seu filho sequestrado. O jogo combina exploração, combates contra saqueadores e mutantes, sistema de escolhas que afetam a história e a possibilidade de construir assentamentos.",
    link: "mk1.html"
  },
  "FNAF.avif": {
    desc: "Five Nights at Freddy’s: Help Wanted é um jogo de terror em realidade virtual (ou modo padrão) que reúne minigames clássicos e originais da franquia FNAF. O jogador enfrenta animatrônicos assustadores enquanto realiza tarefas como consertos e vigilância noturna. A atmosfera é tensa e imersiva, com sustos garantidos. Não é necessário ter headset VR para jogar.",
    link: "aco.html"
  },
  "GOW.webp": {
    desc: "God of War (2018) é um jogo de ação e aventura que reinventa a saga de Kratos, agora ambientada na mitologia nórdica. Ele embarca numa jornada emocional com seu filho Atreus, enfrentando deuses e monstros em busca do topo dos nove reinos. Com combate visceral, narrativa profunda e visual cinematográfico, o jogo foi aclamado como um dos melhores de sua geração.",
    link: "mk1.html"
  },
  "HOGWARTS.jpg": {
    desc: "Hogwarts Legacy é um RPG de ação em mundo aberto ambientado no universo mágico de Harry Potter, mas se passa no século XIX. Você assume o papel de um estudante recém-chegado a Hogwarts que possui uma habilidade rara e perigosa. Ao explorar locais icônicos como Hogsmeade e a Floresta Proibida, você aprende feitiços, cria poções e enfrenta forças sombrias que ameaçam o mundo bruxo.",
    link: "aco.html"
  },
  "HKN.jpg": {
    desc: "O jogo é um metroidvania 2D com arte desenhada à mão, trilha sonora atmosférica e uma jogabilidade desafiadora que conquistou milhões de fãs. Você controla um cavaleiro silencioso explorando ruínas subterrâneas infestadas por criaturas corrompidas e segredos antigos.",
    link: "mk1.html"
  },
  "LEGO BAT.webp": {
    desc: "Neste jogo, Batman se une aos heróis da DC para impedir Brainiac de destruir a Terra. Com mais de 150 personagens jogáveis, incluindo Lanternas Verdes, Flash, Mulher-Maravilha e até Solomon Grundy, o jogo é uma explosão de ação, humor e nostalgia LEGO.",
    link: "aco.html"
  },
  "Lego Avengers.jpg": {
    desc: "Esse jogo mergulha você nos eventos dos filmes Os Vingadores e Era de Ultron, com direito a personagens como Capitão América, Homem de Ferro, Thor, Hulk, Viúva Negra e muitos outros. Você pode explorar locais icônicos como Nova York, Asgard e Sokovia, tudo com aquele charme LEGO que mistura quebra-cabeças, combate e cooperação.",
    link: "mk1.html"
  },
  "Miles Morales.webp": {
    desc: "Neste jogo da Insomniac Games, Miles Morales assume o manto de Spider-Man após os eventos do jogo anterior, trazendo habilidades únicas como o Venom Blast e a camuflagem, além de uma narrativa emocionante sobre identidade, responsabilidade e comunidade.",
    link: "aco.html"
  },
  "MFPP.jpg": {
    desc: "Minha Amiga Peppa Pig é um jogo interativo voltado para crianças, onde você cria seu próprio personagem e se torna o novo melhor amigo da Peppa. O jogo tem uma proposta bem leve e divertida, com gráficos que imitam o estilo do desenho animado e uma jogabilidade simples e acessível.",
    link: "mk1.html"
  },
  "RCRA.jpg": {
    desc: "Neste título da Insomniac Games, Ratchet e seu fiel companheiro Clank enfrentam um imperador maligno de outra realidade, viajando por mundos alternativos com a ajuda de portais dimensionais. O jogo introduz Rivet, uma Lombax rebelde de outra dimensão, que também é jogável e traz uma nova perspectiva à história.",
    link: "aco.html"
  },
  "SWJS.jpg": {
    desc: "Neste jogo de ação e aventura em terceira pessoa, você continua a história iniciada em Jedi: Fallen Order, agora com um Cal mais experiente, novas habilidades com o sabre de luz, e inimigos ainda mais desafiadores. A narrativa se aprofunda nos dilemas morais de um Jedi em tempos sombrios, enquanto você explora planetas exóticos e enfrenta ameaças antigas e inéditas.",
    link: "mk1.html"
  },
  "Cyberpunk.jpg": {
    desc: "Cyberpunk 2077 é um RPG de mundo aberto ambientado em Night City, uma metrópole futurista obcecada por poder, glamour e modificações corporais. Você joga como V, um mercenário em busca de um implante que promete a imortalidade. O jogo combina narrativa profunda, combate intenso e liberdade de escolhas. Com visuais deslumbrantes e trilha sonora imersiva, é uma experiência intensa e provocadora.",
    link: "aco.html"
  },
};

// Evento de clique nas imagens do carrossel
document.querySelectorAll(".carousel-track img").forEach(img => {
  img.addEventListener("click", () => {
    const src = img.getAttribute("src").split("/").pop(); // pega só o nome do arquivo
    const data = gameData[src];

    if (data) {
      modalImg.src = img.src;
      modalDesc.textContent = data.desc;
      modalLink.href = data.link;
      modal.style.display = "flex";
    }
  });
});

// Fechar modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});