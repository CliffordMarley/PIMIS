const GenericModel  = require("../Models/Generic.Model")
const html_tablify = require('html-tablify');
const currency = require('currency-formatter')
const SecondarySchoolModel = require("../Models/School.Model");
const BusariesModel = require("../Models/Busary.Model");
const DistrictModel = require("../Models/District.Model");
const { filter } = require("compression");

module.exports = class {
	constructor() {
		this.schoolmodel = new SecondarySchoolModel();
		this.busarymodel = new BusariesModel();
		this.districtmodel = new DistrictModel();
        this.generic = new GenericModel()
    }

    RenderEducationSupportReportPage = async (req, res) => {
        let SecondarySchools, Schemes = []
        try{
          SecondarySchools = await this.schoolmodel.GetSchools()
          Schemes = await this.busarymodel.GetSchemes();
          
        }catch(err){
            console.log(err)
        }finally{
            res.render('EducationSupport', {
                title: 'Student Annual Avg Reports',
                user:req.session.userdata,
                SecondarySchools,
                Schemes
            })
        }
    }
    RenderSchoolReportsPage = async (req, res) => {
        let SID = req.query.sid;
		let ApprovalStatus = req.query.approved;
		let SchemeId = req.query.scheme;
        let studentName = req.query.studenName;

		let alert;
		let SecondarySchools,
			Schemes,
			BusariesList = [];
		try {
			if (ApprovalStatus == "any") {
				ApprovalStatus = null;
			}
			BusariesList = await this.busarymodel.GetBusariesList(
				SID,
				ApprovalStatus,
                studentName
			);

			console.log(BusariesList[0])

			SecondarySchools = await this.schoolmodel.GetSchools();
			//console.log(SecondarySchools);
			Schemes = await this.busarymodel.GetSchemes();

			//If SID is not undefined, filter rows where SID is equal to SecondarySchoolId
			if (SID && SID != "" && SID != null && SID != undefined) {
				BusariesList = BusariesList.filter(row => row.SecondarySchoolId == SID);
			}
			//Filter rows by SchemeId if not numm, empty or undefined
			if (
				SchemeId &&
				SchemeId != "" &&
				SchemeId != null &&
				SchemeId != undefined
			) {
				BusariesList = BusariesList.filter(row => row.SchemeName == SchemeId);
				// set selcted scheme if SchemeId is equal to SchemeName
				Schemes.forEach(row => {
					if (row.SchemeName == SchemeId) {
						row.selected = "selected";
					}
				});
			}
			//Make selected SecondarySchoolId as selected in dropdown
			if (SID && SID != "" && SID != null && SID != undefined) {
				//console.log("SID is %s", SID);
				for (let i = 0; i < SecondarySchools.length; i++) {
					if (SecondarySchools[i].ID[0] == SID) {
						SecondarySchools[i].selected = "selected";
						break;
					} else {
						SecondarySchools[i].selected = "";
					}
				}
			}
		} catch (err) {
			console.log(err.message);
			alert = {
				status: "danger",
				message: err.message,
			};
		} finally {
			if (req.session.messageBody != null) {
				alert = req.session.messageBody;
			}
			res.render("SchoolReports", {
				title: "School Reports",
				BusariesList,
				SecondarySchools,
				ApprovalStatus,
				resultCount: BusariesList.length,
				Schemes,
				alert,
                studentName,
				user: req.session.userdata,
			});
			req.session.messageBody = null;
		}
    }
    ViewStudentReport = async (req, res) => {
        const filters = req.query;
        let alert;
        let Reports, Student;
        
        try {
            console.log(filters)
            //Create Query
            let query = `SELECT g.*, s.StudentName, ss.SecondarySchool AS SchoolName, j.Subject FROM StudentTermGrades g JOIN BursaryStudents s ON s.ID = g.StudentId 
            JOIN SecondarySchools ss ON ss.ID = s.SecondarySchoolId JOIN Subjects j ON j.ID = g.SubjectId WHERE g.StudentId = ${filters.sid} `;

            //Check if filters.year is not empty
            if (filters.year && filters.year != "") {
                query += ` AND g.Year = ${filters.year}`;
            }
            if(filters.term &&  filter.term != '' ){
                query += ` AND g.Term = ${filters.term}`;
            }
            //query += ` ORDER BY g.Year ASC, g.Term ASC, j.Subject DESC`;

            console.log(query)

            Reports = await this.generic.GetJSON(query);
            Reports = Reports.reverse()

            query = "SELECT s.ID, s.StudentName, s.Gender, ss.SecondarySchool AS SchoolName FROM BursaryStudents s JOIN SecondarySchools ss ON ss.ID = s.SecondarySchoolId WHERE s.ID = "+filters.sid;
            Student = await this.generic.GetJSON(query);
            Student = Student[0];
            console.log(Student)
        }catch(err){
            console.log(err.message)
        }finally{
            res.render('ViewStudentReport', {
                title: `Student School Report`,
                user:req.session.userdata,
                Reports,
                Student
            })
        }
    }   

    AsyncSchoolReport = async (req, res) => {
        try{
            const query = req.params
            console.log(query)

            let Query = `SELECT StudentId, StudentName,COALESCE(SchemeName, 'N/A') as Scheme, COALESCE(SchemeTypeName, 'N/A')as SchemeType, CAST( [1] AS DECIMAL(10,2)) as [1] ,CAST( [2] AS DECIMAL(10,2)) as [2],CAST( [3] AS DECIMAL(10,2)) as [3]  
            FROM (Select [StudentId], [StudentName],[Term], [Grade], sc.SchemeName, sct.SchemeTypeName
            FROM [dbo].[StudentTermGrades] as g 
            inner join BursaryStudents as s on s.id = g.StudentId 
            left join Schemes as sc on sc.id = s.schemeid 
            left join schemetypes as sct on sct.id = sc.schemetypeid where g.class = ${query.class} AND g.year = ${query.year})t  Pivot(AVG([Grade])FOR term IN ([1],[2],[3] )  )AS pivot_table `

            //console.log(Query)
            let report = await this.generic.GetJSON(Query)
            if(query.scheme != 'all'){
                report = report.filter(item=>item.Scheme = query.scheme)
            }
            console.log(report[0])
            res.json({
                status:'success',
                message:report.length+' Results Found',
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
            //console.log(Reports)
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
        const report_name = req.params.report_name
        console.log(report_name)
        try{
            let QueryString = ""
            if(report_name == 'BursaryMasterReport'){
                QueryString = `SELECT 
                V.StudentID, V.DistrictName, V.SecondarySchool, V.StudentName, V.Cohort, V.CurrentClass, V.CurrentFees, V.NumberOfWarnings, V.ReimbursementAmount, V.Tertiary, V.WorkDetails, V.BursaryStatus, V.Gender, V.SchemeName, V.SchemeTypeName, 
                AVG(CASE WHEN grades.Term = 1 THEN grades.Grade END) as Term1,
                AVG(CASE WHEN grades.Term = 2 THEN grades.Grade END) as Term2,
                AVG(CASE WHEN grades.Term = 3 THEN grades.Grade END) as Term3
            FROM StudentTermGrades grades
            JOIN vw_students V ON grades.ID = V.StudentID 
            JOIN Classes ON Classes.Class  = V.CurrentClass 
            GROUP BY V.StudentID, grades.Year, V.DistrictName, V.SecondarySchool, V.StudentName, V.Cohort, V.CurrentClass, V.CurrentFees, V.NumberOfWarnings, V.ReimbursementAmount, V.Tertiary, V.WorkDetails, V.BursaryStatus, V.Gender, V.SchemeName, V.SchemeTypeName`
            
            }else if(report_name == 'ProjectsMasterReport'){
                QueryString = "SELECT * from ProjectsView"
            }else if(report_name == 'InvestmentsMasterReport'){
                QueryString = "SELECT * from InvestView"
            }else{
                throw "Unidentified report name provided!"
            }
            console.log('Query Selected: %s', QueryString)

            Report = await this.generic.GetJSON(QueryString)
            console.log(Report[0])
            let Keys = Object.keys(Report[0])
            Report = {
                'keys':Keys,
                'data':Report
            }
            //console.log(Report.keys)

            
            res.json({
                status:'success',
                message:'Report Fetched',
                Report
            })
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

    CreateNewStudentReport = async (req, res)=>{
        let Student,Subjects
        try{
            const query = req.query

            if(query.sid && query.sid != ''){
                //Get Student Details
                let Query = `SELECT s.ID, s.StudentName, s.Gender, ss.SecondarySchool AS SchoolName FROM BursaryStudents s JOIN SecondarySchools ss ON ss.ID = s.SecondarySchoolId WHERE s.ID = ${query.sid} `
                Student = await this.generic.GetJSON(Query)

                //Get Subjects
                Query = "SELECT * FROM Subjects"
                Subjects = await this.generic.GetJSON(Query)
                console.log(Subjects[0])

            }else{
                // Redirect to Student Report Page with error message
                res.redirect('/reports/student')
            }
        }catch(err){
            console.log(err.message)
        }finally{
            res.render('CreateNewStudentReport', {
                title:'Create New Report',
                user:req.session.userdata,
                Student:Student[0],
                Subjects
            })
        }
        
    }

    SaveStudentTermGradeReport = async (req, res)=>{

        let data = req.body
        console.log(data.grades[0])
        let grades = data.grades
        try{
            // Loop though all the grades and push key and value into an object as subject and grade
            let Query = `INSERT INTO StudentTermGrades (StudentId, Term, Grade, Class, SubjectId, Year) VALUES `

         
            for(let key in grades){
                let thisGrade = (grades[key].value == '') ? null : grades[key].value

                Query += `(${data.sid}, ${data.term}, ${thisGrade}, ${data.form}, ${grades[key].name}, ${data.year})`
                if(key < grades.length -1){
                    Query += `,`
                }

            }
            console.log(Query)
            await this.generic.Execute(Query)
            res.json({
                status:'success',
                message:'Report Saved Succesfully!'
            })
        }catch(err){
            console.log(err.message)
            res.json({
                status:'error',
                message:err.message
            })
        }
    }

    BursaryMasterReport = async (req, res)=>{
        const Report = []
        try{
            
        }catch(err){
            console.log(err)
        }finally{
            res.render('BursaryMasterReport',{
                title:'Bursary Master Report',
                partial:'Reports',
                user:req.session.userdata
            })
        }
    }
    ProjectsMasterReport = async (req, res)=>{
        const Report = []
        try{
            
        }catch(err){
            console.log(err)
        }finally{
            res.render('ProjectsMasterReport',{
                title:'Projects Master Report',
                partial:'Reports',
                user:req.session.userdata
            })
        }
    }
    InvestmentsMasterReport = async (req, res)=>{
        const Report = []
        try{
            
        }catch(err){
            console.log(err)
        }finally{
            res.render('InvestmentsMasterReport',{
                title:'Investments Master Report',
                partial:'Reports',
                user:req.session.userdata
            })
        }
    }
}