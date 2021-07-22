const ProjectsController = require("../Controllers/Projects.Controller")
module.exports = (router, auth)=>{

    router.get('/project-list', new ProjectsController().RenderProjectsList )

    router.get('/project-create', new ProjectsController().RenderProjectsCreate)

    router.get('/project-edit', new ProjectsController().RenderProjectsUpdate)

    router.get('/project-view', new ProjectsController().RenderProjectViewPage)

    router.post('/projects', new ProjectsController().CreateAction)

    router.post('/projects/edit', new ProjectsController().UpdateProject)

    router.post('/projects/files', new ProjectsController().UploadProjectAttachements)

    return router
}