const GenericModel  = require("../Models/Generic.Model")
const html_tablify = require('html-tablify');
const currency = require('currency-formatter')
module.exports = class{

    constructor(){
        this.generic = new GenericModel()
    }

    RenderSchoolReportsPage = async (req, res) => {
        try{
          
        }catch(err){

        }finally{
            res.render('SchoolReports', {
                title: 'School Reports',
                user:req.session.userdata
            })
        }
    }

    AsyncSchoolReport = async (req, res) => {
        try{
            const query = req.query
            console.log(query)

            let Query = `SELECT StudentId, StudentName,COALESCE(SchemeName, 'N/A') as Scheme, COALESCE(SchemeTypeName, 'N/A')as SchemeType, CAST( [1] AS DECIMAL(10,2)) as [1] ,CAST( [2] AS DECIMAL(10,2)) as [2],CAST( [3] AS DECIMAL(10,2)) as [3]  
            FROM (Select [StudentId], [StudentName],[Term], [Grade], sc.SchemeName, sct.SchemeTypeName
            FROM [dbo].[StudentTermGrades] as g 
            inner join BursaryStudents as s on s.id = g.StudentId 
            left join Schemes as sc on sc.id = s.schemeid 
            left join schemetypes as sct on sct.id = sc.schemetypeid where class = ${query.class} AND year = ${query.year})t  Pivot(AVG([Grade])FOR term IN ([1],[2],[3] )  )AS pivot_table`

            console.log(Query)
            const report = await this.generic.GetJSON(Query)

            res.json({
                status:'success',
                data:report
            })
        }catch(err){
            res.json({
                status: "success",
                message: err.message
            })
        }
    }

    RenderReportsPage = async (req, res)=>{
        let Reports = []
        try{
            const Query = "SELECT * FROM Reports ORDER BY ReportName ASC"
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

                // Find every key in Reports that contains the word amount non case sensitive
                let AmountKeys = Keys.filter(key => key.toLowerCase().includes("amount"))
                // For every row which has a key that contains the word amount, format value to currency
                Report.forEach(row => {
                    AmountKeys.forEach(key => {
                        row[key] = currency.format(row[key], { code: 'MWK' })
                    })
                    console.log(row)
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