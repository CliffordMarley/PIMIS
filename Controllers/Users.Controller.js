const UserModel = require('../Models/User.Model')
const ValidationHelper = require("../Helpers/Validation.Helper")
const path = require("path")
const generator = require('generate-password');
module.exports = class{
    constructor(){
        this.usermodel = new UserModel()
        this.validation = new ValidationHelper()
    }

    RenderLoginPage = async (req, res)=>{
        res.sendFile(path.join(__dirname, '../Public/static_pages/login.html'))
    }

    Login = async (req, res)=>{
        try{ 
            const credentials = req.body
            console.log(credentials)
            if(this.validation.Isset(credentials.username) && this.validation.Isset(credentials.password)){
                req.session.userdata = await this.usermodel.ValidateUser(credentials)
                req.session.messageBody = {
                    "status":"success",
                    "message":"Login was successful"
                }
                res.redirect('/dashboard')
            }else{
                console.log('Hello there!')
                req.session.messageBody = {
                    "status":"danger",
                    "message":"Invalid Username or Password!"
                }
                res.redirect('/login')
            }
        }catch(err){
            console.log(err)
            req.session.messageBody = {
                "status":"danger",
                "message":err.message
            }
            res.redirect('/login')
        }
    }

    Register = async (req, res)=>{
        try{
            let user = req.body
            console.log(user)
            const password = generator.generate({
                length: 6,
                numbers: true
            });
            let data = {
                "Username": user.Firstname.charAt(0)+user.Lastname.toUpperCase(),
                "FullName":user.Firstname+" "+user.Lastname.toUpperCase(),
                "Password":password,
                "Status":1
            }
            req.session.messageBody = {
                "status":"success",
                "message": await this.usermodel.CreateUser(data)
            }
            res.redirect(`/users/${data.Username}`)
        }catch(err){
            req.session.messageBody = {
                "status":"danger",
                "message":err
            }
            res.redirect('/register')
        }
    }

    RenderUsersList = async (req, res)=>{
        let users = await this.usermodel.GetAll()
        console.log(users)
        res.render('users',{
            title:'Users',
            users,
            userdata:req.session.userdata
        })
    }

    RenderUserRegistrationPage = async (req, res)=>{
        const user_rights = await this.usermodel.GetUserRights()
        res.render('user_creation_form',{
            title:"Users",
            user_rights,
            userdata:req.session.userdata,
            alert:req.session.messageBody
        })
        req.session.messageBody = null
        
    }
}