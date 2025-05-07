require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const { getComments } = require('./db');

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
}));


app.use(express.json());

console.log("CORS middleware konfigurerad med origin: http://localhost:5173");


app.get('/api/hello', (req, res) => {
    console.log('Servern är igång!');
    res.json({ message: 'Servern är igång!' });
});

const users = [
    { username: 'admin', password: 'admin' },
];

app.get('/api/comments', async (req, res) => {
    try {
        const comments = await getComments();
        res.json(comments);
    } catch (error) {
        console.error("Fel vid hämtning av kommentarer i API:", error);
        res.status(500).json({ message: 'Fel vid hämtning av kommentarer' });
    }
});

app.post('/api/login', (req, res) => {
    console.log("Inkommande förfrågan till /api/login:", req.body);

    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
        return res.json({ message: 'Inloggning lyckades' });
    } else {
        return res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
    }
});

app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
});