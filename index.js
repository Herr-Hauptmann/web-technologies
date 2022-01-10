const express = require('express');
const rute = require('./routes/home')
const ruteHTML = require('./routes/irfan')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'public/html');
app.use(express.static(__dirname + '/public'));

app.use(rute);
app.use(ruteHTML);

app.listen(3000);