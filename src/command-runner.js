const cp = require('child_process')
const notifier = require('node-notifier')
const path = require('path')

module.exports = class CommandRunner {
  constructor () {
    this.commands = {
      notify: true,
      play: true,
      stop: true,
      exit: true
    }

    this.playing = null
    this.playScript = path.join(__dirname, './commands/play.js')
  }

  run (commandString, callback) {
    const parts = commandString.split(' ')
    const command = parts.shift().trim()
    const data = commandString.replace(command, '').trim()

    // Execute supported commands.
    if (this.commands[command]) {
      return this[command](data, callback)
    }

    // Execute default command.
    return this.default(commandString, callback)
  }

  default (command, callback) {
    cp.exec(command, (err, stdout, stderr) => {
      if (typeof callback === 'function') callback(err, stdout, stderr)
    })
  }

  notify (message, callback) {
    notifier.notify({
      title: 'remoted',
      sound: true,
      message: message
    }, (err, response) => {
      if (typeof callback === 'function') callback(err, 'Notification displayed.')
    })
  }

  play (url, callback) {
    this.playing = cp.spawn('node', [this.playScript, url])
    if (typeof callback === 'function') callback(null, 'Starting playback...')
  }

  stop (data, callback) {
    if (this.playing) {
      this.playing.kill()
      if (typeof callback === 'function') callback(null, 'Playback stopped.')
    }
  }

  exit (data, callback) {
    console.log(`
      Bye!
    `)
    process.exit()
  }
}
