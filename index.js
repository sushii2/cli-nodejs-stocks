const chalk = require('chalk')
const figlet = require('figlet')
const minimist = require('minimist')
// const getQuote = require('./utils/getquote');

module.exports = () => {
    console.log(
        chalk.cyan(
            figlet.textSync('stock-cli', { horizontalLayout: 'full' })
        )
    )

    const args = minimist(process.argv.slice(2))
    let cmd = args._[0] || 'help'

    if (args.version || args.v) {
        cmd = 'version'
      }

    if (args.help || args.h) {
        cmd = 'help'
    }

    switch (cmd) {
        case 'quote': 
            require('./cmds/quote')(args)
            break
        case 'company':
            require('./cmds/company')(args)
            break
        case 'stats':
            require('./cmds/stats')(args)
            break
        case 'news':
            require('./cmds/news')(args)
            break
        case 'chart':
            require('./cmds/chart')(args)
            break
        case 'version':
            require('./cmds/version')(args)
            break
        case 'help': 
            require('./cmds/help')(args)
            break
        default:
            console.error(`"${cmd}" is not a valid command!`)
            break
    }

    // console.log(getQuote('aapl'))
}