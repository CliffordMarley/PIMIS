const UsersController = require('../Controllers/Users.Controller')


module.exports = (router, sm)=>{

    router.get('/login', new UsersController().RenderLoginPage)

    router.post('/signup', new UsersController().SignUp)


    return router
}