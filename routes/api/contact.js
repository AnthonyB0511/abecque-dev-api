const router = require("express").Router();
const nodemailer = require("nodemailer");
require("dotenv").config();
router.get("/", (_, res) => {
    res.send(JSON.stringify("CONTACT OK"));
});


router.post('/send', (req, res) => {
    const { name, firstname, email, subject, message } = req.body;
    console.log("send Ok");
    // Configurer le transporteur Nodemailer
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASSWORDNODEMAILER,
            },
        });

        // Options du message
        const mailOptions = {
            from: email,
            to: process.env.MAIL, // Adresse e-mail de destination
            subject: subject,
            text: `Nom: ${name}\nPrénom: ${firstname}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Envoyer l'email
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