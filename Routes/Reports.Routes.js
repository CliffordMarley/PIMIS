const ReportsController = require("../Controllers/Reports.Controller")
module.exports = (router, sm)=>{

    //router.get('/Reports',sm.validatePage, new ReportsController().RenderReportsPage)
    router.get('/BursaryMasterReport', sm.validatePage, new ReportsController().BursaryMasterReport)
    router.get('/ProjectsMasterReport', sm.validatePage, new ReportsController().ProjectsMasterReport)
    router.get('/InvestmentsMasterReport', sm.validatePage, new ReportsController().InvestmentsMasterReport)

    router.get('/ViewReports',sm.validatePage, new ReportsController().ViewReport)
    router.get('/Reports/fetch/:report_name',sm.validatePage, new ReportsController().FetchReport)
    router.get('/EducationSupport', new ReportsController().RenderEducationSupportReportPage);
    router.get('/api/v1/asyncschoolreport/:year/:class/:school/:scheme', new ReportsController().AsyncSchoolReport);
    router.get('/SchoolReports', sm.validatePage, new ReportsController().RenderSchoolReportsPage);
    router.get('/ViewStudentReport', sm.validatePage, new ReportsController().ViewStudentReport)
    router.get('/CreateNewStudentReport', sm.validatePage, new ReportsController().CreateNewStudentReport)
    router.post('/api/v1/saveStudentTermGradeReport', new ReportsController().SaveStudentTermGradeReport)
    return router
}
// sm.validatePage,