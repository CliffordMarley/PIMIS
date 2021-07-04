const HomeController = require("../Controllers/Home.Controller")

module.exports = (router, sm)=>{

    router.get(['/dashboard','/'], new HomeController().RenderHomePage)


    return router
}