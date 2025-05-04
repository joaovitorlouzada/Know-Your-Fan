document.addEventListener("DOMContentLoaded", function () {
  // Recupera os dados do perfil do localStorage
  const perfil = JSON.parse(localStorage.getItem("perfilFuria"));

  if (perfil) {
    // Preenche os campos de texto com os dados
    document.getElementById("perfil-nome").textContent = perfil.nome;
    document.getElementById("perfil-cpf").textContent = perfil.cpf;
    document.getElementById("perfil-endereco").textContent = perfil.endereco;
    document.getElementById("perfil-modalidades").textContent = perfil.modalidades.join(", ");
    
    // Exibe a foto, caso haja
    if (perfil.foto) {
      const preview = document.getElementById("profile-preview");
      preview.style.backgroundImage = `url('${perfil.foto}')`;
      preview.style.backgroundSize = "cover";
      preview.style.backgroundPosition = "center";
      preview.textContent = ""; // Remove o texto "Foto de perfil"
    } else {
      const preview = document.getElementById("profile-preview");
      preview.textContent = "Foto de perfil não encontrada"; // Se não houver foto, mostrar um texto
    }
  } else {
    document.querySelector(".container").innerHTML = "<p>Nenhum perfil encontrado.</p>";
  }
});
