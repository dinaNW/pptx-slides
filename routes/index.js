var express = require('express');
var router = express.Router();
var PptxGenJS = require("pptxgenjs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/generate-pptx', function (req, res) {
    // let data = req.body.data;
    const pptx = new PptxGenJS();
    const slide = pptx.addNewSlide();

    slide.addText('Hello World!', { x:1.5, y:1.5, fontSize:18, color:'363636' });

    // The "https://d20v9nqgtkp2t3.cloudfront.net/safeImage?url=" part of each image url will have to be removed
    // and decodeURIComponent() will have to be applied to the rest.
    // Without this, the PPTX file is corrupted.
    slide.addImage({
        path: decodeURIComponent('https%3A%2F%2Flocaltvwjw.files.wordpress.com%2F2019%2F01%2Fwall.jpg%3Fquality%3D85%26strip%3Dall&width=150&height=150&d=rf-YtYmwWdrsEdQSJP3nRRSrN5t4kbiFniOR0SSYQWA'),
    });

    slide.addChart(pptx.charts.BAR, [{
            name  : 'Actual Sales',
            labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            values: [1500, 4600, 5156, 3167, 8510, 8009, 6006, 7855, 12102, 12789, 10123, 15121]
        },
        {
            name  : 'Projected Sales',
            labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            values: [1000, 2600, 3456, 4567, 5010, 6009, 7006, 8855, 9102, 10789, 11123, 12121]
        }], { x:1.0, y:1.0, w:12, h:6 } );

    slide.addTable([
        { text:'Cell 1 A',  options:{fontFace:'Arial'  } },
        { text:'Cell 1 B',  options:{fontFace:'Courier'} }
    ], { x:0.5, y:5, w:9, h:2, colW:[1.5,1.5,6] });

    const filename = 'sample-presentation.pptx';

    // https://gitbrent.github.io/PptxGenJS/docs/usage-saving.html#nodejs
    pptx.save('public/sample-presentation.pptx', function() {
        res.send({url: 'http://localhost:3000/' + filename})
    });

});

module.exports = router;
