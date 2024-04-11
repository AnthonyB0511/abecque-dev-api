const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORDNODEMAILER,
    },
});

router.use(express.json());
router.post('/send', (req, res) => {
    const { name, firstname, email, subject, message } = req.body;
    try {
        const mailOptions = {
            from: email,
            to: process.env.MAIL,
            subject: subject,
            text: `Nom: ${name}\nPrénom: ${firstname}\nEmail: ${email}\nMessage: ${message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.send('Erreur lors de l\'envoi de l\'email.');
            } else {
                res.status(200).json('Ok');
            }
        });
    } catch (error) {
        console.error(error);
    }


});
module.exports = router;
