const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const { MONGOURI } = require('./keys')


/*MONGODB CONNECTION START*/
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log("Connected to mongodb")
})
mongoose.connection.on('error', (err) => {
    console.log("Error connecting", err)
})
/*MONGODB CONNECTION END*/

require('./models/user')
require('./models/product')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/product'))

//GET ROUTE STARTS
app.get('/', (req, res) => {
    res.send("Welcome here")
})

app.get('/home', (req, res) => {
    res.send("hello world")
})
//GET ROUTE ENDS

app.listen(PORT, () => {
    console.log("server is running on ", PORT)
})