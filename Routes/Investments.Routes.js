const InvestmentsController = require("../Controllers/Investments.Controller")
module.exports = (router,sm)=>{

    router.get('/commercial-investments',sm.validatePage, new InvestmentsController().RenderInvestmentsPage)
    router.get('/view-investment',sm.validatePage, new InvestmentsController().ViewInvestment)
    router.get('/view-dividend',sm.validatePage, new InvestmentsController().ViewDividend)
    router.get('/view-performance',sm.validatePage, new InvestmentsController().ViewPerformance)
    router.get('/create-investment',sm.validatePage, new InvestmentsController().RenderCreateInvestment)
    router.post('/investments', new InvestmentsController().CreateAction)
    router.post('/investments/performance', new InvestmentsController().UpdatePerformance)
    router.post('/update-dividends', new InvestmentsController().UpdateDividends)

    router.get('/update-investment-performance',sm.validatePage, new InvestmentsController().RenderPerformanceUpdateView)
    router.get('/investments/performance/updatestatus/:status/:object_id', new InvestmentsController().UpdatePerformanceStatus)

    router.get('/update-dividends',sm.validatePage, new InvestmentsController().RenderUpdateDividendsPage)
    router.get('/view-dividend',sm.validatePage, new InvestmentsController().ViewDividend)
    return router
}