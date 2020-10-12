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

// This route allows the client to display all previous calculations.
app.get('/history', (req, res) => {

    console.log('hello from /history get');
    res.send(calcHistory);
});

// This route allows the user to clear the calculation history.
app.delete('/history', (req, res) => {

    console.log('hello from /history delete');
    calcHistory = [];
});

// This route allows the user see the answer of the most recent calculation
app.get('/calc', (req, res) => {

    console.log('hello from /calc get');
    res.send(lastCalculation);
});

// This route allows the user to run a new calculation.
app.post('/calc', (req, res) => {

    res.sendStatus(200);
    lastCalculation = calculate(req.body);
    calcHistory.push(lastCalculation);
    console.log('hello from /calc post, response:', lastCalculation);
});
