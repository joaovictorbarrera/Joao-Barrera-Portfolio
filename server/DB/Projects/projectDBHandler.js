const projectSchema = require("../../schemas/projectsSchema")
const { v4: uuidv4 } = require('uuid')

async function getProjects() {
    const docs = await projectSchema.find({}, {
        uuid: 1,
        previewImage: 1,
        title: 1,
        shortDescription: 1,
        redirectLink: 1,
        sourceCodeLink: 1,
        redirectIsExternal: 1,
        disabled: 1})
    return [...docs]
}

async function postProject(project) {
    project.uuid = await findValidUUID()

    await projectSchema.insertMany(project)
}

async function putProject(project) {
    await projectSchema.updateOne({uuid: project.uuid}, project)
}

async function deleteProject(uuid) {
    await projectSchema.deleteOne({uuid})
}

async function findValidUUID() {
    let uuid = uuidv4()

    while ((await projectSchema.find({uuid})).length > 0) {
        uuid = uuidv4()
    }

    return uuid
}

module.exports = {getProjects, postProject, putProject, deleteProject}
