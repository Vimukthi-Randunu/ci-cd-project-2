const express = require('express');
const app = express();

function subtract(a, b) {
    return a - b;
}

app.get('/', (req, res) => {
    res.send('App is running');
});

app.get('/health', (req, res) => {
    res.status(500).send('error');
});

module.exports = { subtract, app };