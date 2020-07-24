const express = require('express')
const mongoose = require('mongoose')
const { mongodbUrl } = require('./config/database')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000  // process.env.PORT means whatever the port is available to heroku
// mongodb Connection
mongoose.connect(process.env.MONGODB_URI || mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(db => {
    console.log('MongoDb is connected')
}).catch(error => console.log(error))

// Data Parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
const testing = require('./routes/testing')

app.use('/', testing)
    // set static assests if production
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
// server 
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Server is running at ${PORT}`)
})