const UdpNode = require('udp-node')
const readline = require('readline')
const chalk = require('chalk')
const ts = require('./timestamp')

module.exports = class Commander {
  constructor () {
    this.connected = false
    this.name = 'Norton'
  }

  initPrompt (hostname) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: `remoted @ ${hostname}> `
    })
    this.rl.prompt()
  }

  connect (hostname) {
    this.node = new UdpNode()
    this.node
      .setLogLevel('error')
      .set({
        name: this.name,
        type: 'commander',
        port: 3025
      })
      .broadcast({
        port: 3024,
        filter: ['host']
      })
      .onNode((data, rinfo) => {
        // Only connect to requested hostname.
        if (data.node.name !== hostname) return

        console.log(
          `${ts()} | Connected to ${chalk.blue(hostname)} @ ${chalk.white(
            data.address
          )}`
        )
        console.log()
        this.connected = true

        // Initialize command line prompt.
        this.initPrompt(chalk.blue(data.node.name))

        this.onCommandLineInput(text => {
          this.node.send({
            type: 'command',
            address: rinfo.address,
            port: rinfo.port,
            text: text
          })
        })
      })
      .on('response', (data, rinfo) => {
        console.log(data.text)
        this.rl.prompt()
      })

    // Avoid showing "waiting" message if connection already was established.
    setTimeout(() => {
      if (this.connected) return
      console.log(
        `${ts()} | ${chalk.blue(this.name)} waiting for ${chalk.blue(
          hostname
        )}...`
      )
    }, 1000)
  }

  onCommandLineInput (callback, nodeName) {
    this.rl
      .on('line', line => {
        const text = line.trim()
        callback(text)

        setTimeout(() => {
          if (line === 'exit') {
            console.log(`
            Chau!
          `)
            process.exit()
          }
        })
      })
      .on('close', () => {
        // Tell hosts we disconnected.
        this.node.send(
          {
            port: 3024,
            type: 'disconnect',
            text: 'Chau!',
            name: this.name
          },
          () => {
            process.exit(0)
          }
        )

        console.log(`

        Have a great day!
      `)
      })
  }
}
