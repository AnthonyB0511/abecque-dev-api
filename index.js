const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const app = express();

const port = process.env.PORT;
const routes = require("./routes");


app.use((req, res, next) => {
    const allowedOrigin = "https://abecque-dev.vercel.app";
    const origin = req.headers.origin;
    if (allowedOrigin.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Origin", allowedOrigin);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(routes);

app.get("/", (_, res) => {
    res.send(JSON.stringify("API WORKING"));
});
app.post('/send', (req, res) => {
    const { name, firstname, email, subject, message } = req.body;
    console.log(name);
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
}
);
app.listen(port, "0.0.0.0", () => {
    console.log(`serveur Node écoutant sur le port ${port}`);
});