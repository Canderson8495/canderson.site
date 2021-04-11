var express = require('express');
var router = express.Router();
var request = require('request');
require('dotenv').config();
var nodemailer = require('nodemailer');


router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'Express' });
});

router.post('/', function(req,res) {
    var testEnv = false;
    console.log(req.body);
    
    if(
        req.body.captcha === undefined || 
        req.body.captcha === '' ||
        req.body.captcha === null
    ){
        return res.json({"success": false, "msg": "Please select captcha"});
    }
    if(testEnv){
        var secretKey = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'
    }else{
        var secretKey = '6Lfa06UaAAAAAMPA8qYX6G4_FPMAjqT8E6jeYYsA'
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`
    console.log(verifyUrl);

    request(verifyUrl, (err,response,body) => {
        console.log("We're this far");
        body = JSON.parse(body);
        console.log(body);
        if(body.success !== undefined && !body.success){
            return res.json({"success": false, "msg": "Failed Captcha Verification"});
        }else{
          const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD'
                  }
           })
           const mailOptions = {
              from: process.env.EMAIL,
              to: process.env.EMAIL_TO,
              subject: `${req.body.name}: ${req.body.subject}`,
              text: `${req.body.message}`,
              replyTo: `${req.body.email}`
            }
            transporter.sendMail(mailOptions, function(err, res) {
                if (err) {
                   console.error('there was an error: ', err);
                } else {
                   console.log('here is the res: ', res)
                }
            })
            return res.json({"success": true, "msg": "Your message has been sent!"});
        }

    })
    //Can be accessed with req.body.<name attribute of input>
    //res.send("Well this is embarrassing, My email system seems to have broken. Please contact me in some other way.");
});

module.exports = router;
