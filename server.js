
const express = require("express") ; 
const dotenv = require("dotenv") ; 
const morgan = require("morgan") ; 
const bodyparser = require("body-parser") ; 
const path = require("path") ; // in built node module

const connectDB = require('./server/database/connection') ; 
const { connect } = require("http2");

const app = express() ; 

dotenv.config({path: 'config.env'})

const PORT = process.env.PORT || 4000 ; 

// log requests - morgan

app.use(morgan('tiny')) ; 

// mongodb connection 

connectDB() ; 

// parse requests to body-parser 

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json()) ; 

// set view engine 

app.set('view engine', 'ejs') ; 
// app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets 

app.use('/css', express.static(path.resolve(__dirname, "assets/css"))) ; 

app.use('/img', express.static(path.resolve(__dirname, "assets/img"))) ; 

app.use('/js', express.static(path.resolve(__dirname, "assets/js"))) ; 

// load routers 

app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})

