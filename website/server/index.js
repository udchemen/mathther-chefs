const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(pino)

app.get('/api/greeting', greeting)
app.get('/api/hello', callHello)
app.post('/api/analize', analize)

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
)

function callHello (req, res) {
  var spawn = require('child_process').spawn
  var process = spawn('python', [
    '-u',
    path.join(__dirname, '../../python/hello.py'),
    req.query.firstname
  ])

  process.stdout.on('data', function (data) {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({ data: data.toString('utf-8') }))
  })
}

function greeting (req, res) {
  const name = req.query.name || 'World'
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }))
}

function analize (req, res) {
  console.log('body', req.body)
}
