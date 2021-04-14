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
    console.log(process.env.ACCESS_TOKEN)
    
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

    //We will access google api with this below

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`

    request(verifyUrl, (err,response,body) => {
        body = JSON.parse(body);
        if(body.success !== undefined && !body.success){
            return res.json({"success": false, "msg": "Failed Captcha Verification"});
        }else{
          console.log(process.env.EMAIL)
          let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                      type: 'OAuth2',
                      user: process.env.EMAIL,
                      clientId: process.env.CLIENT_ID,
                      clientSecret: process.env.CLIENT_SECRET,
                      refreshToken: process.env.REFRESH_TOKEN,
                      accessToken: process.env.ACCESS_TOKEN
                  }
           });
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
