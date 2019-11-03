const path = require('path')

const PATH_UPLOADS = `${__dirname}/../uploads/`
const PATH_PYTHON = `${__dirname}/../../../python/`

const runImageAnalizer = filePath => {
  return new Promise((resolve, reject) => {
    let spawn = require('child_process').spawn
    let program = spawn('python3', [
      '-u',
      path.join(PATH_PYTHON, 'label_score_maker.py'),
      filePath
    ])

    program.stdout.on('data', data => {
      resolve(data.toString('UTF-8'))
    })
    program.stderr.on('data', data => {
      reject(data.toString('UTF-8'))
    })
  })
}

const runFindPixelLength = new Promise((resolve, reject) => {
  let spawn = require('child_process').spawn
  let program = spawn('bash', [
    path.join(PATH_PYTHON, '/assets/lenghtFinder/python/find_px_length.bash')
  ])

  program.stdout.on('data', data => {
    resolve(data.toString('UTF-8'))
  })
  program.stderr.on('data', data => {
    reject(data.toString('UTF-8'))
  })
})

function callImageAnalizer (req, res, options) {
  runImageAnalizer(options.filePath).then(data => {
    const json = JSON.parse(data)

    let labelOk = false

    if (labelOk) {
      callDifusion(req, res, { label: json[0].label })
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.send(json)
    }
  })
}

function callFindPxLength (req, res) {
  runFindPixelLength.then(res => console.log(res))
}

function callDifusion (req, res, options) {
  let data = options
  res.setHeader('Content-Type', 'application/json')
  res.send(data)
}

function analize (req, res) {
  let filePath = path.join(PATH_UPLOADS, req.files.file.name)

  req.files.file.mv(filePath, err => {
    if (err) return res.status(500).send(err)

    callImageAnalizer(req, res, { filePath })
  })
}

module.exports = analize
