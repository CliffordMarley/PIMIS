const UsersController = require('../Controllers/Users.Controller')


module.exports = (router, sm)=>{

    router.get('/login', new UsersController().RenderLoginPage)

    router.post('/users/login', new UsersController().Login)

    router.post('/users', new UsersController().Register)

    router.get("/users", new  UsersController().RenderUsersList)

    router.get("/register", new UsersController().RenderUserRegistrationPage)


    return router
}