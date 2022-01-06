const express= require('express')
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('z1')
});

router.get('/vjezbe', (req, res, next)=>{
    let podaci = fs.readFileSync('public/vjezbe.csv','utf-8').split(',');
    let odgovor = {brojVjezbi: podaci[0], brojZadataka:[]};
    for (let i = 1; i <= odgovor.brojVjezbi; i++)
    {
        odgovor.brojZadataka.push(podaci[i]);
    }
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(odgovor));
    res.end();
});

module.exports = router;