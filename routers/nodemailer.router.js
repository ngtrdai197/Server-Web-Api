const router = require('express').Router();
const nodemailer = require('nodemailer');
const SecrectMail = require('../config/secrect.config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SecrectMail.GMAIL.USERNAME,
        pass: SecrectMail.GMAIL.PASSWORD
    }
});

router.post('/send-mail', (req, res) => {
    const mailOptions = {
        from: SecrectMail.GMAIL.USERNAME,
        to: 'ngtrdai290197@gmail.com',
        subject: 'Sending Email using Node.js with Nodemailer',
        text: 'Nodemailer - Letter recived from Nodemailer!',
        html: `
        <h1>Server-Web-Api  -  Nodemailder</h1>
        <h2>My name is ${req.body.Myname}</h2>
        <h2>I am ${req.body.Age} year old</h2>
        <h2>Address: ${req.body.Address}</h2>
        `,
        attachments: [
            { filename: 'server.jpg', path: 'http://localhost:8088/images/41782026_1118218794992788_1692250237411786752_n.jpg' }
        ]
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send({ message: `Send mail successfully` });
        }
    });
});

module.exports = router;