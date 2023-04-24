function parseProjectFromBody(body) {
    const project = {
        uuid: body?.uuid,
        previewImage: body.previewImage,
        title: body.title,
        shortDescription: body.shortDescription,
        redirectLink: body.redirectLink,
        sourceCodeLink: body.sourceCodeLink,
        redirectIsExternal: !!body?.redirectIsExternal,
        disabled: !!body?.disabled
    }

    return project
}

module.exports = parseProjectFromBody
