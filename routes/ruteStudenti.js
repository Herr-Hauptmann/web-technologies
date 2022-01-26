const express= require('express')
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const { fileURLToPath } = require('url');
const { userInfo } = require('os');

var jsonParser = bodyParser.json();
var textParser = bodyParser.text();

const {sequelize, Student, Grupa} = require('../models')

router.post('/student', jsonParser, async(req,res)=>{
    try{
        const firstname = req.body.ime;
        const lastname = req.body.prezime;
        const index = req.body.indeks;
        const imeGrupe = req.body.grupa;
        const provjeraIndeksa = await Student.count({where: {index: index}});
        if (provjeraIndeksa)
            return res.json({status: `Student sa indexom ${index} već postoji!`});
        let grupaStudenta = await Grupa.findOrCreate({where: {naziv: imeGrupe}});
        const groupId = grupaStudenta[0].id;
        const student = await Student.create({firstname, lastname, index, groupId});
        return res.json({status:'Kreiran student!'});
    }catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
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
        return res.json({status: `Student sa indexom ${index} ne postoji!`});
    
        const imeGrupe = req.body.grupa;
    const grupaStudenta = await Grupa.findOrCreate({where: {naziv: imeGrupe}});
    const noviGroupId = grupaStudenta[0].id;
    
    await Student.update({ groupId: noviGroupId}, {
        where: {
          index: index
        }
      });
      
    return res.json({status:`Promjenjena grupa studentu ${index}`});
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
        return res.json({status: `Dodano ${studenti.length} studenata!`});
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
        return res.json({status: povratniString});
    }
});

module.exports = router;