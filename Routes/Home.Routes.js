const HomeController = require("../Controllers/Home.Controller")
const path = require("path")
module.exports = (router, sm)=>{

    router.get(['/dashboard','/'], new HomeController().RenderHomePage)

    router.get('/dashboard/stats', new HomeController().GetStatistics)
    return router
}