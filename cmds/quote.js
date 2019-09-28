const ora = require("ora");
const rp = require("request-promise");
const chalk = require("chalk");

module.exports = args => {
  const throbber = ora().start();

  const symbol = args.symbol || args.s;
  var options = {
    uri: `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_187d0f71ac59455cae69bac7e3e081e0`,
    json: true
  };

  rp(options)
    .then(result => {
      console.log(`\nStock Quote for ${symbol}:`);
      console.log(`\tCompany Name: ${JSON.stringify(result["companyName"])}`);
      console.log(
        `\tPrimary Exchange: ${JSON.stringify(result["primaryExchange"])}`
      );
      console.log(`\tPrice on Open: $${JSON.stringify(result["open"])}`);
      console.log(`\tPrice on Close: $${JSON.stringify(result["close"])}`);
      console.log(`\tDay High: $${JSON.stringify(result["high"])}`);
      console.log(`\tDay Low: $${JSON.stringify(result["low"])}`);
      console.log(
        `\tPrevious Close: $${JSON.stringify(result["previousClose"])}`
      );
      console.log(`\tVolume: ${JSON.stringify(result["latestVolume"])}`);
      console.log(
        `\tPrevious Volume: ${JSON.stringify(result["previousVolume"])}`
      );
      console.log(`\tAverage Total Volume: ${JSON.stringify(result["avgTotalVolume"])}`);
      console.log(`\tPercent Change: ${JSON.stringify(result["changePercent"])}%`);
      console.log(`\tMarket Cap: ${JSON.stringify(result["marketCap"])}`);
      console.log(`\t52 Week High: $${JSON.stringify(result["week52High"])}`);
      console.log(`\t52 Week Low: $${JSON.stringify(result["week52Low"])}`);
      console.log(`\tIs the U.S. Market Open?: ${JSON.stringify(result["isUSMarketOpen"])}`);
      console.log("\tIf the market is open the quote will update every 15 minutes")
      throbber.succeed("All Done");
      process.exit(0);
    })
    .catch(err => {
      throbber.fail("There was some problem");
      console.log("\nUnknown Symbol or API down");
      process.exit(1);
    });
};
