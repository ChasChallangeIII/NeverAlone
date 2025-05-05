const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { Pool } = require('pg');

// Skapa anslutning till databasen (anpassa efter din setup)
const pool = new Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'your_db_name',
    password: 'your_db_password',
    port: 5432,
});

const saltRounds = 10;

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Användarnamn och lösenord krävs' });
    }

    try {
        // 1. Hasha lösenordet
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 2. Spara till databas
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );

        res.status(201).json({
            message: 'Användare skapad',
            user: result.rows[0]
        });
    } catch (err) {
        console.error('Fel vid skapande av användare:', err);
        res.status(500).json({ error: 'Något gick fel' });
    }
});

module.exports = router;
