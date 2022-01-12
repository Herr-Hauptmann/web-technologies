const express= require('express')
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const { fileURLToPath } = require('url');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json(); 

router.get('/', (req, res, next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('z1')
});

router.get('/vjezbe', (req, res, next)=>{
    let podaci = fs.readFileSync('public/vjezbe.csv','utf-8').split(',');
    let odgovor = {brojVjezbi: parseInt(podaci[0]), brojZadataka:[]};
    for (let i = 1; i <= odgovor.brojVjezbi; i++)
    {
        odgovor.brojZadataka.push(parseInt(podaci[i]));
    }
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(odgovor));
    res.end();
});

router.post('/vjezbe', jsonParser, (req, res, next)=>{
    res.setHeader('content-type', 'application/json');
    let greske = '';
    let string = `${req.body.brojVjezbi}`;
    if (req.body.brojVjezbi <= 0 || req.body.brojVjezbi > 15)
    {
        greske+='brojVjezbi';
    }
    if (req.body.brojZadataka.length != req.body.brojVjezbi)
    {
        greske+=(greske)?',':'';
        greske+='brojZadataka';
    }
    let i = 0;
    for (const n of req.body.brojZadataka)
    {
        if (n < 0 || n>10)
        {
            greske+=(greske)?',':'';
            greske+=`n${i}`; 
        }
        string+=`,${n}`;
        i++;
    }
    if (greske != ''){
        res.write(JSON.stringify({"status": 'error', 'data' : `Pogresan parametar ${greske}`}));
        res.end();
        return;
    }
    
    fs.truncateSync('public/vjezbe.csv');
    fs.writeFileSync('public/vjezbe.csv', string);
    res.write(JSON.stringify(req.body));
    res.end();
});

module.exports = router;