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

mssql.on("error", err=>{
  console.log(err.message)
})


module.exports = {dbConfig, mssql}