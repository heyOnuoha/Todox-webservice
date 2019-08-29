const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const mobileApiRoute = require('./mobile api/index')
const basicAuth = require('express-basic-auth')

const app = express()

const mongooseConnection = require('./connection')

app.enable('trust proxy');

app.use(basicAuth({
    users: { 'test': '123456' },
    challenge: true,
    realm: 'Imb4T3st4pp',
}))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/mobile/api', mobileApiRoute)

app.get('/', (req, res) => res.send('Welcome to the Todox Webservice'))

const server = http.createServer(app);

server.listen(3005).once('connection', (serv) => {

    console.log(`Server Started on port ${serv.localPort}`)
})

module.exports = app

