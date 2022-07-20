const ReportsController = require("../Controllers/Reports.Controller")
module.exports = (router, sm)=>{

    router.get('/Reports',sm.validatePage, new ReportsController().RenderReportsPage)

    router.get('/ViewReports',sm.validatePage, new ReportsController().ViewReport)
    router.get('/Reports/fetch/:reports_id',sm.validatePage, new ReportsController().FetchReport)

    return router
}