
const SecondarySchoolModel = require("../Models/School.Model")
const DistrictModel = require("../Models/District.Model")
module.exports = class{

    constructor(){
        this.schoolmodel = new SecondarySchoolModel()
        this.districtmodel = new DistrictModel()
    }

    RenderGlobalSettingsPage = async(req, res)=>{

        try{
            res.render('global-settings',{
                title:"Global Settings",	
                user:req.session.userdata
            })
        }catch(err){
            console.log(err)
        }
    }

}