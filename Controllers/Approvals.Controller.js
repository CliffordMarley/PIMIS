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
            let Query = "SELECT ROW_NUMBER() OVER (ORDER BY P.ApplicantName) AS RowIndex, *,P.ID AS PID FROM Projects P JOIN Districts D ON D.ID = P.District JOIN ProjectSectors PS ON PS.ID = P.FundingSector WHERE Approved = 0 ORDER BY P.ApplicantName ASC"
            Projects = await this.generic.GetJSON(Query)

            Query = "SELECT ROW_NUMBER() OVER (ORDER BY b.ID) AS RowIndex, b.ID, b.StudentName, g.Gender, ss.SecondarySchool,bs.BursaryStatus AS Status, d.DistrictName AS District , sc.SchemeName AS Scheme FROM BursaryStudents b JOIN Gender g ON g.ID = b.Gender JOIN SecondarySchools ss ON ss.ID = b.SecondarySchoolId LEFT JOIN Schemes sc ON sc.ID = b.SchemeId LEFT JOIN Districts d ON d.ID = b.District LEFT JOIN BursaryStatus bs ON bs.ID = b.Status WHERE b.Approved = 0 ORDER BY b.ID ASC"
            Bursaries = await this.generic.GetJSON(Query)
          
        }catch(err){
            console.log(err)
        }finally{
            res.render('ApprovalsAlt',{
                title:"Awaiting Approvals",
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
            Query = `UPDATE Projects SET Approved = 2, RejectionReason = '${data.justification}' WHERE ID = '${data.reference}'`
        }
        if(data.object == 'Bursary'){
            Query = `UPDATE BursaryStudents SET Approved = 2 WHERE ID = '${data.reference}'`
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

    CountUnApprovedProjects = async (req, res)=>{
        let unApprovedCount = 0
        try{
            let unapprovedProjectsQuery = "SELECT COUNT(*) AS projectsCount FROM Projects WHERE Approved = 0"
            let unApprovedBursariesQuery = "SELECT COUNT(*) AS bursariesCount FROM BursaryStudents WHERE Approved = 0"
            const unApprovedProjects = await this.generic.GetJSON(unapprovedProjectsQuery)
            const unApprovedBursary = await this.generic.GetJSON(unApprovedBursariesQuery)
            unApprovedCount += unApprovedProjects[0].projectsCount
            unApprovedCount += unApprovedBursary[0].bursariesCount

            res.json({
                status:"success",
                data:{
                    unApprovedCount
                }
            })
        }catch(err){
            res.json({
                status:'error',
                message: err.message
            })
        }
    }
}