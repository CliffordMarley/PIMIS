const Client = require("../Config/Database")
const ValidationHelper = require("../Helpers/Validation.Helper")
module.exports = class{
    constructor(){
        this.client = new Client()
        this.validation = new ValidationHelper()
    }

    GetJSON = async (Query)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                let results = await conn.request().query(Query)
                results = results.recordset
                resolve(results)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Investments!")
            }
        })
    }

    Execute = async (Query)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                let results = await conn.request().query(Query)
                results = results.recordset
                resolve('OK')
            }catch(err){
                console.log(err)
                reject({message:"DB Exception: Failed to query Investments!"})
            }
        })
    }
}