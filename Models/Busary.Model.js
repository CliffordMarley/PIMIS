
const Client = require("../Config/Database")

module.exports = class{
    constructor(){
        this.client = new Client()
    }

    GetBusariesList = (sid, ApprovalStatus)=>{
        console.log("SID is %s", sid)
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                let Query = `SELECT * FROM BursaryStudentsView `
                if(sid && sid != null && sid != '' && sid != typeof undefined){
                    Query += ` WHERE SecondarySchoolId = '${sid}' `
                }
                if(ApprovalStatus && ApprovalStatus != null && ApprovalStatus != '' && ApprovalStatus != typeof undefined){
                   if(sid && sid != null && sid != '' && sid != typeof undefined){
                    Query += `AND Approved = ${ApprovalStatus} `
                   }else{
                    Query += `WHERE Approved = ${ApprovalStatus}`
                   }
                }
                console.log(Query)
                let results = await conn.request().query(Query)
                console.log("Found %s results!",results.recordset.length)
                resolve(results.recordset)
            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    }

    GetBusaryStatus = ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `SELECT * FROM BursaryStatus`
                let results = await conn.request().query(Query)
                resolve(results.recordset)
            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    }

    GetNotificationStatus = ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `SELECT * FROM NotificationStatus`
                let results = await conn.request().query(Query)
                resolve(results.recordset)
            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    }
    GetSchemes = ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `SELECT * FROM Schemes`
                let results = await conn.request().query(Query)
                resolve(results.recordset)
            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    }

    CreateBursary = (data)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                let Query = this.QueryBuilder(data)
                console.log(Query)
                await conn.request().query(Query)
                Query = `SELECT ID FROM BursaryStudents WHERE FileRefNo = '${data.FileRefNo}'`
                let results = await conn.request().query(Query)
                resolve(results.recordset[0].ID)
            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    }

    UpdateBursary = async (data)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                let Query = this.UpdateQueryBuilder(data)
                console.log(Query)
                await conn.request().query(Query)
                resolve("Bursary Updated Successfully!")
            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    }
    

    GetSchemesTypes = ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `SELECT * FROM SchemeTypes`
                let results = await conn.request().query(Query)
                resolve(results.recordset)
            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    }
    GetPartners = ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `SELECT * FROM Partners`
                let results = await conn.request().query(Query)
                resolve(results.recordset)
            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    }

    //
    GetRawBursary = (ID)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `SELECT * FROM BursaryStudents WHERE ID = '${ID}'`
                let results = await conn.request().query(Query)
                resolve(results.recordset[0])
            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    }

    GetBursary = (ID)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let conn = await this.client.GetConnetion()
                const Query = `SELECT * FROM BursaryStudentsView WHERE ID = '${ID}'`
                let results = await conn.request().query(Query)
                resolve(results.recordset[0])
            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    }

    QueryBuilder = (data)=>{
        let SQL = `INSERT INTO [dbo].[BursaryStudents](FileRefNo,
         StudentName,
         Gender,
         District,
         GuardianName,
         GuardianContactAddress,
         GuardianContactPhone,
         SecondarySchoolId,
         Cohort,
         Status,
         SchoolNotificationStatus,
         GuardianNotificationStatus,
         ReimbursementStatus,
         ReimbursementAmount,
         ReimbursementDate,
         CurrentFees,
         TotalFees,
         StudentConduct,
         NumberOfWarnings,
         DateJoined,
         ClassesCompleted,
         CurrentClass,
         SchemeId, 
         EducationLevelId, 
         SchemePackage, 
         SchemeDuration,
         CommemcementDate,
         Approved)
     VALUES 
         ('${data.FileRefNo}','${data.NameOfStudent}','${data.Gender}','${data.District}','${data.GuardianName}','${data.GuardianContactAddress}','${data.GuardianPhone}','${data.SecondarySchool}','${data.Cohort}','${data.BursaryStatus}','${data.StatusToSchool}','${data.StatusToGuardian}','${data.ReimbursementStatus}','${data.ReimbursementAmount}','${data.ReimbursementDate}','${data.CurrentFees}','${data.TotalFees}','${data.StudentConduct}','${data.Warnings}','${data.DateJoined}','${data.ClassesCompleted}','${data.CurrentClass}','${data.SchemeName}',1,'${data.SchemePackage}','${data.SchemeDuration}','${data.CommencementDate}',0)`

         console.log(SQL)

         return SQL
    }

    UpdateQueryBuilder = (data)=>{
        console.log(data)
        let SQL = `UPDATE [dbo].[BursaryStudents]
        SET StudentName='${data.NameOfStudent}',
            Gender='${data.Gender}',
            District='${data.District}',
            GuardianName='${data.GuardianName}',
            GuardianContactAddress='${data.GuardianContactAddress}',
            GuardianContactPhone='${data.GuardianContactPhone}',
            SecondarySchoolId='${data.SecondarySchool}',
            Cohort='${data.Cohort}',
            Status='${data.BursaryStatus}',
            SchoolNotificationStatus='${data.StatusToSchool}',
            GuardianNotificationStatus='${data.StatusToGuardian}',
            ReimbursementStatus='${data.ReimbursementStatus}',
            ReimbursementAmount='${data.ReimbursementAmount}',
            ReimbursementDate='${data.ReimbursementDate}',
            CurrentFees='${data.CurrentFees}',
            TotalFees='${data.TotalFees}',
            StudentConduct='${data.StudentConduct}',
            NumberOfWarnings='${data.Warnings}',
            DateJoined='${data.DateJoined}',
            ClassesCompleted='${data.ClassesCompleted}',
            CurrentClass='${data.CurrentClass}',
            SchemeId = '${data.SchemeName}',
            SchemePackage = '${data.SchemePackage}',
            SchemeDuration = '${data.SchemeDuration}',
            CommemcementDate = '${data.CommencementDate}',
            Approved = '0'
        Where ID='${data.BID}'`

        return SQL
    }
    

}