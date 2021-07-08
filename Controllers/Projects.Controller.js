const ProjectsModel = require("../Models/Project.Model")

module.exports = class{

    constructor(){
        this.projectsmodel = new ProjectsModel()
    }
    RenderProjectsList = async (req, res)=>{
        let projects
        try{
            projects = await this.projectsmodel.GetSocialProjects({})
            //console.log(projects)
        }catch(err){

        }finally{
            res.render('projects-list',{
                title:"Projects",
                projects
            })
        }
    }

    RenderProjectsCreate = (req, res)=>{
        try{
            console.log('Rendering New Project Page...')
        }catch(err){
            console.log(err)
        }finally{
            res.render('project-create',{
                title:"Create Project"
            })
        }
    }

    
}