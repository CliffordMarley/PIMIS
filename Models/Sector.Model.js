const Client = require("../Config/Database")

module.exports = class{
    constructor(){
        this.client = new Client()
    }

    GetSectors = async ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `SELECT * FROM ProjectSectors`
                let results = await conn.request().query(Query)
                resolve(results.recordset)
                //console.log(results.recordset)

            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Funding Sectors!")
            }
        })
    }

    GetInvestmentSectors = async ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `SELECT * FROM InvestmentSectors`
                let results  = await conn.request().query(Query)
                resolve(results.recordset)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Investment Sectors!")
            }
        })
    }

}