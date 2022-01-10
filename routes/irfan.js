const express= require('express')
const router = express.Router();

router.get('/z1.html', (req, res, next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('z1')
});

router.get('/vjezbe.html', (req,res,next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('vjezbe')
});

router.get('/zadaci.html', (req,res,next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('zadaci')
});

router.get('/mojRepozitorij.html', (req,res,next) =>{
    res.setHeader('Content-Type', 'text/html');
    res.render('mojRepozitorij')
});

router.get('/unosVjezbi.html', (req,res,next)=>{
    res.setHeader('Content-Type', 'text/html');
    res.render('unosVjezbi');
});

module.exports = router;