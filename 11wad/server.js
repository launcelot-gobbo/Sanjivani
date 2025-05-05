const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

let users = [];

app.post('/register', (req, res) => {
    users.push(req.body);
    res.status(201).end();
});

app.post('/login', (req, res) => {
    const u = users.find(x => x.username === req.body.username && x.password === req.body.password);
    u ? res.json(u) : res.status(401).json({ error: 'Invalid' });
});

app.get('/', (_, res) => res.redirect('/register.html'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
