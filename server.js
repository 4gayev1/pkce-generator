const express = require('express');
const crypto = require('crypto-js');

const app = express();
const port = 3000;

function randomBytes(size) {
    const bytes = new Uint8Array(size);
    for (let i = 0; i < size; i++) {
        bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
}

function generateRandomString() {
    const buffer = randomBytes(28);
    return Array.from(buffer, dec2hex).join('');
}

function dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
}

function sha256(plain) {
    return crypto.SHA256(plain).toString(crypto.enc.Base64);
}

function base64urlencode(input) {
    return input.replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
}

async function pkce_challenge_from_verifier(codeVerifier) {
    const hashed = sha256(codeVerifier);
    return base64urlencode(hashed);
}

async function pkce() {
    const codeVerifier = generateRandomString();
    const codeChallenge = await pkce_challenge_from_verifier(codeVerifier);
    return { codeVerifier: codeVerifier, codeChallenge: codeChallenge };
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });  

app.get('/', (req, res) => {
    res.send("Hi")
});

app.get('/generate-pkce', async (req, res) => {
    try {
        const pkceData = await pkce();
        res.json(pkceData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while generating PKCE data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
