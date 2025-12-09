// Selecionando os elementos do formulário
const nomeInput = document.querySelector('.inputs_order input[placeholder="Nome"]');
const emailInput = document.getElementById('email');
const dataInput = document.querySelector('.inputs_order input[type="date"]');
const assuntoInput = document.querySelector('.inputs_order input[placeholder="Assunto"]');
const duvidaInput = document.querySelector('.inputs_order textarea');
const mensagem = document.getElementById('mensagem');
const botaoEnviar = document.querySelector('.btn_galeria');

// Regex para validar email (aceita .com e .com.br)
const regexEmail = /^[^\s@]+@[^\s@]+\.(com|com\.br)$/;

// ---------------- Validação em tempo real do email ----------------
emailInput.addEventListener('input', function () {
  const email = emailInput.value.trim();

  if (email === "") {
    mensagem.textContent = "";
    return;
  }

  if (regexEmail.test(email)) {
    mensagem.style.color = "green";
    mensagem.textContent = "✅ Email válido";
  } else {
    mensagem.style.color = "red";
    mensagem.textContent = "❌ Email inválido";
  }
});

// ---------------- Clique no botão ENVIAR ----------------
botaoEnviar.addEventListener('click', function (event) {
  event.preventDefault(); // impede que a página recarregue (caso esteja dentro de um form)

  // Pega os valores digitados
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const data = dataInput.value.trim();
  const assunto = assuntoInput.value.trim();
  const duvida = duvidaInput.value.trim();

  // Verifica se todos os campos foram preenchidos
  if (!nome || !email || !data || !assunto || !duvida) {
    alert("⚠️ Por favor, preencha todos os campos.");
    return;
  }

  // Verifica se o email é válido
  if (!regexEmail.test(email)) {
    alert("⚠️ Digite um email válido (ex: exemplo@dominio.com ou .com.br).");
    return;
  }

  // Se passou por todas as validações → sucesso
  alert("✅ Sua mensagem foi enviada com sucesso!");
  
  // Limpar os campos após o envio
  nomeInput.value = "";
  emailInput.value = "";
  dataInput.value = "";
  assuntoInput.value = "";
  duvidaInput.value = "";
  mensagem.textContent = "";
});

///////////////////////////////////////////////////////////////
const searchIcon = document.getElementById("search-icon");
const searchInput = document.getElementById("search-input");

searchIcon.addEventListener("click", () => {
  searchInput.classList.toggle("active");
  if (searchInput.classList.contains("active")) {
    searchInput.focus();
  }
});