const Client = require("../Config/Database")
const ValidationHelper = require("../Helpers/Validation.Helper")
module.exports = class{
    constructor(){
        this.client = new Client()
        this.validation = new ValidationHelper()
    }

    Create = async (data)=>{
        console.log(data)
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `INSERT INTO [dbo].[Investments] (
                    [RBMCompanyCode],[InvestmentName],[InvestmentType],[Sector],[TotalSharesInIssue],[CurrentShareholding]) VALUES('${data.RBMCompanyCode}','${data.InvestmentName}','${data.InvestmentType}','${data.Sector}','${data.TotalSharesInIssue}','${data.CurrentShareholding}')`
                let results = await conn.request().query(Query)
                console.log(results)
                resolve(results)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Investments!")
            }
        })
    }

    GetUnlistedCompanyValuation = async ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `Select * from UnlistedCompanyValuationView Where Approved = 1`
                let results = await conn.request().query(Query)
                results = results.recordset
                resolve(results)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Investments!")
            }
        })
    }


    
    GetDividends = async ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `Select * from DividendsView Where Approved = 1`
                let results = await conn.request().query(Query)
                results = results.recordset
                resolve(results)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Dividends!")
            }
        })
    }

    Trading = async ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `Select * from ListedCompaniesTradingView Where Approved = 1`
                let results = await conn.request().query(Query)
                results = results.recordset
                resolve(results)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Investments!")
            }
        })
    }

    InvestmentRegistration = async ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `Select * from InvestmentsView Where Approved = 1`
                let results = await conn.request().query(Query)
                results = results.recordset
                resolve(results)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Investments!")
            }
        })
    }



    GetListedInvestments = async ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `SELECT * FROM ListedBlock`
                let results = await conn.request().query(Query)
                results = results.recordset
                resolve(results)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Investments!")
            }
        })
    }

    

}