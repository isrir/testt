var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require('cors');

var obj = express();
obj.use(express.json());
obj.use(cors());
obj.use(bodyParser.urlencoded({
    extended: true
}));

var vai = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
        user: 'sriram.21@sonatech.ac.in',
        pass: 'Iniyan874'
    }
});

obj.post("/cm", function(req, res) {
    let regno = req.body.regno;
    let email = req.body.email;
    let machinelearning = parseInt(req.body.machinelearning);
    let fullstackdevelopment = parseInt(req.body.fullstackdevelopment);
    let agile = parseInt(req.body.agile);
    let totalqualitymanagement = parseInt(req.body.totalqualitymanagement);
    let mllab = parseInt(req.body.mllab);
    let fsdlab = parseInt(req.body.fsdlab);
    let totalmarks = machinelearning + fullstackdevelopment + agile + totalqualitymanagement + mllab + fsdlab;
    let result = (machinelearning >= 50 && fullstackdevelopment >= 50 && agile >= 50 && totalqualitymanagement >= 50 && mllab >= 50 && fsdlab >= 50) ? "pass" : "fail";
    let avg = totalmarks / 6;
    let message = "<h1> Hai, " + email + ", with Reg No.:" + regno + " ,Your exam result is " + result + " Avg is " + avg + "</h1>";
    var mailOptions = {
        from: 'sriram.21@sonatech.ac.in',
        to:email ,
        subject: 'semester result',
        html: message
    };
    vai.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send(message);
});

obj.listen(5000, function() {
    console.log("Server is running on port number 5000");
});
