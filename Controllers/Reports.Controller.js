const GenericModel  = require("../Models/Generic.Model")
const html_tablify = require('html-tablify');
module.exports = class{

    constructor(){
        this.generic = new GenericModel()
    }

    RenderReportsPage = async (req, res)=>{
        let Reports = []
        try{
            const Query = "SELECT * FROM Reports"
            Reports = await this.generic.GetJSON(Query)
            console.log(Reports)
        }catch(err){
            console.log(err)
        }finally{
            res.render("Reports",{
                title:"Reports",
                Reports,
                user:req.session.userdata
            })
        }
    }

    FetchReport = async (req, res)=>{
        let Report 
        console.log(req.params.reports_id)
        try{
            let Query = `SELECT * FROM Reports WHERE ID = '${req.params.reports_id}'`
        
            let GetQuery = await this.generic.GetJSON(Query)
            if(GetQuery[0].SQL != "" && GetQuery[0].SQL != null){
                Query = GetQuery[0].SQL
                console.log(Query)
                
                Report =  await this.generic.GetJSON(Query)
                
                let Keys = Object.keys(Report[0])
                Keys.forEach(element => {
                    element = element.toString()
                })

               Report = {
                    'keys':Keys,
                    'data':Report
               }

               res.json({
                    status:'success',
                    message:'Report Fetched',
                    Report
               })
            }else{
                res.json = {
                    status:"error",
                    message:"Report Query not found!"
                }
            }
        }catch(err){
            console.log(err)
            res.json({
                status:"error",
                message:err.message
            })
        }
    }

    ViewReport = async (req, res)=>{
        let ReportName = "NOT DEFINED"
        try{
            let Query = `SELECT * FROM Reports WHERE ID = '${req.query.reports_id}'`
        
            let GetQuery = await this.generic.GetJSON(Query)
            ReportName = GetQuery[0].ReportName.toUpperCase()
           
        }catch(err){
            console.log(err)
        }finally{
            res.render('ViewReport',{
                title:"View Reports",
                ReportName,
                user:req.session.userdata
            })
        }
    }

    CreateTable = (Report)=>{

        var col = [];
        for (var i = 0; i < Report.length; i++) {
            for (var key in Report[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        } 
        console.log(col)
        var options = {
            data: Report,
            header:col
        }
        var html_data = html_tablify.tablify(options);
        //console.log(html_data);


        return html_data;
    }
}