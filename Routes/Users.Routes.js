const UsersController = require('../Controllers/Users.Controller')


module.exports = (router, sm)=>{

    router.get('/login', new UsersController().RenderLoginPage)

    router.post('/users/login', new UsersController().Login)

    router.post('/users', new UsersController().Register)

    router.get("/users", new  UsersController().RenderUsersList)

    router.get('/viewuser', new UsersController().ViewUser)

    router.get("/register", new UsersController().RenderUserRegistrationPage)

    router.post('/users/rights', new UsersController().SetRights)


    return router
}