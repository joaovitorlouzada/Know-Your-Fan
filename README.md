# Know Your Fan

Este é um projeto simples de chatbot com integração de front-end e back-end, com suporte a embeds de Instagram. O back-end é em Python, e o front-end pode ser servido usando `http.server`.

## 📁 Estrutura do Projeto

```
chatbot/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env
├── criar-perfil/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── home/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── perfil/
│   ├── index.html
│   ├── script.js
│   └── style.css
└── .gitignore
```

## ⚙️ Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd chatbot
```

### 2. Criar e ativar um ambiente virtual
```bash
cd backend
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
```

### 3. Instalar as dependências
```bash
pip install -r requirements.txt
```

### 4. Criar o arquivo `.env`
Crie um arquivo chamado `.env` dentro da pasta `backend/`, com base no modelo abaixo:

```env
API_KEY=sua-chave-aqui
```

### 5. Rodar o servidor do front-end
Navegue até o diretório `chatbot/` e use o `http.server`:

```bash
cd chatbot
python -m http.server
```

Abra o navegador em `http://localhost:8000/home/` para testar.

---

## 📦 Requisitos

- Python 3.8 ou superior
- Conexão com a API configurada via `.env`

---

## 🔒 Segurança

- O arquivo `.env` está listado no `.gitignore` e **não será versionado**.
- Nunca exponha suas chaves da API publicamente.