const express= require('express')
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const { fileURLToPath } = require('url');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json(); 

const {sequelize, Vjezba, Zadatak} = require('../models');

router.get('/', (req, res, next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('z1')
});

router.get('/vjezbe', async(req, res, next)=>{
    const vjezbe = await Vjezba.findAll();
    let odgovor = {brojVjezbi: await Vjezba.count(), brojZadataka:[]};
    for (let i = 0; i < odgovor.brojVjezbi; i++)
    {
        odgovor.brojZadataka.push(await Zadatak.count({where:{vjezbaId: vjezbe[i].id}}));
    }
    
    // let podaci = fs.readFileSync('public/vjezbe.csv','utf-8').split(',');
    // for (let i = 1; i <= odgovor.brojVjezbi; i++)
    // {
    //     odgovor.brojZadataka.push(parseInt(podaci[i]));
    // }
    
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(odgovor));
    res.end();
});

router.post('/vjezbe', jsonParser, async(req, res, next)=>{
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
    
    await Vjezba.destroy({
        truncate: true
    });
    await Zadatak.destroy({
        truncate: true
    });

    for (i = 0; i < req.body.brojVjezbi; i++){
        const naziv = `Vjezba ${i+1}`;
        const vjezba = await Vjezba.create({naziv});
        for(let j = 0; j < req.body.brojZadataka[i]; j++)
        {
            const naziv = `Zadatak ${j+1}`;
            const vjezbaId = vjezba.id;
            const zadatak = await Zadatak.create({naziv, vjezbaId});
        }
    }

    fs.truncateSync('public/vjezbe.csv');
    fs.writeFileSync('public/vjezbe.csv', string);
    res.write(JSON.stringify(req.body));
    res.end();
});

module.exports = router;