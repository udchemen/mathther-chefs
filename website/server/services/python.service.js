const path = require('path')

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

const runFindDimentions = filePath => {
  return new Promise((resolve, reject) => {
    let spawn = require('child_process').spawn
    let program = spawn('bash', [
      path.join(PATH_PYTHON, '/assets/lenghtFinder/python/find_px_length.bash'),
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

const runHeatTransfer = params => {
  return new Promise((resolve, reject) => {
    let spawn = require('child_process').spawn
    let program = spawn('python3', [
      '-u',
      path.join(PATH_PYTHON, 'heat_transfer.py'),
      ...params
    ])

    program.stdout.on('data', data => {
      resolve(data.toString('UTF-8'))
    })
    program.stderr.on('data', data => {
      reject(data.toString('UTF-8'))
    })
  })
}

module.exports = {
  runImageAnalizer,
  runFindDimentions,
  runHeatTransfer
}
