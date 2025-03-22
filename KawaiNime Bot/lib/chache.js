const fs = require('fs');
const chalk = require('chalk')
const moment = require('moment')
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')

function uncache(module = '.') {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()
} catch (e) {
reject(e)
}
})
}

function nocache(module, cb = () => { }) {
console.log(chalk.cyanBright(`Module ${module} Sedang di pantau Oleh YusufHost🚀`))
fs.watchFile(require.resolve(module), async () => {
await uncache(require.resolve(module))
cb(module)
})
}

require('../yusuf')
nocache('../yusuf', module => console.log(chalk.greenBright('[ MAABEST-MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))

require('../main')
nocache('../main', module => console.log(chalk.greenBright('[ MAABEST-MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))

// Auto Update Server
require('./myfunc')
nocache('./myfunc', module => console.log(chalk.greenBright('[ MAABEST-MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))

module.exports = { nocache, uncache }