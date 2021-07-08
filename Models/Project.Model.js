const Client = require("../Config/Database")
const ValidationHelper = require("../Helpers/Validation.Helper")
module.exports = class{
    constructor(){
        this.client = new Client()
        this.validation = new ValidationHelper()
    }

    GetSocialProjects = async (data)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `SELECT *,P.ID AS ProjectID, FORMAT(P.ApplicationDate, 'dd-MM-yyyy') AS DateRequested FROM Projects P LEFT JOIN Districts D ON D.ID = P.District JOIN ProjectStatus PS ON PS.ID = P.Approved `
                let results = await conn.request().query(Query)
                resolve(results.recordset)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Projects!")
            }
        })
    }

    GetCommercialProjects = async (data)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `select * from Investments`
                let results = await conn.request().query(Query)
                resolve(results.recordset)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Projects!")
            }
        })
    }

    GetSocialProjectsValue = async ()=>{
        return new Promise(async (resolve,reject)=>{
            try{
                let Query =  "select  convert(DOUBLE PRECISION, round(Sum(AmountRequested)/1000000000,2)) AS projectvalue from projects WHERE Approved = 1";
                let conn = await this.client.GetConnetion()
                let results = await conn.request().query(Query)
                resolve(results.recordset[0].projectvalue)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to calculate projects value!")
            }
        })
    }

    GetCommercialProjectsValue = ()=>{
        return new Promise(async (resolve,reject)=>{
            try{
                let Query =  "SELECT convert(DOUBLE PRECISION, round(sum(CurrentValuation)/1000000000,1)) AS commercialProjectsValue from investmentsview";
                let conn = await this.client.GetConnetion()
                let results = await conn.request().query(Query)
                resolve(results.recordset[0].commercialProjectsValue)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to calculate projects value!")
            }
        })
    }

    QueryBuilder = (data)=>{
        let FILTER = "";
        if(this.validation.Isset(data.ApplicationStatus)){
            FILTER += ` AND ApplicationStatus = ${data.ApplicationStatus} `
        }
        if(this.validation.Isset(data.Approved)){
            FILTER += ` AND Approved = ${data.Approved} `
        }
        return FILTER
    }
}