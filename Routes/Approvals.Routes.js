const ApprovalsController = require("../Controllers/Approvals.Controller")
module.exports = router=>{

    router.get('/approvals', new ApprovalsController().RenderApprovalsPage)
    
    router.put('/approve', new ApprovalsController().Approve)

    router.put("/reject", new ApprovalsController().Reject)

    return router
}