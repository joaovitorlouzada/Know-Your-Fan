from flask import Flask, redirect, session, request, send_from_directory

app = Flask(__name__)
app.secret_key = 'dev'  # Pode ser qualquer string, só precisa existir p/ usar session

@app.route('/')
def index():
    if session.get('logged_in'):
        return redirect('/home/index.html')
    else:
        return redirect('/criar-perfil/index.html')

@app.route('/login', methods=['POST'])
def login():
    session['logged_in'] = True
    return 'ok'

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect('/')

# Servir arquivos estáticos de forma direta (HTML, JS, CSS)
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
