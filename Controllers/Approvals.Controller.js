const GenericModel  = require("../Models/Generic.Model")

module.exports = class{

    constructor(){
        this.generic = new GenericModel()
    }

    RenderApprovalsPage = async (req, res)=>{
        let Projects = []
        let Bursaries = []
        let Investments = []
        try{
            let Query = "SELECT *,P.ID AS PID FROM Projects P JOIN Districts D ON D.ID = P.District JOIN ProjectSectors PS ON PS.ID = P.FundingSector WHERE Approved = 0"
            Projects = await this.generic.GetJSON(Query)

            Query = "SELECT * FROM BursaryStudentsView WHERE Approved = 0"
            Bursaries = await this.generic.GetJSON(Query)
            console.log(Bursaries)
        }catch(err){

        }finally{
            res.render('Approvals',{
                title:"Approvals",
                Projects,
                Bursaries,
                user:req.session.userdata
            })
        }
        
    }

    Approve = async (req, res)=>{
        let data = req.body
        console.log(data)
        let Query
        if(data.object == "Project"){
            Query = `UPDATE Projects SET Approved = 1 WHERE ID = '${data.reference}'`
        }else if(data.object == "Bursary"){
            Query = `UPDATE BursaryStudents SET Approved = 1 WHERE ID = '${data.reference}'`
        }
        try{
            await this.generic.GetJSON(Query)
            res.json({
                "status":"success", 
                message:`${data.object} application file approved successfully!`
            })
        }catch(err){
            res.json({status:'error', message:err.message})
        }
    }

    Reject = async (req, res)=>{
        let data = req.body
        console.log(data)
        let Query
        if(data.object == "Project"){
            Query = `UPDATE Projects SET Approved = 2, RejectionReason = '${data.rejection}' WHERE FileRefNo = '${data.reference}'`
        }
        try{
            await this.generic.GetJSON(Query)
            res.json({
                "status":"success", 
                message:`${data.object} application file rejected successfully!`
            })
        }catch(err){
            res.json({status:'error', message:err.message})
        }
    }
}