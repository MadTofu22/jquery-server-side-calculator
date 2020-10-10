const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.listen(port, () => {
console.log('Up and running on port', port);
});

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

let calculate = require('./modules/calculator');
let calcHistory = require('./modules/history');
let lastCalculation = null;

app.get('/history', (req, res) => {

    console.log('hello from /history get');
    res.send(calcHistory);
});

app.get('/calc', (req, res) => {

    console.log('hello from /calc get');
    res.send(lastCalculation);
});

app.post('/calc', (req, res) => {

    console.log('hello from /calc post, req.body:', req.body);
    res.sendStatus(200);
    lastCalculation = calculate(req.body);
    calcHistory.push(lastCalculation);
});
