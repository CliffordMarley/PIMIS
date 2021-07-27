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

    RenderPerformanceUpdateView = async (req, res)=>{
        let Investments = []
        try{
            Investments = await this.investmentmodel.Trading()
        }catch(err){

        }finally{
            res.render('update-investment-perforance',{
                title:"Update Performance",
                Investments
            })
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
          
            console.log(UnlistedCompanyValuation)
        }catch(err){
            console.log(err)
        }finally{
            res.render('commercial-investments-list',{
                title:"Investments Registry",
                Investments,
                Trading,
                Dividends,
                ShareDisposal,
                UnlistedCompanyValuation
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
                alert
            })
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
                alert
            })
        }
    }

    ViewDividend = async (req, res)=>{

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
                Trading
            })
        }
    }
}