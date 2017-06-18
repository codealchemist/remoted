const chalk = require('chalk')

module.exports = () => {
  const date = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }).split(' ')

  // const dayName = date[0].replace(',', '')
  const monthName = date[1]
  const dayNumber = date[2].replace(',', '')
  const year = date[3].replace(',', '')
  const hour = date[4]
  const ampm = date[5]

  const timestamp = `${year}-${monthName}-${dayNumber} ${hour}${ampm}`
  return chalk.dim(timestamp)
}
