const ReportsController = require("../Controllers/Reports.Controller")
module.exports = router=>{

    router.get('/Reports', new ReportsController().RenderReportsPage)

    router.get('/ViewReports', new ReportsController().FetchReport)

    return router
}