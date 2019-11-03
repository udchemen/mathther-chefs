const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')()
const fileUpload = require('express-fileupload')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(pino)
app.use(fileUpload())

app.post('/api/analize', analize)

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
)

function callImageAnalizer (req, res, options) {
  var spawn = require('child_process').spawn
  var process = spawn('python', [
    '-u',
    path.join(__dirname, '../../python/hello.py'),
    options.filePath
  ])

  process.stdout.on('data', function (data) {
    res.setHeader('Content-Type', 'application/json')
    res.send(data.toString('utf-8'))
  })
}

function analize (req, res) {
  // move uploaded file to folder
  let filePath = `${__dirname}/uploads/${req.files.file.name}`

  req.files.file.mv(filePath, err => {
    if (err) return res.status(500).send(err)

    // return callImageAnalizer(req, res)
    return callImageAnalizer(req, res, { filePath })
  })
}
