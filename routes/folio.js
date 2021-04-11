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
    },
    'GTA_Server': {
        'title': "Modded FiveM/GTA5 Game Server",
        'for'  : "Personal Hobby",
        'date' : "Fall 2019",
        'category': "Modding",
        'link' : "google.com",
        'description': "This server was called Blue Sky RP, it was a modded server that was built on top of GTA 5. It used Lua, C#, and MySQL. This was a really fun expierence, and it taught me alot about developing for an active community.",
        'images': {
            0: 'portfolio-1.1.jpg',
            1: 'portfolio-1.2.png',
            2: 'portfolio-1.3.png'
        }
    },
    'old_website': {
        'title': "Previous Personal Website",
        'for'  : "Personal",
        'date' : "Fall 2018",
        'category': "Modding",
        'link' : "google.com",
        'description': "This was one of the first websites that I built to showcase myself to employers. This was built in NodeJS/ExpressJS, Bootstrap, and MySQL. This was when I first learned about using a front-end framework to assist in making a website look better.",
        'images': {
            0: 'portfolio-1.1.jpg',
            1: 'portfolio-1.2.png',
            2: 'portfolio-1.3.png'
        }
    },

};

/* GET users listing. */
router.get('/:name', function(req, res, next) {
    res.render('portfolio-template.ejs', {info: portfolioInfo[req.params.name]});
});

module.exports = router;
