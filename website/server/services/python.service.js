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
  // @NOTE Temporary - remove when picture of meet has tag
  filePath = path.join(PATH_PYTHON, '/assets/lengthFinder/python/april_tag.jpg')

  //   return new Promise((resolve, reject) => {
  //     let spawn = require('child_process').spawn
  //     let program = spawn('bash', [
  //       '/Users/Lucas/Apps/Web/mathther-chefs/python/assets/lengthFinder/python/find_px_length.bash',
  //       '/Users/Lucas/Apps/Web/mathther-chefs/python/assets/lengthFinder/python/april_tag.jpg'
  //     ])

  //     program.stdout.on('data', data => {
  //       resolve(data.toString('UTF-8'))
  //     })
  //     program.stderr.on('data', data => {
  //       reject(data.toString('UTF-8'))
  //     })
  //   })
  return new Promise((resolve, reject) => {
    let spawn = require('child_process').spawn
    let program = spawn('python3', [
      path.join(PATH_PYTHON, '/assets/lengthFinder/python/get_dimention.py'),
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
