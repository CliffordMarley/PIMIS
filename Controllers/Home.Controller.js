const ProjectsModel = require("../Models/Project.Model")
const GenericModel = require("../Models/Generic.Model")
module.exports = class{

    constructor(){
        this.projectsmodel = new ProjectsModel()
        this.generic = new GenericModel()
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
                value_of_commercial_projects,
            }
        }catch(err){
            //console.log(err)
        }finally{
            console.log(stats)
            res.render('dashboard',{
                title:"Dashboard",
                stats,
                user:req.session.userdata
            })
        }
        
    }

    GetStatistics = async (req, res)=>{
        let status, message, data, PBS, IBS

        let Query = `select b.ID,Sector,sum(FundsDisbursed) as Number from Projects a
        inner join ProjectSectors b on a.fundingsector=b.ID
        WHERE a.Approved = 1
        group by b.ID,Sector
        order by b.ID`
        let Query2 = `select b.ID,b.Sector,sum(CurrentValuation) as Number from InvestmentsView a
        inner join InvestmentSectors b on a.sectorid=b.ID
        group by b.ID,b.Sector
        order by b.ID`
        try{
            PBS = await this.generic.GetJSON(Query)
            IBS = await this.generic.GetJSON(Query2)

            status = "success"
            message = "Stats collected successfully!"

            data = {
                PBS,
                IBS
            }
        }catch(err){
            status = "error"
            message = err.message
        }finally{
            res.json({status,message, data})
        }
    }


}