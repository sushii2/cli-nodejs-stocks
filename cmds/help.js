const menus = {
    main: `
    stock [command] <options>

    quote .............. pulls quote
    company ............ pulls company info
    stats .............. pulls key stats
    dividends .......... pulls last quarter dividends
    earnings ........... pulls last quarters earnings
    marketvolume ....... pulls real time traded volume on U.S. markets
    news ............... pulls news related to specific stock
    version ............ show package version
    help ............... show help menu for a command`,

  quote: `
    stock quote <options>

    --symbol, -s ..... the symbol quote is needed for`,

  company: `
    stock company <options>

    --symbol, -s ..... the symbol company info is needed for`,

  stats: `
    stock stats <options>

    --symbol, -s ..... the symbol statistics are needed for`,

  dividends: `
    stock dividends <options>

    --symbol, -s ..... the symbol dividend report is needed for`,

  earnings: `
    stock earnings <options>

    --symbol, -s ..... the symbol earnings are needed for`,

  marketvolume: `
    stock marketvalue <options>

    --symbol, -s ..... the symbol market volume is needed for`,

  news: `
    stock news <options>

    --symbol, -s ..... the symbol news is needed for`,


}

module.exports = (args) => {
    const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

    console.log(menus[subCmd] || menus.main)
}