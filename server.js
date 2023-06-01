const express = require('express')
const app = express()

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

//middleware
const breadsControler = require('./controllers/breads_controller.js')
app.use('/breads', breadsControler)

//ROUTES
app.get('/', (req,res) => {
    res.send('Bread App Home Page!')
})

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})