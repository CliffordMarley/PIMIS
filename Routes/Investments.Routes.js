const InvestmentsController = require("../Controllers/Investments.Controller")
module.exports = (router,auth)=>{

    router.get('/commercial-investments', new InvestmentsController().RenderInvestmentsPage)
    router.get('/view-investment', new InvestmentsController().ViewInvestment)
    router.get('/view-dividend', new InvestmentsController().ViewDividend)
    router.get('/view-performance', new InvestmentsController().ViewPerformance)
    router.get('/create-investment', new InvestmentsController().RenderCreateInvestment)
    router.post('/investments', new InvestmentsController().CreateAction)
    router.post('/investments/performance', new InvestmentsController().UpdatePerformance)
    router.post('/update-dividends', new InvestmentsController().UpdateDividends)

    router.get('/update-investment-performance', new InvestmentsController().RenderPerformanceUpdateView)
    router.get('/investments/performance/updatestatus/:status/:object_id', new InvestmentsController().UpdatePerformanceStatus)

    router.get('/update-dividends', new InvestmentsController().RenderUpdateDividendsPage)
    router.get('/view-dividend', new InvestmentsController().ViewDividend)
    return router
}