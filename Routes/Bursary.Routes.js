const BusariesController = require('../Controllers/Busaries.Controller')
module.exports = (router, sm)=>{

    router.get('/Busaries', sm.validatePage, new BusariesController().RenderBusariesList)
    router.get('/BusariesList',sm.validatePage, new BusariesController().RenderBusariesList)

    router.get('/RegisterBusary',sm.validatePage, new BusariesController().RenderNewBusaryPage)

    router.get("/ViewBusary",sm.validatePage, new BusariesController().RenderViewBursaryPage)

    router.post("/save-bursary", new BusariesController().SaveBusary)

    router.get("/update-bursary",sm.validatePage, new BusariesController().RenderBursaryUpdatePage)

    router.post('/update-Bursary', new BusariesController().UpdateBursary)

    return router
}