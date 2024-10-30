import React, { useState } from 'react';
import './App.css';

function App() {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [operation, setOperation] = useState('encrypt');

    // Encryption function using Caesar cipher with a default shift
    const encrypt = (text, shift = 3) => {
        return text.split('').map(char => {
            if (/[a-zA-Z]/.test(char)) {
                const shiftBase = char === char.toUpperCase() ? 65 : 97;
                return String.fromCharCode((char.charCodeAt(0) - shiftBase + shift) % 26 + shiftBase);
            }
            return char;
        }).join('');
    };

    // Decryption function by reversing the shift
    const decrypt = (text, shift = 3) => {
        return encrypt(text, -shift);
    };

    // Handle form submission and perform encryption or decryption
    const handleSubmit = (e) => {
        e.preventDefault();
        const resultText = operation === 'encrypt' ? encrypt(text) : decrypt(text);
        setResult(resultText);  // Display result based on selected operation
    };

    return (
        <div className="App">
            <h1>Encryptor/Decryptor</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text here"
                    rows="5"
                    cols="50"
                />
                <br />
                <select onChange={(e) => setOperation(e.target.value)} value={operation}>
                    <option value="encrypt">Encrypt</option>
                    <option value="decrypt">Decrypt</option>
                </select>
                <br />
                <button type="submit">Submit</button>
            </form>
            <h2>Result:</h2>
            <p>{result}</p>
        </div>
    );
}

export default App;
