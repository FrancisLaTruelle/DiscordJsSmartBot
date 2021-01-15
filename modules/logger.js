const chalk = require("chalk")
const moment = require("moment")

let log = (type, content) => {
  const timestamp = `[${moment().format("DD-MM-YY H:m:s")}]:`
  const eachLine = content.split('\n')
  switch (type) {
    case "log": {
        return console.log(`${timestamp} ${type.toUpperCase()} ${content} `)
    }
    case 'warn': {
        return console.log(`${timestamp} ${chalk.yellow(type.toUpperCase())} ${content} `)
    }
    case 'error': {
        return console.log(`${timestamp} ${chalk.red(type.toUpperCase())} ${content} `)
    }
    case 'ready': {
        return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content}`)
    }
    case 'loading': {
        return console.log(`${timestamp} ${chalk.cyan(type.toUpperCase())} ${content} `)
    }
    case 'loaded': {
        for(var i = 0, l = eachLine.length; i < l; i++) {
            console.log(`${timestamp} ${chalk.blue(type.toUpperCase())} ${eachLine[i]} `)
        }
        return
    }
    default: {
        throw new TypeError('Mauvais type de log')
    }
  }
}

module.exports = log