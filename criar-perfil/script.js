document.addEventListener("DOMContentLoaded", function () {
  // Preenche os campos com dados salvos (modo edição)
  const perfilSalvo = JSON.parse(localStorage.getItem("perfilFuria"));
  if (perfilSalvo) {
    const { nome, cpf, endereco, modalidades, foto } = perfilSalvo;

    if (nome) document.getElementById("nome").value = nome;
    if (cpf) document.getElementById("cpf").value = cpf;
    if (endereco) document.getElementById("endereco").value = endereco;

    if (Array.isArray(modalidades)) {
      modalidades.forEach(mod => {
        const checkbox = document.querySelector(`input[name="modalidades"][value="${mod}"]`);
        if (checkbox) checkbox.checked = true;
      });
    }

    if (foto) {
      const preview = document.getElementById("profile-preview");
      preview.style.backgroundImage = `url('${foto}')`;
      preview.style.backgroundSize = 'cover';
      preview.style.backgroundPosition = 'center';
      preview.textContent = '';
    }

    // Atualiza a imagem temporária do localStorage (caso o usuário não reenvie)
    localStorage.setItem("fotoPerfil", foto);
  }

  // Lida com envio do formulário
  document.getElementById("perfil-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const endereco = document.getElementById("endereco").value;

    const modalidades = Array.from(document.querySelectorAll("input[name='modalidades']:checked"))
      .map(input => input.value);

    const foto = localStorage.getItem("fotoPerfil");

    const perfil = { nome, cpf, endereco, modalidades, foto };

    localStorage.setItem("perfilFuria", JSON.stringify(perfil));
    localStorage.setItem("loggedIn", "true");

    fetch('/login', { method: 'POST', credentials: 'include' })
      .then(() => {
        alert("Perfil salvo com sucesso!");
        window.location.href = "../home/index.html";
      })
      .catch(err => {
        console.error("Erro ao registrar sessão:", err);
        alert("Erro ao salvar o perfil. Tente novamente.");
      });
  });

  // Manipula o upload e preview da imagem de perfil
  document.getElementById("profile-pic").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const fotoBase64 = e.target.result;

        const preview = document.getElementById("profile-preview");
        preview.style.backgroundImage = `url('${fotoBase64}')`;
        preview.style.backgroundSize = 'cover';
        preview.style.backgroundPosition = 'center';
        preview.textContent = '';

        localStorage.setItem("fotoPerfil", fotoBase64);
      };
      reader.readAsDataURL(file);
    }
  });
});
