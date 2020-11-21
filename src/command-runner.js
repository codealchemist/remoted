const cp = require('child_process')
const notifier = require('node-notifier')

module.exports = class CommandRunner {
  constructor () {
    this.commands = {
      notify: true,
      exit: true
    }
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
    notifier.notify(
      {
        title: 'remoted',
        sound: true,
        message: message
      },
      (err, response) => {
        if (typeof callback === 'function') {
          callback(err, 'Notification displayed.')
        }
      }
    )
  }

  exit (data, callback) {
    console.log(`
      Bye!
    `)
    process.exit()
  }
}
