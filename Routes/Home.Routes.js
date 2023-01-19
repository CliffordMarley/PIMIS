const HomeController = require("../Controllers/Home.Controller")
const path = require("path")
module.exports = (router, sm, hbs)=>{

    const homeController = new HomeController(hbs)

    router.get(['/dashboard','/'], sm.validatePage, homeController.RenderHomePage)

    router.get('/dashboard/stats', homeController.GetStatistics)

    return router
}