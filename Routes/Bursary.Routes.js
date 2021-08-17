const BusariesController = require('../Controllers/Busaries.Controller')
module.exports = (router, auth)=>{

    router.get('/Busaries', new BusariesController().RenderBusariesPage)
    router.get('/BusariesList', new BusariesController().RenderBusariesList)

    router.get('/RegisterBusary', new BusariesController().RenderNewBusaryPage)

    router.get("/ViewBusary", new BusariesController().RenderViewBursaryPage)

    router.post("/save-bursary", new BusariesController().SaveBusary)

    router.get("/update-bursary", new BusariesController().RenderBursaryUpdatePage)

    router.post('/update-Bursary', new BusariesController().UpdateBursary)

    return router
}