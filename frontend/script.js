let salas = [];

async function carregarSalas() {
  const resposta = await fetch('salas.json');
  salas = await resposta.json();
}

async function carregarMapa() {
  const resposta = await fetch('planta.svg');
  document.getElementById('mapa-container').innerHTML = await resposta.text();

  salas.forEach(sala => {
    const elemento = document.getElementById(sala.id);
    if (elemento) {
      elemento.classList.add('sala-clicavel');
      elemento.addEventListener('click', () => mostrarInfo(sala));
    }
  });
}

function mostrarInfo(sala) {
  document.getElementById('painel-titulo').textContent = sala.nome;
  document.getElementById('painel-estacao').textContent = sala.estacao;
  document.getElementById('painel-resumo').textContent = sala.resumo;
  document.getElementById('painel-info').classList.remove('escondido');
}

document.getElementById('fechar-painel').addEventListener('click', () => {
  document.getElementById('painel-info').classList.add('escondido');
});

// Gera o QR Code apontando para o link público do site (preencher depois do deploy na Opção B)
new QRCode(document.getElementById("qrcode"), {
  text: "https://SEU-SITE.netlify.app",
  width: 150,
  height: 150
});

(async () => {
  await carregarSalas();
  await carregarMapa();
})();