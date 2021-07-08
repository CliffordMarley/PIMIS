const ProjectsController = require("../Controllers/Projects.Controller")
module.exports = (router, auth)=>{

    router.get('/project-list', new ProjectsController().RenderProjectsList )

    router.get('/project-create', new ProjectsController().RenderProjectsCreate )

    return router
}