import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [operation, setOperation] = useState('encrypt');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = operation === 'encrypt' ? 'http://localhost:5000/api/encrypt' : 'http://localhost:5000/api/decrypt';
        try {
            const response = await axios.post(endpoint, { text });
            setResult(response.data.encrypted_text || response.data.decrypted_text);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
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
