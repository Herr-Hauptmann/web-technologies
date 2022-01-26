const express= require('express')
const router = express.Router();
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var textParser = bodyParser.text();

const {sequelize, Student, Grupa} = require('../models')


router.get('/student', (req,res,next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('unosStudenata');
});

router.get('/promjenaGrupe', (req,res,next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('promjenaGrupe');
});

router.get('/CSVstudenti', (req,res,next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('dodajStudenteCSV');
});


router.post('/student', jsonParser, async(req,res)=>{
    try{
        const firstname = req.body.ime;
        const lastname = req.body.prezime;
        const index = req.body.index;
        const imeGrupe = req.body.grupa;
        const provjeraIndeksa = await Student.count({where: {index: index}});
        if (provjeraIndeksa){
            res.end(JSON.stringify({"status": `Student sa indexom ${index} već postoji!`}));
        }
        let grupaStudenta = await Grupa.findOrCreate({where: {naziv: imeGrupe}});
        const groupId = grupaStudenta[0].id;
        const student = await Student.create({firstname, lastname, index, groupId});
        res.end(JSON.stringify({"status":'Kreiran student!'}));
    }catch(err)
    {
        console.log(err);
        res.end(JSON.stringify({"status": `Student sa indexom već postoji!`}))
    }
});

router.get('/studenti', async(req, res)=>{
    try{
        const studenti = await Student.findAll();
        res.setHeader('Content-Type', 'application/json');
        return res.json(studenti);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"})
    }
});

router.put('/student/:index', jsonParser, async(req,res)=>{
    const index = req.params.index;
    const provjeraIndeksa = await Student.count({where: {index: index}});
    if (!provjeraIndeksa)
        return res.end(JSON.stringify({status: `Student sa indexom ${index} ne postoji!`}));
    
        const imeGrupe = req.body.grupa;
    const grupaStudenta = await Grupa.findOrCreate({where: {naziv: imeGrupe}});
    const noviGroupId = grupaStudenta[0].id;
    
    await Student.update({ groupId: noviGroupId}, {
        where: {
          index: index
        }
      });
      
    return res.end(JSON.stringify({status:`Promjenjena grupa studentu ${index}`}));
});

router.post('/batch/student', textParser, async(req,res)=>{
    let csv = req.body;
    let studenti = csv.split('\r\n');
    let postojeciIndexi = [];
    for (const s of studenti)
    {
        let student = s.split(',');
        const provjeraIndeksa = await Student.count({where: {index: student[2]}});
        if (provjeraIndeksa)
        {
            postojeciIndexi.push(student[2]);
            continue;
        }
        const firstname = student[0];
        const lastname = student[1];
        const index = student[2];
        const groupName = student[3];
        const grupaStudenta = await Grupa.findOrCreate({where: {naziv: groupName}});
        const groupId = grupaStudenta[0].id;
        const novi = await Student.create({firstname, lastname, index, groupId});   
    }
    if (postojeciIndexi.length==0)
        return res.end(JSON.stringify({status: `Dodano ${studenti.length} studenata!`}));
    else
    {
        let povratniString = `Dodano ${studenti.length-postojeciIndexi.length} studenata, a studenti `;
        for (let i = 0; i < postojeciIndexi.size(); i++)
        {
            povratniString+=postojeciIndexi[i];
            if (i != postojeciIndexi.size()-1)
                povratniString+=',';    
        }
        povratniString+=" već postoje!";
        return res.end(JSON.stringify({status: povratniString}));
    }
});

module.exports = router;