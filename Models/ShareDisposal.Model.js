const Client = require("../Config/Database")
module.exports = class{
    constructor(){
        this.client = new Client()
    }

    SharePurchaseDisposal = async ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `Select * from SharePurchaseAndDisposalView Where Approved = 1`
                let results = await conn.request().query(Query)
                results = results.recordset
                resolve(results)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Approved Share Purchases")
            }
        })
    }

    SharePurchaseDisposalNotApproved = async ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `Select * from SharePurchaseAndDisposalView Where Approved = 0`
                let results = await conn.request().query(Query)
                results = results.recordset
                resolve(results)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Unapproved Share Purchases")
            }
        })
    }

    SharePurchaseDisposalRejected = async ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `Select * from SharePurchaseAndDisposalView Where Approved = 2`
                let results = await conn.request().query(Query)
                results = results.recordset
                resolve(results)
            }catch(err){
                console.log(err)
                reject("DB Exception: Failed to query Rejected Share Purchases")
            }
        })
    }
}