
// Importa Setting Controller
const SettingsController = require('./../Controllers/Settings.Controller')

module.exports = (router,sm)=>{
    router.get('/global-settings', sm.validatePage, new SettingsController().RenderGlobalSettingsPage)
    
    return router
}