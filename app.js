const express = require('express');
const app = express();

function subtract(a, b) {
    return a - b;
}

app.get('/', (req, res) => {
    res.send('App is running');
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { subtract, app };