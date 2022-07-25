const ApprovalsController = require("../Controllers/Approvals.Controller")
module.exports = (router, sm)=>{

    router.get('/approvals', sm.validatePage, new ApprovalsController().RenderApprovalsPage)

    router.post('/api/v1/approvals/bulk/:entity/:status', sm.validatePage, new ApprovalsController().BulkApproval)
    

    
    router.put('/approve', new ApprovalsController().Approve)

    router.put("/reject", new ApprovalsController().Reject)

    return router
}