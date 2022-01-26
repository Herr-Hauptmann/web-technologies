const express = require('express');
const rute = require('./routes/home');
const ruteHTML = require('./routes/irfan');
const ruteBaza = require('./routes/ruteBaza');

const app = express();

const {sequelize} = require("./models");

app.set('view engine', 'ejs');
app.set('views', 'public/html');
app.use(express.static(__dirname + '/public'));

app.use(rute);
app.use(ruteHTML);
app.use(ruteBaza);

app.listen({port:3000}, async() =>{
    console.log("Server up!");
    await sequelize.authenticate();
    console.log("Database connected!");
});