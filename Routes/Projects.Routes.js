const ProjectsController = require("../Controllers/Projects.Controller")
module.exports = (router, sm, hbs)=>{

    const projectController = new ProjectsController(hbs)

    router.get('/project-list', sm.validatePage, projectController.RenderProjectsList )

    router.get('/project-create', sm.validatePage, projectController.RenderProjectsCreate)

    router.get('/project-edit', sm.validatePage, projectController.RenderProjectsUpdate)

    router.get('/project-view', sm.validatePage, projectController.RenderProjectViewPage)
    router.get('/project-details', sm.validatePage, projectController.RenderProjectDetailsPage)

    router.post('/projects', projectController.CreateAction)

    router.post('/projects/edit', projectController.UpdateProject)

    router.post('/projects/files', projectController.UploadProjectAttachements)
    router.get('/projects-rejected', sm.validatePage, projectController.RenderRejectedProjects)

    router.get('/ProjectPreview', sm.validatePage, projectController.RenderProjectPreview)
    router.get('/BursaryPreview', sm.validatePage, projectController.RenderBursaryPreview)

    return router
}