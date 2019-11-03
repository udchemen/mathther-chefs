const path = require('path')

const PATH_UPLOADS = `${__dirname}/../uploads/`
const PATH_PYTHON = `${__dirname}/../../../python/`

function callImageAnalizer (req, res, options) {
  var spawn = require('child_process').spawn
  var process = spawn('python3', [
    '-u',
    path.join(PATH_PYTHON, 'label_score_maker.py'),
    options.filePath
  ])

  process.stdout.on('data', function (data) {
    // if label is certain, run simulation
    // else, ask user what the label is

    res.setHeader('Content-Type', 'application/json')
    res.send(data.toString('utf-8'))
  })
}

function analize (req, res) {
  let filePath = path.join(PATH_UPLOADS, req.files.file.name)

  req.files.file.mv(filePath, err => {
    if (err) return res.status(500).send(err)

    callImageAnalizer(req, res, { filePath })
  })
}

module.exports = analize
