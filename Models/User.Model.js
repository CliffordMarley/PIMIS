const {dbConfig, mssql} = require("../Config/Database")

module.exports = class{
    CreateUser = ()=>{

    }

    UpdateUser = ()=>{

    }

    ValidateUser = async (data)=>{
        console.log(data)
       return new Promise(async (resolve, reject)=>{
           console.log(dbConfig)
           try{
                let pool = await mssql.connect(dbConfig)
                let results = await pool.request().query(`SELECT * FROM Users WHERE Username  = ${data.username} AND Password = ${data.password}`)
                results = results.recordSets
                console.log(results)
                if(results.length > 0){
                    resolve(results)
                }else{
                    reject('Wrong Username or Password!')
                }
           }catch(err){
               console.log(err)
               reject('DB Exception: Authentication failed!')
           }
       })
    }

    DeleteUser = ()=>{
        
    }
}