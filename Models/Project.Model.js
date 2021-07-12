const Client = require("../Config/Database")
const ValidationHelper = require("../Helpers/Validation.Helper")
module.exports = class{
    constructor(){
        this.client = new Client()
        this.validation = new ValidationHelper()
    }

    CreateProject = async (data)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `INSERT INTO Projects(FileRefNo,ApplicantName, ProjectDescription, ProjectType, Beneficiary,ApplicationDate,DateReviewed,ApplicationStatus,FundingSector,District,AmountRequested,ProjectPromoter,ContactAddress,ContactPhone,CoFinancier,ProjectStakeholders) VALUES('${data.FileRefNo}','${data.ApplicantName}','${data.ProjectDescription}','${data.ProjectType}','${data.Beneficiary}','${data.ApplicationDate}','${data.DateReviewed}','1','${data.FundingSector}','${data.District}','${data.AmountRequested}','${data.ProjectPromoter}','${data.ContactAddress}','${data.ContactPhone}','${data.CoFinancier}','${data.ProjectStakeholders}')`
                await conn.request().query(Query)
                resolve("New Application Registered Successfully!")
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Projects!")
            }
        })
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

    GetOneSocialProjects = async (FileRefNo)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `SELECT *,P.ID AS ProjectID, FORMAT(P.ApplicationDate, 'dd-MM-yyyy') AS DateRequested FROM Projects P LEFT JOIN Districts D ON D.ID = P.District JOIN ProjectStatus PS ON PS.ID = P.Approved LEFT JOIN ProjectSectors PSC ON PSC.ID = P.FundingSector WHERE P.FileRefNo = '${FileRefNo}'`
                let results = await conn.request().query(Query)
                //console.log(results)
                if(results.recordsets.length > 0){
                    results = results.recordset[0]
                    resolve(results)
                }else{
                    reject("Invalid File Number: Project Not Found!")
                }
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to Fetch Project!")
            }
        })
    }

    AddAttachment = async (data)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `UPDATE Projects SET ${data.attachement_position} = '${data.fileName}' WHERE FileRefNo = '${data.FileRefNo}'`
                await conn.request().query(Query)
                resolve("Attachment added successfully!")
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to update Project attachements!")
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