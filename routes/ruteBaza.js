const express= require('express')
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const { fileURLToPath } = require('url');
const { userInfo } = require('os');

var jsonParser = bodyParser.json();

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


module.exports = router;