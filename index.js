const chalk = require('chalk')
const figlet = require('figlet')
const minimist = require('minimist')

module.exports = () => {
    console.log(
        chalk.cyan(
            figlet.textSync('stock-cli', { horizontalLayout: 'full' })
        )
    )

    const args = minimist(process.argv.slice(2))
    const cmd = args._[0]

    switch (cmd) {
        case 'quote': 
            require('./cmds/quote')(args)
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
}