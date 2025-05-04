const modalidadesConteudo = {
  cs: "🔥 Última vitória da FURIA no CS! Veja os destaques e as jogadas do arT e KSCERATO.",
  valorant: "💥 Novidades do time de Valorant da FURIA! Novas táticas, clipes e entrevistas.",
  r6: "🔐 A FURIA no Rainbow Six mostrou domínio no último torneio. Veja os replays.",
  rocket: "🚀 A equipe de Rocket League da FURIA voando alto! Veja os melhores gols da semana.",
  lol: "⚔️ League of Legends: veja como foi a atuação da FURIA na última rodada do CBLOL.",
  apex: "🎯 Apex Legends: stats e clipes insanos da FURIA nas ranqueadas e torneios recentes."
};

const feedContainer = document.getElementById("feed-container");
const perfil = JSON.parse(localStorage.getItem("usuario"));

if (perfil && perfil.modalidades.length > 0) {
  perfil.modalidades.forEach(mod => {
      const section = document.createElement("section");
      section.innerHTML = `<h2>${mod.toUpperCase()}</h2><p>${modalidadesConteudo[mod]}</p>`;
      feedContainer.appendChild(section);
  });
} else {
  feedContainer.innerHTML = `<p>Você ainda não selecionou suas modalidades preferidas. <a href="../perfil/index.html">Clique aqui para configurar seu perfil</a>.</p>`;
}

// Chat toggle
const chatWidget = document.getElementById("chat-widget"); // Seleciona o contêiner do widget
const toggle = document.getElementById("chat-toggle");
const chatBox = document.getElementById("chat-box");

toggle.addEventListener("click", () => {
  chatWidget.classList.toggle("open"); // Adiciona/remove a classe 'open' no widget
});