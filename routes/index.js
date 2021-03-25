var express = require('express');
var router = express.Router();
var PptxGenJS = require("pptxgenjs");
const fs = require('fs-extra');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/generate-pptx', function (req, res) {
    // let data = req.body.data;
    const pptx = new PptxGenJS();
    const slide = pptx.addNewSlide();

    fs.readJson('./data/movies-web_articles-03_25_21-11_37.json', { throws: false })
        .then(jsonData => {
            const rows = [
                ['Headline', 'Summary', 'Published date', 'Link'],
                ...jsonData.map(d => {
                    return [d['headline'], d['summary'], d['published'], d['link']];
                })
            ];

            slide.addTable(rows, { w: "100%" });

            const filename = 'sample-presentation.pptx';

            // https://gitbrent.github.io/PptxGenJS/docs/usage-saving.html#nodejs
            pptx.save('public/sample-presentation.pptx', function() {
                res.send({url: 'http://localhost:3000/' + filename})
            });
        })
        .catch(err => {
            console.error(err) // Not called
        }
    );

});

module.exports = router;
