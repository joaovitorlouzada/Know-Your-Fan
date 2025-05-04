from dotenv import load_dotenv
load_dotenv()
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# Apenas as modalidades desejadas
INSTAGRAM_USERS = {
    "valorant": "furia.valorant",
    "r6": "furia.r6"
}

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
RAPIDAPI_URL = "https://instagram-scraper-api.p.rapidapi.com/instagram-profile"

@app.route("/api/posts/<modalidade>")
def get_instagram_posts(modalidade):
    try:
        username = INSTAGRAM_USERS.get(modalidade.lower())
        if not username:
            return jsonify({"error": "Modalidade não disponível"}), 404

        headers = {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'instagram-scraper-api.p.rapidapi.com'
        }
        url = f"{RAPIDAPI_URL}/{username}"
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            return jsonify({"error": f"Erro na requisição: {response.status_code}"}), response.status_code

        data = response.json()
        page = int(request.args.get("page", 1))
        per_page = 20
        start = (page - 1) * per_page

        posts = []
        count = 0
        for post in data.get('posts', []):
            if count < start:
                count += 1
                continue
            if len(posts) >= per_page:
                break

            posts.append({
                "title": post.get("caption", "Sem descrição")[:100],
                "url": post.get("url", ""),
                "thumbnail": post.get("thumbnail_src", ""),
                "permalink": f"https://www.instagram.com/p/{post.get('shortcode', '')}/"
            })
            count += 1

        return jsonify(posts)

    except Exception as e:
        print(f"Erro ao buscar posts: {e}")
        return jsonify({"error": "Erro ao buscar posts do Instagram"}), 500

if __name__ == "__main__":
    app.run(debug=True)
