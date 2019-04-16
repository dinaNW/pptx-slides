var express = require('express');
var router = express.Router();
var pptx = require("pptxgenjs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/generate-pptx', function (req, res) {
    let data = req.body.data;
    res.send({message: 'POST request to /generate-pptx', data})
});

module.exports = router;
