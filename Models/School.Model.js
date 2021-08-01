
const Client = require("../Config/Database")

module.exports = class{
    constructor(){
        this.client = new Client()
    }

    GetSchools = async ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `SELECT *, SecondarySchools.ID AS SID FROM SecondarySchools JOIN Districts ON SecondarySchools.District = Districts.ID`
                let results = await conn.request().query(Query)
                resolve(results.recordset)

            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    }

}