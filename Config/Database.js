const mssql =require('mssql')

const dbConfig = {
  server:process.env.DB_SERVER,
  user:process.env.DB_USER,
  password:process.env.DB_PASS,
  database:process.env.DB_NAME,
  port:process.env.DB_PORT
}

//Try connecting to
let connection
try {
  console.log('Attempting DB connection...')
 async()=>{
  connection = await mssql.connect(dbConfig)
 }
  console.log('DB Connection Successfull!')
} catch (error) {
  console.log("DB Connection Failed! \n%s",error)
}
GetConnection = ()=>{
  return connection
}

module.exports = {GetConnection}