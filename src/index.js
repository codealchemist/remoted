#!/usr/bin/env node
const path = require('path')
const chalk = require('chalk')
const asciiArt = require('./ascii-art')

asciiArt.show()

// load params and validate them
const params = require('minimist')(process.argv.slice(2))
if (hasInvalidParams(params)) {
  showUsage()
  process.exit()
}

if (params.host) {
  // start host
  const Host = require(path.join(__dirname, './host'))
  const host = new Host(params.host)
  host.start()
} else {
  // connect commander
  const Commander = require(path.join(__dirname, './commander'))
  const commander = new Commander()
  commander.connect(params._[0])
}

function hasInvalidParams (params) {
  return (!params.host && !params['_'].length) || params.host === true
}

function showUsage () {
  console.log(`
    ${chalk.bold('USAGE')}:

    Start host:
      ${chalk.green('remoted --host six')}

    Connect commander:
      ${chalk.green('remoted six')}
  `)
}
