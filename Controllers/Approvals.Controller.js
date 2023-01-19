const GenericModel  = require("../Models/Generic.Model")

module.exports = class{

    constructor(){
        this.generic = new GenericModel()
    }

    BulkApproval = async (req, res)=>{
       
        try{
            const data = req.body
            let SQL = ""
            if(data.Ids.length == 0){
                res.json({
                    status:'error',
                    message:'Cannot process an empty list, Please make sure you have selected at least one record!'
                })
                return
            }
            if(req.params.entity == 'projects'){
                let Ids = data.Ids
                // Create query to update all projects with Ids in Ids array to Approved = 1
                SQL = `UPDATE Projects SET Approved = ${req.params.status} WHERE Id IN (${Ids.join(',')})`
                
            }else if (req.params.entity == 'bursaries'){
                let Ids = data.Ids
                // Create query to update all bursaries with Ids in Ids array to Approved = 1
                SQL = `UPDATE BursaryStudents SET Approved = ${req.params.status} WHERE Id IN (${Ids.join(',')})`
            }else if(req.params.entity == 'investments'){
                let Ids = data.Ids
                // Create query to update all investments with Ids in Ids array to Approved = 1
                SQL = `UPDATE Investments SET Approved = ${req.params.status} WHERE Id IN (${Ids.join(',')})`
                if(req.params.status == 2){
                    SQL = `UPDATE Investments SET Approved = ${req.params.status}, RejectionReason = '${data.justification}' WHERE Id IN (${Ids.join(',')})` 
                }
            }
            let runQuery = await this.generic.Execute(SQL)
            if(runQuery == 'OK'){
                res.json({
                    status:'success',	
                    message:'Bulk approval of '+req.params.entity+' was successful!'
                })
            }else{
                res.json({
                    'status':'error',	
                    message:'Failed to approve selected '+req.params.entity+'!'
                })
            }

        }catch(err){
            res.json({
                status:'error',
                message:err.message
            })
        }
    }
    RenderApprovalsPage = async (req, res)=>{
        let Projects = []
        let Bursaries = []
        let Investments = []
        try{
            let Query = "SELECT *,P.ID AS PID FROM Projects P JOIN Districts D ON D.ID = P.District JOIN ProjectSectors PS ON PS.ID = P.FundingSector WHERE Approved = 0 AND ApplicationStatus = 1"
            Projects = await this.generic.GetJSON(Query)

            Query = "SELECT * FROM BursaryStudentsView WHERE Approved = 0"
            Bursaries = await this.generic.GetJSON(Query)
            console.log(Projects)
            console.log('Bursaries Printed')
        }catch(err){
            console.log(err)
        }finally{
            res.render('ApprovalsAlt',{
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