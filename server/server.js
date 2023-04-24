const express = require('express')
const fs = require("fs")
const path = require("path")
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const emailValidator = require("email-validator")
const multer  = require('multer')
const cors = require("cors")
require("dotenv").config();
const connectDB = require("./DB/connectDB");
const { postProject, getProjects, deleteProject, putProject } = require('./DB/Projects/projectDBHandler');
const parseProjectFromBody = require("./DB/Projects/parseProjectFromBody");
const getAbout = require('./about');

async function runServer() {

// db
console.log("External db? " + !!process.env.MONGO_URL)
const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1/joao-barrera-portfolio"
await connectDB(mongoURL)

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
    return res.json(getAbout())
})

app.get('/data/projects', async (req, res) => {
    return res.json({projects: await getProjects()})
})

app.post('/data/projects', async (req, res) => {
    try {
        const project = req.body || {}
        await postProject(parseProjectFromBody(project))
        console.log("Succesfully added new project.")
        return res.sendStatus(200)
    } catch (e) {
        return res.sendStatus(400)
    }
})

app.put('/data/projects', async (req, res) => {
    try {
        const project = req.body || {}
        await putProject(parseProjectFromBody(project))
        console.log("Successfully updated project.")
        return res.sendStatus(200)
    } catch (e) {
        console.log(e)
        return res.sendStatus(400)
    }
})

app.delete('/data/projects', async (req, res) => {
    try {
        const uuid = req.query.uuid
        await deleteProject(uuid)
        console.log("Succesfully deleted project.")
        return res.sendStatus(200)
    } catch (e) {
        console.log(e)
        return res.sendStatus(404)
    }
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

}

runServer()
