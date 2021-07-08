"use strict"
const mssql = require('mssql/msnodesqlv8')

const dbConfig = {
  server:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASS,
  database:process.env.DB_NAME,
  driver:"msnodesqlv8",
  dialect:"mssql",
  port:parseInt(process.env.DB_PORT),
  options:{
    enableArithAort:true,
    instanceName:"MSSQLSERVER"
  },
  connectionTimeout:15000,
  pool:{
    max:100,
    min:0,
    idleTimeoutMillis:30000
  }
}

const client = class{
  constructor(){
    this.pool = null
  }
  closePool = async ()=>{
    try{
      console.log('Closing database connection pool!')
      await this.pool.close()
    }catch(err){
      this.pool = null
      console.log(err.message)
    }
  }

  GetConnetion = async ()=>{
    try{
      if(this.pool){
        return this.pool
      }
      //this.pool = await mssql.connect(dbConfig)
      this.pool = await mssql.connect('Server=localhost,1433;Database=PIMIS;User Id=sa;Password=Angelsdie1997@1997;Encrypt=false')

      mssql.on("error", async err=>{
        console.log(err.message)
        await this.closePool()
      })
      return this.pool
    }catch(err){
      console.log(err.message)
      this.pool = null
    }
  }
}

module.exports = client