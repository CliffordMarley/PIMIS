const InvestmentModel = require("../Models/Investments.Model")
const SectorsModel = require("../Models/Sector.Model")
const ShareDisposalModel = require("../Models/ShareDisposal.Model")
const CommonFunctionsHelper = require("../Helpers/CommonFunctions.Helper")
module.exports = class{

    constructor(){
        this.investmentmodel = new InvestmentModel()
        this.sectorsmodel = new SectorsModel()
        this.sharedisposal = new ShareDisposalModel()
    }
    
    CreateAction = async (req, res)=>{
        let data = req.body;
        let status, message
        try{
            status = "success"
            await this.investmentmodel.Create(data)
            message = "New Investment Registered Successfully!"
            req.session.messageBody = {
                status,message
            }
            res.redirect('/commercial-investments')
        }catch(err){
            console.log(err)
            status = 'error'
            message = err
            req.session.messageBody = {
                status,message
            }
            res.redirect('/create-investment')
        }
    }

    UpdatePerformanceStatus = async (req, res)=>{
        let data = {
            "performance":req.params.object_id,
            "status":req.params.status
        }

        // try{
        //     await this.investmentmodel.ChangePerforanceStatus
        // }
    }

    UpdatePerformance = async (req, res)=>{
        const data = req.body
        console.log(data)
        try {
            const message = await this.investmentmodel.UpdatePerformance(data)
            req.session.messageBody = {
                status:"success",
                message
            }
            res.redirect('/view-performance?object_id='+data.Investment)
        } catch (err) {
            req.session.messageBody = {
                status:"danger",
               message: err.message
            }
            res.redirect('/update-investment-performance?ds='+data.Investment)
        }
    }

    RenderPerformanceUpdateView = async (req, res)=>{
        let Investments = []
        let alert
        let ps = null
        if(req.query.ps && req.query.ps != null && req.query.ps != "" && req.query.ps != typeof undefined){
            ps = req.query.ps
        }
        try{
            Investments = await this.investmentmodel.Trading()
            //console.log(Investments)
            if(req.session.messageBody != null){
                alert = req.session.messageBody
            }
        }catch(err){
            alert.status = "danger"
            alert.message = err.message
        }finally{
            console.log(alert)
            res.render('update-investment-perforance',{
                title:"Update Performance",
                Investments,
                ps,
                alert,
                user:req.session.userdata
            })
            alert = null
        }
    }

    RenderInvestmentsPage = async (req, res)=>{
        let Investments = []
        let Trading = []
        let Dividends = []
        let ShareDisposal = []
        let UnlistedCompanyValuation = []
        try{
            Investments = await this.investmentmodel.InvestmentRegistration()
            Trading = await this.investmentmodel.Trading()
            Dividends = await this.investmentmodel.GetDividends()
            ShareDisposal = await this.sharedisposal.SharePurchaseDisposal()
            UnlistedCompanyValuation = await this.investmentmodel.GetUnlistedCompanyValuation()
          
            console.log(Dividends)
        }catch(err){
            console.log(err)
        }finally{
            res.render('commercial-investments-list',{
                title:"Investments Registry",
                Investments,
                Trading,
                Dividends,
                ShareDisposal,
                UnlistedCompanyValuation,
                user:req.session.userdata
            })
        }
    }

    RenderCreateInvestment = async (req, res)=>{
        let Sectors = []
        let Types = [
            {"ID":1,"Name":"Listed"},
            {"ID":2,"Name":"Unlisted"}
        ]
        let alert
        try{
            Sectors = await this.sectorsmodel.GetInvestmentSectors()
        }catch(err){
            alert = {
                status:'danger',
                message:err
            }
        }finally{
            res.render('create-investment',{
                title:"Create Investment",
                Sectors,
                Types,
                alert,
                user:req.session.userdata
            })
        }
    }

    RenderUpdateDividendsPage = async (req, res)=>{
        let Dividends  = []
            try{
                const SQL = "SELECT ID, InvestmentName FROM Investments"
                Dividends = await this.investmentmodel.GetJSON(SQL)
                console.log(Dividends)
            }catch(err){
                console.log(err)
            }finally{
                res.render("UpdateDividends", {
                    title:"Update Dividends",
                    Dividends,
                    alert:req.session.messageBody,
                    user:req.session.userdata
                })
                req.session.messageBody = null
            }
        }
        
        UpdateDividends = async(req, res)=>{
            let data = req.body
            console.log(data)
            try {
                const message = await this.investmentmodel.UpdateDividends(data)
                req.session.messageBody = {
                    status:"success",
                    message
                }
                res.redirect('/view-dividend?object_id='+data.Investment)
            } catch (err) {
                req.session.messageBody = {
                    status:"danger",
                    message:err
                }
                res.redirect("/update-dividends")
            }
        }

    ViewInvestment = async (req,res) => {
        let ID = req.query.object_id
        let details = null
        let alert
        try{
            let Investment = await this.investmentmodel.InvestmentRegistration()
            details = Investment.filter(obj => obj.ID == ID)[0]
        }catch(err){
            alert = {
                status:'danger',
                message:err.message
            }
        }finally{
            console.log(details)
            res.render('view-investments',{
                title:"View Investment",
                details,
                alert,
                user:req.session.userdata
            })
        }
    }

    ViewDividend = async (req, res)=>{
        let object_id = req.query.object_id
        console.log("Divident ID: %s", object_id)
        let alert = null
        let Dividend = null
        try{
            let Query = `SELECT * FROM Dividends WHERE InvestmentId = '${object_id}'`
            Dividend = await this.investmentmodel.GetJSON(Query)
            Dividend = Dividend[0]
            Query = `SELECT ID, InvestmentName FROM Investments WHERE ID = '${object_id}' `
            let Investment = await this.investmentmodel.GetJSON(Query)
            Dividend.InvestmentName = Investment[0].InvestmentName
            console.log(Dividend)
        }catch(err){
            console.log(err)
            alert = {
                status:"danger",
                message:err.message
            }
        }finally{
            res.render('ViewDividend',{
                title:"View Dividend",
                Dividend,
                alert,
                user:req.session.userdata
            })
        }
    }

    ViewPerformance = async (req, res)=>{
        const object_id = req.query.object_id
        console.log(object_id)
        let alert = {}
        let Trading = []

        try{
            Trading = await this.investmentmodel.Trading()
            Trading = Trading.filter(element=> element.ID == object_id)[0]
            console.log(Trading)

        }catch(err){
            alert.status = 'danger',
            alert.message = err
        }finally{
            res.render('view-performance',{
                title:"View Performance",
                Trading,
                alert,
                user:req.session.userdata
            })
            req.session.messageBody = null
        }
    }
}