const ora = require("ora");
const rp = require("request-promise");
const chalk = require("chalk");

module.exports = args => {
  const throbber = ora().start();

  const symbol = args.symbol || args.s;
  var options = {
    uri: `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_187d0f71ac59455cae69bac7e3e081e0`,
    json: true
  };

  rp(options)
    .then(result => {
      console.log(`\nCompany Information for ${symbol}:`);
      console.log(`\tCompany Name: ${JSON.stringify(result["companyName"])}`);
      console.log(`\tExchange : ${JSON.stringify(result["exchange"])}`);
      console.log(`\tIndustry: ${JSON.stringify(result["industry"])}`);
      console.log(`\tWebsite: ${JSON.stringify(result["website"])}`);
      console.log(`\tDescription: ${JSON.stringify(result["description"])}`);
      console.log(`\tCompany CEO: ${JSON.stringify(result["CEO"])}`);
      console.log(`\tSecurity Name: ${JSON.stringify(result["securityName"])}`);
      console.log(`\tCompany Name: ${JSON.stringify(result["companyName"])}`);
      console.log(`\tSector: ${JSON.stringify(result["sector"])}`);
      console.log(
        `\tNumber of Employees: ${JSON.stringify(result["employees"])}`
      );
      console.log(
        `\tCompany Address: ${JSON.stringify(
          result["address"]
        )}, ${JSON.stringify(result["state"])}, ${JSON.stringify(
          result["city"]
        )}, ${JSON.stringify(result["zip"])}, ${JSON.stringify(
          result["country"]
        )}`
      );
      throbber.succeed(`${chalk.green('All Done')}`);
      process.exit(0);
    })
    .catch(err => {
      throbber.fail(`${chalk.red('Some Problem Occured')}`);
      console.log("\nUnknown Symbol or API down");
      process.exit(1);
    });
};
