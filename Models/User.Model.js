const Client = require("../Config/Database")
const md5 = require("md5")
module.exports = class{
    constructor(){
        this.client = new Client()
    }
    CreateUser = async (data)=>{
        return new Promise(async (resolve, reject)=>{
            
            try{
                const SQL = `INSERT INTO Users(Username, FullName, Password,Status) VALUES('${data.Username}','${data.FullName}','${data.Passsword}','${data.Status}')`
                 let conn = await this.client.GetConnetion()
                 let results = await conn.request().query(SQL)
                 console.log(results)
                 //results = results.recordset
                 resolve(`Account with Username <b>${data.Username}</b> has been created successfully!`)
            }catch(err){
                console.log(err)
                reject('DB Exception: Failed to save data to Database!')
            }
        })
    }

    GetUser = (username)=>{
        return new Promise(async (resolve, reject)=>{
            
            try{
                 let conn = await this.client.GetConnetion()
                 let results = await conn.request().query(`SELECT *, US.Status as UserStatus FROM Users U JOIN UserStatus US ON US.ID =  U.Status WHERE Username = '${username}'`)
                 
                 results = results.recordset
                 //console.log(results)
                 if(results.length > 0){
                    results = results[0]
                 }
                 resolve(results)
            }catch(err){
                console.log(err)
                reject('DB Exception: Authentication failed!')
            }
        })
    }

    GetAll = ()=>{
        return new Promise(async (resolve, reject)=>{
            
            try{
                 let conn = await this.client.GetConnetion()
                 let results = await conn.request().query(`SELECT *, US.Status as UserStatus FROM Users U JOIN UserStatus US ON US.ID =  U.Status`)
                 
                 results = results.recordset
                 resolve(results)
            }catch(err){
                console.log(err)
                reject('DB Exception: Authentication failed!')
            }
        })
    }

    ValidateUser = async (data)=>{
        console.log(data)
       return new Promise(async (resolve, reject)=>{
           
           try{
                let conn = await this.client.GetConnetion()
                let results = await conn.request().query(`SELECT * FROM Users WHERE Username  = '${data.username}' `)
                //console.log(results)
                results = results.recordset
                //console.log(results)
                if(results.length > 0){
                    resolve(results[0])
                }else{
                    reject('Wrong Username or Password!')
                }
           }catch(err){
               console.log(err)
               reject(err)
           }
       })
    }

    GetUserRights =()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                let results = await conn.request().query(`SELECT * FROM UserRights `)
                //console.log(results)
                results = results.recordset
                resolve(results)
           }catch(err){
               console.log(err)
               reject('DB Exception: Failed to Query User Rights!')
           }
        })
    }

    UpdateUserRights = (data)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const SQL = `UPDATE Users SET UserRights = '${data.UserRights}' WHERE Username = '${data.Username}' `
                let results = await conn.request().query(SQL)
                //console.log(results)
                //results = results.recordset
                resolve("User Rights Updated Successfully!")
           }catch(err){
               console.log(err)
               reject('DB Exception: Failed to Update User Rights!')
           }
    })
}
}