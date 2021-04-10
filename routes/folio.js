var express = require('express');
var router = express.Router();

/*
portfolioInfo['bookmarque']['title'] = "Bookmarque";
portfolioInfo['bookmarque']['for'] = "School";
portfolioInfo['bookmarque']['date'] = "Spring 2021";
portfolioInfo['bookmarque']['link'] = "";
portfolioInfo['bookmarque']['description'] = "Bookmarque is the result of a group project for CSCI 4050, it is a complete bookstore website complete built with Flask, Mysql, HTML, SASS/CSS. The website's code is available for your review at https://github.com/Will-McCarthy/Bookmarque"; 
portfolioInfo['bookmarque']['images'][0] = "portfolio-1.1";
portfolioInfo['bookmarque']['images'][0] = "portfolio-1.1";
portfolioInfo['bookmarque']['images'][1] = "/images/";
portfolioInfo['bookmarque']['images'][2] = "/images/";
*/

var portfolioInfo = {
    'bookmarque': {
        'title': "Bookmarque",
        'for'  : "School",
        'date' : "Spring 2021",
        'category': "Web Design",
        'link' : "google.com",
        'description': "Bookmarque is the result of a group project for CSCI 4050, it is a complete bookstore website complete built with Flask, Mysql, HTML, SASS/CSS. The website's code is available for your review at https://github.com/Will-McCarthy/Bookmarque",
        'images': {
            0: 'portfolio-1.1.jpg',
            1: 'portfolio-1.2.png',
            2: 'portfolio-1.3.png'
        }
    }
};

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  if(req.params.name == "bookmarque"){
    res.render('portfolio-template.ejs', {info: portfolioInfo['bookmarque']});
  }
});

module.exports = router;
