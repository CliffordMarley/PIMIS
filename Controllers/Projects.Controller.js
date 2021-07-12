const ProjectsModel = require("../Models/Project.Model")
const DistrictsModel = require("../Models/District.Model")
const SectorsModel = require("../Models/Sector.Model")
const uuid = require("uuid")
const fs = require("fs")
const path = require("path")
module.exports = class{

    constructor(){
        this.projectsmodel = new ProjectsModel()
        this.districtmodel = new DistrictsModel()
        this.sector = new SectorsModel()
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
                projects,
                alert:req.session.messageBody
            })
        }
    }

    RenderProjectsCreate = async (req, res)=>{
        let districts = []
        let sectors = []
        try{
            console.log('Rendering New Project Page...')
            districts = await this.districtmodel.GetDistricts()
            sectors = await this.sector.GetSectors()
            //console.log(dis)
        }catch(err){
            console.log(err)
        }finally{
            res.render('project-create',{
                title:"Create Project",
                districts,
                sectors,
                alert:req.session.messageBody
            })
        }
    }

    RenderProjectViewPage = async (req, res)=>{
        let FileRefNo = req.query.FileRefNo
        console.log(FileRefNo)
        let project = null

        try{
            project = await this.projectsmodel.GetOneSocialProjects(FileRefNo)
            //console.log('The Project :',project)
        }catch(err){
            console.log(err)
            req.session.messageBody = {
                "status":"danger",
                "message":err.message
            }
        }finally{
            res.render('project-view',{
                title:'Project View',
                project,
                alert:req.session.messageBody
            })
        }
    }

    CreateAction = async (req, res)=>{
        let data = req.body
        try{
            
            console.log(data)
            let message = this.projectsmodel.CreateProject(data)
            req.session.messageBody = {
                "status":"success",
                "message":message
            }
        }catch(err){
            req.session.messageBody = {
                "status":"danger",
                "message":err.message
            }
        }finally{
            res.redirect('/project-view?FileRefNo='+data.FileRefNo)
        }
    }

    UploadProjectAttachements = async (req, res)=>{
        let FileRefNo = req.body.FileRefNo

        const files = req.files
        console.log(files.project_attachement)
        const fileExt = files.project_attachement.name.split(".")
        const fileName = uuid.v4()+"."+fileExt[(fileExt.length - 1)]
        const fileURL = path.join(__dirname,'../Public/uploads/'+fileName)
        console.log(fileURL)

        try{
            files.project_attachement.mv(fileURL, err=>{
                if(err){
                    req.session.messageBody = {
                        status:'danger',
                         message:err.message
                     }
                }else{
                    let dataPayload, message
                    if(req.body.attachement_position){
                        dataPayload = {
                            FileRefNo,
                            fileName,
                            "attachement_position":req.body.attachement_position
                        }
                        message = this.projectsmodel.AddAttachment(dataPayload)
                    }else{
                        message = "Could not save attachement!"
                    }
                    req.session.messageBody = {
                        status:'success',
                        message:message
                    }
                }
            })
            
        }catch(err){
            req.session.messageBody({
               status:'danger',
                message:err.message
            })
        }finally{
            res.redirect('/project-view?FileRefNo='+FileRefNo)
        }
    }

    
}