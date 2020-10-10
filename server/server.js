const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.listen(port, () => {
console.log('Up and running on port', port);
});

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

