require('dotenv').config()

const express = require("express")
const bodyParser = require('body-parser')
const router = express.Router()
const sm = require('./Config/session_manager')
const session = require('express-session')
const path = require('path')
const exphbs = require('express-handlebars')
const Handlebars = require("handlebars")
const fileUpload = require("express-fileupload")
const moment = require("moment")

//Security module
const compression = require('compression')

let app = express()

const UsersRoutes = require('./Routes/Users.Routes')(router, sm)
const HomeRoutes = require("./Routes/Home.Routes")(router, sm)
const ProjectRoutes = require("./Routes/Projects.Routes")(router, sm)
const InvestmentsRoutes = require("./Routes/Investments.Routes")(router, sm)
const BusaryRoutes = require("./Routes/Bursary.Routes")(router, sm)
const ApprovalRoutes = require("./Routes/Approvals.Routes")(router,sm)
const ReportsRoutes = require("./Routes/Reports.Routes")(router,sm)
// Invoke middlewaref
app.use(express.static(path.join(__dirname, '/Public')))
app.use(express.urlencoded())
app.use(express.json())
app.set('trust proxy', 1) // trust first proxy


app.use(session({
    secret:process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true
  }))
  
  bodyParser({
      json: {limit: '50mb', extended: true},
      urlencoded: {limit: '50mb', extended: true}
  })

  app.use(fileUpload({
      limit:{files: 50 * 1024 * 1024},
      useTempFiles : true,
      tempFileDir : '/tmp/'
  }))
  
  //Add Compression Middleware
  app.use(compression())
  
  app.set("views",path.join(__dirname,'Views'))
  app.engine('handlebars',exphbs({
      defaultLayout:'shared',
      layoutsDir: __dirname + '/Views/layouts/',
      partialsDir: __dirname + '/Views/partials/'
  }))
  
app.set('view engine','handlebars')

Handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));

Handlebars.registerHelper('ifeq', function (a, b, options) {
    if (a == b) { return options.fn(this); }
    return options.inverse(this);
});

Handlebars.registerHelper('grt_than', function (a, b, options) {
    if (a.length > b) { return options.fn(this); }
    return options.inverse(this);
});
Handlebars.registerHelper('index_of', function(context,ndx) {
    return context[ndx];
  });
Handlebars.registerHelper('each_upto', function(ary, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

Handlebars.registerHelper('ifnoteq', function (a, b, options) {
    if (a != b) { return options.fn(this); }
    return options.inverse(this);
});
  

Handlebars.registerHelper('formatCurrency', function(value) {
    if(value && value != null && value != "" && value != typeof undefined){
        return "MK"+value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }else{
        return ''
    }
})

Handlebars.registerHelper('valueFixed', function(value) {
    return value.toFixed(2);
});

Handlebars.registerHelper('dateFormat', function (date, options) {
    const formatToUse = (arguments[1] && arguments[1].hash && arguments[1].hash.format) || "YYYY-MM-DD"
    return moment(date).format(formatToUse);
});

//Add Compression Middleware
app.use(compression())

app.use('/', UsersRoutes)
app.use('/', HomeRoutes)
app.use('/', ProjectRoutes)
app.use('/', BusaryRoutes)
app.use('/', ApprovalRoutes)
app.use('/', ReportsRoutes)

//Handle undefined pages
//app.use('*', (req, res)=>{res.render('page-error',{title:"Broken Link"})})

app.set('port',(process.env.PORT || 2000))

app.listen(app.get('port'),()=>{
    console.log(`Server Running On Port : ${app.get('port')}...`)
})



