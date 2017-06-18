const UdpNode = require('udp-node')
const chalk = require('chalk')
const cliCursor = require('cli-cursor')
const ts = require('./timestamp')
const CommandRunner = require('./command-runner')

module.exports = class Host {
  constructor (name) {
    this.name = name
    this.commandRunner = new CommandRunner()
  }

  start () {
    cliCursor.hide()
    console.log(`${ts()} | ${chalk.blue(this.name)} ready and waiting for connection.`)

    this.host = new UdpNode()
    this.host
      .setLogLevel('info')
      .set({
        name: this.name,
        type: 'host'
      })
      .broadcast({
        port: 3025
      })
      .onNode((data, rinfo) => {
        console.log(`${ts()} | ${chalk.blue(data.node.name)} connected!`)
      })
      .on('command', (message, rinfo) => {
        const commandString = message.text
        this.commandRunner.run(commandString, (err, stdout, stderr) => {
          this.host.send({
            type: 'response',
            address: rinfo.address,
            port: rinfo.port,
            text: stdout || stderr || err
          })
        })
      })
      .on('disconnect', (data, rinfo) => {
        console.log(`${ts()} | ${chalk.blue(data.name)} disconnected.`)
      })
  } // end start
}
