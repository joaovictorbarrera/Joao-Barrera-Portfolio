const express = require('express')
const path = require("path")
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const emailValidator = require("email-validator")
const cors = require("cors")
require("dotenv").config();

const PORT = 5000
const app = express()

app.use(cors({
    origin: "*"
}))

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
});

transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
});

const buildFolder = path.resolve('../client/dist')
app.use(express.static(buildFolder, {index: false}))

app.post('/contact', (req, res) => {
    let form = new multiparty.Form()
    let data = {}
    form.parse(req, function (err, fields) {
        Object.keys(fields).forEach(function (property) {
            data[property] = fields[property].toString();
        });

        if (!data.firstName || !data.lastName ||
            !data.email || !data.subject || !data.message) {
            res.status(400).json({status: "error", error: "Missing required fields"})
            return
        }

        if (!emailValidator.validate(data.email)) {
            res.status(400).json({status: "error", error: "Invalid Email"})
            return
        }

        const fullName = `${data.firstName} ${data.lastName}`
        const mail = {
            from: fullName,
            to: process.env.EMAIL,
            subject: data.subject,
            text: `${fullName} <${data.email}> \n${data.message}`,
        };

        transporter.sendMail(mail, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({status: "error", error: "Something went wrong."});
            } else {
                res.status(200).json({status: "ok"});
            }
        });
    });
})

app.get('/*', (req, res) => {
    res.sendFile(buildFolder + "/index.html")
})

app.listen(process.env.PORT || PORT, () => console.log("SERVER STARTED"))
