const jwt = require('jsonwebtoken');

const SECRET_KEY = '1234'; 


const token = jwt.sign({ username: 'testuser' }, SECRET_KEY, { expiresIn: '1h' });
console.log('Skapad token:', token);


jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
        console.error('Fel vid verifiering:', err);
    } else {
        console.log('Token verifierad:', decoded);
    }
});