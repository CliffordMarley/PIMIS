const UsersController = require('../Controllers/Users.Controller')


module.exports = (router, sm)=>{

    router.get('/login', new UsersController().RenderLoginPage)

    router.post('/users/login', new UsersController().Login)

    router.post('/users', new UsersController().Register)

    router.get("/users",sm.validatePage, new  UsersController().RenderUsersList)

    router.get('/viewuser',sm.validatePage, new UsersController().ViewUser)

    router.get("/register",sm.validatePage, new UsersController().RenderUserRegistrationPage)

    router.post('/users/rights', new UsersController().SetRights)


    return router
}