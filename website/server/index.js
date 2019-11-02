const express = require('express')
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(pino)

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World'
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }))
})

app.get('/api/hello', callHello)

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
)

function callHello (req, res) {
  var spawn = require('child_process').spawn
  var process = spawn('python', [
    './hello.py',
    req.query.firstname,
    req.query.lastname
  ])

  process.stdout.on('data', function (data) {
    res.send(data.toString())
  })
}
