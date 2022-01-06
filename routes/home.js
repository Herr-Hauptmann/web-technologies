const express= require('express')
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('z1')
});

router.get('/z1', (req, res, next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('z1')
});

router.get('/vjezbe', (req,res,next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('vjezbe')
});

router.get('/zadaci', (req,res,next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('zadaci')
});

router.get('/mojRepozitorij', (req,res,next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('mojRepozitorij')
});

module.exports = router;