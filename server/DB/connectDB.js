const mongoose = require("mongoose")

async function connectDB(mongoURL) {
    try {
        await mongoose.connect(mongoURL)
        console.log("mongodb connected")
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

module.exports = connectDB
