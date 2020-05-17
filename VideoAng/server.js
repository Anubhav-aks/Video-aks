const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

var controller = require('./server/route/control.js')

const app = express();

app.use(express.static(path.join(__dirname, 'dist/VideoAng')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())




app.use('/control', controller)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/VideoAng/index.html'))
})

app.listen(8080, () => {

    console.log('Server running at port 8080')
})