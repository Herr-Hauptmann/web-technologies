const express= require('express')
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json(); 

router.get('/unosVjezbi', (req,res,next)=>{
    res.setHeader('Content-Type', 'text/html');
    res.render('unosVjezbi');
});

module.exports = router;