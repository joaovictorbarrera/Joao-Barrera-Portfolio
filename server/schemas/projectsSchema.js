const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    previewImage: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    redirectLink: {
        type: String,
        required: true
    },
    sourceCodeLink: {
        type: String,
        required: true
    },
    redirectIsExternal: Boolean,
    disabled: Boolean,
})

module.exports = mongoose.model("projects", projectSchema)
