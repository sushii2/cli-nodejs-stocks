const ora = require("ora");
const rp = require("request-promise");
const chalk = require("chalk");

module.exports = args => {
  const throbber = ora().start();

  const symbol = args.symbol || args.s;
  var options = {
    uri: `https://cloud.iexapis.com/stable/stock/${symbol}/news/last/5?token=pk_187d0f71ac59455cae69bac7e3e081e0`,
    json: true
  };

  rp(options)
    .then(result => {
      console.log(`\nNews for ${symbol}:`);
      for(let i = 0; i < result.length; i++) {
          var res = result[i]

          console.log(`Headline: ${JSON.stringify(res["headline"])}`);
          console.log(`Source: ${JSON.stringify(res["source"])}`);
          console.log(`Article Link: ${JSON.stringify(res["url"])}`);
          console.log(`Summary: ${JSON.stringify(res["summary"])}`);
          console.log(`Related to: ${JSON.stringify(res["related"])}`);
      }
      throbber.succeed(`${chalk.green('All Done')}`);
      process.exit(0);
    })
    .catch(err => {
      throbber.fail(`${chalk.red('Some Problem Occured')}`);
      console.log("\nUnknown Symbol or API down");
      process.exit(1);
    });
};