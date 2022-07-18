
const SecondarySchoolModel = require("../Models/School.Model")
const DistrictModel = require("../Models/District.Model")
module.exports = class{

    constructor(){
        this.schoolmodel = new SecondarySchoolModel()
        this.districtmodel = new DistrictModel()
    }

    RenderGlobalSettingsPage = async(req, res)=>{

        try{
            let SecondarySchools = await this.schoolmodel.GetSchools()
            let Districts = await this.districtmodel.GetDistricts()
             SecondarySchools.forEach(school => {
                for(let i = 0; i < Districts.length; i++){
                    if(Districts[i].ID == school.District){
                        school.District = Districts[i].DistrictName
                        break;
                    }
                }
             });
            res.render('global-settings',{
                title:"Global Settings",	
                user:req.session.userdata,
                SecondarySchools
            })
        }catch(err){
            console.log(err)
        }
    }

}