const ProjectsController = require("../Controllers/Projects.Controller")
module.exports = (router, sm)=>{

    router.get('/project-list', sm.validatePage, new ProjectsController().RenderProjectsList )

    router.get('/project-create', sm.validatePage, new ProjectsController().RenderProjectsCreate)

    router.get('/project-edit', sm.validatePage, new ProjectsController().RenderProjectsUpdate)

    router.get('/project-view', sm.validatePage, new ProjectsController().RenderProjectViewPage)
    router.get('/project-details', sm.validatePage, new ProjectsController().RenderProjectDetailsPage)

    router.post('/projects', new ProjectsController().CreateAction)

    router.post('/projects/edit', new ProjectsController().UpdateProject)

    router.post('/projects/files', new ProjectsController().UploadProjectAttachements)
    router.get('/projects-rejected', sm.validatePage, new ProjectsController().RenderRejectedProjects)

    return router
}