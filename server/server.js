const express = require('express')
const fs = require("fs")
const path = require("path")
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const emailValidator = require("email-validator")
const multer  = require('multer')
const cors = require("cors")
require("dotenv").config();

const PORT = 5000
const app = express()
const DEV = process.env.NODE_ENV === "dev "
console.log("DEV MODE? "+DEV)

app.use(cors({
    origin: "*"
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
      console.log("Server is ready to take your messages");
    }
});

const buildFolder = DEV ?
    path.resolve("../client/public")
    : path.resolve('../client/dist')

app.use(express.static(buildFolder, {index: false}))

app.get('/data/about', (req, res) => {
    const about = JSON.parse(fs.readFileSync("./about.json"))
    return res.json(about)
})

app.get('/data/projects', (req, res) => {
    const projects = JSON.parse(fs.readFileSync("./projects.json"))
    return res.json(projects)
})

const upload = multer({ dest: buildFolder })
app.post('/file', upload.single('resume-file'), function (req, res) {
    // console.log(req)
    // const auth = req?.body?.auth
    // if (!auth) return res.sendStatus(403)

    const file = req.file

    if (file.mimetype !== "application/pdf") return res.sendStatus(400)

    fs.copyFileSync(file.path, path.join(file.destination, "Joao-Barrera-Resume.pdf"))
    fs.rmSync(file.path)

   return res.sendStatus(200)
})

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
    if (DEV) return res.send("dev only")
    return res.sendFile(buildFolder + "/index.html")
})

app.listen(process.env.PORT || PORT, () => console.log("SERVER STARTED"))
