const path = require('path')
const {
  runImageAnalizer,
  runFindDimentions,
  runHeatTransfer
} = require('../services/python.service')

const PATH_UPLOADS = `${__dirname}/../uploads/`

function callImageAnalizer (req, res, options) {
  runImageAnalizer(options.filePath)
    .then(data => {
      const json = JSON.parse(data)
      const thickness = req.body.thickness || 0.2

      options = {
        ...options,
        thickness
      }

      if (req.body.label) {
        options.label = req.body.label
        callHeatTransfer(req, res, options)
      } else {
        res.setHeader('Content-Type', 'application/json')
        res.send(json)
      }
    })
    .catch(err => console.log(err))
}

async function callHeatTransfer (req, res, options) {
  let dimentions = await runFindDimentions(options.filePath)
  let temperatures = {
    Ti: 25 + 273.15,
    Ta: 200 + 273.15,
    Tr: 52 + 273.15
  }
  const params = [
    options.label,
    options.thickness,
    dimentions.surfaceArea,
    temperatures.Ti,
    temperatures.Ta,
    temperatures.Tr
  ]

  runHeatTransfer(params).then(data => {
    res.setHeader('Content-Type', 'application/json')
    res.send(data)
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
