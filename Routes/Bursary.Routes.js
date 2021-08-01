const BusariesController = require('../Controllers/Busaries.Controller')
module.exports = (router, auth)=>{

    router.get('/Busaries', new BusariesController().RenderBusariesPage)
    router.get('/BusariesList', new BusariesController().RenderBusariesList)

    router.get('/RegisterBusary', new BusariesController().RenderNewBusaryPage)

    router.get("/ViewBursary", new BusariesController().RenderViewBursaryPage)

    router.post("/save-bursary", new BusariesController().SaveBusary)

    return router
}