const ProjectsModel = require("../Models/Project.Model")
module.exports = class{

    constructor(){
        this.projectsmodel = new ProjectsModel()
    }

    RenderHomePage = async (req, res)=>{
        let stats = null
        let projects = await this.projectsmodel.GetSocialProjects({})
        let investments = await this.projectsmodel.GetCommercialProjects({})
        let value_of_social_projects = await this.projectsmodel.GetSocialProjectsValue()
        let value_of_commercial_projects = await this.projectsmodel.GetCommercialProjectsValue()
        try{
            stats = {
                "projectCount":projects.filter(record=>record.ApplicationStatus == 3 && record.Approved == 1).length,
                "investmentsCount":investments.length,
                value_of_social_projects,
                value_of_commercial_projects
            }
        }catch(err){
            //console.log(err)
        }finally{
            console.log(stats)
            res.render('dashboard',{
                title:"Dashboard",
                stats
            })
        }
        
    }

}