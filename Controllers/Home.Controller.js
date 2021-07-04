
module.exports = class{

    constructor(){

    }

    RenderHomePage = (req, res)=>{
        res.render('dashboard',{
            title:"Dashboard"
        })
    }

}