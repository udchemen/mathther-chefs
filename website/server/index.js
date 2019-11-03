const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')()
const fileUpload = require('express-fileupload')

const Controllers = {
  analize: require('./controllers/analize.controller')
}

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(pino)
app.use(fileUpload())

app.post('/api/analize', Controllers.analize)

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
)
