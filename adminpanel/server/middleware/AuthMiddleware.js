export function simpleAuth(req, res, next) {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
    }
}
