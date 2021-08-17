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

    UpdateDividends = async(data)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                //Check if exists
                let Query = `SELECT * FROM Dividends WHERE InvestmentId = '${data.Investment}'`
                let check = await this.GetJSON(Query)
                if(check.length > 0){
                    Query = `UPDATE Dividends SET DateOfLastValuation = '${data.DateOfLastValuation}', DateOfCurrentValuation = '${data.DateOfCurrentValuation}', DeclaredProposed = '${data.DeclaredProposed}', DividendPerShare = '${data.DividendPerShare}', DatePayable = '${data.DatePayable}', Budget = '${data.Budget}', AmountDeclared = '${data.AmountDeclared}' WHERE InvestmentId = '${data.Investment}'`
                }else{
                    Query = `INSERT INTO Dividends(InvestmentId,DateOfLastValuation,DateOfCurrentValuation,DeclaredProposed, DividendPerShare, DatePayable, Budget, AmountDeclared ) VALUES('${data.Investment}','${data.DateOfLastValuation}','${data.DateOfCurrentValuation}','${data.DeclaredProposed}','${data.DividendPerShare}','${data.DatePayable}','${data.Budget}','${data.AmountDeclared}')`
                }
                console.log(Query)
                let conn = await this.client.GetConnetion()
                let results = await conn.request().query(Query)
                results = results.recordset
                resolve("Dividend record processed successfully!")
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

    UpdatePerformance = async (data)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                let Query = `SELECT * FROM ListedCompaniesTrading WHERE ID = '${data.Investment}' `
                let results = await conn.request().query(Query)
                if(results.recordset.length > 0){
                    Query = `UPDATE ListedCompaniesTrading SET TransactionDate = '${data.TransactionDate}', OpeningPrice = '${data.OpeningPrice}', ClosingPrice = '${data.ClosingPrice}', VolumeTraded = '${data.VolumeTraded}', PercentTraded = '${data.PercentTraded}', ValueTraded = '${data.ValueTraded}', Earnings = '${data.Earning}', PE = '${data.PE}', PBV = '${data.PBV}', MarketCAP = '${data.MarketCAP}' WHERE ID = '${data.Investment}'`
                    console.log(Query)
                }
                await conn.request().query(Query)
                resolve("Investment Trading Performance Updated Successfully!")
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Investments!")
            }
        })
    }

}