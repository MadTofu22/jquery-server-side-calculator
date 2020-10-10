const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.listen(port, () => {
console.log('Up and running on port', port);
});

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

let historyArray = require('./modules/history');
let calculate = require('./modules/calculator');
const calculationHistory = require('./modules/history');

app.get('/calc', (req, res) => {

    console.log('hello from /calc get');
    res.sendStatus(200);
});

app.post('/calc', (req, res) => {

    console.log('hello from /calc post');
    calculate(req.body);
    res.sendStatus(200);
});
