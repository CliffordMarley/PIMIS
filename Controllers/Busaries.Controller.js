const SecondarySchoolModel = require("../Models/School.Model")
const BusariesModel = require("../Models/Busary.Model")
const DistrictModel = require("../Models/District.Model")
module.exports = class{
    constructor(){
        this.schoolmodel = new SecondarySchoolModel()
        this.busarymodel = new BusariesModel()
        this.districtmodel = new DistrictModel()
    }

    SaveBusary = async (req, res)=>{
       let data = req.body
       console.log(data)
       try{
         let last_id = await this.busarymodel.CreateBursary(data)
         req.session.messageBody = {
             status:"success",
             message:"New Bursary Registered Successfully!"
         }
         res.redirect('/ViewBusary?bid='+last_id)
       }catch(err){
           console.log(err)
        req.session.messageBody = {
            status:"danger",
            message:err.message
        }
        res.redirect('/RegisterBusary')
       }
    }

    RenderBursaryUpdatePage = async (req, res)=>{
        let SecondarySchools = []
        let Districts = []
        let BusaryStatus = []
        let NotificationStatus = []
        let Schemes = []
        let SchemeTypes = []
        let Partners = []
        let RawBursary = await this.busarymodel.GetRawBursary(req.query.bid)
        try{
            SecondarySchools = await this.schoolmodel.GetSchools()
            Districts = await this.districtmodel.GetDistricts()
            BusaryStatus = await this.busarymodel.GetBusaryStatus()
            NotificationStatus = await this.busarymodel.GetNotificationStatus()
            Schemes = await this.busarymodel.GetSchemes()
            SchemeTypes = await this.busarymodel.GetSchemesTypes()
            Partners = await this.busarymodel.GetPartners()
            console.log(RawBursary)
        }catch(err){

        }finally{
            res.render('update-bursary',{
                title:"Update Bursary",
                SecondarySchools,
                Districts,
                BusaryStatus,
                NotificationStatus,
                Schemes,
                SchemeTypes,
                Partners,
                RawBursary,
                user:req.session.userdata
            })
        }
    }

    RenderViewBursaryPage = async(req, res)=>{
        const bid = req.query.bid
        let BursaryDetails
        try{
            BursaryDetails = await this.busarymodel.GetBursary(bid)
            console.log(BursaryDetails)
        }catch(err){
            req.session.messageBody = {
                status:"danger",
                message:err.message
            }
        }finally{
            res.render("ViewBursary",{
                title:"Bursary Details",
                BursaryDetails,
                alert:req.session.messageBody,
                user:req.session.userdata
            })
            req.session.messageBody = null
        }
    }

    RenderBusariesPage = async (req, res)=>{
        let SecondarySchools = []
        let alert
        try{
            SecondarySchools = await this.schoolmodel.GetSchools()
            //console.log(SecondarySchools)
        }catch(err){
            alert = {
                status:"danger",
                messager:err.message
            }
        }finally{
            res.render('busaries',{
                title:"Busaries",
                SecondarySchools,
                alert,
                user:req.session.userdata
            })
            
        }
    }

    RenderNewBusaryPage = async (req, res)=>{
        let SecondarySchools = []
        let Districts = []
        let BusaryStatus = []
        let NotificationStatus = []
        let Schemes = []
        let SchemeTypes = []
        let Partners = []
        try{
            SecondarySchools = await this.schoolmodel.GetSchools()
            Districts = await this.districtmodel.GetDistricts()
            BusaryStatus = await this.busarymodel.GetBusaryStatus()
            NotificationStatus = await this.busarymodel.GetNotificationStatus()
            Schemes = await this.busarymodel.GetSchemes()
            SchemeTypes = await this.busarymodel.GetSchemesTypes()
            Partners = await this.busarymodel.GetPartners()
            //console.log(Partners)
        }catch(err){

        }finally{
            res.render('RegisterBusary',{
                title:"New Busary",
                SecondarySchools,
                Districts,
                BusaryStatus,
                NotificationStatus,
                Schemes,
                SchemeTypes,
                Partners,
                user:req.session.userdata
            })
        }
      
    }



    RenderBusariesList = async (req, res)=>{
        const SID = req.query.sid
        const ApprovalStatus = req.query.approved
        
        let BusariesList = []
        let alert
        let SecondarySchools = []
        let SchoolName = "Undefined"
        try {
            BusariesList = await this.busarymodel.GetBusariesList(SID, ApprovalStatus)
           
            SecondarySchools = await this.schoolmodel.GetSchools()
        
            //If SID is not undefined, filter rows where SID is equal to SecondarySchoolId
            if(SID && SID != '' && SID != null && SID != undefined){
                BusariesList = BusariesList.filter(row=>row.SecondarySchoolId == SID)
            }
           
        } catch (err) {
            console.log(err)
            alert = {
                status:"danger",
                messager:err.message
            }
        }finally{
            if(req.session.messageBody != null){
                alert = req.session.messageBody
            }
            res.render('BusariesList',{
                title:"BusariesList",
                BusariesList,
                SecondarySchools,
                alert,
                user:req.session.userdata,
                searchParams : {SID,ApprovalStatus},
                resultCount:BusariesList.length,
            })
            req.session.messageBody = null
        }
    }

    UpdateBursary = async (req, res)=>{
        const data = req.body
        console.log(data)
        try {
            const message = await  this.busarymodel.UpdateBursary(data)
            req.session.messageBody = {
                status:'success',
                message
            }
            res.redirect("/ViewBusary?bid="+data.BID)
        } catch (err) {
            req.session.messageBody = {
                status:'success',
                message:err.message
            }
            console.log(req.session.messageBody)
            res.redirect("/update-bursary?bid="+data.BID)
        }
        req.session.messageBody = null
    }
}