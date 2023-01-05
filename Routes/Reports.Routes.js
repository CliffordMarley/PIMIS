const ReportsController = require("../Controllers/Reports.Controller")
module.exports = (router, sm)=>{

    router.get('/Reports',sm.validatePage, new ReportsController().RenderReportsPage)

    router.get('/ViewReports',sm.validatePage, new ReportsController().ViewReport)
    router.get('/Reports/fetch/:reports_id',sm.validatePage, new ReportsController().FetchReport)
    router.get('/EducationSupport', new ReportsController().RenderEducationSupportReportPage);
    router.get('/api/v1/asyncschoolreport/:year/:class/:school/:scheme', new ReportsController().AsyncSchoolReport);
    router.get('/SchoolReports', sm.validatePage, new ReportsController().RenderSchoolReportsPage);
    router.get('/ViewStudentReport', sm.validatePage, new ReportsController().ViewStudentReport)
    router.get('/CreateNewStudentReport', sm.validatePage, new ReportsController().CreateNewStudentReport)
    router.post('/api/v1/saveStudentTermGradeReport', new ReportsController().SaveStudentTermGradeReport)
    return router
}
// sm.validatePage,