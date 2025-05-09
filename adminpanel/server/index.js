import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import commentsRoutes from './routes/commentsRoute.js';
import usersRoutes from './routes/usersRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Servern är igång!' });
});

app.use('/api/comments', commentsRoutes);
app.use('/api/users', usersRoutes);

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.json({ message: 'Inloggning lyckades' });
    } else {
        res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
    }
});

app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
});
