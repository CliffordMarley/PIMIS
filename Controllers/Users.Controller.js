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
        res.sendFile(path.join(__dirname, '../Public/login.html'))
    }

    Login = async (req, res)=>{
        try{ 
            const credentials = req.body
            console.log(credentials)
            if(this.validation.Isset(credentials.username) && this.validation.Isset(credentials.password)){
                req.session.userdata = await this.usermodel.ValidateUser(credentials)
                console.log(req.session.userdata)
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
            console.log(data)
            req.session.messageBody = {
                "status":"success",
                "message": await this.usermodel.CreateUser(data)
            }
            res.redirect(`/viewuser?user_id=${data.Username}`)
        }catch(err){
            req.session.messageBody = {
                "status":"danger",
                "message":err
            }
            res.redirect('/register')
        }
    }

    ViewUser = async (req, res)=>{
        let username = req.query.user_id
        console.log(username)
        let RightsList;
        let user = null
        try{
            user = await this.usermodel.GetUser(username)
            console.log(user)
            const user_rights = await this.usermodel.GetUserRights()
            RightsList = this.FindChecked(user_rights, user.UserRights)
            //console.log(RightsList)
        }catch(err){
            user = null
            req.session.messageBody = {
                "status":"danger",
                "message":err
            }
        }finally{
            res.render('viewuser',{
                title:"Users",
                user,
                RightsList,
                alert:req.session.messageBody,
                user:req.session.userdata
            })
            req.session.messageBody = null
        }
    }

    RenderUsersList = async (req, res)=>{
        let users = await this.usermodel.GetAll()
        console.log(users)
        res.render('users',{
            title:'Users',
            users,
            userdata:req.session.userdata,
            user:req.session.userdata
        })
    }

    RenderUserRegistrationPage = async (req, res)=>{
        const user_rights = await this.usermodel.GetUserRights()
        res.render('user_creation_form',{
            title:"Users",
            user_rights,
            user:req.session.userdata,
            alert:req.session.messageBody
        })
        req.session.messageBody = null
        
    }

    FindChecked = (user_rights, my_rights)=>{
        //console.log(my_rights)
        if(my_rights != null){
            my_rights = my_rights.split(",");
            my_rights = my_rights.map(right=>{
                return parseInt(right)
            })
        }else{
            my_rights = []
        }
        let Rights = user_rights.map(role=>{
            //console.log("My Rights, ", my_rights)
            if(my_rights.includes(role.ID)){
                role.isChecked = "Yes"
            }else{
                role.isChecked = "No"
            }
            return role
        })
        //console.log(Rights)
        return Rights
    }

    SetRights = async (req, res)=>{
        console.log(req.body)
        //res.send(req.body)
        try{
            let message = await this.usermodel.UpdateUserRights(req.body)
            req.session.messageBody = {
                "status":"success",
                "message":message
            }
        }catch(err){
            console.log(err)
            req.session.messageBody = {
                "status":"danger",
                "message":err.message
            }
        }finally{
            res.redirect('/viewuser?user_id='+req.body.Username)
        }
    }
}