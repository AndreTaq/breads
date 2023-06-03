const express = require('express')
const app = express()

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

//ROUTES
app.get('/', (req,res) => {
    res.send('Bread App Home Page!')
})

//Bread middleware
const breadsControler = require('./controllers/breads_controller.js')
app.use('/breads', breadsControler)
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

// 404 Page
app.get('*', (req, res) => {
    res.send('404 NOT FOUND')
  })
  

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})