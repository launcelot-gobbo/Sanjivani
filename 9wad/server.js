const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));

app.get('/api/weather', (req, res) => {
    fs.readFile('./data/weather.json', 'utf8', (err, data) => {
        if (err) return res.sendStatus(500);
        res.json(JSON.parse(data));
    });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));