from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def encrypt(text, shift=3):
    encrypted_text = ""
    for char in text:
        if char.isalpha():
            shift_amount = 65 if char.isupper() else 97
            encrypted_text += chr((ord(char) - shift_amount + shift) % 26 + shift_amount)
        else:
            encrypted_text += char
    return encrypted_text

def decrypt(text, shift=3):
    return encrypt(text, -shift)

@app.route('/api/encrypt', methods=['POST'])
def encrypt_text():
    data = request.get_json()
    text = data.get('text', '')
    encrypted_text = encrypt(text)
    return jsonify({"encrypted_text": encrypted_text})

@app.route('/api/decrypt', methods=['POST'])
def decrypt_text():
    data = request.get_json()
    text = data.get('text', '')
    decrypted_text = decrypt(text)
    return jsonify({"decrypted_text": decrypted_text})

if __name__ == "__main__":
    app.run(debug=True)
