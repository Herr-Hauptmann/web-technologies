const express = require('express');
const bodyParser = require('body-parser');
const rute = require('./routes/home')
const ruteHTML = require('./routes/irfan')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'public/html');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(rute);
app.use(ruteHTML);

app.listen(3000);