const UserModel = require('../Models/User.Model')
const ValidationHelper = require("../Helpers/Validation.Helper")
const path = require("path")
module.exports = class{
    constructor(){
        this.usermodel = new UserModel()
        this.validation = new ValidationHelper()
    }

    RenderLoginPage = async (req, res)=>{
        res.sendFile(path.join(__dirname, '../Public/static_pages/login.html'))
    }

    SignUp = async (req, res)=>{
        try{
            const credentials = req.body
            console.log(credentials)
            if(this.validation.Isset(credentials.username) && this.validation.Isset(credentials.password)){
                req.session.userdata = await this.usermodel.ValidateUser(credentials)
                req.session.messageBody = {
                    "status":"success-message",
                    "message":"Login was successful"
                }
                res.redirect('/dashboard')
            }else{
                console.log('Hello there!')
                req.session.messageBody = {
                    "status":"error-message",
                    "message":"Invalid Username or Password!"
                }
                res.redirect('/login')
            }
        }catch(err){
            console.log(err)
            req.session.messageBody = {
                "status":"error-message",
                "message":err
            }
            res.redirect('/login')
        }
    }
}