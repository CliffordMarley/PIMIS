const ProjectsModel = require("../Models/Project.Model")
const DistrictsModel = require("../Models/District.Model")
const GenericModel  = require("../Models/Generic.Model")

const SectorsModel = require("../Models/Sector.Model")
const uuid = require("uuid")
const fs = require("fs")
const path = require("path")
module.exports = class{

    constructor(){
        this.projectsmodel = new ProjectsModel()
        this.districtmodel = new DistrictsModel()
        this.sector = new SectorsModel()
        this.generic = new GenericModel()

    }

    RenderProjectsList = async (req, res)=>{
        let projects
        try{
            projects = await this.projectsmodel.GetSocialProjects({})
            console.log(projects[0])
        }catch(err){

        }finally{
            res.render('projects-list',{
                title:"Social Projects",
                projects,
                alert:req.session.messageBody,
                user:req.session.userdata
            })
            req.session.messageBody = null
        }
    }

    RenderRejectedProjects = async (req, res)=>{
        let RejectedProjects = []
        try{
            RejectedProjects = await this.generic.GetJSON("select FileRefNo,ApplicantName as ProjectName,ProjectDescription,AmountRequested,Sector, RejectionReason from projects p JOIN ProjectSectors s ON p.FundingSector = s.ID")
            console.log(RejectedProjects)
        }catch(err){
            console.log(err)
        }finally{
            res.render('RejectedProjects',{
                title:"Rejected Projects",
                RejectedProjects,
                alert:req.session.messageBody,
                user:req.session.userdata
            })
            req.session.messageBody = null
        }
    }
    RenderProjectsCreate = async (req, res)=>{
        let districts = []
        let sectors = []
        let ProjectStatus = []
        try{
            console.log('Rendering New Project Page...')
            districts = await this.districtmodel.GetDistricts()
            sectors = await this.sector.GetSectors()
            //console.log(dis)
            ProjectStatus = await this.generic.GetJSON(`SELECT * FROM ProjectStatus`)

        }catch(err){
            console.log(err)
        }finally{
            res.render('project-create',{
                title:"Create Project",
                districts,
                sectors,
                ProjectStatus,
                alert:req.session.messageBody,
                user:req.session.userdata
            })
        }
    }

    RenderProjectsUpdate = async (req, res)=>{
        let FileRefNo = req.query.FileRefNo
        console.log(FileRefNo)
        let project,sectors,districts
        let ProjectStatus = []
        try{
            project = await this.projectsmodel.GetOneSocialProjects(FileRefNo)
            districts = await this.districtmodel.GetDistricts()
            sectors = await this.sector.GetSectors()

            ProjectStatus = await this.generic.GetJSON(`SELECT * FROM ProjectStatus`)
            //Find Project Status
            ProjectStatus.forEach(element => {
                if(element.ProjectStatus == project.ProjectStatus){
                    element.selected = "selected"
                }
            })
            console.log(project)
        }catch(err){
            console.log(err)
            req.session.messageBody = {
                "status":"danger",
                "message":err.message
            }
        }finally{
            res.render('project-edit',{
                title:'Project Update',
                project,
                districts,
                sectors,
                ProjectStatus,
                alert:req.session.messageBody,
                user:req.session.userdata
            })
        }
    }

    RenderProjectViewPage = async (req, res)=>{
        let FileRefNo = req.query.FileRefNo;//.replace(/ /g, '')
        console.log(FileRefNo)
        let project = null
        const calculations = {}

        try{
            project = await this.projectsmodel.GetOneSocialProjects(FileRefNo)
           // console.log('The Project :',project)
            calculations.percentageApproved = Math.round((parseFloat(project.FundsApproved) * 100) / parseFloat(project.AmountRequested))
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
                calculations,
                alert:req.session.messageBody,
                user:req.session.userdata
            })
            req.session.messageBody = null
        }
    }

    CreateAction = async (req, res)=>{
        let data = req.body
        try{
            
            console.log(data)
            let message = this.projectsmodel.CreateProject(data)
            req.session.messageBody = {
                "status":"success",
                "message":"Project craeted successfully and Pending Approval!"
            }
        }catch(err){
            req.session.messageBody = {
                "status":"danger",
                "message":err.message
            }
        }finally{
            res.redirect('/project-list')
        }
    }

    UpdateProject = async (req, res)=>{
        const data = req.body
        let message,status
        try{
            message = await this.projectsmodel.UpdateProject(data)
            status = 'success'
        }catch(err){
            message = err.message
            status = "danger"
        }finally{
            req.session.messageBody = {
                status,message
            }
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
            files.project_attachement.mv(fileURL, async err=>{
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
                        console.log(dataPayload)
                        message =await this.projectsmodel.AddAttachment(dataPayload)
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
            console.log(err)
            req.session.messageBody({
               status:'danger',
                message:err.message
            })
        }finally{
            res.redirect('/project-view?FileRefNo='+FileRefNo)
        }
    }

    
}