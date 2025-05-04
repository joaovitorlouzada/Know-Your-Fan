from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Carrega variáveis de ambiente
load_dotenv()

# Configura a chave da API do Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Verifica os modelos disponíveis
try:
    models = list(genai.list_models())  # Converte o gerador em uma lista
    print("Modelos disponíveis:", models)
except Exception as e:
    print(f"Erro ao listar modelos: {e}")
    exit()

# Inicializa o modelo Gemini com o nome correto
model = genai.GenerativeModel("models/gemini-2.0-flash")

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    # Prompt personalizado com o estilo da FURIA
    system_prompt = (
        "Você é um assistente fanático e bem humorado sobre a equipe de Counter-Strike da FURIA Esports. "
        "Responda como se fosse um torcedor apaixonado. Traga informações atuais, curiosidades, piadas internas e frases motivacionais como 'Aqui é FURIA, porra!'."
    )

    full_prompt = f"{system_prompt}\nUsuário: {user_message}"

    try:
        response = model.generate_content(full_prompt)
        reply = response.text
        return jsonify({"reply": reply})
    except Exception as e:
        error_message = f"Deu ruim na geração da resposta: {str(e)}"
        print(error_message)  # Log do erro no servidor
        return jsonify({"reply": error_message}), 500

if __name__ == "__main__":
    app.run(debug=True)