require('dotenv').config()

const express = require("express")
const bodyParser = require('body-parser')
const router = express.Router()
const sm = require('./Config/session_manager')
const session = require('express-session')
const path = require('path')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')


//Security module
const compression = require('compression')

let app = express()

const UsersRoutes = require('./Routes/Users.Routes')(router, sm)
const HomeRoutes = require("./Routes/Home.Routes")(router, sm)
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
  
  //Add Compression Middleware
  app.use(compression())
  
  app.set("views",path.join(__dirname,'Views'))
  app.engine('handlebars',exphbs({
      defaultLayout:'shared',
      layoutsDir: __dirname + '/Views/layouts/',
      partialsDir: __dirname + '/Views/partials/'
  }))
  
app.set('view engine','handlebars')

Handlebars.registerHelper('ifeq', function (a, b, options) {
    if (a == b) { return options.fn(this); }
    return options.inverse(this);
});

Handlebars.registerHelper('grt_than', function (a, b, options) {
    if (a.length > b) { return options.fn(this); }
    return options.inverse(this);
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
  


//Add Compression Middleware
app.use(compression())

app.use('/', UsersRoutes)
app.use('/', HomeRoutes)

app.set('port',(process.env.PORT || 2000))

app.listen(app.get('port'),()=>{
    console.log(`Server Running On Port : ${app.get('port')}...`)
})



