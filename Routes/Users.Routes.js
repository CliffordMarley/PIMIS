const UsersController = require('../Controllers/Users.Controller')


module.exports = (router, sm)=>{

    router.get('/login', new UsersController().RenderLoginPage)

    return router
}