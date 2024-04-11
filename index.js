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
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(routes);

app.get("/", (_, res) => {
    res.send(JSON.stringify("API WORKING"));
});

app.listen(port, "0.0.0.0", () => {
    console.log(`serveur Node écoutant sur le port ${port}`);
});