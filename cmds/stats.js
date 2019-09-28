const ora = require("ora");
const rp = require("request-promise");
const chalk = require("chalk");

module.exports = args => {
  const throbber = ora().start();

  const symbol = args.symbol || args.s;
  var options = {
    uri: `https://cloud.iexapis.com/stable/stock/${symbol}/stats?token=pk_187d0f71ac59455cae69bac7e3e081e0`,
    json: true
  };

  rp(options)
    .then(result => {
      console.log(`\nCompany Statas for ${symbol}:`);
      console.log(`\tCompany Name: ${JSON.stringify(result["companyName"])}`);
      console.log(`\t52 Week High: $${JSON.stringify(result["week52High"])}`);
      console.log(`\t52 Week Low: $${JSON.stringify(result["week52Low"])}`);
      console.log(`\tMarket Cap: ${JSON.stringify(result["msrketcap"])}`);
      console.log(`\t200 Day Moving Avg.: $${JSON.stringify(result["day200MovingAvg"])}`);
      console.log(`\t50 Day Moving Avg.: $${JSON.stringify(result["day50MovingAvg"])}`);
      console.log(`\tFloat: ${JSON.stringify(result["float"])} shares`);
      console.log(`\tAvg. 10-day Volume: $${JSON.stringify(result["avg10Volume"])}`);
      console.log(`\tAvg. 30-day Volume: $${JSON.stringify(result["avg30Volume"])}`);
      console.log(`\tEarnings per share (Trailing twelve months): ${JSON.stringify(result["ttmEPS"])}`);
      console.log(`\tDividend Rate (Trailing twelve months): ${JSON.stringify(result["ttmDividendRate"])}`);
      console.log(`\tShares Outstanding: ${JSON.stringify(result["sharesOutstanding"])}`);
      console.log(`\tMax Change ${JSON.stringify(result["maxChangePercent"])}%`);
      console.log(`\t5 year Change ${JSON.stringify(result["year5ChangePercent"])}%`);
      console.log(`\t2 year Change ${JSON.stringify(result["year2ChangePercent"])}%`);
      console.log(`\t1 year Change ${JSON.stringify(result["year1ChangePercent"])}%`);
      console.log(`\tYear-to-date Change ${JSON.stringify(result["ytdChangePercent"])}%`);
      console.log(`\t6 month Change ${JSON.stringify(result["month6ChangePercent"])}%`);
      console.log(`\t3 month Change ${JSON.stringify(result["month3ChangePercent"])}%`);
      console.log(`\t1 month Change ${JSON.stringify(result["month1ChangePercent"])}%`);
      console.log(`\t5 day Change ${JSON.stringify(result["day5ChangePercent"])}%`);
      console.log(`\tDividend Yield ${JSON.stringify(result["dividendYield"])}`);
      console.log(`\tNext Dividend Date ${JSON.stringify(result["nextDividendDate"])}`);
      console.log(`\tPrevious Dividend Date ${JSON.stringify(result["exDividendDate"])}`);
      console.log(`\tPE Ratio ${JSON.stringify(result["peRatio"])}`);
      throbber.succeed(`${chalk.green('All Done')}`);
      process.exit(0);
    })
    .catch(err => {
      throbber.fail(`${chalk.red('Some Problem Occured')}`);
      console.log("\nUnknown Symbol or API down");
      process.exit(1);
    });
};