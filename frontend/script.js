let salas = [];

async function carregarSalas() {
  const resposta = await fetch('salas.json');
  salas = await resposta.json();
}

async function carregarMapa() {
  const resposta = await fetch('plantaCyberMap.svg');
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
  document.getElementById('painel-estacao1').textContent = sala.estacao1;
  document.getElementById('painel-resumo1').textContent = sala.resumo1;
  document.getElementById('painel-estacao2').textContent = sala.estacao2;
  document.getElementById('painel-resumo2').textContent = sala.resumo2;

  document.getElementById('painel-titulo2').textContent = sala.nome2;
  document.getElementById('painel-estacao3').textContent = sala.estacao3;
  document.getElementById('painel-resumo3').textContent = sala.resumo3;
  document.getElementById('painel-estacao4').textContent = sala.estacao4;
  document.getElementById('painel-resumo4').textContent = sala.resumo4;

  document.getElementById('painel-info').classList.remove('escondido');
}

document.getElementById('fechar-painel').addEventListener('click', () => {
  document.getElementById('painel-info').classList.add('escondido');
});

/* Gera o QR Code apontando para o link público do site (preencher depois do deploy na Opção B)
new QRCode(document.getElementById("qrcode"), {
  text: "https://SEU-SITE.netlify.app",
  width: 150,
  height: 150
});
*/

(async () => {
  await carregarSalas();
  await carregarMapa();
})();


/* FALLBACK
async function carregarSalas() {
  try {
    const resposta = await fetch('salas.json', { signal: AbortSignal.timeout(3000) });
    salas = await resposta.json();
    localStorage.setItem('salas-cache', JSON.stringify(salas));
  } catch (erro) {
    console.warn('Servidor indisponível, usando dados salvos localmente:', erro);
    const cache = localStorage.getItem('salas-cache');
    salas = cache ? JSON.parse(cache) : [];
  }
}
  */