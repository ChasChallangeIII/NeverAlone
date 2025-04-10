require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');


const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
    console.log('Servern är igång!');
    res.json({ message: 'Servern är igång!' });
});


const users = [
    {username: 'admin', password: 'admin'},
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        

        res.cookie('token', token, {
            httpOnly: true,       
            secure: process.env.NODE_ENV === 'production',  
            maxAge: 3600000,      
            sameSite: 'Strict'    
        });

        res.json({ message: 'Inloggning lyckades' });
    } else {
        res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
    }
});

const authenticate = (req, res, next) => {
    const token = req.cookies.token; 
    if (!token) {
        return res.status(401).send('Ingen token, åtkomst nekad');
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send('Ogiltig token');
        }
        req.user = user;
        next();
    });
};




    app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
    });


