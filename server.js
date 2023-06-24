// DEPENDENCIES
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

//ROUTES
app.get('/', (req,res) => {
    res.send('Bread App Home Page!')
})

//Bread middleware
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//BREADS
const breadsControler = require('./controllers/breads_controller.js')
app.use('/breads', breadsControler)

//BAKERS
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

//mongoose
mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true}, () => {
       console.log('connected to mongoDB: ', process.env.MONGO_URI)
    })

// 404 Page
app.get('*', (req, res) => {
    res.send('404 NOT FOUND')
  })
  

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})