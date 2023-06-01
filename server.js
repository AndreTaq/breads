const express = require('express')
const app = express()

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

//Bread
const breadsControler = require('./controllers/breads_controller.js')
app.use('/breads', breadsControler)
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//ROUTES
app.get('/', (req,res) => {
    res.send('Bread App Home Page!')
})

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})